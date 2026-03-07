import Icon from "@/components/ui/icon";

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
