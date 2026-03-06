import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import psycopg2


GMAIL_USER = "sergeyvaskin3@gmail.com"
ADMIN_EMAIL = "sergeyvaskin3@gmail.com"


def send_welcome_email(to_email: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Гайд «Первые 7 дней с Python» — держи!"
    msg["From"] = GMAIL_USER
    msg["To"] = to_email

    html = """
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Привет! Ты в деле 🚀</h2>
        <p>Спасибо за подписку! Мы рады видеть тебя в нашем сообществе.</p>
        <p>Твой гайд <strong>«Первые 7 дней с Python»</strong> уже ждёт тебя:</p>
        <p style="text-align: center; margin: 24px 0;">
            <a href="https://python-start.ru" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Получить гайд →</a>
        </p>
        <p style="color: #6b7280; font-size: 14px;">Если письмо попало в спам — добавь нас в контакты.</p>
    </body>
    </html>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(GMAIL_USER, os.environ["GMAIL_APP_PASSWORD"].replace(" ", ""))
        server.sendmail(GMAIL_USER, to_email, msg.as_string())


def send_admin_notification(email: str):
    msg = MIMEText(f"Новый подписчик: {email}")
    msg["Subject"] = "Новый подписчик на python-start"
    msg["From"] = GMAIL_USER
    msg["To"] = ADMIN_EMAIL

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(GMAIL_USER, os.environ["GMAIL_APP_PASSWORD"].replace(" ", ""))
        server.sendmail(GMAIL_USER, ADMIN_EMAIL, msg.as_string())


def handler(event: dict, context) -> dict:
    """Сохраняет email подписчика и отправляет приветственное письмо через Gmail."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    email = (body.get("email") or "").strip().lower()

    if not email or "@" not in email:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Некорректный email"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute("SELECT id FROM subscribers WHERE email = %s", (email,))
    if cur.fetchone():
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"status": "already_subscribed"})}

    cur.execute("INSERT INTO subscribers (email) VALUES (%s)", (email,))
    conn.commit()
    conn.close()

    send_welcome_email(email)
    send_admin_notification(email)

    return {"statusCode": 201, "headers": headers, "body": json.dumps({"status": "subscribed"})}