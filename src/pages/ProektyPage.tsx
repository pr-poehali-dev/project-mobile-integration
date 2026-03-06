import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

const projects = [
  {
    title: "Конвертер валют",
    icon: "RefreshCw",
    level: "Начинающий",
    desc: "Программа запрашивает курс валют через API и переводит суммы. Отличная практика работы с запросами.",
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
  {
    title: "Менеджер задач",
    icon: "CheckSquare",
    level: "Начинающий",
    desc: "To-do список с сохранением в файл. Добавление, просмотр и удаление задач через консоль.",
    code: `import json
from pathlib import Path

FILE = "tasks.json"

def load():
    if Path(FILE).exists():
        return json.loads(Path(FILE).read_text())
    return []

def save(tasks):
    Path(FILE).write_text(json.dumps(tasks, ensure_ascii=False))

def add(text):
    tasks = load()
    tasks.append({"text": text, "done": False})
    save(tasks)
    print(f"✓ Добавлено: {text}")

def show():
    for i, t in enumerate(load(), 1):
        status = "✓" if t["done"] else "○"
        print(f"{i}. {status} {t['text']}")`,
  },
  {
    title: "Погодный бот",
    icon: "Cloud",
    level: "Средний",
    desc: "Телеграм-бот, который показывает погоду по городу. Использует OpenWeatherMap API.",
    code: `import requests
from telegram.ext import ApplicationBuilder, CommandHandler

def get_weather(city):
    key = "YOUR_API_KEY"
    url = f"http://api.openweathermap.org/data/2.5/weather"
    r = requests.get(url, params={
        "q": city, "appid": key, "units": "metric", "lang": "ru"
    })
    data = r.json()
    temp = data["main"]["temp"]
    desc = data["weather"][0]["description"]
    return f"{city}: {temp}°C, {desc}"

async def weather(update, context):
    city = " ".join(context.args) or "Москва"
    result = get_weather(city)
    await update.message.reply_text(result)`,
  },
  {
    title: "Анализ расходов",
    icon: "PieChart",
    level: "Средний",
    desc: "Читает CSV с расходами, строит отчёт по категориям и визуализацию с Pandas и Matplotlib.",
    code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("expenses.csv")
# Столбцы: date, category, amount

# Итоги по категориям
summary = df.groupby("category")["amount"].sum()
print(summary)

# Круговая диаграмма
plt.figure(figsize=(8, 6))
summary.plot(kind="pie", autopct="%1.1f%%")
plt.title("Расходы по категориям")
plt.savefig("expenses_chart.png")
plt.show()`,
  },
  {
    title: "REST API сервис",
    icon: "Server",
    level: "Продвинутый",
    desc: "Полноценный API на FastAPI с базой данных SQLite, авторизацией и Swagger-документацией.",
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
  {
    title: "Парсер новостей",
    icon: "Newspaper",
    level: "Продвинутый",
    desc: "Собирает заголовки новостей с нескольких сайтов, сохраняет в базу и отправляет дайджест на email.",
    code: `import requests
from bs4 import BeautifulSoup
import sqlite3
from datetime import date

def parse_rss(url):
    r = requests.get(url)
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
];

const levelColors: Record<string, string> = {
  "Начинающий": "text-green-400 border-green-400/30 bg-green-400/10",
  "Средний": "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  "Продвинутый": "text-primary border-primary/30 bg-primary/10",
};

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
            {projects.map((project) => (
              <div key={project.title} className="relative p-8 bg-card border border-border">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-primary"><Icon name={project.icon} size={22} /></span>
                    <h2 className="font-serif text-2xl text-foreground">{project.title}</h2>
                  </div>
                  <span className={`text-xs px-3 py-1 border rounded-sm font-medium tracking-wide ${levelColors[project.level]}`}>
                    {project.level}
                  </span>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{project.desc}</p>

                <pre className="bg-background border border-border rounded-sm p-4 overflow-x-auto text-sm text-primary leading-relaxed">
                  <code>{project.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
