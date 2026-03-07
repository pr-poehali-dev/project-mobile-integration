import json
import os
import psycopg2



HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
}


def check_auth(event):
    secret = event.get("headers", {}).get("X-Admin-Secret", "")
    return secret == os.environ.get("ADMIN_SECRET", "")


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Админ-панель: покупатели, статистика, смена пароля курса."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": HEADERS, "body": ""}

    if not check_auth(event):
        return {"statusCode": 401, "headers": HEADERS, "body": json.dumps({"error": "Unauthorized"})}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    schema = os.environ["MAIN_DB_SCHEMA"]

    # GET / — статистика + покупатели + пароль
    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()

        cur.execute(f"SELECT COUNT(*) FROM {schema}.subscribers")
        subscribers_count = cur.fetchone()[0]

        cur.execute(f"SELECT id, name, telegram, note, created_at FROM {schema}.buyers ORDER BY created_at DESC")
        buyers = [
            {"id": r[0], "name": r[1] or "", "telegram": r[2] or "", "note": r[3] or "", "created_at": r[4].strftime("%d.%m.%Y %H:%M")}
            for r in cur.fetchall()
        ]

        cur.execute(f"SELECT id, email, created_at FROM {schema}.subscribers ORDER BY created_at DESC")
        subscribers = [
            {"id": r[0], "email": r[1], "created_at": r[2].strftime("%d.%m.%Y %H:%M")}
            for r in cur.fetchall()
        ]

        cur.execute(f"SELECT value FROM {schema}.settings WHERE key = 'course_password'")
        row = cur.fetchone()
        course_password = row[0] if row else "welcome"

        conn.close()
        return {
            "statusCode": 200,
            "headers": HEADERS,
            "body": json.dumps({
                "subscribers_count": subscribers_count,
                "subscribers": subscribers,
                "buyers": buyers,
                "buyers_count": len(buyers),
                "course_password": course_password,
            })
        }

    # POST /buyers — добавить покупателя
    if method == "POST" and "/buyers" in path:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "")
        telegram = body.get("telegram", "")
        note = body.get("note", "")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"INSERT INTO {schema}.buyers (name, telegram, note) VALUES (%s, %s, %s) RETURNING id", (name, telegram, note))
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True, "id": new_id})}

    # DELETE /buyers — удалить покупателя
    if method == "DELETE" and "/buyers" in path:
        body = json.loads(event.get("body") or "{}")
        buyer_id = body.get("id")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {schema}.buyers WHERE id = %s", (buyer_id,))
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True})}

    # PUT /password — сменить пароль курса
    if method == "PUT" and "/password" in path:
        body = json.loads(event.get("body") or "{}")
        new_password = body.get("password", "").strip()
        if not new_password:
            return {"statusCode": 400, "headers": HEADERS, "body": json.dumps({"error": "Пароль не может быть пустым"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"UPDATE {schema}.settings SET value = %s WHERE key = 'course_password'", (new_password,))
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True})}

    return {"statusCode": 404, "headers": HEADERS, "body": json.dumps({"error": "Not found"})}