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
