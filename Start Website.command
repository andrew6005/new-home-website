#!/bin/bash
# Internal testing only: isolated data, no outgoing confirmation emails.
set -euo pipefail

cd "$(dirname "$0")"

show_error() {
  printf '\n%s\n' "$1"
  read -r -p '按 Enter 關閉 / Press Enter to close… ' _ || true
  exit 1
}

command -v python3 >/dev/null 2>&1 || show_error '搵唔到 Python 3。請先安裝 Python 3，再開啟呢個檔案。'
if [ ! -x .venv/bin/python ]; then
  printf '首次啟動：建立 Python 環境…\n'
  python3 -m venv .venv || show_error '未能建立 Python 環境。'
fi
if ! .venv/bin/python -c 'import flask, gunicorn' >/dev/null 2>&1; then
  printf '首次啟動：安裝網站所需套件，需要連接互聯網…\n'
  .venv/bin/python -m pip install -r requirements.txt || show_error '套件安裝失敗。請檢查網絡，再重新開啟。'
fi

# Keep any property details in the optional .env; override testing safeguards below.
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi
export APP_ENV=development
export DISABLE_MAIL_WORKER=1
export DATA_DIR="$PWD/data/local-test"
export PORT=8001
export TRUST_PROXY=0

if ! .venv/bin/python - <<'PY'
import socket
import sys
with socket.socket() as sock:
    try:
        sock.bind(('127.0.0.1', 8001))
    except OSError:
        sys.exit(1)
PY
then
  show_error '8001 連接埠正在使用。請先喺之前啟動內部測試嘅 Terminal 按 Control+C，再重開呢個檔案。'
fi

printf '\n請用瀏覽器開啟：http://localhost:8001/\n'
printf '測試資料會保留喺 data/local-test，唔會寄出電郵。\n'
printf '停止網站：喺呢個 Terminal 視窗按 Control+C。\n'
printf 'Admin：預設 andrewteddyjp@gmail.com / Haven2026（如 .env 有修改，以 .env 為準）。\n\n'

exec .venv/bin/python server.py
