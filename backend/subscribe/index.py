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
    <body style="margin: 0; padding: 0; background-color: #0f1f3d; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f1f3d; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
                        <tr>
                            <td style="background-color: #1a3464; border-radius: 12px 12px 0 0; padding: 32px 40px; text-align: center;">
                                <p style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff; letter-spacing: 2px;">3K</p>
                                <p style="margin: 4px 0 0; font-size: 13px; color: #93b4d8; letter-spacing: 1px;">PYTHON-START.RU</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #162b52; padding: 40px; border-radius: 0 0 12px 12px;">
                                <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 16px;">Привет! Ты в деле 🚀</h2>
                                <p style="color: #93b4d8; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Спасибо за подписку! Рады видеть тебя в нашем сообществе.</p>
                                <p style="color: #93b4d8; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">Твой гайд <strong style="color: #ffffff;">«Первые 7 дней с Python»</strong> уже ждёт тебя:</p>
                                <p style="text-align: center; margin: 0 0 32px;">
                                    <a href="https://python-start.ru" style="background: #ef4444; color: #ffffff; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">Получить гайд →</a>
                                </p>
                                <p style="color: #4a6fa5; font-size: 13px; margin: 0; text-align: center;">Если письмо попало в спам — добавь нас в контакты.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
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