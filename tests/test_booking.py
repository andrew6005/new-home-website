import concurrent.futures
import json
import os
import tempfile
import unittest
import uuid
from datetime import date, timedelta
from unittest.mock import patch, MagicMock

TEMP = tempfile.TemporaryDirectory()
os.environ['DATA_DIR'] = TEMP.name
os.environ['DISABLE_MAIL_WORKER'] = '1'
os.environ['APP_ENV'] = 'development'
os.environ['ADMIN_PASSWORD'] = 'test-admin-password'
import server

HEADERS = {'X-Requested-With': 'booking-site'}


class BookingTests(unittest.TestCase):
    def setUp(self):
        self.client = server.app.test_client()
        with server.connect() as db:
            for table in ('nights', 'reservations', 'sessions', 'limits', 'settings'):
                db.execute('DELETE FROM ' + table)
        self.body = dict(checkin=str(date.today()+timedelta(days=10)), checkout=str(date.today()+timedelta(days=12)),
                         guests=2, guest='Test Guest', email='guest@example.com', phone='', requestKey=str(uuid.uuid4()))

    def post(self, path, body, client=None):
        return (client or self.client).post(path, json=body, headers=HEADERS)

    def login(self):
        self.assertEqual(self.post('/api/login', dict(email='admin@haven.hk', password='test-admin-password')).status_code, 200)

    def test_required_fields_and_auth(self):
        for field, value in [('email',''), ('email','invalid'), ('guests',7), ('guest',''), ('checkout',self.body['checkin']), ('checkin','2000-01-01'), ('phone','123')]:
            with self.subTest(field=field):
                self.assertEqual(self.post('/api/reservations', dict(self.body, **{field:value})).status_code,400)
        self.assertEqual(self.client.get('/api/reservations').status_code,401)
        self.assertEqual(self.client.delete('/api/reservations/anything', json={}, headers=HEADERS).status_code,401)
        self.assertEqual(self.client.post('/api/login',json={}).status_code,403)
        self.assertEqual(self.client.get('/server.py').status_code,404)
        self.assertEqual(self.client.get('/.env').status_code,404)
        self.assertEqual(self.post('/api/login', dict(email='admin@haven.hk', password='wrong')).status_code,401)

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
