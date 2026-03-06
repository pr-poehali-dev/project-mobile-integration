import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


GMAIL_USER = "sergeyvaskin3@gmail.com"
ADMIN_EMAIL = "sergeyvaskin3@gmail.com"


def send_access_email(to_email: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Доступ к курсу PythonСтарт — оплата прошла!"
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
                                <p style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff; letter-spacing: 2px;">PythonСтарт</p>
                                <p style="margin: 4px 0 0; font-size: 13px; color: #93b4d8; letter-spacing: 1px;">PYTHON-START.RU</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #162b52; padding: 40px; border-radius: 0 0 12px 12px;">
                                <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 16px;">Оплата прошла успешно!</h2>
                                <p style="color: #93b4d8; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Поздравляем! Ты открыл доступ к полному курсу PythonСтарт.</p>
                                <p style="color: #93b4d8; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">Теперь все разделы портала доступны для тебя без ограничений. Начни прямо сейчас:</p>
                                <p style="text-align: center; margin: 0 0 32px;">
                                    <a href="https://python-start.ru/osnovy" style="background: #ef4444; color: #ffffff; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">Начать обучение →</a>
                                </p>
                                <p style="color: #4a6fa5; font-size: 13px; margin: 0; text-align: center;">Если есть вопросы — напиши нам на {email}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """.format(email=ADMIN_EMAIL)

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(GMAIL_USER, os.environ["GMAIL_APP_PASSWORD"].replace(" ", ""))
        server.sendmail(GMAIL_USER, to_email, msg.as_string())


def send_admin_notification(email: str, order_id: str, amount: str):
    msg = MIMEText(f"Новая оплата!\n\nПокупатель: {email}\nЗаказ: {order_id}\nСумма: {amount} руб.")
    msg["Subject"] = "Новая оплата курса PythonСтарт"
    msg["From"] = GMAIL_USER
    msg["To"] = ADMIN_EMAIL

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(GMAIL_USER, os.environ["GMAIL_APP_PASSWORD"].replace(" ", ""))
        server.sendmail(GMAIL_USER, ADMIN_EMAIL, msg.as_string())


def handler(event: dict, context) -> dict:
    """Принимает вебхук от lava.top об успешной оплате и отправляет письмо с доступом."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")

    status = body.get("status") or body.get("paymentStatus") or ""
    if status.lower() not in ("success", "paid", "completed"):
        return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"ok": True, "skipped": True})}

    email = body.get("email") or body.get("buyerEmail") or ""
    order_id = body.get("orderId") or body.get("order_id") or ""
    amount = body.get("amount") or "500"

    if email:
        send_access_email(email)
        send_admin_notification(email, order_id, str(amount))

    return {"statusCode": 200, "headers": cors_headers, "body": json.dumps({"ok": True})}
