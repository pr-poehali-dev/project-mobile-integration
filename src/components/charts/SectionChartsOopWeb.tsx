import Icon from "@/components/ui/icon";

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
