import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Анализирует код торгового бота построчно и возвращает объяснение каждой строки на русском языке."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    code = body.get("code", "").strip()

    if not code:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Код не передан"})}

    if len(code) > 8000:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Код слишком длинный (максимум ~8000 символов)"})}

    prompt = f"""Ты — опытный Python-разработчик и преподаватель. Тебе дают код торгового бота (алготрейдинг).

Задача: разобрать код ПОСТРОЧНО (или по смысловым блокам из 1-3 строк) и объяснить каждую часть простым языком для новичка.

Формат ответа — ТОЛЬКО валидный JSON-массив объектов, без markdown, без ```json, без пояснений снаружи массива:
[
  {{
    "lines": "1-3",
    "code": "import ccxt",
    "category": "импорт",
    "explanation": "Подключаем библиотеку ccxt — она умеет работать с сотнями криптобирж через единый интерфейс."
  }},
  ...
]

Категории: импорт | настройка | подключение | данные | индикатор | сигнал | ордер | логика | вспомогательное | цикл | ошибка

Правила:
- Объединяй связанные строки в один блок (например, импорты, параметры стратегии)
- Пустые строки и комментарии тоже включай (краткое объяснение)
- Объяснения — простым языком, без жаргона, 1-3 предложения
- Если встречается торговый термин (RSI, MACD, ордер, стоп-лосс) — кратко поясни его

КОД:
{code}"""

    api_key = os.environ.get("OPENAI_API_KEY", "")
    if not api_key:
        return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": "API ключ не настроен"})}

    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.3,
        "max_tokens": 4000,
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=60) as resp:
        result = json.loads(resp.read())

    raw = result["choices"][0]["message"]["content"].strip()

    # Убираем возможные markdown-обёртки
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1]
        if raw.endswith("```"):
            raw = raw[: raw.rfind("```")]

    blocks = json.loads(raw)

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"blocks": blocks}, ensure_ascii=False),
    }
