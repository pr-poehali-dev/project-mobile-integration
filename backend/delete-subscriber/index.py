import json
import os

import psycopg2


def handler(event: dict, context) -> dict:
    """Удаляет подписчика по ID. Требует секретный ключ администратора."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    secret = event.get("headers", {}).get("X-Admin-Secret", "")
    admin_secret = os.environ.get("ADMIN_SECRET", "")
    if not admin_secret or secret != admin_secret:
        return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Unauthorized"})}

    body = json.loads(event.get("body") or "{}")
    subscriber_id = body.get("id")

    if not subscriber_id:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "ID не указан"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("DELETE FROM subscribers WHERE id = %s RETURNING id", (subscriber_id,))
    deleted = cur.fetchone()
    conn.commit()
    conn.close()

    if not deleted:
        return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Подписчик не найден"})}

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"status": "deleted", "id": subscriber_id})}
