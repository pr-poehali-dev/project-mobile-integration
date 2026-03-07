import Icon from "@/components/ui/icon";

// ─── Раздел 2: Структуры данных ───────────────────────────────────────────────

export function ListChart() {
  const items = ["яблоко", "банан", "вишня", "груша"];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Список: индекс → значение</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item, i) => (
          <div key={i} className="border border-primary/40 bg-primary/5 rounded-sm overflow-hidden">
            <div className="bg-primary/15 px-2 py-1 text-center text-xs font-mono text-primary/60">[{i}]</div>
            <div className="px-3 py-2 text-xs font-mono text-primary">{item}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Icon name="Info" size={12} />
        Нумерация начинается с 0. fruits[0] = "яблоко", fruits[3] = "груша".
      </p>
    </div>
  );
}

export function DictChart() {
  const pairs = [
    { key: "имя", value: "Иван", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
    { key: "возраст", value: "30", color: "border-green-500/40 bg-green-500/5 text-green-400" },
    { key: "город", value: "Москва", color: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Словарь: ключ → значение</p>
      <div className="flex flex-col gap-2">
        {pairs.map((p) => (
          <div key={p.key} className="flex items-center gap-2">
            <div className={`border rounded-sm px-3 py-2 text-xs font-mono font-bold w-28 text-center ${p.color}`}>"{p.key}"</div>
            <Icon name="ArrowRight" size={14} className="text-primary/30 shrink-0" />
            <div className={`border rounded-sm px-3 py-2 text-xs font-mono flex-1 ${p.color}`}>"{p.value}"</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Доступ по ключу: person["имя"] → "Иван". Ключи уникальны.
      </p>
    </div>
  );
}

export function SetTupleChart() {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Кортеж vs Множество</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="border border-purple-500/30 bg-purple-500/5 rounded-sm p-3">
          <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-2">Кортеж (tuple) — неизменяемый</p>
          <div className="font-mono text-xs text-purple-300">(55.75, 37.62)</div>
          <p className="text-xs text-muted-foreground mt-1">Данные зафиксированы навсегда. Координаты, настройки.</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
            <Icon name="Lock" size={11} /> Нельзя изменить после создания
          </div>
        </div>
        <div className="border border-orange-500/30 bg-orange-500/5 rounded-sm p-3">
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-2">Множество (set) — уникальные</p>
          <div className="font-mono text-xs text-orange-300">{"{'python', 'код', 'обучение'}"}</div>
          <p className="text-xs text-muted-foreground mt-1">Дубликаты удаляются автоматически.</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
            <Icon name="Filter" size={11} /> Автоматически убирает повторы
          </div>
        </div>
      </div>
    </div>
  );
}

export function ListComprehensionChart() {
  const steps = [
    { label: "Исходный список", code: "[1, 2, 3, 4, 5]", color: "border-primary/40 bg-primary/5 text-primary" },
    { label: "Выражение", code: "n ** 2 for n in ...", color: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400" },
    { label: "Результат", code: "[1, 4, 9, 16, 25]", color: "border-green-500/40 bg-green-500/5 text-green-400" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">List comprehension: одна строка вместо цикла</p>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex sm:flex-row flex-col items-center gap-2 w-full sm:w-auto sm:flex-1">
            <div className={`border rounded-sm p-3 text-center w-full ${s.color}`}>
              <p className="text-xs opacity-60 mb-1">{s.label}</p>
              <code className="text-xs font-mono">{s.code}</code>
            </div>
            {i < steps.length - 1 && <Icon name="ChevronRight" size={14} className="text-primary/30 shrink-0 hidden sm:block" />}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        [выражение for элемент in коллекция if условие] — полная форма.
      </p>
    </div>
  );
}

// ─── Раздел 3: Функции ────────────────────────────────────────────────────────

export function FuncScopeChart() {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Область видимости: глобальная vs локальная</p>
      <div className="border border-border rounded-sm p-4 bg-background">
        <div className="border border-primary/30 bg-primary/5 rounded-sm p-3 mb-2">
          <p className="text-xs text-primary/60 uppercase tracking-wider mb-1">Глобальная область</p>
          <code className="text-xs font-mono text-primary">x = 10  <span className="text-primary/40"># видна везде</span></code>
        </div>
        <div className="ml-4 border border-yellow-500/30 bg-yellow-500/5 rounded-sm p-3">
          <p className="text-xs text-yellow-400/80 uppercase tracking-wider mb-1">Локальная (внутри функции)</p>
          <code className="text-xs font-mono text-yellow-300">x = 99  <span className="text-yellow-400/40"># отдельная переменная!</span></code>
          <p className="text-xs text-muted-foreground mt-1">Не меняет глобальную x.</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Переменные внутри функции существуют только во время её выполнения.
      </p>
    </div>
  );
}

export function ArgsKwargsChart() {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Виды аргументов функции</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { name: "Обычный", syntax: "def f(a, b)", desc: "Строгий порядок при вызове", color: "border-primary/40 text-primary" },
          { name: "По умолчанию", syntax: 'def f(a, b="x")', desc: "Можно не передавать", color: "border-blue-500/40 text-blue-400" },
          { name: "*args", syntax: "def f(*args)", desc: "Любое число позиционных", color: "border-green-500/40 text-green-400" },
          { name: "**kwargs", syntax: "def f(**kw)", desc: "Любое число именованных", color: "border-yellow-500/40 text-yellow-400" },
        ].map((a) => (
          <div key={a.name} className={`border rounded-sm p-3 bg-background ${a.color}`}>
            <p className="text-xs font-semibold mb-1">{a.name}</p>
            <code className="text-xs font-mono block mb-1">{a.syntax}</code>
            <p className="text-xs text-muted-foreground">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LambdaChart() {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Lambda: обычная функция vs однострочник</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="border border-primary/30 bg-primary/5 rounded-sm p-3">
          <p className="text-xs text-primary/60 uppercase tracking-wider mb-2">Обычная функция</p>
          <pre className="text-xs font-mono text-primary">{`def square(x):\n    return x ** 2`}</pre>
        </div>
        <div className="border border-green-500/30 bg-green-500/5 rounded-sm p-3">
          <p className="text-xs text-green-400/80 uppercase tracking-wider mb-2">Lambda (то же самое)</p>
          <pre className="text-xs font-mono text-green-300">{`square = lambda x: x ** 2`}</pre>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Lambda удобна там, где функция нужна один раз — в sort(), map(), filter().
      </p>
    </div>
  );
}

// ─── Раздел 4: ООП ────────────────────────────────────────────────────────────

export function ClassObjectChart() {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Класс — шаблон. Объект — экземпляр.</p>
      <div className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="border-2 border-primary bg-primary/10 rounded-sm p-4 sm:w-48">
          <p className="text-xs text-primary/60 uppercase tracking-wider mb-2">Класс Dog</p>
          <div className="text-xs font-mono text-primary space-y-1">
            <div className="text-yellow-400">def __init__(self):</div>
            <div className="pl-2 text-primary/70">self.name</div>
            <div className="pl-2 text-primary/70">self.age</div>
            <div className="text-blue-400">def bark(self):</div>
            <div className="pl-2 text-primary/70">return "Гав!"</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:mt-4">
          <Icon name="ArrowRight" size={16} className="text-primary/40 hidden sm:block" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {[
            { name: "dog1", vals: ['name = "Шарик"', "age = 3"] },
            { name: "dog2", vals: ['name = "Рекс"', "age = 5"] },
          ].map((obj) => (
            <div key={obj.name} className="border border-primary/30 bg-primary/5 rounded-sm p-3">
              <p className="text-xs text-primary/60 uppercase tracking-wider mb-1">Объект {obj.name}</p>
              {obj.vals.map((v) => <div key={v} className="text-xs font-mono text-primary">{v}</div>)}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Один класс — неограниченное число объектов с разными данными.
      </p>
    </div>
  );
}

export function InheritanceChart() {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Наследование: от общего к частному</p>
      <div className="flex flex-col items-center gap-0">
        <div className="border-2 border-primary bg-primary/10 rounded-sm px-6 py-3 text-center">
          <p className="text-xs text-primary/60 uppercase tracking-wider">Родитель</p>
          <p className="text-sm font-mono text-primary font-bold">Animal</p>
          <p className="text-xs text-primary/60">name, speak()</p>
        </div>
        <div className="w-px h-4 bg-primary/30" />
        <div className="flex gap-4">
          {["Dog", "Cat"].map((cls, i) => (
            <div key={cls} className="flex flex-col items-center">
              <div className="w-px h-4 bg-primary/30" />
              <div className={`border rounded-sm px-4 py-2 text-center ${i === 0 ? "border-blue-500/40 bg-blue-500/5" : "border-green-500/40 bg-green-500/5"}`}>
                <p className="text-xs opacity-60 uppercase tracking-wider">Дочерний</p>
                <p className={`text-sm font-mono font-bold ${i === 0 ? "text-blue-400" : "text-green-400"}`}>{cls}</p>
                <p className="text-xs opacity-60">{i === 0 ? 'speak()→"Гав!"' : 'speak()→"Мяу!"'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Дочерний класс получает все методы родителя и может переопределить любой из них.
      </p>
    </div>
  );
}

export function EncapsulationChart() {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Инкапсуляция: публичные и приватные атрибуты</p>
      <div className="border border-border rounded-sm p-4 bg-background">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-green-400 uppercase tracking-wider mb-2">Публичные (доступны снаружи)</p>
            <div className="space-y-1">
              <code className="text-xs font-mono block text-green-300">self.name = "Иван"</code>
              <code className="text-xs font-mono block text-green-300">acc.deposit(100)</code>
            </div>
          </div>
          <div>
            <p className="text-xs text-red-400 uppercase tracking-wider mb-2">Приватные (только внутри)</p>
            <div className="space-y-1">
              <code className="text-xs font-mono block text-red-300">self.__balance = 0</code>
              <code className="text-xs font-mono block text-red-300">self.__pin = 1234</code>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Двойное подчёркивание __ делает атрибут приватным — защищает данные от случайного изменения.
      </p>
    </div>
  );
}

// ─── Раздел 5: Веб-разработка ─────────────────────────────────────────────────

export function HttpMethodsChart() {
  const methods = [
    { method: "GET", desc: "Получить данные", example: "GET /users", color: "border-green-500/40 bg-green-500/5 text-green-400" },
    { method: "POST", desc: "Создать запись", example: "POST /users", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
    { method: "PUT", desc: "Обновить запись", example: "PUT /users/1", color: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400" },
    { method: "DELETE", desc: "Удалить запись", example: "DELETE /users/1", color: "border-red-500/40 bg-red-500/5 text-red-400" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">HTTP-методы: что делает каждый</p>
      <div className="grid sm:grid-cols-2 gap-2">
        {methods.map((m) => (
          <div key={m.method} className={`border rounded-sm p-3 flex gap-3 items-start ${m.color}`}>
            <span className="font-mono font-bold text-sm shrink-0 w-16">{m.method}</span>
            <div>
              <p className="text-xs font-semibold">{m.desc}</p>
              <code className="text-xs opacity-60">{m.example}</code>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        REST API строится на этих четырёх методах — CRUD через HTTP.
      </p>
    </div>
  );
}

export function FlaskFastAPIChart() {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Flask vs FastAPI: когда что выбрать</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="border border-primary/30 bg-primary/5 rounded-sm p-4">
          <p className="text-sm font-bold text-primary mb-2">Flask</p>
          <ul className="space-y-1">
            {["Простой старт", "Гибкая архитектура", "Большое комьюнити", "Идеален для обучения"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Check" size={11} className="text-green-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-yellow-500/30 bg-yellow-500/5 rounded-sm p-4">
          <p className="text-sm font-bold text-yellow-400 mb-2">FastAPI</p>
          <ul className="space-y-1">
            {["В 3× быстрее Flask", "Авто-документация", "Валидация типов", "Современный стандарт"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Zap" size={11} className="text-yellow-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RequestFlowChart() {
  const steps = [
    { icon: "Monitor", label: "Браузер", sub: "GET /hello/Иван", color: "border-primary/40 bg-primary/5 text-primary" },
    { icon: "Globe", label: "Flask/FastAPI", sub: "@app.route()", color: "border-primary/60 bg-primary/10 text-primary" },
    { icon: "Code2", label: "Функция", sub: "def hello(name):", color: "border-primary/40 bg-primary/5 text-primary/80" },
    { icon: "ArrowLeft", label: "Ответ", sub: "JSON / HTML", color: "border-green-500/40 bg-green-500/5 text-green-400" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Путь запроса: браузер → сервер → ответ</p>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-0">
        {steps.map((s, i) => (
          <div key={s.label} className="flex sm:flex-row flex-col items-center w-full sm:w-auto sm:flex-1">
            <div className={`border rounded-sm p-3 flex flex-col items-center gap-1 text-center w-full ${s.color}`}>
              <Icon name={s.icon} size={18} />
              <span className="text-xs font-semibold">{s.label}</span>
              <span className="text-xs opacity-60">{s.sub}</span>
            </div>
            {i < steps.length - 1 && (
              <Icon name="ChevronRight" size={14} className="text-primary/30 shrink-0 hidden sm:block mx-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Раздел 6: Базы данных ────────────────────────────────────────────────────

export function CRUDChart() {
  const ops = [
    { op: "CREATE", sql: "INSERT INTO", py: "session.add(obj)", color: "border-green-500/40 bg-green-500/5 text-green-400" },
    { op: "READ", sql: "SELECT *", py: "session.query()", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
    { op: "UPDATE", sql: "UPDATE SET", py: "obj.field = val", color: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400" },
    { op: "DELETE", sql: "DELETE FROM", py: "session.delete(obj)", color: "border-red-500/40 bg-red-500/5 text-red-400" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">CRUD: четыре операции с любой базой данных</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ops.map((o) => (
          <div key={o.op} className={`border rounded-sm p-3 flex flex-col gap-1 ${o.color}`}>
            <span className="font-bold text-sm">{o.op}</span>
            <code className="text-xs opacity-70 font-mono">{o.sql}</code>
            <code className="text-xs opacity-50 font-mono">{o.py}</code>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Любое приложение с данными использует эти четыре операции.
      </p>
    </div>
  );
}

export function DBStackChart() {
  const dbs = [
    { name: "SQLite", use: "Обучение, небольшие проекты", setup: "Встроен в Python", color: "border-primary/40 text-primary" },
    { name: "PostgreSQL", use: "Продакшн, большие данные", setup: "pip install psycopg2", color: "border-blue-500/40 text-blue-400" },
    { name: "SQLAlchemy", use: "ORM-прослойка", setup: "pip install sqlalchemy", color: "border-yellow-500/40 text-yellow-400" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Когда какую базу выбрать</p>
      <div className="space-y-2">
        {dbs.map((d) => (
          <div key={d.name} className={`border rounded-sm p-3 flex gap-4 items-center ${d.color} bg-background`}>
            <span className="font-mono font-bold text-sm w-24 shrink-0">{d.name}</span>
            <div className="flex-1">
              <p className="text-xs font-semibold">{d.use}</p>
              <code className="text-xs opacity-60">{d.setup}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PandasFlowChart() {
  const steps = [
    { icon: "FileText", label: "CSV / Excel / SQL", color: "border-primary/40 bg-primary/5 text-primary" },
    { icon: "Table", label: "DataFrame", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
    { icon: "Filter", label: "Фильтр / Группировка", color: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400" },
    { icon: "BarChart2", label: "Отчёт / График", color: "border-green-500/40 bg-green-500/5 text-green-400" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Pandas: путь от данных до результата</p>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-0">
        {steps.map((s, i) => (
          <div key={s.label} className="flex sm:flex-row flex-col items-center w-full sm:flex-1">
            <div className={`border rounded-sm p-3 flex flex-col items-center gap-1 text-center w-full ${s.color}`}>
              <Icon name={s.icon} size={18} />
              <span className="text-xs font-semibold leading-tight">{s.label}</span>
            </div>
            {i < steps.length - 1 && <Icon name="ChevronRight" size={14} className="text-primary/30 shrink-0 hidden sm:block mx-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Раздел 7: Автоматизация ──────────────────────────────────────────────────

export function FileOpsChart() {
  const ops = [
    { action: "Прочитать", func: "open('f.txt', 'r')", icon: "FileText", color: "border-blue-500/40 text-blue-400" },
    { action: "Записать", func: "open('f.txt', 'w')", icon: "FilePen", color: "border-green-500/40 text-green-400" },
    { action: "Добавить", func: "open('f.txt', 'a')", icon: "FilePlus", color: "border-yellow-500/40 text-yellow-400" },
    { action: "Переименовать", func: "os.rename(old, new)", icon: "FolderInput", color: "border-primary/40 text-primary" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Режимы работы с файлами</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ops.map((o) => (
          <div key={o.action} className={`border rounded-sm p-3 flex flex-col gap-1 bg-background ${o.color}`}>
            <Icon name={o.icon} size={16} />
            <span className="font-semibold text-xs">{o.action}</span>
            <code className="text-xs opacity-60 font-mono leading-tight">{o.func}</code>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Конструкция with open() автоматически закрывает файл после работы.
      </p>
    </div>
  );
}

export function ScrapingFlowChart() {
  const steps = [
    { icon: "Globe", label: "requests.get(url)", sub: "Скачать HTML", color: "border-primary/40 bg-primary/5 text-primary" },
    { icon: "Code2", label: "BeautifulSoup", sub: "Разобрать HTML", color: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400" },
    { icon: "Search", label: "find / find_all", sub: "Найти элементы", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
    { icon: "Save", label: "Сохранить данные", sub: "CSV / JSON / DB", color: "border-green-500/40 bg-green-500/5 text-green-400" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Парсинг: от сайта до данных</p>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-0">
        {steps.map((s, i) => (
          <div key={s.label} className="flex sm:flex-row flex-col items-center w-full sm:flex-1">
            <div className={`border rounded-sm p-3 flex flex-col items-center gap-1 text-center w-full ${s.color}`}>
              <Icon name={s.icon} size={18} />
              <span className="text-xs font-semibold leading-tight">{s.label}</span>
              <span className="text-xs opacity-60">{s.sub}</span>
            </div>
            {i < steps.length - 1 && <Icon name="ChevronRight" size={14} className="text-primary/30 shrink-0 hidden sm:block mx-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TelegramBotChart() {
  const flow = [
    { from: "Пользователь", msg: "/start", dir: "→" },
    { from: "Bot", msg: "CommandHandler('start', fn)", dir: "→" },
    { from: "fn(update, ctx)", msg: "reply_text('Привет!')", dir: "→" },
    { from: "Telegram API", msg: "Сообщение доставлено", dir: "" },
  ];
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Как работает телеграм-бот</p>
      <div className="border border-border rounded-sm p-4 bg-background space-y-2">
        {flow.map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-mono">
            <span className="text-primary/60 w-32 shrink-0">{f.from}</span>
            {f.dir && <Icon name="ArrowRight" size={12} className="text-primary/30 shrink-0" />}
            <span className="text-primary">{f.msg}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Бот слушает входящие сообщения через run_polling() и реагирует на команды.
      </p>
    </div>
  );
}

// ─── Раздел 8: Реальные проекты ───────────────────────────────────────────────

export function ProjectArchChart({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="mb-2">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">Архитектура проекта: {title}</p>
      <div className="flex flex-col gap-1">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{i + 1}</div>
            <div className="border border-border bg-background rounded-sm px-3 py-2 text-xs text-muted-foreground flex-1">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
