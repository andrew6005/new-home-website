"""Single-property reservations: SQLite persistence, server auth and mail outbox."""
from contextlib import contextmanager
import hashlib
import hmac
import json
import os
import re
import secrets
import smtplib
import sqlite3
import ssl
import threading
import time
import uuid
from datetime import date, datetime, timedelta
from email.message import EmailMessage
from pathlib import Path
from urllib import error as urlerror, request as urlrequest
from zoneinfo import ZoneInfo

from flask import Flask, jsonify, request, send_from_directory
from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.security import check_password_hash, generate_password_hash

ROOT = Path(__file__).parent
DATA = Path(os.environ.get('DATA_DIR', ROOT / 'data'))
DATA.mkdir(parents=True, exist_ok=True)
DB = DATA / 'bookings.sqlite3'
PRODUCTION = os.environ.get('APP_ENV') == 'production'
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'andrewteddyjp@gmail.com').lower()
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', '')
if PRODUCTION and (len(ADMIN_PASSWORD) < 12 or ADMIN_PASSWORD == 'Haven2026'):
    raise RuntimeError('Set a new ADMIN_PASSWORD of at least 12 characters before deployment.')
ADMIN_HASH = generate_password_hash(ADMIN_PASSWORD or 'Haven2026')
app = Flask(__name__, static_folder=None)
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024
if os.environ.get('TRUST_PROXY') == '1':
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)


@contextmanager
def connect():
    db = sqlite3.connect(DB, timeout=20)
    db.row_factory = sqlite3.Row
    db.execute('PRAGMA foreign_keys=ON')
    try:
        with db:
            yield db
    finally:
        db.close()


def initialize():
    with connect() as db:
        db.execute('PRAGMA journal_mode=WAL')
        db.executescript('''
        CREATE TABLE IF NOT EXISTS reservations (
          id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, payload TEXT NOT NULL,
          cancelled INTEGER NOT NULL DEFAULT 0, email_status TEXT NOT NULL DEFAULT 'pending',
          attempts INTEGER NOT NULL DEFAULT 0, next_attempt REAL NOT NULL DEFAULT 0,
          created REAL NOT NULL);
        CREATE TABLE IF NOT EXISTS nights (
          day TEXT PRIMARY KEY, reservation_id TEXT NOT NULL REFERENCES reservations(id));
        CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, payload TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, expires REAL NOT NULL);
        CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, hits INTEGER NOT NULL, expires REAL NOT NULL);
        ''')
        # Existing deployed databases retain their reservations and queued mail.
        # Serialize additive migrations when multiple Gunicorn workers start.
        db.execute('BEGIN IMMEDIATE')
        columns = {row['name'] for row in db.execute('PRAGMA table_info(reservations)')}
        for name, definition in (('email_error', 'TEXT'), ('email_error_status', 'INTEGER'),
                                 ('email_generation', 'INTEGER NOT NULL DEFAULT 0')):
            if name not in columns:
                db.execute(f'ALTER TABLE reservations ADD COLUMN {name} {definition}')


initialize()


def config():
    return dict(name=os.environ.get('PROPERTY_NAME', 'Belfast city centre Moon House'),
                address=os.environ.get('PROPERTY_ADDRESS', ''),
                checkinTime=os.environ.get('CHECKIN_TIME', ''),
                checkoutTime=os.environ.get('CHECKOUT_TIME', ''),
                timezone=os.environ.get('PROPERTY_TIMEZONE', 'Europe/London'))


def mail_transport():
    selected = os.environ.get('MAIL_TRANSPORT', 'auto').strip().lower()
    if selected == 'resend' or (selected == 'auto' and (
            os.environ.get('RESEND_API_KEY', '').strip() or
            os.environ.get('SMTP_HOST', '').strip().lower() == 'smtp.resend.com')):
        return 'resend'
    return 'smtp'


def missing_mail_settings():
    c = config()
    missing = []
    if not c['address'].strip():
        missing.append('PROPERTY_ADDRESS')
    for key, field in (('CHECKIN_TIME', 'checkinTime'), ('CHECKOUT_TIME', 'checkoutTime')):
        if not re.fullmatch(r'(?:[01][0-9]|2[0-3]):[0-5][0-9]', c[field]):
            missing.append(key)
    if os.environ.get('MAIL_TRANSPORT', 'auto').strip().lower() not in ('auto', 'smtp', 'resend'):
        missing.append('MAIL_TRANSPORT')
    required = ['MAIL_FROM']
    if mail_transport() == 'resend':
        if not resend_api_key():
            # Existing SMTP_PASSWORD settings continue to work with Resend HTTPS.
            missing.append('RESEND_API_KEY / SMTP_PASSWORD')
    else:
        required += ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD']
        try:
            if not 1 <= int(os.environ.get('SMTP_PORT', '587')) <= 65535:
                raise ValueError
        except ValueError:
            missing.append('SMTP_PORT')
    missing.extend(key for key in required if not os.environ.get(key, '').strip())
    return missing


