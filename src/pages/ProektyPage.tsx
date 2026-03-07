import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { SectionCard, SectionTopic } from "@/components/SectionCard";
import { ProjectArchChart } from "@/components/SectionCharts";

const projects: SectionTopic[] = [
  {
    title: "Конвертер валют",
    icon: "RefreshCw",
    level: "Начинающий",
    intro: "Программа запрашивает актуальный курс валют через публичный API и конвертирует суммы. Отличная практика: HTTP-запросы, работа с JSON, функции, пользовательский ввод.",
    steps: [
      { label: "Что изучишь", text: "Библиотека requests, работа с JSON-ответом API, функции с параметрами, форматирование вывода через f-строки." },
      { label: "Как работает", text: "Программа получает курсы с exchangerate-api.com, затем умножает введённую сумму на нужный коэффициент." },
      { label: "Расширение", text: "Добавь меню выбора валют, историю конвертаций, запись результатов в файл." },
    ],
    visual: <ProjectArchChart title="Конвертер валют" steps={["Пользователь вводит сумму и валюты", "requests.get() → API exchangerate", "Парсинг JSON-ответа", "Вычисление и вывод результата"]} />,
    blocks: [
      {
        label: "Код проекта:",
        code: `import requests

def get_rate(from_cur, to_cur):
    url = f"https://api.exchangerate-api.com/v4/latest/{from_cur}"
    response = requests.get(url)
    rates = response.json()["rates"]
    return rates[to_cur]

def convert(amount, from_cur, to_cur):
    rate = get_rate(from_cur, to_cur)
    return round(amount * rate, 2)

amount = float(input("Сумма в USD: "))
result = convert(amount, "USD", "RUB")
print(f"{amount} USD = {result} RUB")`,
      },
      { label: "Пример работы:", code: `Сумма в USD: 100\n100.0 USD = 9150.5 RUB` },
    ],
  },
  {
    title: "Менеджер задач",
    icon: "CheckSquare",
    level: "Начинающий",
    intro: "To-do список с сохранением в JSON-файл. Реализуется через командную строку: добавление, просмотр, отметка выполнения и удаление задач. Хорошая практика работы с файлами и структурами данных.",
    steps: [
      { label: "Что изучишь", text: "Работа с JSON-файлами, словари и списки, функции, pathlib, цикл меню с input()." },
      { label: "Архитектура", text: "Каждая задача — словарь {text, done}. Список задач хранится в JSON. При старте загружается из файла, при изменении — сохраняется." },
      { label: "Расширение", text: "Добавь приоритеты, категории, дедлайны. Сделай веб-интерфейс через Flask." },
    ],
    visual: <ProjectArchChart title="Менеджер задач" steps={["load(): читаем tasks.json", "Меню: добавить / показать / удалить", "Изменяем список задач", "save(): сохраняем tasks.json"]} />,
    blocks: [
      {
        label: "Код проекта:",
        code: `import json
from pathlib import Path

FILE = "tasks.json"

def load():
    if Path(FILE).exists():
        return json.loads(Path(FILE).read_text(encoding="utf-8"))
    return []

def save(tasks):
    Path(FILE).write_text(
        json.dumps(tasks, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

def add(text):
    tasks = load()
    tasks.append({"text": text, "done": False})
    save(tasks)
    print(f"Добавлено: {text}")

def show():
    for i, t in enumerate(load(), 1):
        status = "✓" if t["done"] else "○"
        print(f"{i}. {status} {t['text']}")`,
      },
    ],
  },
  {
    title: "Погодный бот",
    icon: "Cloud",
    level: "Средний",
    intro: "Телеграм-бот, показывающий текущую погоду по запросу пользователя. Объединяет два навыка: работу с HTTP API (OpenWeatherMap) и создание телеграм-бота. Реальный полезный инструмент.",
    steps: [
      { label: "Что изучишь", text: "python-telegram-bot, requests, работа с API-ключами через переменные окружения, обработка аргументов команды." },
      { label: "Архитектура", text: "Пользователь пишет /weather Москва → бот запрашивает OpenWeatherMap API → форматирует ответ → отправляет в чат." },
      { label: "API ключ", text: "Зарегистрируйся на openweathermap.org → бесплатный план → скопируй API Key. Храни в переменной окружения, не в коде." },
    ],
    visual: <ProjectArchChart title="Погодный бот" steps={["/weather Москва → CommandHandler", "get_weather('Москва') → OpenWeatherMap API", "Парсинг: температура + описание", "reply_text с результатом"]} />,
    blocks: [
      {
        label: "Код проекта:",
        code: `import requests
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler

def get_weather(city):
    key = "YOUR_OPENWEATHER_KEY"
    url = "http://api.openweathermap.org/data/2.5/weather"
    r = requests.get(url, params={
        "q": city, "appid": key,
        "units": "metric", "lang": "ru"
    })
    data = r.json()
    temp = data["main"]["temp"]
    desc = data["weather"][0]["description"]
    return f"{city}: {temp}°C, {desc}"

async def weather(update: Update, context):
    city = " ".join(context.args) or "Москва"
    result = get_weather(city)
    await update.message.reply_text(result)`,
      },
    ],
  },
  {
    title: "Анализ расходов",
    icon: "PieChart",
    level: "Средний",
    intro: "Читает CSV-файл с личными расходами, строит сводную таблицу по категориям и визуализирует результаты в виде круговой диаграммы. Pandas + Matplotlib — стандартный стек для анализа данных.",
    steps: [
      { label: "Что изучишь", text: "Pandas: read_csv, groupby, sum. Matplotlib: создание диаграмм, сохранение в PNG. Работа с реальными данными." },
      { label: "Формат CSV", text: "Файл expenses.csv должен содержать столбцы: date, category, amount. Например: 2024-03-01,Еда,450" },
      { label: "Расширение", text: "Добавь фильтрацию по месяцу, сравнение с прошлым периодом, экспорт в Excel через to_excel()." },
    ],
    visual: <ProjectArchChart title="Анализ расходов" steps={["pd.read_csv('expenses.csv')", "groupby('category')['amount'].sum()", "Сводная таблица по категориям", "plt.pie() → сохранить график"]} />,
    blocks: [
      {
        label: "Код проекта:",
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("expenses.csv")
# Ожидаемые столбцы: date, category, amount

# Итоги по категориям
summary = df.groupby("category")["amount"].sum()
print(summary)

# Круговая диаграмма
plt.figure(figsize=(8, 6))
summary.plot(kind="pie", autopct="%1.1f%%")
plt.title("Расходы по категориям")
plt.ylabel("")
plt.savefig("expenses_chart.png", bbox_inches="tight")
plt.show()`,
      },
    ],
  },
  {
    title: "REST API сервис",
    icon: "Server",
    level: "Продвинутый",
    intro: "Полноценный REST API на FastAPI с базой данных SQLite, валидацией данных через Pydantic и автоматической Swagger-документацией. Основа для любого backend-приложения.",
    steps: [
      { label: "Что изучишь", text: "FastAPI, Pydantic-модели, SQLite через sqlite3, HTTP-методы GET/POST, status codes, dependency injection." },
      { label: "Архитектура", text: "FastAPI принимает JSON, Pydantic валидирует, функция записывает в SQLite, возвращает JSON-ответ. Документация на /docs." },
      { label: "Расширение", text: "Добавь авторизацию (JWT-токены), PostgreSQL через SQLAlchemy, docker-compose для деплоя." },
    ],
    visual: <ProjectArchChart title="REST API" steps={["POST /tasks → Pydantic валидирует JSON", "Сохранение в SQLite", "GET /tasks → SELECT * FROM tasks", "Возврат JSON-массива"]} />,
    blocks: [
      {
        label: "Код проекта:",
        code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3

app = FastAPI(title="Tasks API")

class Task(BaseModel):
    title: str
    done: bool = False

def get_db():
    conn = sqlite3.connect("tasks.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/tasks")
def list_tasks():
    db = get_db()
    tasks = db.execute("SELECT * FROM tasks").fetchall()
    return [dict(t) for t in tasks]

@app.post("/tasks", status_code=201)
def create_task(task: Task):
    db = get_db()
    db.execute("INSERT INTO tasks (title, done) VALUES (?,?)",
               (task.title, task.done))
    db.commit()
    return {"status": "created"}`,
      },
    ],
  },
  {
    title: "Парсер новостей",
    icon: "Newspaper",
    level: "Продвинутый",
    intro: "Собирает заголовки новостей с нескольких RSS-источников, сохраняет в базу данных SQLite и формирует ежедневный дайджест. Объединяет парсинг, базы данных и работу с датами.",
    steps: [
      { label: "Что изучишь", text: "Парсинг XML (RSS), BeautifulSoup, SQLite, datetime, работа с несколькими источниками, дедупликация." },
      { label: "RSS", text: "RSS — стандартный формат новостных лент на XML. Большинство новостных сайтов имеют RSS-ленту (/rss или /feed)." },
      { label: "Расширение", text: "Добавь фильтрацию по ключевым словам, отправку дайджеста на email через smtplib, веб-интерфейс для просмотра." },
    ],
    visual: <ProjectArchChart title="Парсер новостей" steps={["requests.get(rss_url) для каждого источника", "BeautifulSoup парсит XML-структуру", "Извлечение title + link + date", "Сохранение в SQLite (без дублей)"]} />,
    blocks: [
      {
        label: "Код проекта:",
        code: `import requests
from bs4 import BeautifulSoup
import sqlite3
from datetime import date

def parse_rss(url):
    r = requests.get(url, timeout=10)
    soup = BeautifulSoup(r.text, "xml")
    items = []
    for item in soup.find_all("item")[:10]:
        items.append({
            "title": item.find("title").text,
            "link": item.find("link").text,
            "date": str(date.today())
        })
    return items

sources = [
    "https://lenta.ru/rss/news",
    "https://rss.cnbc.com/rss/cnbc_world.xml"
]

for source in sources:
    news = parse_rss(source)
    for item in news:
        print(item["title"])`,
      },
    ],
  },
];

export default function ProektyPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 8</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Реальные проекты</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Теория без практики — ничто. Вот 6 проектов, которые можно написать уже сейчас и добавить в портфолио.
            </p>
          </div>
          <ArtDecoDivider variant="stepped" />
          <div className="space-y-12 mt-12">
            {projects.map((project) => <SectionCard key={project.title} topic={project} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
