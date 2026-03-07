import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { SectionCard, SectionTopic } from "@/components/SectionCard";
import { CRUDChart, DBStackChart, PandasFlowChart } from "@/components/SectionCharts";

const topics: SectionTopic[] = [
  {
    title: "SQLite — база для старта",
    icon: "Database",
    intro: "SQLite — встроенная в Python база данных. Не требует установки отдельного сервера — данные хранятся в обычном файле на диске. Идеально для обучения, прототипов и небольших приложений. Для серьёзных проектов переходят на PostgreSQL.",
    steps: [
      { label: "sqlite3", text: "Модуль sqlite3 входит в стандартную библиотеку Python. Импортируется без установки: import sqlite3." },
      { label: "connect()", text: "sqlite3.connect('mydb.db') создаёт соединение. Если файл не существует — создаёт его. Данные сохраняются на диске между запусками программы." },
      { label: "cursor", text: "Объект cursor исполняет SQL-запросы. cursor.execute(sql) — выполнить запрос. conn.commit() — сохранить изменения." },
    ],
    visual: <DBStackChart />,
    blocks: [
      {
        label: "Создание базы и таблицы:",
        code: `import sqlite3

conn = sqlite3.connect("mydb.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
    )
""")
conn.commit()`,
      },
    ],
  },
  {
    title: "Запросы CRUD",
    icon: "PenLine",
    intro: "CRUD — аббревиатура четырёх базовых операций с данными: Create (создать), Read (прочитать), Update (обновить), Delete (удалить). Любое приложение, работающее с данными, использует именно эти операции — в SQL или через ORM.",
    steps: [
      { label: "CREATE", text: "INSERT INTO table (col1, col2) VALUES (?, ?) — добавить запись. Знаки ? — плейсхолдеры, защищают от SQL-инъекций. Значения передаются кортежем вторым аргументом." },
      { label: "READ", text: "SELECT * FROM table — получить все записи. fetchall() возвращает список кортежей. fetchone() — одну запись." },
      { label: "UPDATE/DELETE", text: "UPDATE table SET col = ? WHERE condition — обновить. DELETE FROM table WHERE condition — удалить. Всегда используй WHERE, иначе изменишь/удалишь все записи." },
    ],
    visual: <CRUDChart />,
    blocks: [
      {
        label: "Все четыре операции:",
        code: `# CREATE — добавить запись
cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)",
               ("Иван", "ivan@mail.ru"))
conn.commit()

# READ — прочитать всё
cursor.execute("SELECT * FROM users")
for user in cursor.fetchall():
    print(user)

# UPDATE — обновить
cursor.execute("UPDATE users SET email = ? WHERE name = ?",
               ("new@mail.ru", "Иван"))

# DELETE — удалить
cursor.execute("DELETE FROM users WHERE id = ?", (1,))
conn.commit()`,
      },
    ],
  },
  {
    title: "PostgreSQL с psycopg2",
    icon: "Server",
    intro: "PostgreSQL — мощная реляционная СУБД для production. Поддерживает тысячи одновременных подключений, транзакции, индексы и сложные запросы. psycopg2 — стандартная Python-библиотека для работы с PostgreSQL.",
    steps: [
      { label: "Установка", text: "pip install psycopg2-binary — бинарная версия без системных зависимостей. Удобна для разработки." },
      { label: "Подключение", text: "psycopg2.connect(host, database, user, password) — параметры передаются явно или через DATABASE_URL. Всегда закрывай соединение: conn.close()." },
      { label: "Отличия от SQLite", text: "PostgreSQL — отдельный сервер (локальный или облачный). Строже к типам данных. Поддерживает параллельные транзакции. Необходим для многопользовательских приложений." },
    ],
    blocks: [
      {
        label: "Подключение к PostgreSQL:",
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
    ],
  },
  {
    title: "SQLAlchemy ORM",
    icon: "Layers",
    intro: "ORM (Object-Relational Mapping) позволяет работать с базой данных через Python-объекты, не писая SQL вручную. SQLAlchemy — самый популярный ORM для Python. Таблица становится классом, строка — объектом, запрос — методом.",
    steps: [
      { label: "Модель", text: "Класс Python, унаследованный от Base, описывает таблицу. Атрибуты Column — это столбцы. SQLAlchemy создаёт таблицу по этому описанию." },
      { label: "Session", text: "Session — единица работы с базой. session.add(obj) — добавить, session.delete(obj) — удалить, session.commit() — сохранить. Session управляет транзакциями." },
      { label: "Запросы", text: "session.query(User).filter(User.name == 'Иван').all() — получить всех Иванов. Никакого SQL вручную." },
    ],
    blocks: [
      {
        label: "Модель и сохранение объекта:",
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
    session.commit()
    print(f"Создан пользователь с id: {user.id}")`,
      },
      { label: "Результат:", code: `Создан пользователь с id: 1` },
    ],
  },
  {
    title: "Pandas для анализа данных",
    icon: "BarChart2",
    intro: "Pandas — библиотека для обработки и анализа табличных данных. Основная структура — DataFrame (таблица). Pandas читает CSV, Excel, SQL, JSON и предоставляет мощные инструменты фильтрации, группировки и агрегации данных.",
    steps: [
      { label: "DataFrame", text: "Двумерная таблица с именованными столбцами и строками. Аналог Excel-таблицы в Python. Каждый столбец — Series (одномерный массив)." },
      { label: "Фильтрация", text: "df[df['age'] >= 18] — выбрать строки, где возраст ≥ 18. Условие в скобках возвращает булев массив, который фильтрует DataFrame." },
      { label: "Группировка", text: "df.groupby('city')['salary'].mean() — средняя зарплата по городам. Аналог GROUP BY в SQL." },
    ],
    visual: <PandasFlowChart />,
    blocks: [
      {
        label: "Анализ данных:",
        code: `import pandas as pd

df = pd.read_csv("data.csv")

print(df.head())          # первые 5 строк
print(df.shape)           # (количество строк, столбцов)
print(df.describe())      # статистика по числовым столбцам

# Фильтрация
adults = df[df["age"] >= 18]

# Группировка
avg_salary = df.groupby("city")["salary"].mean()
print(avg_salary)`,
      },
    ],
  },
  {
    title: "Сохранение в файлы",
    icon: "Save",
    intro: "JSON и CSV — стандартные форматы обмена данными. JSON удобен для вложенных структур (словари, списки), CSV — для таблиц. Python работает с ними через встроенные модули json и csv без дополнительных библиотек.",
    steps: [
      { label: "JSON", text: "json.dump(data, file) — записать Python-объект в JSON-файл. json.load(file) — прочитать. ensure_ascii=False сохранит кириллицу, indent=2 — читаемое форматирование." },
      { label: "CSV", text: "csv.writer(file) — объект для записи строк. writer.writerow(['Иван', 30]) — одна строка. csv.reader(file) — для чтения." },
      { label: "Кодировка", text: "Всегда указывайте encoding='utf-8' при работе с файлами, содержащими кириллицу. Иначе на Windows возможны проблемы с отображением." },
    ],
    blocks: [
      {
        label: "Работа с JSON и CSV:",
        code: `import json, csv

# JSON — запись
data = {"name": "Иван", "age": 30, "city": "Москва"}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# JSON — чтение
with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded["name"])   # Иван

# CSV — запись
rows = [["Имя", "Возраст"], ["Иван", 30], ["Анна", 25]]
with open("users.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)`,
      },
      { label: "Результат (JSON-файл):", code: `{\n  "name": "Иван",\n  "age": 30,\n  "city": "Москва"\n}` },
    ],
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
            {topics.map((topic) => <SectionCard key={topic.title} topic={topic} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
