import json
import os

import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает список подписчиков для админ-панели. Требует секретный ключ."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    secret = event.get("headers", {}).get("X-Admin-Secret", "")
    admin_secret = os.environ.get("ADMIN_SECRET", "")
    if not admin_secret or secret != admin_secret:
        return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Unauthorized"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("SELECT id, email, created_at FROM subscribers ORDER BY created_at DESC")
    rows = cur.fetchall()
    conn.close()

    subscribers = [
        {"id": row[0], "email": row[1], "created_at": row[2].strftime("%d.%m.%Y %H:%M")}
        for row in rows
    ]

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"subscribers": subscribers, "total": len(subscribers)})}