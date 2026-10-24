import concurrent.futures
from contextlib import closing
import io
import json
import os
import sqlite3
import tempfile
import unittest
import uuid
from datetime import date, timedelta
from pathlib import Path
from urllib.error import HTTPError, URLError
from unittest.mock import patch, MagicMock

TEMP = tempfile.TemporaryDirectory()
os.environ['DATA_DIR'] = TEMP.name
os.environ['DISABLE_MAIL_WORKER'] = '1'
os.environ['APP_ENV'] = 'development'
os.environ['ADMIN_PASSWORD'] = 'test-admin-password'
import server

HEADERS = {'X-Requested-With': 'booking-site'}
RESEND_SETTINGS = dict(SMTP_HOST='smtp.resend.com', SMTP_USER='resend', SMTP_PASSWORD='re_test_secret',
                       MAIL_FROM='onboarding@resend.dev', CHECKIN_TIME='15:00', CHECKOUT_TIME='11:00',
                       PROPERTY_ADDRESS='Test address')


class BookingTests(unittest.TestCase):
    def setUp(self):
        # Tests must neither use workstation credentials nor accidentally send mail.
        environment = patch.dict(os.environ, {'DISABLE_MAIL_WORKER': '1'}, clear=True)
        environment.start()
        self.addCleanup(environment.stop)
        self.client = server.app.test_client()
        with server.connect() as db:
            for table in ('nights', 'reservations', 'sessions', 'limits', 'settings'):
                db.execute('DELETE FROM ' + table)
        self.body = dict(checkin=str(date.today()+timedelta(days=10)), checkout=str(date.today()+timedelta(days=12)),
                         guests=2, guest='Test Guest', email='guest@example.com', phone='', requestKey=str(uuid.uuid4()))

    def post(self, path, body, client=None):
        return (client or self.client).post(path, json=body, headers=HEADERS)

    def login(self):
        self.assertEqual(self.post('/api/login', dict(email='andrewteddyjp@gmail.com', password='test-admin-password')).status_code, 200)

    def test_required_fields_and_auth(self):
        for field, value in [('email',''), ('email','invalid'), ('guests',7), ('guest',''), ('checkout',self.body['checkin']), ('checkin','2000-01-01'), ('phone','123')]:
            with self.subTest(field=field):
                self.assertEqual(self.post('/api/reservations', dict(self.body, **{field:value})).status_code,400)
        self.assertEqual(self.client.get('/api/reservations').status_code,401)
        self.assertEqual(self.client.delete('/api/reservations/anything', json={}, headers=HEADERS).status_code,401)
        self.assertEqual(self.client.post('/api/login',json={}).status_code,403)
        self.assertEqual(self.client.get('/server.py').status_code,404)
        self.assertEqual(self.client.get('/.env').status_code,404)
        self.assertEqual(self.post('/api/login', dict(email='andrewteddyjp@gmail.com', password='wrong')).status_code,401)

    def test_book_view_delete_and_rebook(self):
        r=self.post('/api/reservations',self.body)
        self.assertEqual(r.status_code,201)
        saved=r.json['reservation']
        self.assertEqual(saved['total'],401)
        public=self.client.get('/api/availability').json
        self.assertEqual(len(public['ranges']),1)
        self.assertNotIn('guest@example.com',json.dumps(public))
        self.assertEqual(set(public['ranges'][0]), {'checkin','checkout'})
        self.login()
        rows=self.client.get('/api/reservations').json['reservations']
        self.assertEqual(rows[0]['email'],'guest@example.com')
        self.assertEqual(self.client.delete('/api/reservations/'+saved['id'],json={},headers=HEADERS).status_code,200)
        self.assertEqual(self.client.get('/api/availability').json['ranges'],[])
        self.assertEqual(self.post('/api/reservations',dict(self.body,requestKey=str(uuid.uuid4()))).status_code,201)
        self.post('/api/logout',{})
        self.assertEqual(self.client.get('/api/reservations').status_code,401)

    def test_idempotency_overlap_and_adjacent_checkout(self):
        first=self.post('/api/reservations',self.body)
        again=self.post('/api/reservations',self.body)
        self.assertEqual(first.json['reservation']['id'],again.json['reservation']['id'])
        self.assertEqual(self.post('/api/reservations',dict(self.body,requestKey=str(uuid.uuid4()))).status_code,409)
        adjacent=dict(self.body,checkin=self.body['checkout'],checkout=str(date.today()+timedelta(days=14)),requestKey=str(uuid.uuid4()))
        self.assertEqual(self.post('/api/reservations',adjacent).status_code,201)

    def test_simultaneous_bookings(self):
        def submit(_):
            with server.app.test_client() as client:
                return self.post('/api/reservations',dict(self.body,requestKey=str(uuid.uuid4())),client).status_code
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            statuses=list(pool.map(submit,range(4)))
        self.assertEqual(sorted(statuses),[201,409,409,409])

    def test_production_not_ready(self):
        with patch.object(server,'PRODUCTION',True), patch.object(server,'booking_ready',return_value=False):
            self.assertFalse(self.client.get('/api/availability').json['bookingReady'])
            self.assertEqual(self.post('/api/reservations',self.body).status_code,503)

    def test_mail_failure_retry_and_cancel(self):
        config=dict(SMTP_HOST='smtp.example.com',SMTP_USER='user',SMTP_PASSWORD='secret',MAIL_FROM='host@example.com',
                    CHECKIN_TIME='15:00',CHECKOUT_TIME='11:00',PROPERTY_ADDRESS='Test address')
        with patch.dict(os.environ,config):
            r=self.post('/api/reservations',self.body).json['reservation']
            with patch('server.smtplib.SMTP',side_effect=OSError('offline')):
                server.deliver_pending()
            with server.connect() as db:
                row=db.execute('SELECT * FROM reservations').fetchone()
                self.assertEqual(row['email_status'],'failed')
                self.assertEqual(row['attempts'],1)
                db.execute('UPDATE reservations SET next_attempt=0')
            smtp=MagicMock()
            smtp.__enter__.return_value.send_message.return_value = {}
            with patch('server.smtplib.SMTP',return_value=smtp):
                server.deliver_pending()
            message=smtp.__enter__.return_value.send_message.call_args.args[0]
            self.assertEqual(message['To'],'guest@example.com')
            self.assertIn('15:00',message.get_content())
            self.assertIn(self.body['checkin'],message.get_content())
            self.login()
            self.assertEqual(self.client.get('/api/reservations').json['reservations'][0]['emailStatus'],'sent')
            self.post('/api/reservations/'+r['id']+'/email',{})
            self.client.delete('/api/reservations/'+r['id'],json={},headers=HEADERS)
            with patch('server.smtplib.SMTP') as sender:
                server.deliver_pending()
                sender.assert_not_called()

    def mock_resend(self, status=200, body=None):
        opener = MagicMock()
        response = opener.open.return_value.__enter__.return_value
        response.getcode.return_value = status
        response.read.return_value = json.dumps(body if body is not None else {'id': str(uuid.uuid4())}).encode()
        return opener

    def email_row(self):
        with server.connect() as db:
            return dict(db.execute('SELECT * FROM reservations').fetchone())

    def allow_email_retry(self):
        with server.connect() as db:
            db.execute('UPDATE reservations SET next_attempt=0')

    def test_resend_https_automatic_existing_smtp_settings(self):
        settings = dict(RESEND_SETTINGS, SMTP_HOST=' SMTP.RESEND.COM ')
        settings.pop('SMTP_USER')  # HTTPS does not require SMTP login settings.
        with patch.dict(os.environ, settings), patch('server.urlrequest.build_opener', return_value=self.mock_resend()) as build, patch('server.smtplib.SMTP_SSL') as smtp:
            self.assertTrue(server.booking_ready())
            reservation = self.post('/api/reservations', self.body).json['reservation']
            server.deliver_pending()
            smtp.assert_not_called()
            opener = build.return_value
            req = opener.open.call_args.args[0]
            self.assertEqual(req.full_url, 'https://api.resend.com/emails')
            self.assertEqual(req.get_method(), 'POST')
            self.assertEqual(req.get_header('Authorization'), 'Bearer re_test_secret')
            self.assertEqual(req.get_header('Content-type'), 'application/json')
            self.assertEqual(req.get_header('User-agent'), 'MoonHouseBooking/1.0')
            self.assertEqual(req.get_header('Idempotency-key'), 'booking-confirmation/' + reservation['id'] + '/0')
            self.assertEqual(opener.open.call_args.kwargs['timeout'], 30)
            body = json.loads(req.data)
            self.assertEqual(set(body), {'from', 'to', 'subject', 'text'})
            self.assertEqual(body['from'], 'onboarding@resend.dev')
            self.assertEqual(body['to'], ['guest@example.com'])
            self.assertIn(reservation['id'], body['subject'])
            self.assertIn('15:00', body['text'])
            self.assertIn('Test address', body['text'])
            row = self.email_row()
            self.assertEqual(row['email_status'], 'sent')
            self.assertIsNone(row['email_error'])
            self.assertIsNone(row['email_error_status'])
            self.login()
            admin = self.client.get('/api/reservations').json
            self.assertEqual(admin['mail'], dict(transport='resend', workerEnabled=False, configured=True, missingSettings=[]))
            self.assertEqual(admin['reservations'][0]['emailError'], '')
            self.assertIsNone(admin['reservations'][0]['emailErrorStatus'])

    def test_resend_errors_expose_safe_categories_only(self):
        cases = [(403, 'validation_error', 'You can only send testing emails to your own email address guest@example.com. re_test_secret', 'test_recipient_only'),
                 (403, 'validation_error', 'The example.com domain is not verified.', 'domain_unverified'),
                 (401, 'validation_error', 'API key re_test_secret is invalid.', 'authentication_failed'),
                 (429, 'rate_limit_exceeded', 'Too many requests', 'rate_limited')]
        with patch.dict(os.environ, RESEND_SETTINGS):
            self.post('/api/reservations', self.body)
            self.login()
            for status, name, detail, category in cases:
                with self.subTest(category=category):
                    self.allow_email_retry()
                    opener = MagicMock()
                    opener.open.side_effect = HTTPError('https://api.resend.com/emails', status, 'provider detail', {},
                                                       io.BytesIO(json.dumps(dict(name=name, message=detail)).encode()))
                    with patch('server.urlrequest.build_opener', return_value=opener), self.assertLogs(server.app.logger, level='WARNING') as logs:
                        server.deliver_pending()
                    row = self.email_row()
                    self.assertEqual(row['email_status'], 'failed')
                    self.assertEqual(row['email_error'], category)
                    self.assertEqual(row['email_error_status'], status)
                    result = self.client.get('/api/reservations').json
                    self.assertEqual(result['reservations'][0]['emailError'], category)
                    self.assertEqual(result['reservations'][0]['emailErrorStatus'], status)
                    self.assertNotIn(detail, json.dumps(result))
                    self.assertNotIn('re_test_secret', json.dumps(result) + str(logs.output) + json.dumps(row))
                    self.assertNotIn('guest@example.com', str(logs.output))
                    public = self.client.get('/api/availability').json
                    self.assertNotIn(category, json.dumps(public))
                    self.assertNotIn('guest@example.com', json.dumps(public))

    def test_resend_timeout_retry_idempotency_and_manual_resend(self):
        with patch.dict(os.environ, RESEND_SETTINGS):
            reservation = self.post('/api/reservations', self.body).json['reservation']
            opener = self.mock_resend()
            with patch('server.urlrequest.build_opener', return_value=opener):
                opener.open.side_effect = URLError(TimeoutError('private guest@example.com re_test_secret'))
                server.deliver_pending()
                first_key = opener.open.call_args.args[0].get_header('Idempotency-key')
                self.assertEqual(self.email_row()['email_error'], 'network_error')
                self.assertGreater(self.email_row()['next_attempt'], server.time.time())
                self.allow_email_retry()
                opener.open.side_effect = None
                server.deliver_pending()
                self.assertEqual(opener.open.call_args.args[0].get_header('Idempotency-key'), first_key)
                self.assertEqual(self.email_row()['email_status'], 'sent')
                self.assertIsNone(self.email_row()['email_error'])
                self.login()
                self.assertEqual(self.post('/api/reservations/' + reservation['id'] + '/email', {}).status_code, 200)
                self.assertEqual(self.email_row()['email_generation'], 1)
                self.assertIsNone(self.email_row()['email_error'])
                self.assertIsNone(self.email_row()['email_error_status'])
                server.deliver_pending()
                self.assertNotEqual(opener.open.call_args.args[0].get_header('Idempotency-key'), first_key)
                self.assertEqual(opener.open.call_args.args[0].get_header('Idempotency-key'), 'booking-confirmation/' + reservation['id'] + '/1')

    def test_resend_requires_valid_acceptance_id(self):
        with patch.dict(os.environ, RESEND_SETTINGS):
            self.post('/api/reservations', self.body)
            for body in ({}, {'id': ''}, {'id': 'not a valid email id'}, {'error': 'not accepted'}):
                with self.subTest(body=body), patch('server.urlrequest.build_opener', return_value=self.mock_resend(body=body)):
                    self.allow_email_retry()
                    server.deliver_pending()
                    row = self.email_row()
                    self.assertEqual(row['email_status'], 'failed')
                    self.assertEqual(row['email_error'], 'provider_rejected')

    def test_manual_email_retry_is_explicit_and_resets_failure(self):
        reservation = self.post('/api/reservations', self.body).json['reservation']
        path = '/api/reservations/' + reservation['id'] + '/email'
        self.assertEqual(self.post(path, {}).status_code, 401)
        self.login()
        self.assertEqual(self.post('/api/reservations/missing/email', {}).status_code, 404)
        with server.connect() as db:
            db.execute("UPDATE reservations SET email_status='sending',email_error='network_error',email_error_status=503,attempts=4,next_attempt=123")
        self.assertEqual(self.post(path, {}).status_code, 409)
        self.assertEqual(self.email_row()['email_generation'], 0)
        with server.connect() as db:
            db.execute("UPDATE reservations SET email_status='failed'")
        self.assertEqual(self.post(path, {}).status_code, 200)
        row = self.email_row()
        self.assertEqual(row['email_status'], 'pending')
        self.assertEqual(row['email_generation'], 1)
        self.assertEqual(row['attempts'], 0)
        self.assertEqual(row['next_attempt'], 0)
        self.assertIsNone(row['email_error'])
        self.assertIsNone(row['email_error_status'])

    def test_transport_configuration_and_disabled_worker(self):
        with patch.dict(os.environ, RESEND_SETTINGS):
            self.assertEqual(server.mail_transport(), 'resend')
            self.assertTrue(server.booking_ready())
            self.assertFalse(self.client.get('/api/availability').json['emailConfigured'])
            self.assertFalse(self.client.get('/api/availability').json['mailWorkerEnabled'])
            with patch.dict(os.environ, {'DISABLE_MAIL_WORKER': '0'}):
                self.assertTrue(self.client.get('/api/availability').json['emailConfigured'])
            with patch.dict(os.environ, {'SMTP_PASSWORD': ''}):
                self.assertFalse(server.booking_ready())
                self.assertEqual(server.missing_mail_settings(), ['RESEND_API_KEY / SMTP_PASSWORD'])
            with patch.dict(os.environ, {'RESEND_API_KEY': 're_override', 'SMTP_PASSWORD': '', 'SMTP_HOST': ''}):
                self.assertTrue(server.booking_ready())
                self.assertEqual(server.resend_api_key(), 're_override')
                self.assertEqual(server.mail_transport(), 'resend')
            with patch.dict(os.environ, {'MAIL_TRANSPORT': 'smtp'}):
                self.assertEqual(server.mail_transport(), 'smtp')
            with patch.dict(os.environ, {'MAIL_TRANSPORT': 'invalid'}):
                self.assertFalse(server.booking_ready())
                self.assertIn('MAIL_TRANSPORT', server.missing_mail_settings())
        with patch.dict(os.environ, {'MAIL_TRANSPORT': 'resend', 'SMTP_PASSWORD': 're_secret', 'MAIL_FROM': 'host@example.com',
                                     'PROPERTY_ADDRESS': 'Test', 'CHECKIN_TIME': '25:00', 'CHECKOUT_TIME': ''}):
            self.assertEqual(server.missing_mail_settings(), ['CHECKIN_TIME', 'CHECKOUT_TIME'])

    def test_existing_database_migration_preserves_reservations(self):
        with tempfile.TemporaryDirectory() as directory:
            old_path = Path(directory) / 'old.sqlite3'
            with closing(sqlite3.connect(old_path)) as db, db:
                db.execute('''CREATE TABLE reservations (id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL,
                  payload TEXT NOT NULL, cancelled INTEGER NOT NULL DEFAULT 0, email_status TEXT NOT NULL DEFAULT 'pending',
                  attempts INTEGER NOT NULL DEFAULT 0, next_attempt REAL NOT NULL DEFAULT 0, created REAL NOT NULL)''')
                db.execute('INSERT INTO reservations(id, request_key, payload, created) VALUES (?,?,?,?)',
                           ('old-reservation', str(uuid.uuid4()), json.dumps(self.body), 123.0))
            with patch.object(server, 'DB', old_path):
                server.initialize()
                server.initialize()  # Migration remains safe on subsequent deployments.
                with server.connect() as db:
                    row = dict(db.execute('SELECT * FROM reservations').fetchone())
                    self.assertEqual(row['id'], 'old-reservation')
                    self.assertEqual(json.loads(row['payload']), self.body)
                    self.assertEqual(row['email_generation'], 0)
                    self.assertIsNone(row['email_error'])
                    self.assertIsNone(row['email_error_status'])

    def test_property_persistence_and_server_price(self):
        p=dict(price=200,titles={'en':'House'},descriptions={'en':'Description'},localizedContent={},photos=['https://example.com/photo.jpg']*10)
        self.assertEqual(self.client.put('/api/property',json=p,headers=HEADERS).status_code,401)
        self.login()
        self.assertEqual(self.client.put('/api/property',json=p,headers=HEADERS).status_code,200)
        self.assertEqual(server.app.test_client().get('/api/property').json['property']['price'],200)
        result=self.post('/api/reservations',dict(self.body,total=1)).json['reservation']
        self.assertEqual(result['total'],477)


if __name__=='__main__':
    unittest.main()
