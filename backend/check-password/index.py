import json
import os
import psycopg2



def handler(event: dict, context) -> dict:
    """Проверяет пароль доступа к курсу через БД."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    password = body.get("password", "")

    schema = os.environ["MAIN_DB_SCHEMA"]
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(f"SELECT value FROM {schema}.settings WHERE key = 'course_password'")
    row = cur.fetchone()
    conn.close()

    correct = row[0] if row else "welcome"

    if password == correct:
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}
    return {"statusCode": 401, "headers": headers, "body": json.dumps({"ok": False})}