def resend_api_key():
    return os.environ.get('RESEND_API_KEY', '').strip() or os.environ.get('SMTP_PASSWORD', '').strip()


def booking_ready():
    return not missing_mail_settings()


def mail_worker_enabled():
    return os.environ.get('DISABLE_MAIL_WORKER') != '1'


def mail_diagnostics():
    return dict(transport=mail_transport(), workerEnabled=mail_worker_enabled(),
                configured=booking_ready(), missingSettings=missing_mail_settings())


def fail(message, status=400):
    return jsonify(error=message), status


def admin():
    token = hashlib.sha256(request.cookies.get('admin_session', '').encode()).hexdigest()
    with connect() as db:
        return db.execute('SELECT 1 FROM sessions WHERE token=? AND expires>?', (token, time.time())).fetchone() is not None


def limited(scope, maximum):
    # Use the direct peer unless the deployment explicitly configures a trusted proxy.
    key = scope + ':' + request.remote_addr
    now = time.time()
    with connect() as db:
        db.execute('DELETE FROM limits WHERE expires < ?', (now,))
        db.execute('INSERT INTO limits VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET hits=hits+1', (key, now + 900))
        return db.execute('SELECT hits FROM limits WHERE key=?', (key,)).fetchone()[0] > maximum


@app.before_request
def protect_mutations():
    if request.path.startswith('/api/') and request.method in ('POST', 'PUT', 'DELETE'):
        # JSON + custom header prevents cross-site form submission; no CORS is enabled.
        if request.headers.get('X-Requested-With') != 'booking-site' or not request.is_json:
            return fail('Invalid request', 403)
        if request.headers.get('Sec-Fetch-Site') == 'cross-site':
            return fail('Invalid origin', 403)
        if not isinstance(request.get_json(silent=True), dict):
            return fail('Expected a JSON object')


@app.after_request
def headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'same-origin'
    if request.path.startswith('/api/'):
        response.headers['Cache-Control'] = 'no-store'
    return response


@app.get('/')
def index():
    return send_from_directory(ROOT, 'index.html')


@app.get('/<filename>')
def asset(filename):
    if filename not in ('script.js', 'style.css'):
        return fail('Not found', 404)
    return send_from_directory(ROOT, filename)


@app.get('/api/availability')
def availability():
    with connect() as db:
        rows = db.execute('SELECT payload FROM reservations WHERE cancelled=0').fetchall()
    return jsonify(ranges=[{k: json.loads(r['payload'])[k] for k in ('checkin', 'checkout')} for r in rows],
                   config=config(), bookingReady=not PRODUCTION or booking_ready(),
                   emailConfigured=booking_ready() and mail_worker_enabled(), mailWorkerEnabled=mail_worker_enabled())


@app.get('/api/property')
def get_property():
    with connect() as db:
        row = db.execute('SELECT payload FROM settings WHERE id=1').fetchone()
    return jsonify(property=json.loads(row[0]) if row else None)


@app.put('/api/property')
def put_property():
    if not admin():
        return fail('Sign in required', 401)
    p = request.get_json()
    if not isinstance(p, dict) or not isinstance(p.get('price'), (int, float)) or not 1 <= p['price'] <= 100000:
        return fail('Invalid property')
    photos = p.get('photos', [])
    if not isinstance(photos, list) or len(photos) != 10 or any(not isinstance(v, str) or not (v.startswith('https://') or re.match(r'^data:image/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$', v)) for v in photos):
        return fail('Invalid photos')
    if any(not isinstance(p.get(k), dict) for k in ('titles', 'descriptions', 'localizedContent')):
        return fail('Invalid content')
    with connect() as db:
        db.execute('INSERT INTO settings VALUES (1,?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload', (json.dumps(p),))
    return jsonify(ok=True)


