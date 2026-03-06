import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

const topics = [
  {
    title: "Работа с файлами",
    icon: "FolderOpen",
    text: "Python легко читает, пишет и переименовывает файлы. Модуль os и pathlib делают это удобным.",
    code: `import os
from pathlib import Path

# Прочитать файл
with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Записать файл
with open("output.txt", "w") as f:
    f.write("Готово!")

# Список файлов в папке
for file in Path(".").iterdir():
    print(file.name)

# Переименовать
os.rename("old.txt", "new.txt")`,
  },
  {
    title: "Excel и Google Sheets",
    icon: "Table",
    text: "openpyxl читает и создаёт Excel-файлы. Автоматизируй отчёты и сэкономь часы ручной работы.",
    code: `pip install openpyxl

import openpyxl

# Создать Excel-файл
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Отчёт"

ws["A1"] = "Имя"
ws["B1"] = "Продажи"
ws.append(["Иван", 150000])
ws.append(["Анна", 230000])

wb.save("report.xlsx")

# Читать файл
wb2 = openpyxl.load_workbook("data.xlsx")
ws2 = wb2.active
for row in ws2.iter_rows(values_only=True):
    print(row)`,
  },
  {
    title: "Парсинг сайтов",
    icon: "Globe",
    text: "requests скачивает страницы, BeautifulSoup парсит HTML. Собирай данные с любых сайтов.",
    code: `pip install requests beautifulsoup4

import requests
from bs4 import BeautifulSoup

url = "https://example.com"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# Найти заголовок
title = soup.find("h1").text
print(title)

# Найти все ссылки
links = soup.find_all("a")
for link in links:
    print(link.get("href"))`,
  },
  {
    title: "Отправка email",
    icon: "Mail",
    text: "Python умеет отправлять письма через smtplib. Удобно для уведомлений, отчётов и оповещений.",
    code: `import smtplib
from email.mime.text import MIMEText

def send_email(to, subject, body):
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = "bot@gmail.com"
    msg["To"] = to

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login("bot@gmail.com", "APP_PASSWORD")
        server.sendmail("bot@gmail.com", to, msg.as_string())

send_email("user@mail.ru", "Отчёт готов", "Данные обновлены!")`,
  },
  {
    title: "Расписание задач",
    icon: "Clock",
    text: "schedule запускает функции по расписанию. Автозапуск скриптов каждый день, час или минуту.",
    code: `pip install schedule

import schedule
import time

def morning_report():
    print("Генерирую утренний отчёт...")
    # ... твой код

def check_prices():
    print("Проверяю цены...")

# Запускать каждый день в 9:00
schedule.every().day.at("09:00").do(morning_report)

# Каждые 30 минут
schedule.every(30).minutes.do(check_prices)

while True:
    schedule.run_pending()
    time.sleep(60)`,
  },
  {
    title: "Телеграм-бот",
    icon: "MessageSquare",
    text: "python-telegram-bot позволяет создать бота за 20 строк кода. Уведомления, команды, интерактивное меню.",
    code: `pip install python-telegram-bot

from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler

async def start(update: Update, context):
    await update.message.reply_text(
        "Привет! Я Python-бот. Чем могу помочь?"
    )

async def hello(update: Update, context):
    name = update.effective_user.first_name
    await update.message.reply_text(f"Привет, {name}!")

app = ApplicationBuilder().token("YOUR_TOKEN").build()
app.add_handler(CommandHandler("start", start))
app.add_handler(CommandHandler("hello", hello))
app.run_polling()`,
  },
];

export default function AvtomatizaciyaPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 7</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Автоматизация</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Пусть Python работает вместо тебя. Файлы, Excel, письма, парсинг и телеграм-боты — реальная польза.
            </p>
          </div>

          <ArtDecoDivider variant="stepped" />

          <div className="space-y-12 mt-12">
            {topics.map((topic) => (
              <div key={topic.title} className="relative p-8 bg-card border border-border">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary"><Icon name={topic.icon} size={22} /></span>
                  <h2 className="font-serif text-2xl text-foreground">{topic.title}</h2>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{topic.text}</p>

                <pre className="bg-background border border-border rounded-sm p-4 overflow-x-auto text-sm text-primary leading-relaxed">
                  <code>{topic.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
