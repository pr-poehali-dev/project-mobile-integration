import Icon from "@/components/ui/icon";

export function ProgramStructureChart() {
  const layers = [
    {
      label: "Программа",
      sublabel: "файл .py",
      color: "border-primary bg-primary/10 text-primary",
      dot: "bg-primary",
      desc: "Весь код целиком",
      width: "w-full",
    },
    {
      label: "Функции",
      sublabel: "def greet():",
      color: "border-primary/70 bg-primary/7 text-primary/90",
      dot: "bg-primary/70",
      desc: "Именованные блоки инструкций",
      width: "w-11/12",
    },
    {
      label: "Инструкции",
      sublabel: 'name = "Алексей"',
      color: "border-primary/50 bg-primary/5 text-primary/80",
      dot: "bg-primary/50",
      desc: "Отдельные команды, строка за строкой",
      width: "w-10/12",
    },
    {
      label: "Выражения",
      sublabel: '2 + 2 / "текст" / name',
      color: "border-primary/35 bg-primary/3 text-primary/70",
      dot: "bg-primary/35",
      desc: "Части инструкций, которые вычисляются",
      width: "w-9/12",
    },
    {
      label: "Значения",
      sublabel: '25 / "Привет" / True',
      color: "border-primary/20 bg-transparent text-primary/60",
      dot: "bg-primary/20",
      desc: "Числа, строки, булевы — минимальные единицы данных",
      width: "w-8/12",
    },
  ];

  return (
    <div className="mb-6">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-4">Иерархия структуры программы</p>
      <div className="flex flex-col items-center gap-2">
        {layers.map((layer, i) => (
          <div key={layer.label} className={`${layer.width} transition-all`}>
            <div className={`border rounded-sm px-4 py-3 flex items-center justify-between gap-4 ${layer.color}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${layer.dot}`} />
                <div>
                  <span className="font-semibold text-sm">{layer.label}</span>
                  <span className="text-xs opacity-60 ml-2 font-mono">{layer.sublabel}</span>
                </div>
              </div>
              <span className="text-xs opacity-60 hidden sm:block text-right shrink-0">{layer.desc}</span>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center">
                <div className="w-px h-3 bg-primary/20" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Каждый уровень содержит элементы уровня ниже. Интерпретатор обходит дерево сверху вниз.
      </p>
    </div>
  );
}

export function InterpreterFlowChart() {
  const steps = [
    { icon: "FileText", label: "Исходный код", sub: "файл .py на диске", color: "text-primary border-primary/40 bg-primary/5" },
    { icon: "Cpu", label: "Интерпретатор Python", sub: "читает код строку за строкой", color: "text-primary border-primary/60 bg-primary/10" },
    { icon: "Zap", label: "Байт-код", sub: "промежуточное представление", color: "text-primary/80 border-primary/40 bg-primary/5" },
    { icon: "Monitor", label: "Результат", sub: "вывод на экран / данные", color: "text-primary border-primary/60 bg-primary/10" },
  ];

  return (
    <div className="mb-6">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-4">Путь кода от файла до результата</p>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex sm:flex-row flex-col items-center w-full sm:w-auto sm:flex-1">
            <div className={`border rounded-sm p-3 flex flex-col items-center gap-1 text-center w-full sm:w-auto ${step.color}`}>
              <Icon name={step.icon} size={20} />
              <span className="text-xs font-semibold leading-tight">{step.label}</span>
              <span className="text-xs opacity-60 leading-tight">{step.sub}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex sm:flex-row flex-col items-center shrink-0">
                <div className="w-px h-4 sm:w-6 sm:h-px bg-primary/30" />
                <Icon name="ChevronDown" size={12} className="text-primary/40 sm:hidden" />
                <Icon name="ChevronRight" size={12} className="text-primary/40 hidden sm:block" />
                <div className="w-px h-4 sm:w-6 sm:h-px bg-primary/30" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Python компилирует код в байт-код автоматически — разработчику этот этап не виден.
      </p>
    </div>
  );
}

export function VariablesChart() {
  const types = [
    { type: "str", example: '"Алексей"', desc: "Текст (строка)", color: "border-blue-500/40 bg-blue-500/5 text-blue-400" },
    { type: "int", example: "25", desc: "Целое число", color: "border-green-500/40 bg-green-500/5 text-green-400" },
    { type: "float", example: "1.82", desc: "Дробное число", color: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400" },
    { type: "bool", example: "True / False", desc: "Истина или ложь", color: "border-purple-500/40 bg-purple-500/5 text-purple-400" },
  ];
  return (
    <div className="mb-6">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-4">Типы данных и оперативная память</p>
      <div className="border border-border rounded-sm p-4 bg-background mb-3">
        <p className="text-xs text-muted-foreground mb-3 font-mono">name = "Алексей" <span className="text-primary/40"># переменная → значение → тип</span></p>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center mb-4">
          <div className="border border-primary/40 bg-primary/5 rounded-sm px-3 py-2 text-xs font-mono text-primary">name</div>
          <div className="flex items-center gap-1 text-primary/40 text-xs">
            <div className="w-8 h-px bg-primary/30 hidden sm:block" />
            <span>=</span>
            <div className="w-8 h-px bg-primary/30 hidden sm:block" />
          </div>
          <div className="border border-blue-500/40 bg-blue-500/5 rounded-sm px-3 py-2 text-xs font-mono text-blue-400">"Алексей"</div>
          <div className="flex items-center gap-1 text-primary/40 text-xs">
            <div className="w-4 h-px bg-primary/30 hidden sm:block" />
            <span className="text-primary/40">тип:</span>
          </div>
          <div className="border border-blue-500/60 bg-blue-500/10 rounded-sm px-3 py-2 text-xs font-semibold text-blue-400">str</div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {types.map(t => (
          <div key={t.type} className={`border rounded-sm p-3 flex flex-col gap-1 ${t.color}`}>
            <span className="font-mono font-bold text-sm">{t.type}</span>
            <span className="font-mono text-xs opacity-70">{t.example}</span>
            <span className="text-xs opacity-60 leading-tight">{t.desc}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Python определяет тип автоматически — явно указывать его не требуется.
      </p>
    </div>
  );
}

export function IOFlowChart() {
  return (
    <div className="mb-6">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-4">Схема взаимодействия программы с пользователем</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-border rounded-sm p-4 bg-background">
          <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">input() — ввод</p>
          <div className="flex flex-col gap-2">
            <div className="border border-primary/30 bg-primary/5 rounded-sm px-3 py-2 text-xs text-center text-primary/80">Пользователь вводит данные</div>
            <div className="flex justify-center"><div className="w-px h-3 bg-primary/30" /><Icon name="ChevronDown" size={12} className="text-primary/40 -mt-1" /></div>
            <div className="border border-primary/40 bg-primary/10 rounded-sm px-3 py-2 text-xs font-mono text-center text-primary">input("Как тебя зовут? ")</div>
            <div className="flex justify-center"><div className="w-px h-3 bg-primary/30" /><Icon name="ChevronDown" size={12} className="text-primary/40 -mt-1" /></div>
            <div className="border border-green-500/40 bg-green-500/5 rounded-sm px-3 py-2 text-xs font-mono text-center text-green-400">name = "Алексей" <span className="opacity-60">(str)</span></div>
          </div>
        </div>
        <div className="border border-border rounded-sm p-4 bg-background">
          <p className="text-xs text-primary/70 uppercase tracking-widest mb-3">print() — вывод</p>
          <div className="flex flex-col gap-2">
            <div className="border border-green-500/40 bg-green-500/5 rounded-sm px-3 py-2 text-xs font-mono text-center text-green-400">name = "Алексей"</div>
            <div className="flex justify-center"><div className="w-px h-3 bg-primary/30" /><Icon name="ChevronDown" size={12} className="text-primary/40 -mt-1" /></div>
            <div className="border border-primary/40 bg-primary/10 rounded-sm px-3 py-2 text-xs font-mono text-center text-primary">print(f"Привет, {"{name}"}!")</div>
            <div className="flex justify-center"><div className="w-px h-3 bg-primary/30" /><Icon name="ChevronDown" size={12} className="text-primary/40 -mt-1" /></div>
            <div className="border border-primary/30 bg-primary/5 rounded-sm px-3 py-2 text-xs text-center text-primary/80">Экран: Привет, Алексей!</div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <Icon name="Info" size={12} />
        input() всегда возвращает строку (str). Для работы с числами требуется явное преобразование: int(input(...))
      </p>
    </div>
  );
}

export function ConditionsChart() {
  return (
    <div className="mb-6">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-4">Дерево принятия решений (if / elif / else)</p>
      <div className="border border-border rounded-sm p-4 bg-background">
        <div className="flex flex-col items-center gap-0">
          <div className="border border-primary/50 bg-primary/10 rounded-sm px-4 py-2 text-xs font-mono text-primary">age = 20</div>
          <div className="w-px h-4 bg-primary/30" />
          <div className="border-2 border-primary bg-primary/15 rounded-sm px-4 py-2 text-xs font-mono text-primary font-bold">if age &gt;= 18 ?</div>
          <div className="flex items-start gap-8 sm:gap-16 mt-0">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-green-500/50" />
                <span className="text-xs text-green-400 font-semibold">True</span>
                <div className="w-px h-3 bg-green-500/50" />
              </div>
              <div className="border border-green-500/40 bg-green-500/5 rounded-sm px-3 py-2 text-xs text-green-400 text-center">"Совершеннолетний"</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-red-500/50" />
                <span className="text-xs text-red-400 font-semibold">False</span>
                <div className="w-px h-3 bg-red-500/50" />
              </div>
              <div className="border-2 border-yellow-500/50 bg-yellow-500/10 rounded-sm px-3 py-2 text-xs text-yellow-400 text-center font-bold">elif age &gt;= 14 ?</div>
              <div className="flex items-start gap-4 mt-0">
                <div className="flex flex-col items-center">
                  <div className="w-px h-3 bg-green-500/50" />
                  <span className="text-xs text-green-400 font-semibold">True</span>
                  <div className="w-px h-3 bg-green-500/50" />
                  <div className="border border-green-500/40 bg-green-500/5 rounded-sm px-2 py-1 text-xs text-green-400">"Подросток"</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-px h-3 bg-red-500/50" />
                  <span className="text-xs text-red-400 font-semibold">False</span>
                  <div className="w-px h-3 bg-red-500/50" />
                  <div className="border border-primary/30 bg-primary/5 rounded-sm px-2 py-1 text-xs text-primary/60">else: "Ребёнок"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <Icon name="Info" size={12} />
        Как только одна ветка срабатывает — остальные не проверяются. Порядок условий имеет значение.
      </p>
    </div>
  );
}

export function LoopsChart() {
  return (
    <div className="mb-6">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-4">Схема работы циклов for и while</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-border rounded-sm p-4 bg-background">
          <p className="text-xs text-primary/60 uppercase tracking-widest mb-3 font-semibold">for — перебор</p>
          <div className="flex flex-col items-center gap-0">
            <div className="border border-primary/40 bg-primary/5 rounded-sm px-3 py-2 text-xs font-mono text-primary w-full text-center">range(5) → [0,1,2,3,4]</div>
            <div className="w-px h-3 bg-primary/30" />
            <div className="border-2 border-primary/60 bg-primary/10 rounded-sm px-3 py-2 text-xs font-mono text-primary w-full text-center font-bold">i = следующий элемент</div>
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-px h-3 bg-green-500/50" />
                <span className="text-xs text-green-400">есть</span>
                <div className="w-px h-3 bg-green-500/50" />
                <div className="border border-green-500/30 bg-green-500/5 rounded-sm px-2 py-1 text-xs text-green-400 text-center">print(i)</div>
                <div className="text-xs text-primary/40 mt-1">↑ повтор</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-3 bg-red-500/50" />
                <span className="text-xs text-red-400">нет</span>
                <div className="w-px h-3 bg-red-500/50" />
                <div className="border border-primary/30 bg-primary/5 rounded-sm px-2 py-1 text-xs text-primary/60">стоп</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-border rounded-sm p-4 bg-background">
          <p className="text-xs text-primary/60 uppercase tracking-widest mb-3 font-semibold">while — условие</p>
          <div className="flex flex-col items-center gap-0">
            <div className="border border-primary/40 bg-primary/5 rounded-sm px-3 py-2 text-xs font-mono text-primary w-full text-center">count = 0</div>
            <div className="w-px h-3 bg-primary/30" />
            <div className="border-2 border-primary/60 bg-primary/10 rounded-sm px-3 py-2 text-xs font-mono text-primary w-full text-center font-bold">count &lt; 3 ?</div>
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-px h-3 bg-green-500/50" />
                <span className="text-xs text-green-400">True</span>
                <div className="w-px h-3 bg-green-500/50" />
                <div className="border border-green-500/30 bg-green-500/5 rounded-sm px-2 py-1 text-xs text-green-400 text-center">print(count)<br />count += 1</div>
                <div className="text-xs text-primary/40 mt-1">↑ повтор</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-3 bg-red-500/50" />
                <span className="text-xs text-red-400">False</span>
                <div className="w-px h-3 bg-red-500/50" />
                <div className="border border-primary/30 bg-primary/5 rounded-sm px-2 py-1 text-xs text-primary/60">стоп</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        <Icon name="Info" size={12} />
        В цикле while обязательно изменять переменную условия — иначе цикл никогда не завершится.
      </p>
    </div>
  );
}

export function FunctionsChart() {
  return (
    <div className="mb-6">
      <p className="text-xs text-primary/70 uppercase tracking-widest mb-4">Анатомия функции и механизм вызова</p>
      <div className="border border-border rounded-sm p-4 bg-background mb-3">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-primary/50 uppercase tracking-wider mb-2">Объявление (def)</p>
            <div className="flex flex-col gap-1">
              <div className="border border-primary/50 bg-primary/10 rounded-t-sm px-3 py-2 text-xs font-mono text-primary">
                <span className="text-yellow-400">def</span> greet(<span className="text-blue-400">name</span>):
              </div>
              <div className="border-l border-r border-primary/20 bg-primary/3 px-3 py-2 text-xs font-mono text-primary/70 pl-6">
                message = f"Привет, {"{name}"}!"
              </div>
              <div className="border border-primary/20 bg-primary/3 rounded-b-sm px-3 py-2 text-xs font-mono text-primary/70 pl-6">
                <span className="text-green-400">return</span> message
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-yellow-400 font-mono font-bold">def</span>
                <span className="text-muted-foreground">— объявление функции</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-blue-400 font-mono font-bold">name</span>
                <span className="text-muted-foreground">— параметр (входные данные)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-400 font-mono font-bold">return</span>
                <span className="text-muted-foreground">— возвращаемое значение</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs text-primary/50 uppercase tracking-wider mb-2">Вызов (3 раза)</p>
            <div className="flex flex-col gap-2">
              {["Алексей", "Мария", "Иван"].map((name) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="border border-primary/30 bg-primary/5 rounded-sm px-2 py-1 text-xs font-mono text-primary shrink-0">greet("{name}")</div>
                  <Icon name="ArrowRight" size={12} className="text-primary/30 shrink-0" />
                  <div className="border border-green-500/30 bg-green-500/5 rounded-sm px-2 py-1 text-xs text-green-400">Привет, {name}!</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Функция написана <span className="text-primary">1 раз</span>, вызвана <span className="text-primary">3 раза</span> — принцип DRY</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Icon name="Info" size={12} />
        Объявление функции не выполняет её. Код внутри выполняется только при вызове по имени.
      </p>
    </div>
  );
}