@app.post('/api/login')
def login():
    if limited('login', 20):
        return fail('Too many attempts. Try again in 15 minutes.', 429)
    body = request.get_json()
    password = str(body.get('password', ''))[:1024]
    correct = check_password_hash(ADMIN_HASH, password)
    if not correct or not hmac.compare_digest(str(body.get('email', '')).lower().encode(), ADMIN_EMAIL.encode()):
        return fail('Incorrect email or password', 401)
    token = secrets.token_urlsafe(32)
    with connect() as db:
        db.execute('DELETE FROM sessions WHERE expires < ?', (time.time(),))
        db.execute('INSERT INTO sessions VALUES (?,?)', (hashlib.sha256(token.encode()).hexdigest(), time.time() + 28800))
    response = jsonify(ok=True)
    response.set_cookie('admin_session', token, httponly=True, secure=PRODUCTION, samesite='Strict', max_age=28800)
    return response


@app.post('/api/logout')
def logout():
    with connect() as db:
        db.execute('DELETE FROM sessions WHERE token=?', (hashlib.sha256(request.cookies.get('admin_session', '').encode()).hexdigest(),))
    response = jsonify(ok=True)
    response.delete_cookie('admin_session')
    return response


@app.get('/api/reservations')
def list_reservations():
    if not admin():
        return fail('Sign in required', 401)
    with connect() as db:
        rows = db.execute('SELECT payload,email_status,email_error,email_error_status FROM reservations WHERE cancelled=0 ORDER BY created DESC').fetchall()
    return jsonify(reservations=[dict(json.loads(row['payload']), emailStatus=row['email_status'],
                                      emailError=row['email_error'] or '', emailErrorStatus=row['email_error_status']) for row in rows],
                   mail=mail_diagnostics())


def validate_booking(body):
    checkin, checkout = date.fromisoformat(body['checkin']), date.fromisoformat(body['checkout'])
    today = datetime.now(ZoneInfo(config()['timezone'])).date()
    if str(checkin) != body['checkin'] or str(checkout) != body['checkout'] or not today <= checkin < checkout or not 1 <= (checkout - checkin).days <= 90 or checkin > today + timedelta(days=730):
        raise ValueError('Invalid dates (1–90 nights, within two years)')
    guests = body['guests']
    if type(guests) is not int or not 1 <= guests <= 6:
        raise ValueError('Choose 1–6 guests')
    email = str(body.get('email', '')).strip()
    if len(email) > 254 or not re.fullmatch(r'[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+', email) or not email.isascii():
        raise ValueError('Valid email required')
    guest = str(body.get('guest', '')).strip()
    phone = str(body.get('phone', '')).strip()
    if not 1 <= len(guest) <= 100 or any(ord(c) < 32 for c in guest):
        raise ValueError('Guest name required')
    if phone and (not re.fullmatch(r'\+?[\d\s().-]+', phone) or not 7 <= len(re.sub(r'\D', '', phone)) <= 15):
        raise ValueError('Invalid phone number')
    request_key = str(uuid.UUID(body['requestKey']))
    return checkin, checkout, guests, email, guest, phone, request_key


@app.post('/api/reservations')
def book():
    if PRODUCTION and not booking_ready():
        return fail('Online booking is not configured yet.', 503)
    if limited('book', 30):
        return fail('Too many attempts. Try again later.', 429)
    try:
        checkin, checkout, guests, email, guest, phone, request_key = validate_booking(request.get_json())
    except (ValueError, KeyError, TypeError):
        return fail('Please check the dates, name, email and guest count.')
    with connect() as db:
        db.execute('BEGIN IMMEDIATE')
        previous = db.execute('SELECT payload,cancelled,email_status FROM reservations WHERE request_key=?', (request_key,)).fetchone()
        if previous:
            payload = json.loads(previous['payload'])
            if previous['cancelled'] or any(payload[k] != v for k, v in [('email', email), ('checkin', str(checkin)), ('checkout', str(checkout)), ('guests', guests), ('guest', guest), ('phone', phone)]):
                return fail('Request already used', 409)
            return jsonify(reservation=payload, emailStatus=previous['email_status'])
        row = db.execute('SELECT payload FROM settings WHERE id=1').fetchone()
        price = json.loads(row[0])['price'] if row else 165
        payload = dict(id='CC-' + uuid.uuid4().hex[:12].upper(), checkin=str(checkin), checkout=str(checkout), guests=guests,
                       email=email, guest=guest, phone=phone, contact=email + (' / ' + phone if phone else ''),
                       total=round(price * (checkout-checkin).days * 1.08 + 45), status='confirmed', arrival=config())
        try:
            db.execute('INSERT INTO reservations(id,request_key,payload,created) VALUES (?,?,?,?)', (payload['id'], request_key, json.dumps(payload), time.time()))
            for n in range((checkout-checkin).days):
                db.execute('INSERT INTO nights VALUES (?,?)', (str(checkin + timedelta(days=n)), payload['id']))
        except sqlite3.IntegrityError:
            db.rollback()
            return fail('These dates are already booked. Please choose again.', 409)
    return jsonify(reservation=payload, emailStatus='pending'), 201


