import Icon from "@/components/ui/icon";

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
