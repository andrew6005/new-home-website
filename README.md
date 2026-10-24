# Moon House 預訂網站

已提供前端 + Python/Flask API + SQLite 資料庫 + Resend HTTPS／SMTP 確認電郵佇列。

## 自己內部測試：Mac 啟動方法

1. 喺 Finder 開啟呢個 folder，雙擊 **`Start Website.command`**。
2. 首次啟動會建立 `.venv` 及安裝套件，需要 Python 3 及互聯網；之後會重用已安裝環境。
3. 保持打開 Terminal 視窗，用瀏覽器開啟 [http://localhost:8001/](http://localhost:8001/)。
4. 停止網站：喺該 Terminal 視窗按 **Control+C**。下次雙擊同一個檔案即可再啟動。

如 Mac 阻止第一次開啟，可用 Terminal 進入呢個 folder，執行 `bash "Start Website.command"`。
內部測試使用 8001，與原本 8000 的網站分開。如顯示 8001 正在使用，先喺之前啟動內部測試嘅 Terminal 按 Control+C，再重新啟動。
不要直接雙擊 `index.html`，亦不要用 `python3 -m http.server`：預訂及 Admin 都需要 `server.py` 提供後端。

呢個啟動檔只接受同一部 Mac 存取，**唔會公開上網，亦唔會寄出真正電郵**。
如有 `.env`，會先讀取設定，再強制使用內部測試模式、關閉寄件程序，並將資料另存於 `data/local-test/bookings.sqlite3`。
原本 `data/bookings.sqlite3` 及相片／文字設定不會被搬移或刪除；測試模式首次開啟會由獨立、空白資料開始，所以原本已儲存的預訂、相片及文字修改不會在這個測試環境顯示。
如要暫時測試輸入 email，可使用 `test@example.com`；真正收信測試則要用自己控制的收件地址，見下面設定。

本機預設 Admin：**`andrewteddyjp@gmail.com` / `Haven2026`**。如果 `.env` 已設定 `ADMIN_EMAIL` 或 `ADMIN_PASSWORD`，請用該設定登入。
預設密碼只供本機測試，正式上線必須設定新的密碼。

## 建議自己逐項測試

1. 揀一組未來入住／退房日期及人數；先唔填 email，確認應被阻止。填寫姓名及有效 email 後確認，應顯示訂單號，過程不會去 PayPal 或收款。
2. 另開一個無痕視窗或另一個瀏覽器，進入同一個 `http://localhost:8001/`；重新整理後，剛才已訂的住宿日期應不能再訂。退房當日可畀下一位客人入住。
3. 用 Admin 登入，進入預訂管理，檢查訂單日期、人數、姓名、email 及電話是否正確；不填電話也應可預訂。
4. 先重新整理，再停止及重新啟動網站；原本訂單仍應保留。
5. 在 Admin 刪除自己的測試預訂，確認後再去客人頁重新整理；該組日期應重新開放，並可再預訂。
6. 測試完成後，在 Admin 刪除餘下測試預訂。內部測試啟動檔的 email 狀態可能一直顯示 `pending`；確認頁的「排隊寄出」亦不代表已寄信，因為寄件程序已關閉。

呢個測試使用真正後端及 SQLite 儲存，可檢查不同瀏覽器共用預訂、阻止重複預訂及 Admin 刪除功能。
其他電腦／手機無法用 `localhost` 連入呢部 Mac；要測跨裝置及正式收信，需另外部署測試環境或完成下面的寄件設定。

## 手動啟動（同樣不寄信的內部測試）

在 Terminal 進入呢個 folder 後執行：

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
APP_ENV=development DISABLE_MAIL_WORKER=1 DATA_DIR=./data/local-test PORT=8001 .venv/bin/python server.py
```

開啟 [http://localhost:8001/](http://localhost:8001/)。已安裝 `.venv` 及套件後，只需執行最後一行。

客人揀入住、退房日期及 1–6 位人數，填姓名和必填 email（電話選填），確認後立即保留日期。
不連接 PayPal，也不收款。退房當日可由另一位客人入住。只接受今天起、兩年內、1–90 晚的預訂。
Admin 可查看姓名、email、電話、日期、人數、金額及寄件狀態，刪除預訂釋放日期，也可重寄確認信。
Admin 改圖及文字亦儲存於後端，其他裝置可以看到；正在開啟的頁面重新整理後讀取新內容。
公共 API 只提供日期，不會公開客人聯絡資料。Admin 登入改用後端驗證及 HttpOnly cookie。

## 設定真正的確認電郵

複製 `.env.example` 為 `.env`，填入真實值後載入：

```sh
set -a
source .env
set +a
unset DISABLE_MAIL_WORKER
PORT=8000 .venv/bin/python server.py
```

手動寄件模式開啟 [http://localhost:8000/](http://localhost:8000/)；如 8000 已在運行，先停止該程序再重新啟動。

要測真正寄信，請用以上手動方式啟動，**不要用 `Start Website.command`**，因為該檔案一律關閉寄件。
請用自己的收件 email 建立一張新測試訂單，再於 Admin 查看狀態並檢查收件匣／垃圾郵件。
以上手動寄件模式預設使用原本 `data/` 資料；啟用後可能會寄出當中尚未處理的電郵。
請勿把 `DATA_DIR` 改成 `data/local-test` 來啟用真實寄件，避免內部測試訂單被寄出。

必需資料：住宿地址 `PROPERTY_ADDRESS`、入住 `CHECKIN_TIME`、退房 `CHECKOUT_TIME`（24 小時 HH:MM）、寄件 email `MAIL_FROM`，以及寄件服務憑證。

Resend 建議設 `MAIL_TRANSPORT=resend`，以 HTTPS 寄信。原本 `SMTP_PASSWORD` 裏的 Resend API key 可以直接沿用；亦可選擇另外設定 `RESEND_API_KEY`（優先使用）。
預設 `MAIL_TRANSPORT=auto`：當 `SMTP_HOST=smtp.resend.com` 或 `RESEND_API_KEY` 有值，就用 Resend HTTPS；其他 SMTP 主機沿用 SMTP。
Resend HTTPS 不依賴 SMTP 的 465／587 連接埠。一般 SMTP 服務仍要設定主機、使用者及密碼。
如出現寄件問題，按 [寄件修正部署指引](DEPLOY-EMAIL-FIX.md) 操作。
時區預設 `Europe/London`，跟隨 Belfast 夏令／冬令時間。地址及時間未獲確認，所以沒有代填。
使用一般 SMTP 服務時，以 587 STARTTLS 或 465 TLS 連線，並使用該服務提供的 SMTP 密碼／應用程式密碼。Resend HTTPS 則使用 Resend API key。

每封確認電郵包含訂單號、姓名、地址、入住／退房日期與時間、人數、金額及按時到達提醒；目前採繁體中文及英文雙語。
回覆會寄到 `MAIL_FROM`，請使用有人收信的地址。
預訂成功不等於電郵已送達。佇列每 10 秒處理，失敗會重試，最多六次，Admin 可按「重試寄信」再試。
`pending` = 等候寄送；`sending` = 寄送中；`sent` = 寄件服務已接受（未驗證送達收件匣）；`failed` = 寄送失敗。
寄件服務接受不保證到達收件匣，需在正式上線前用真實收件地址測試並檢查垃圾郵件。
管理員刪除預訂不會自動寄取消通知；已寄出的確認信不能撤回。

## 上線（前後端一起部署）

這個版本可放到支援 Docker 與持久磁碟的服務，例如 Render Web Service；不必把前端和後端拆成兩個平台。
Dockerfile 已提供。使用單一服務、單一 worker；請勿以 serverless 或多個獨立 SQLite 副本部署。

1. 將程式放到自己的 Git repository（`.env`、`data/`、`.venv/` 已忽略）。
2. 建立 Docker Web Service，掛載**持久磁碟**於 `/var/data`，設 `DATA_DIR=/var/data`。
3. 設 `APP_ENV=production`，`ADMIN_EMAIL`，全新至少 12 字元的 `ADMIN_PASSWORD`，及上述電郵和住宿資料。
4. 如平台位於單一可信任代理後，設定 `TRUST_PROXY=1`，讓登入／預訂速率限制按訪客 IP 計算；否則維持 0。
5. 使用 HTTPS 網址，測試客人預訂、實際收信、另一部裝置的 Admin 查看／刪除及日期重新開放。
6. 設定資料庫備份（SQLite online backup API 或停機後複製整個資料目錄），並定期測試復原。

已上線的 Render 亦需將 `ADMIN_EMAIL` 設為 `andrewteddyjp@gmail.com`，儲存並部署；環境變數會覆蓋程式預設值。

正式模式在寄件／住宿資料欠缺時不開放網上預訂。本機開發模式容許測試，畫面會提示尚未設定寄件。
Render 預設磁碟是暫存，必須另設持久磁碟；目前需要付費服務。參考官方文件：
https://render.com/docs/disks
https://render.com/docs/docker

同源部署可避免跨站 cookie/CORS 問題。不要直接把本版本拆到不同域名；若之後有指定前後端平台，需再調整 API 路徑、登入 cookie 及來源設定。

## 現有資料

舊版本 localStorage 預訂和示範訂單不會自動搬到正式資料庫，避免把示範訂單當真。
舊瀏覽器資料仍然保留。如有真實舊預訂或相片修改，正式上線前需另外整理搬移。
資料庫保留被取消預訂的記錄，Admin 清單只顯示有效預訂；需按你的保留政策安排刪除個人資料。

## 驗證

```sh
.venv/bin/python -m unittest discover -s tests -v
node --check script.js
```

目前尚未替你購買 hosting、部署公開網站或設定寄件帳號。自動測試以模擬 Resend HTTPS／SMTP 驗證內容及重試，沒有寄出真實郵件。
