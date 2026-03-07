import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { SectionCard, SectionTopic } from "@/components/SectionCard";
import { FileOpsChart, ScrapingFlowChart, TelegramBotChart } from "@/components/SectionCharts";

const topics: SectionTopic[] = [
  {
    title: "Работа с файлами",
    icon: "FolderOpen",
    intro: "Python читает, пишет и управляет файлами через встроенные функции и модуль os. Конструкция with open() автоматически закрывает файл после работы — даже если произошла ошибка. Модуль pathlib предоставляет удобный объектный интерфейс к файловой системе.",
    steps: [
      { label: "open()", text: "Открывает файл для чтения ('r'), записи ('w') или добавления ('a'). Режим 'w' перезаписывает файл целиком. Режим 'a' добавляет в конец." },
      { label: "with", text: "Конструкция with open(...) as f: гарантирует закрытие файла. Без with файл может остаться открытым при ошибке, что приведёт к утечке ресурсов." },
      { label: "pathlib", text: "Path('.').iterdir() перебирает файлы в директории. Path('file.txt').exists() — проверить существование. Path('file.txt').read_text() — прочитать одной строкой." },
    ],
    visual: <FileOpsChart />,
    blocks: [
      {
        label: "Чтение, запись, перебор файлов:",
        code: `import os
from pathlib import Path

# Прочитать файл
with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# Записать файл
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Готово!")

# Список файлов в папке
for file in Path(".").iterdir():
    print(file.name)

# Переименовать
os.rename("old.txt", "new.txt")`,
      },
    ],
  },
  {
    title: "Excel и таблицы",
    icon: "Table",
    intro: "Библиотека openpyxl позволяет читать и создавать Excel-файлы (.xlsx) прямо из Python. Это мощный инструмент для автоматизации отчётности: генерация прайс-листов, сводных таблиц, выгрузки данных — без запуска Excel.",
    steps: [
      { label: "Workbook", text: "openpyxl.Workbook() создаёт новую книгу. wb.active — активный лист. ws['A1'] = 'Данные' — запись в ячейку." },
      { label: "append()", text: "ws.append([val1, val2, val3]) — добавить строку. Удобно для записи данных из списков или базы данных." },
      { label: "Чтение", text: "openpyxl.load_workbook('file.xlsx') — открыть существующий файл. ws.iter_rows(values_only=True) — перебор строк с значениями." },
    ],
    blocks: [
      {
        label: "Создание Excel-отчёта:",
        code: `pip install openpyxl

import openpyxl

wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Отчёт"

ws["A1"] = "Имя"
ws["B1"] = "Продажи"
ws.append(["Иван", 150000])
ws.append(["Анна", 230000])
ws.append(["Олег", 180000])

wb.save("report.xlsx")
print("Файл сохранён")`,
      },
      {
        label: "Чтение существующего файла:",
        code: `wb2 = openpyxl.load_workbook("data.xlsx")
ws2 = wb2.active
for row in ws2.iter_rows(values_only=True):
    print(row)   # ('Иван', 150000)`,
      },
    ],
  },
  {
    title: "Парсинг сайтов",
    icon: "Globe",
    intro: "Парсинг (веб-скрапинг) — автоматический сбор данных с сайтов. Библиотека requests скачивает HTML-страницу, BeautifulSoup разбирает её структуру. Используется для сбора цен, новостей, вакансий и любых публичных данных.",
    steps: [
      { label: "requests", text: "requests.get(url) отправляет HTTP GET-запрос и возвращает ответ. response.text — текст страницы (HTML). response.status_code — код ответа (200 = OK)." },
      { label: "BeautifulSoup", text: "BeautifulSoup(html, 'html.parser') разбирает HTML. soup.find('h1') — найти первый тег h1. soup.find_all('a') — все ссылки." },
      { label: "Этика", text: "Проверяй файл robots.txt сайта перед парсингом. Делай паузы между запросами (time.sleep). Не перегружай серверы." },
    ],
    visual: <ScrapingFlowChart />,
    blocks: [
      {
        label: "Парсинг заголовков и ссылок:",
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
for link in soup.find_all("a"):
    href = link.get("href")
    text = link.text.strip()
    if href:
        print(f"{text}: {href}")`,
      },
    ],
  },
  {
    title: "Отправка email",
    icon: "Mail",
    intro: "Python умеет отправлять письма через модуль smtplib, используя любой SMTP-сервер (Gmail, Яндекс, корпоративный). Это полезно для автоматических уведомлений, отчётов по расписанию, подтверждений регистрации.",
    steps: [
      { label: "SMTP", text: "Simple Mail Transfer Protocol — стандартный протокол отправки почты. SMTP_SSL использует шифрование. Порт 465 — для Gmail с SSL." },
      { label: "App Password", text: "Gmail требует «пароль приложения» (App Password) — не ваш основной пароль. Создаётся в настройках безопасности Google." },
      { label: "MIMEText", text: "Объект MIMEText формирует письмо: тело, тема, отправитель, получатель. Для HTML-писем используй MIMEText(body, 'html')." },
    ],
    blocks: [
      {
        label: "Отправка письма через Gmail:",
        code: `import smtplib
from email.mime.text import MIMEText

def send_email(to, subject, body):
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = "bot@gmail.com"
    msg["To"] = to

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login("bot@gmail.com", "APP_PASSWORD")
        server.sendmail("bot@gmail.com", to, msg.as_string())
        print("Письмо отправлено!")

send_email("user@mail.ru", "Отчёт готов", "Данные обновлены!")`,
        comment: "APP_PASSWORD — пароль приложения из настроек Google, не ваш основной пароль",
      },
    ],
  },
  {
    title: "Расписание задач",
    icon: "Clock",
    intro: "Библиотека schedule позволяет запускать функции по расписанию: каждую минуту, в определённое время, раз в день. Скрипт работает в бесконечном цикле и проверяет, не пора ли выполнить задачу. Альтернатива cron для простых случаев.",
    steps: [
      { label: "schedule", text: "schedule.every().day.at('09:00').do(fn) — запускать fn каждый день в 9:00. schedule.every(30).minutes.do(fn) — каждые 30 минут." },
      { label: "run_pending()", text: "schedule.run_pending() проверяет, не пора ли выполнить задачи. Вызывается в цикле с небольшой паузой time.sleep(60)." },
      { label: "Применение", text: "Автоматические отчёты, обновление данных, мониторинг цен, ежедневные резервные копии — всё это реализуется через schedule." },
    ],
    blocks: [
      {
        label: "Запуск задач по расписанию:",
        code: `pip install schedule

import schedule
import time

def morning_report():
    print("Генерирую утренний отчёт...")

def check_prices():
    print("Проверяю цены...")

# Каждый день в 9:00
schedule.every().day.at("09:00").do(morning_report)

# Каждые 30 минут
schedule.every(30).minutes.do(check_prices)

# Основной цикл
while True:
    schedule.run_pending()
    time.sleep(60)   # проверяем каждую минуту`,
      },
    ],
  },
  {
    title: "Телеграм-бот",
    icon: "MessageSquare",
    intro: "python-telegram-bot — официальная библиотека для создания ботов. Бот регистрирует обработчики команд и сообщений, запускается в режиме polling (опрос Telegram API) и реагирует на входящие сообщения. Токен выдаёт @BotFather в Telegram.",
    steps: [
      { label: "BotFather", text: "Создай бота через @BotFather в Telegram: /newbot → придумай имя → получи токен. Токен — секрет, не публикуй в коде." },
      { label: "CommandHandler", text: "CommandHandler('start', fn) — обработчик команды /start. fn принимает update (информация о сообщении) и context (вспомогательные данные)." },
      { label: "reply_text", text: "update.message.reply_text('Текст') — отправить ответное сообщение. Функция асинхронная — нужно await." },
    ],
    visual: <TelegramBotChart />,
    blocks: [
      {
        label: "Минимальный телеграм-бот:",
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
        comment: "Замените YOUR_TOKEN на токен от @BotFather",
      },
    ],
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
            {topics.map((topic) => <SectionCard key={topic.title} topic={topic} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
