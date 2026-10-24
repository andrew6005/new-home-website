# 確認電郵修正：部署到現有 Render 網站

新版直接用 Resend HTTPS API 寄確認信，避開 Render 免費服務對 SMTP 465／587 的限制。
保留現有訂單、Admin 登入及圖片設定；資料庫會自動增加寄件狀態欄位。沒有代你修改線上服務或寄出真實郵件。

## 1. 更新 GitHub 程式

將本 folder 最新的 `server.py`、`script.js`、`style.css`、`index.html` 上傳到 Render 所連接的 GitHub repository／分支，覆蓋同名檔案並儲存 commit。
`requirements.txt` 和 Dockerfile 無需因這個修正另改。不要上傳 `.env`、`data/` 或 `.venv/`。

原有本機 Admin email 更新也包含在 `server.py` 中；Render 如已設 `ADMIN_EMAIL`，會繼續以 Render 的值為準。

## 2. Render Environment

在 **new-home-website → Environment** 新增或修改以下項目。左邊係 KEY，右邊係 VALUE：

| KEY | VALUE |
|---|---|
| `MAIL_TRANSPORT` | `resend` |
| `SMTP_PASSWORD` | 現有、有效的 Resend API key（如之前已填妥，沿用即可） |
| `MAIL_FROM` | 已驗證網域的寄件地址；只寄畀 Resend 帳戶本人測試可用 `onboarding@resend.dev` |
| `DISABLE_MAIL_WORKER` | `0` |
| `PROPERTY_ADDRESS` | 你實際的完整住宿地址 |
| `CHECKIN_TIME` | 實際入住時間，24 小時 HH:MM |
| `CHECKOUT_TIME` | 實際退房時間，24 小時 HH:MM |

若你另有設定 `RESEND_API_KEY`，程式會優先使用它；請確保它是有效的新 key，避免舊值蓋過 `SMTP_PASSWORD`。
現有 `SMTP_HOST`、`SMTP_PORT`、`SMTP_USER` 可以保留；選 `MAIL_TRANSPORT=resend` 後不使用 SMTP 連線。
其餘原有 `APP_ENV`、`ADMIN_EMAIL`、`ADMIN_PASSWORD`、`DATA_DIR` 設定繼續沿用。

## 3. 部署最新程式

儲存 Environment，選 **Save and deploy**。如 GitHub 的新程式未自動部署，在 Render 選 **Manual Deploy → Deploy latest commit**。
等狀態顯示 Live／部署成功，重新整理網站。`index.html` 已更新檔案版本，讓瀏覽器讀入新的寄件診斷介面。

如果出現資料庫或設定問題，不要刪除持久磁碟，也不要上傳本機測試資料庫覆蓋網上訂單。

## 4. 用自己的地址測試

1. 登入網上 Admin，預訂管理上方應顯示寄件方式為 Resend HTTPS API，以及寄件程序是否啟用。
2. 如果 `MAIL_FROM=onboarding@resend.dev`，收件人必須是你註冊 Resend 帳戶的 email。Admin 登入 email 並不決定這個限制。
3. 建立一筆新測試預訂，或在你自己的舊測試訂單按「重試寄信」。
4. 等候約 10–60 秒後重新整理 Admin，查看 Email 狀態。不要重複按重寄，避免建立多次刻意寄送。
5. 查看 Resend → Emails，以及自己的收件匣／垃圾郵件。`sent` 只代表 Resend 已接受，並不等於收件人已收到。

## 5. 如果仍未成功

Admin 的 Email 欄會顯示安全的錯誤分類，例如：

- `test_recipient_only`：測試寄件地址只容許寄給 Resend 帳戶本人；用註冊 email 試收，或完成自有網域驗證。
- `domain_unverified`：寄件網域未完成驗證，或 MAIL_FROM 與已驗證網域不符。
- `authentication_failed`：API key 無效、已撤銷或沒有相應權限。
- `rate_limited`：寄件服務限制請求頻率；稍後重試。
- `network_error`：網站無法連接寄件服務；稍後重試並檢查 Render Logs。
- `sender_rejected`／`recipient_rejected`／`provider_rejected`：寄件服務拒絕，請查看 Resend 紀錄；介面只顯示分類及 HTTP／SMTP 狀態碼，不會顯示 API key 或原始錯誤內容。

如要排查，提供 Admin 顯示的錯誤分類／狀態碼即可；不要提供 API key 或密碼。

## 儲存仍要獨立處理

HTTPS 寄件可以避免 SMTP 連接埠限制，但 Render 免費服務的本機資料仍會在重啟／重新部署後丟失。
現有 SQLite 正式營運仍需要持久磁碟，或日後另外接上持久資料庫。寄信成功不代表資料保存已完成設定。

官方參考：
- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://render.com/docs/free
