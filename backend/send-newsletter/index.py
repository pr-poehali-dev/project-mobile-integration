import json
import os
import smtplib
import psycopg2
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
}


def handler(event: dict, context) -> dict:
    """Отправляет письмо всем подписчикам из базы данных."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": HEADERS, "body": ""}

    secret = event.get("headers", {}).get("X-Admin-Secret", "")
    if secret != os.environ.get("ADMIN_SECRET", ""):
        return {"statusCode": 401, "headers": HEADERS, "body": json.dumps({"error": "Unauthorized"})}

    body = json.loads(event.get("body") or "{}")
    subject = body.get("subject", "").strip()
    text = body.get("text", "").strip()

    if not subject or not text:
        return {"statusCode": 400, "headers": HEADERS, "body": json.dumps({"error": "Укажи тему и текст письма"})}

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(f"SELECT email FROM {schema}.subscribers")
    emails = [row[0] for row in cur.fetchall()]
    conn.close()

    if not emails:
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True, "sent": 0})}

    gmail = os.environ["GMAIL_USER"]
    gmail_password = os.environ["GMAIL_APP_PASSWORD"]

    sent = 0
    failed = 0

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(gmail, gmail_password)
        for email in emails:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"PythonСтарт <{gmail}>"
            msg["To"] = email
            msg.attach(MIMEText(text, "plain", "utf-8"))
            try:
                server.sendmail(gmail, email, msg.as_string())
                sent += 1
            except Exception:
                failed += 1

    return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True, "sent": sent, "failed": failed})}
