import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

const topics = [
  {
    title: "Что такое Flask",
    icon: "Globe",
    text: "Flask — лёгкий веб-фреймворк для Python. Идеален для первых проектов и небольших API. Установка одной командой.",
    code: `# Установка
pip install flask

# Минимальное приложение
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Привет, мир!"

if __name__ == "__main__":
    app.run(debug=True)`,
  },
  {
    title: "Маршруты (routes)",
    icon: "Map",
    text: "Маршрут — адрес страницы. @app.route() связывает URL с функцией. Можно передавать параметры прямо в URL.",
    code: `@app.route("/hello/<name>")
def hello(name):
    return f"Привет, {name}!"

@app.route("/users/<int:user_id>")
def get_user(user_id):
    return f"Пользователь #{user_id}"

# Открой: http://localhost:5000/hello/Иван`,
  },
  {
    title: "Методы HTTP",
    icon: "ArrowRightLeft",
    text: "GET — получить данные, POST — отправить. Flask поддерживает все методы через параметр methods.",
    code: `from flask import Flask, request, jsonify

@app.route("/api/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        return jsonify({"users": ["Анна", "Иван"]})

    if request.method == "POST":
        data = request.get_json()
        name = data.get("name")
        return jsonify({"created": name}), 201`,
  },
  {
    title: "Шаблоны Jinja2",
    icon: "FileCode",
    text: "Flask рендерит HTML-шаблоны через Jinja2. Переменные передаются из Python прямо в HTML.",
    code: `# app.py
from flask import render_template

@app.route("/profile/<name>")
def profile(name):
    return render_template("profile.html", user=name)

# templates/profile.html
# <h1>Привет, {{ user }}!</h1>
# {% if user == "admin" %}
#   <p>Добро пожаловать, администратор!</p>
# {% endif %}`,
  },
  {
    title: "FastAPI — современный выбор",
    icon: "Zap",
    text: "FastAPI быстрее Flask, автоматически генерирует документацию и проверяет типы. Идеален для API.",
    code: `pip install fastapi uvicorn

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    age: int

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/users")
def create_user(user: User):
    return {"created": user.name}

# Запуск: uvicorn main:app --reload`,
  },
  {
    title: "Деплой на сервер",
    icon: "Server",
    text: "Готовое приложение нужно опубликовать. Render.com и Railway позволяют деплоить Python-приложения бесплатно.",
    code: `# requirements.txt — список зависимостей
flask==3.0.0
gunicorn==21.2.0

# Procfile для Render/Heroku
web: gunicorn app:app

# Запуск через gunicorn (production)
gunicorn -w 4 app:app

# Переменные окружения
import os
SECRET_KEY = os.environ.get("SECRET_KEY")`,
  },
];

export default function WebPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 5</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Веб-разработка</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Создавай сайты и API на Python с Flask и FastAPI. От первого маршрута до деплоя на сервер.
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