@app.delete('/api/reservations/<reservation_id>')
def delete(reservation_id):
    if not admin():
        return fail('Sign in required', 401)
    with connect() as db:
        db.execute('UPDATE reservations SET cancelled=1 WHERE id=?', (reservation_id,))
        db.execute('DELETE FROM nights WHERE reservation_id=?', (reservation_id,))
    return jsonify(ok=True)


@app.post('/api/reservations/<reservation_id>/email')
def retry_email(reservation_id):
    if not admin():
        return fail('Sign in required', 401)
    with connect() as db:
        db.execute('BEGIN IMMEDIATE')
        row = db.execute('SELECT email_status FROM reservations WHERE id=? AND cancelled=0', (reservation_id,)).fetchone()
        if row is None:
            return fail('Reservation not found', 404)
        if row['email_status'] == 'sending':
            return fail('Email is being sent. Please wait before retrying.', 409)
        db.execute("UPDATE reservations SET email_status='pending', attempts=0,next_attempt=0,email_error=NULL,email_error_status=NULL,email_generation=email_generation+1 WHERE id=? AND cancelled=0 AND email_status!='sending'", (reservation_id,))
    return jsonify(ok=True)


def mail_message(payload):
    c = payload['arrival']
    m = EmailMessage()
    m['From'] = os.environ['MAIL_FROM']
    m['To'] = payload['email']
    m['Subject'] = f"預訂確認 / Booking confirmation — {payload['id']}"
    m['Message-ID'] = f"<{payload['id']}@{os.environ['MAIL_FROM'].split('@')[-1].rstrip('>')}>"
    m.set_content(f"""你好 {payload['guest']} / Hello {payload['guest']},

你的預訂已確認 / Your reservation is confirmed.
訂單號 / Reference: {payload['id']}
住宿 / Property: {c['name']}
地址 / Address: {c['address'] or '待確認 / To be confirmed'}
入住 / Check-in: {payload['checkin']} {c['checkinTime'] or '時間待確認 / Time to be confirmed'}
退房 / Check-out: {payload['checkout']} {c['checkoutTime'] or '時間待確認 / Time to be confirmed'}
當地時區 / Local time zone: {c['timezone']}
人數 / Guests: {payload['guests']}
總額 / Total: GBP {payload['total']} (未收款 / No payment collected)

請於預訂入住日期及指定時間到達。如需更改或未能如期到達，請回覆此電郵聯絡住宿管理員。
Please arrive on your booked check-in date at the stated time. If your plans change or you cannot arrive as booked, reply to this email to contact the property administrator.
""")
    return m


class MailDeliveryError(Exception):
    """Only safe categories/statuses may leave the mail transport."""
    def __init__(self, category, status=None):
        super().__init__(category)
        self.category = category
        self.status = status


def provider_error_category(status, body):
    # Provider detail is examined only in memory; never persist or log it because
    # it can contain the sender, recipient or credential fragments.
    try:
        parsed = json.loads(body)
        detail = ' '.join(str(parsed.get(field, '')) for field in ('name', 'message')).lower() if isinstance(parsed, dict) else ''
    except (ValueError, TypeError, UnicodeError):
        detail = ''
    if status == 401:
        return 'authentication_failed'
    if status == 429:
        return 'rate_limited'
    if status == 403 and any(term in detail for term in ('testing emails', 'own email address', 'test recipient')):
        return 'test_recipient_only'
    if 'domain' in detail and any(term in detail for term in ('not verified', 'unverified', 'verify')):
        return 'domain_unverified'
    if any(term in detail for term in ('invalid api', 'invalid_api', 'api key', 'api_key', 'unauthorized')):
        return 'authentication_failed'
    if any(term in detail for term in ('sender', '`from`', '"from"', 'from address')):
        return 'sender_rejected'
    if any(term in detail for term in ('recipient', '`to`', '"to"', 'to address')):
        return 'recipient_rejected'
    return 'provider_rejected'


