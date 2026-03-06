import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

const topics = [
  {
    title: "SQLite — база для старта",
    icon: "Database",
    text: "SQLite встроен в Python — не нужно ничего устанавливать. Идеально для обучения и небольших проектов.",
    code: `import sqlite3

# Подключение (создаёт файл, если не существует)
conn = sqlite3.connect("mydb.db")
cursor = conn.cursor()

# Создание таблицы
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
    )
""")
conn.commit()`,
  },
  {
    title: "Запросы CRUD",
    icon: "PenLine",
    text: "CRUD — Create, Read, Update, Delete. Это четыре основные операции с любой базой данных.",
    code: `# CREATE — добавить запись
cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)",
               ("Иван", "ivan@mail.ru"))
conn.commit()

# READ — прочитать
cursor.execute("SELECT * FROM users")
users = cursor.fetchall()
for user in users:
    print(user)

# UPDATE — обновить
cursor.execute("UPDATE users SET email = ? WHERE name = ?",
               ("new@mail.ru", "Иван"))

# DELETE — удалить
cursor.execute("DELETE FROM users WHERE id = ?", (1,))`,
  },
  {
    title: "PostgreSQL с psycopg2",
    icon: "Server",
    text: "Для production используют PostgreSQL. psycopg2 — самая популярная библиотека для подключения к нему.",
    code: `pip install psycopg2-binary

import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="postgres",
    password="password"
)

cursor = conn.cursor()
cursor.execute("SELECT version()")
print(cursor.fetchone())
conn.close()`,
  },
  {
    title: "SQLAlchemy ORM",
    icon: "Layers",
    text: "ORM позволяет работать с базой через Python-объекты, без написания SQL вручную. SQLAlchemy — стандарт.",
    code: `from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import DeclarativeBase, Session

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)

engine = create_engine("sqlite:///mydb.db")
Base.metadata.create_all(engine)

with Session(engine) as session:
    user = User(name="Анна", email="a@mail.ru")
    session.add(user)
    session.commit()`,
  },
  {
    title: "Pandas для анализа",
    icon: "BarChart2",
    text: "Pandas — мощная библиотека для работы с таблицами данных. Читает CSV, Excel, SQL и трансформирует данные.",
    code: `import pandas as pd

# Читаем CSV
df = pd.read_csv("data.csv")

# Базовый анализ
print(df.head())          # первые 5 строк
print(df.describe())      # статистика
print(df.shape)           # (строки, столбцы)

# Фильтрация
adults = df[df["age"] >= 18]

# Группировка
avg = df.groupby("city")["salary"].mean()
print(avg)`,
  },
  {
    title: "Сохранение в файлы",
    icon: "Save",
    text: "JSON и CSV — самые распространённые форматы обмена данными. Python читает и пишет их встроенными средствами.",
    code: `import json
import csv

# JSON — запись
data = {"name": "Иван", "age": 30}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# JSON — чтение
with open("data.json", "r") as f:
    loaded = json.load(f)

# CSV — запись
rows = [["Имя", "Возраст"], ["Иван", 30], ["Анна", 25]]
with open("users.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)`,
  },
];

export default function BazyDannyhPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 6</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Базы данных</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Хранение и обработка данных — ключевой навык. SQLite, PostgreSQL, SQLAlchemy и Pandas на практике.
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
