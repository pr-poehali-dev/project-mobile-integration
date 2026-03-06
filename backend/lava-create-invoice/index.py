import json
import os
import uuid
import urllib.request


def handler(event: dict, context) -> dict:
    """Создаёт платёжный инвойс через lava.top API и возвращает ссылку на оплату."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors_headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    email = (body.get("email") or "").strip().lower()

    if not email or "@" not in email:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Некорректный email"})}

    offer_id = os.environ["LAVA_OFFER_ID"]
    api_key = os.environ["LAVA_API_KEY"]
    order_id = str(uuid.uuid4())

    base_url = "https://python-start.ru"
    payload = {
        "offerId": offer_id,
        "email": email,
        "orderId": order_id,
        "successUrl": f"{base_url}/success?order={order_id}",
        "failUrl": f"{base_url}/payment?error=1",
        "hookUrl": os.environ.get("LAVA_WEBHOOK_URL", ""),
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        "https://gate.lava.top/v2/invoice",
        data=data,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode("utf-8"))

    payment_url = result.get("paymentUrl") or result.get("url") or result.get("payment_url")

    if not payment_url:
        return {
            "statusCode": 502,
            "headers": cors_headers,
            "body": json.dumps({"error": "Не удалось получить ссылку на оплату", "raw": result}),
        }

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"paymentUrl": payment_url, "orderId": order_id}),
    }