class NoMailRedirects(urlrequest.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # Never forward an API credential away from the fixed provider endpoint.
        return None


def send_resend(message, idempotency_key):
    body = {'from': str(message['From']), 'to': [str(message['To'])],
            'subject': str(message['Subject']), 'text': message.get_content()}
    req = urlrequest.Request('https://api.resend.com/emails',
                             data=json.dumps(body, ensure_ascii=False).encode('utf-8'),
                             headers={'Authorization': 'Bearer ' + resend_api_key(),
                                      'Content-Type': 'application/json', 'Accept': 'application/json',
                                      'User-Agent': 'MoonHouseBooking/1.0',
                                      'Idempotency-Key': idempotency_key}, method='POST')
    opener = urlrequest.build_opener(NoMailRedirects(), urlrequest.HTTPSHandler(context=ssl.create_default_context()))
    try:
        with opener.open(req, timeout=30) as response:
            status = response.getcode()
            result = response.read(16384)
            if not 200 <= status < 300:
                raise MailDeliveryError(provider_error_category(status, result), status)
            try:
                accepted = json.loads(result)
            except (ValueError, UnicodeError):
                accepted = None
            # A successful HTTP response without an accepted email ID is not a
            # successful send; leave it queued for retry with the same key.
            if not isinstance(accepted, dict) or not isinstance(accepted.get('id'), str) or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_-]{0,127}', accepted['id']):
                raise MailDeliveryError('provider_rejected', status)
    except urlerror.HTTPError as exc:
        try:
            detail = exc.read(16384)
        finally:
            exc.close()
        raise MailDeliveryError(provider_error_category(exc.code, detail), exc.code) from None


def send_smtp(message):
    host, port = os.environ['SMTP_HOST'].strip(), int(os.environ.get('SMTP_PORT', '587'))
    transport = smtplib.SMTP_SSL if port == 465 else smtplib.SMTP
    with transport(host, port, timeout=30, **({'context': ssl.create_default_context()} if port == 465 else {})) as smtp:
        if port != 465:
            smtp.starttls(context=ssl.create_default_context())
        smtp.login(os.environ['SMTP_USER'], os.environ['SMTP_PASSWORD'])
        refused = smtp.send_message(message)
        if refused:
            raise smtplib.SMTPRecipientsRefused(refused)


def safe_mail_error(exc):
    if isinstance(exc, MailDeliveryError):
        return exc.category, exc.status
    if isinstance(exc, smtplib.SMTPAuthenticationError):
        return 'authentication_failed', exc.smtp_code
    if isinstance(exc, smtplib.SMTPSenderRefused):
        return 'sender_rejected', exc.smtp_code
    if isinstance(exc, smtplib.SMTPRecipientsRefused):
        return 'recipient_rejected', None
    if isinstance(exc, smtplib.SMTPResponseException):
        return 'provider_rejected', exc.smtp_code
    cause = exc.reason if isinstance(exc, urlerror.URLError) else exc
    if isinstance(cause, ssl.SSLError):
        return 'tls_error', None
    if isinstance(exc, (OSError, urlerror.URLError, smtplib.SMTPServerDisconnected)):
        return 'network_error', None
    return 'unexpected_error', None


def deliver_pending():
    if not booking_ready():
        return
    with connect() as db:
        db.execute('BEGIN IMMEDIATE')
        row = db.execute("SELECT * FROM reservations WHERE cancelled=0 AND email_status IN ('pending','failed') AND next_attempt<=? AND attempts<6 ORDER BY created LIMIT 1", (time.time(),)).fetchone()
        if not row:
            return
        db.execute("UPDATE reservations SET email_status='sending',next_attempt=? WHERE id=?", (time.time()+300, row['id']))
    try:
        message = mail_message(json.loads(row['payload']))
        if mail_transport() == 'resend':
            send_resend(message, f"booking-confirmation/{row['id']}/{row['email_generation']}")
        else:
            send_smtp(message)
        status, retry, error, error_status = 'sent', 0, None, None
    except Exception as exc:
        error, error_status = safe_mail_error(exc)
        # Category and status are safe; exception text may contain private data.
        app.logger.warning('Confirmation email failed (%s); queued for retry.', error)
        status, retry = 'failed', time.time() + min(3600, 60 * 2 ** row['attempts'])
    with connect() as db:
        db.execute('UPDATE reservations SET email_status=?,attempts=attempts+1,next_attempt=?,email_error=?,email_error_status=? WHERE id=? AND email_generation=?',
                   (status, retry, error, error_status, row['id'], row['email_generation']))


def mail_worker():
    while True:
        try:
            with connect() as db:
                db.execute("UPDATE reservations SET email_status='failed' WHERE email_status='sending' AND next_attempt<?", (time.time(),))
            deliver_pending()
        except Exception:
            app.logger.warning('Email worker will retry.')
        time.sleep(10)


if mail_worker_enabled():
    threading.Thread(target=mail_worker, daemon=True).start()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=int(os.environ.get('PORT', '8000')))
