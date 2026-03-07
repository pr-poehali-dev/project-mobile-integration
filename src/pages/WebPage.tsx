import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { SectionCard, SectionTopic } from "@/components/SectionCard";
import { HttpMethodsChart, FlaskFastAPIChart, RequestFlowChart } from "@/components/SectionCharts";

const topics: SectionTopic[] = [
  {
    title: "Что такое Flask",
    icon: "Globe",
    intro: "Flask — лёгкий веб-фреймворк для Python. Он предоставляет минимально необходимое: маршрутизацию URL, обработку запросов и шаблонизатор. Идеален для обучения и небольших проектов. Устанавливается одной командой pip.",
    steps: [
      { label: "Фреймворк", text: "Flask — это набор инструментов для создания веб-приложений. Вы описываете, какой URL что возвращает — Flask берёт на себя всё остальное: запуск сервера, обработку HTTP." },
      { label: "WSGI", text: "Flask работает по протоколу WSGI — стандарту взаимодействия веб-сервера и Python-приложения. При разработке Flask запускает встроенный сервер. На продакшне используют gunicorn." },
      { label: "debug=True", text: "В режиме отладки Flask автоматически перезапускается при изменении кода и показывает подробные ошибки в браузере. Никогда не использовать в production." },
    ],
    blocks: [
      {
        label: "Минимальное Flask-приложение:",
        code: `pip install flask

from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Привет, мир!"

if __name__ == "__main__":
    app.run(debug=True)`,
      },
      { label: "Запуск и результат:", code: `python app.py\n# Открой браузер: http://localhost:5000\n# Видишь: Привет, мир!` },
    ],
  },
  {
    title: "Маршруты (routes)",
    icon: "Map",
    intro: "Маршрут — это связь между URL-адресом и функцией Python. Декоратор @app.route() регистрирует маршрут. В URL можно передавать переменные части — они автоматически передаются в функцию как параметры.",
    steps: [
      { label: "@app.route()", text: "Декоратор, регистрирующий функцию как обработчик URL. Один URL — одна функция. Функция должна возвращать строку, HTML или JSON." },
      { label: "Параметры URL", text: "/hello/<name> — угловые скобки обозначают переменную часть URL. /users/<int:id> — с указанием типа (int, string, float)." },
    ],
    visual: <RequestFlowChart />,
    blocks: [
      {
        label: "Код с параметрами:",
        code: `@app.route("/hello/<name>")
def hello(name):
    return f"Привет, {name}!"

@app.route("/users/<int:user_id>")
def get_user(user_id):
    return f"Пользователь #{user_id}"

# Открой: http://localhost:5000/hello/Иван
# Результат: Привет, Иван!`,
      },
    ],
  },
  {
    title: "Методы HTTP",
    icon: "ArrowRightLeft",
    intro: "HTTP-протокол определяет тип операции через методы. GET — запросить данные. POST — отправить новые данные. PUT — обновить существующие. DELETE — удалить. Flask по умолчанию обрабатывает только GET, остальные нужно явно указать.",
    steps: [
      { label: "GET", text: "Используется для получения данных. Параметры передаются в URL (?key=value). Безопасный, идемпотентный — повторные запросы дают тот же результат." },
      { label: "POST", text: "Используется для создания новых записей. Данные передаются в теле запроса (body) в формате JSON. Не идемпотентный." },
      { label: "request", text: "Объект request даёт доступ к данным запроса: request.method — метод, request.get_json() — тело JSON, request.args — параметры URL." },
    ],
    visual: <HttpMethodsChart />,
    blocks: [
      {
        label: "Обработка GET и POST:",
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
    ],
  },
  {
    title: "Шаблоны Jinja2",
    icon: "FileCode",
    intro: "Jinja2 — шаблонизатор, встроенный в Flask. Шаблон — это HTML-файл с вставками Python-переменных и логики. Flask рендерит шаблон, подставляя реальные значения, и возвращает готовый HTML браузеру.",
    steps: [
      { label: "render_template", text: "Функция render_template('page.html', var=value) загружает шаблон из папки templates/ и передаёт в него переменные." },
      { label: "{{ }}", text: "Двойные фигурные скобки в HTML — вывод переменной: {{ user }}. Python-значение подставляется при рендеринге." },
      { label: "{% %}", text: "Фигурные скобки с % — управляющие конструкции: {% if %}, {% for %}, {% endif %}. Позволяют писать логику прямо в шаблоне." },
    ],
    blocks: [
      {
        label: "app.py — передаём данные в шаблон:",
        code: `from flask import render_template

@app.route("/profile/<name>")
def profile(name):
    return render_template("profile.html", user=name)`,
      },
      {
        label: "templates/profile.html — шаблон:",
        code: `<h1>Привет, {{ user }}!</h1>
{% if user == "admin" %}
  <p>Добро пожаловать, администратор!</p>
{% endif %}

{% for item in items %}
  <li>{{ item }}</li>
{% endfor %}`,
      },
    ],
  },
  {
    title: "FastAPI — современный выбор",
    icon: "Zap",
    intro: "FastAPI — современный асинхронный фреймворк, значительно быстрее Flask. Автоматически генерирует интерактивную документацию Swagger. Валидирует данные через аннотации типов. Идеален для REST API в production.",
    steps: [
      { label: "Скорость", text: "FastAPI основан на Starlette и является одним из самых быстрых Python-фреймворков. Сопоставим по скорости с Node.js и Go." },
      { label: "Pydantic", text: "Модели Pydantic описывают структуру данных. FastAPI автоматически валидирует входящий JSON и выдаёт понятные ошибки при несоответствии." },
      { label: "Документация", text: "По адресу /docs автоматически появляется Swagger UI — интерактивная документация API, где можно тестировать запросы прямо в браузере." },
    ],
    visual: <FlaskFastAPIChart />,
    blocks: [
      {
        label: "Минимальный FastAPI:",
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

# Запуск: uvicorn main:app --reload
# Документация: http://localhost:8000/docs`,
      },
    ],
  },
  {
    title: "Деплой на сервер",
    icon: "Server",
    intro: "Деплой — публикация приложения в интернете. Для Python-приложений используют Gunicorn (production-сервер) вместо встроенного Flask-сервера. Render.com и Railway позволяют деплоить бесплатно — достаточно подключить репозиторий GitHub.",
    steps: [
      { label: "requirements.txt", text: "Файл со списком зависимостей: flask==3.0.0. Хостинг читает его и устанавливает нужные библиотеки. Генерируется командой pip freeze > requirements.txt." },
      { label: "Gunicorn", text: "Production WSGI-сервер. Запускается командой gunicorn app:app. Обрабатывает несколько запросов параллельно через воркеров (-w 4)." },
      { label: "Переменные окружения", text: "Секреты (API-ключи, пароли) хранятся в переменных окружения, а не в коде. os.environ.get('SECRET_KEY') — безопасное чтение." },
    ],
    blocks: [
      {
        label: "requirements.txt:",
        code: `flask==3.0.0\ngunicorn==21.2.0`,
      },
      {
        label: "Запуск на сервере:",
        code: `# Запуск через gunicorn (production)
gunicorn -w 4 app:app

# Переменные окружения — безопасно хранить секреты
import os
SECRET_KEY = os.environ.get("SECRET_KEY")
DATABASE_URL = os.environ.get("DATABASE_URL")`,
        comment: "Никогда не пишите пароли и ключи прямо в коде",
      },
    ],
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
            {topics.map((topic) => <SectionCard key={topic.title} topic={topic} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
