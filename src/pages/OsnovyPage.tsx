import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

function ProgramStructureChart() {
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
      sublabel: "name = \"Алексей\"",
      color: "border-primary/50 bg-primary/5 text-primary/80",
      dot: "bg-primary/50",
      desc: "Отдельные команды, строка за строкой",
      width: "w-10/12",
    },
    {
      label: "Выражения",
      sublabel: "2 + 2 / \"текст\" / name",
      color: "border-primary/35 bg-primary/3 text-primary/70",
      dot: "bg-primary/35",
      desc: "Части инструкций, которые вычисляются",
      width: "w-9/12",
    },
    {
      label: "Значения",
      sublabel: "25 / \"Привет\" / True",
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

function InterpreterFlowChart() {
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

function VariablesChart() {
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

function IOFlowChart() {
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

function ConditionsChart() {
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

function LoopsChart() {
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
                <div className="border border-green-500/30 bg-green-500/5 rounded-sm px-2 py-1 text-xs text-green-400 text-center">print(count)<br/>count += 1</div>
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

function FunctionsChart() {
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

interface Step {
  label: string;
  text: string;
}

interface Topic {
  title: string;
  icon: string;
  intro: string;
  steps?: Step[];
  link?: string;
  image?: { src: string; caption: string };
  visual?: "structure" | "interpreter" | "variables" | "io" | "conditions" | "loops" | "functions";
  blocks: { label: string; code: string; comment?: string }[];
}

const topics: Topic[] = [
  {
    title: "Установка Python",
    icon: "Download",
    intro: "Python — это высокоуровневый интерпретируемый язык программирования. «Высокоуровневый» означает, что команды пишутся близко к человеческому языку, а не к машинному коду. «Интерпретируемый» — команды выполняются построчно, сразу, без предварительной компиляции. Чтобы компьютер понимал Python-код, необходимо установить интерпретатор — программу, которая читает и исполняет этот код.",
    link: "https://www.python.org/downloads/",
    steps: [
      { label: "Шаг 1", text: "Скачай Python по кнопке ниже. При установке обязательно поставь галочку «Add Python to PATH» — это добавит Python в системные переменные окружения, без чего запуск из командной строки невозможен." },
      { label: "Шаг 2", text: "После установки нажми Win+R, введи cmd и нажми Enter. Откроется командная строка — текстовый интерфейс операционной системы, через который можно отправлять команды напрямую." },
      { label: "Шаг 3", text: "Введи команду проверки версии и нажми Enter. Если система вывела номер версии — интерпретатор Python успешно установлен и зарегистрирован в системе." },
    ],
    visual: "interpreter",
    blocks: [
      {
        label: "Команда для проверки (вводить в командной строке cmd):",
        code: "py --version",
        comment: "Если команда py не распознана системой, используйте: python --version",
      },
      {
        label: "Ожидаемый вывод:",
        code: "Python 3.11.0",
        comment: "Номер версии может отличаться — важно само наличие ответа от интерпретатора",
      },
    ],
  },
  {
    title: "Структура программы на Python",
    icon: "Layers",
    intro: "Любая программа на Python — это текстовый файл с расширением .py, содержащий последовательность инструкций. Интерпретатор читает этот файл сверху вниз и выполняет каждую инструкцию по очереди. Понимание того, из чего состоит программа, принципиально важно перед написанием первого кода.",
    steps: [
      {
        label: "Программа",
        text: "Программа — это файл с набором инструкций, записанных на языке Python. Интерпретатор исполняет их последовательно, строка за строкой, если не указано иное (условия, циклы, функции).",
      },
      {
        label: "Инструкция",
        text: "Инструкция (или оператор) — это одна команда в программе. Например: присвоить значение переменной, вывести текст на экран, вызвать функцию. Каждая инструкция, как правило, занимает одну строку.",
      },
      {
        label: "Выражение",
        text: "Выражение — это часть инструкции, которая вычисляется и возвращает значение. Например: 2 + 2, «Привет», name. Выражения могут быть числовыми, строковыми, логическими.",
      },
      {
        label: "Переменная",
        text: "Переменная — это именованная область памяти, в которой хранится значение. Инструкция присваивания (знак =) помещает значение в переменную, чтобы использовать его позже.",
      },
      {
        label: "Функция",
        text: "Функция — это именованный блок инструкций, который можно вызвать по имени. Функции позволяют не дублировать код и разбивать программу на логические части.",
      },
    ],
    visual: "structure",
    blocks: [],
  },
  {
    title: "Где писать код",
    icon: "FileCode",
    intro: "После установки Python на компьютере появляется среда разработки IDLE (Integrated Development and Learning Environment) — встроенный редактор кода, предназначенный для написания, запуска и отладки Python-программ. Открывается через меню Пуск → IDLE (Python).",
    steps: [
      {
        label: "Что такое IDLE",
        text: "IDLE — интегрированная среда разработки, поставляемая в комплекте с Python. Она предоставляет два режима работы: интерактивная оболочка (Shell) и редактор файлов. Путаница между этими режимами — наиболее распространённая причина ошибок у начинающих.",
      },
      {
        label: "Что такое Shell",
        text: "Shell (интерактивная оболочка) — это режим, в котором интерпретатор ожидает ввода одной инструкции за раз, немедленно исполняет её и выводит результат. Приглашение >>> означает готовность к вводу. Shell удобен для проверки отдельных выражений, но не предназначен для написания многострочных программ.",
      },
      {
        label: "Что такое файл",
        text: "Файл (.py) — это полноценный исходный код программы. В редакторе файлов можно написать произвольное количество инструкций, а затем запустить их все разом. Все примеры из данного курса следует вводить именно в файл, а не в Shell.",
      },
    ],
    blocks: [
      {
        label: "Порядок запуска программы через IDLE:",
        code: `1. Открыть IDLE через меню Пуск
2. File → New File  (откроется редактор файлов)
3. Написать или вставить код в редактор
4. Нажать F5 (или Run → Run Module)
5. При первом запуске IDLE предложит сохранить файл — сохранить в удобное место
6. Результат выполнения отобразится в окне Shell`,
        comment: "Правило: код пишется в файле — результат отображается в Shell",
      },
    ],
  },
  {
    title: "Переменные и типы данных",
    icon: "Box",
    intro: "Переменная — это именованная область оперативной памяти, в которой хранится значение. Оператор присваивания (=) связывает имя переменной с конкретным значением. Python является языком с динамической типизацией: тип переменной определяется автоматически на основе присвоенного значения и может изменяться в ходе выполнения программы.",
    steps: [
      { label: "Оператор присваивания", text: "Запись вида name = «Алексей» означает: «создать переменную с именем name и сохранить в ней строку Алексей». Знак = в программировании не означает равенство — он означает присваивание значения." },
      { label: "Тип str (строка)", text: "Строка — это последовательность символов, заключённая в одинарные или двойные кавычки. Используется для хранения текстовых данных: имён, сообщений, адресов." },
      { label: "Тип int и float", text: "int — целое число (25, 0, -10). float — число с дробной частью (1.82, 3.14). Важно: дробная часть отделяется точкой, а не запятой — в соответствии со стандартом IEEE 754." },
      { label: "Тип bool", text: "Булев тип принимает только два значения: True (истина) или False (ложь). Используется в логических выражениях, условиях и циклах. Именно на сравнении булевых значений строится вся логика программы." },
    ],
    visual: "variables",
    blocks: [
      {
        label: "Код — вводишь в Python (IDLE или файл .py):",
        code: `name = "Алексей"   # текст — всегда в кавычках
age = 25            # целое число
height = 1.82       # дробное число (точка, не запятая!)
is_student = True   # True = да, False = нет

print(name)         # выводим на экран
print(age)
print(height)`,
      },
      {
        label: "Результат на экране:",
        code: `Алексей
25
1.82`,
      },
    ],
  },
  {
    title: "Ввод и вывод данных",
    icon: "Terminal",
    intro: "Взаимодействие программы с пользователем осуществляется через стандартные потоки ввода и вывода. В Python для этого предусмотрены встроенные функции print() и input() — они являются частью стандартной библиотеки и доступны без дополнительного подключения.",
    steps: [
      { label: "Функция print()", text: "Выводит переданное значение в стандартный поток вывода (на экран). Принимает любое количество аргументов: строки, числа, переменные. Это основной инструмент отображения результатов работы программы." },
      { label: "Функция input()", text: "Приостанавливает выполнение программы и ожидает ввода данных от пользователя через стандартный поток ввода. Всегда возвращает значение типа str (строка), вне зависимости от того, что было введено." },
      { label: "f-строки (f-strings)", text: "Форматированные строковые литералы — механизм подстановки значений переменных непосредственно в строку. Обозначаются префиксом f перед кавычками. Переменная или выражение для подстановки заключается в фигурные скобки {}." },
      { label: "Где { } на клавиатуре", text: "Фигурные скобки вводятся в английской раскладке: Shift + [ — открывающая {, Shift + ] — закрывающая }. Убедитесь, что раскладка переключена на английскую перед вводом." },
    ],
    visual: "io",
    blocks: [
      {
        label: "Код:",
        code: `name = input("Как тебя зовут? ")
age = input("Сколько тебе лет? ")
print(f"Привет, {name}! Тебе {age} лет.")`,
      },
      {
        label: "Что видит пользователь:",
        code: `Как тебя зовут? Алексей        ← пользователь вводит имя
Сколько тебе лет? 25            ← пользователь вводит возраст
Привет, Алексей! Тебе 25 лет.  ← программа отвечает`,
      },
    ],
  },
  {
    title: "Условия (if / else)",
    icon: "GitBranch",
    intro: "Условный оператор — основной инструмент управления потоком выполнения программы. Он позволяет выбирать, какой блок инструкций выполнить, в зависимости от истинности логического выражения. Без условий программа выполняла бы одни и те же действия независимо от входных данных.",
    steps: [
      { label: "Оператор if", text: "Вычисляет логическое выражение. Если результат равен True — исполняется вложенный блок инструкций. Если False — блок пропускается. Вложенный блок обозначается обязательным отступом в 4 пробела." },
      { label: "Оператор elif", text: "Сокращение от «else if». Проверяет дополнительное условие, если все предшествующие условия оказались ложными. Количество блоков elif не ограничено." },
      { label: "Оператор else", text: "Исполняется в том случае, если ни одно из предшествующих условий (if и elif) не оказалось истинным. Представляет собой ветку «по умолчанию»." },
      { label: "Отступы (indentation)", text: "В Python отступы — это не стилистический выбор, а синтаксическое требование. Вложенный блок кода должен иметь отступ в 4 пробела относительно оператора if. Нарушение этого правила вызывает ошибку IndentationError." },
    ],
    visual: "conditions",
    blocks: [
      {
        label: "Код:",
        code: `age = 20

if age >= 18:
    print("Ты совершеннолетний")
elif age >= 14:
    print("Ты подросток")
else:
    print("Ты ребёнок")`,
      },
      {
        label: "Результат (age = 20):",
        code: "Ты совершеннолетний",
        comment: "Попробуй поменять age на 15 или 10 — результат изменится",
      },
    ],
  },
  {
    title: "Циклы (for / while)",
    icon: "RefreshCw",
    intro: "Цикл — это управляющая конструкция, обеспечивающая многократное выполнение блока инструкций. Циклы являются основой автоматизации: они позволяют обрабатывать большие объёмы данных и выполнять повторяющиеся операции без дублирования кода.",
    steps: [
      { label: "Цикл for", text: "Цикл с перебором — итерирует по заданной последовательности элементов. Функция range(n) генерирует последовательность целых чисел от 0 до n-1. На каждой итерации переменная-счётчик принимает следующее значение из последовательности." },
      { label: "Цикл while", text: "Цикл с предусловием — выполняет блок инструкций до тех пор, пока логическое выражение остаётся истинным (True). Условие проверяется перед каждой итерацией. Необходимо обеспечить, чтобы условие в конечном счёте стало ложным — иначе возникнет бесконечный цикл." },
    ],
    visual: "loops",
    blocks: [
      {
        label: "Цикл for — выводим числа от 0 до 4:",
        code: `for i in range(5):
    print(i)`,
      },
      {
        label: "Результат:",
        code: `0
1
2
3
4`,
        comment: "range(5) = числа 0, 1, 2, 3, 4 (не включая 5)",
      },
      {
        label: "Цикл while — считаем до 3:",
        code: `count = 0
while count < 3:
    print("Счёт:", count)
    count += 1   # увеличиваем на 1, иначе будет бесконечный цикл`,
      },
      {
        label: "Результат:",
        code: `Счёт: 0
Счёт: 1
Счёт: 2`,
      },
    ],
  },
  {
    title: "Функции",
    icon: "Code2",
    intro: "Функция — это именованный, обособленный блок инструкций, предназначенный для выполнения конкретной задачи. Функции реализуют принцип DRY (Don't Repeat Yourself — не повторяйся): однажды определённая функция может вызываться произвольное количество раз с различными аргументами.",
    steps: [
      { label: "Оператор def", text: "Ключевое слово def (от «define» — определить) объявляет функцию. После него указывается имя функции и круглые скобки. Объявление функции не выполняет её — оно лишь регистрирует её в памяти программы." },
      { label: "Параметры", text: "Параметры — это переменные, перечисленные в скобках при объявлении функции. При вызове функции в них передаются конкретные значения (аргументы). Параметры позволяют функции работать с различными входными данными." },
      { label: "Оператор return", text: "Оператор return завершает выполнение функции и возвращает указанное значение в место вызова. Возвращённое значение можно присвоить переменной или использовать в выражении. Функция без return возвращает значение None." },
    ],
    visual: "functions",
    blocks: [
      {
        label: "Создаём функцию приветствия:",
        code: `def greet(name):
    message = f"Привет, {name}! Рад тебя видеть."
    return message

# Вызываем функцию с разными именами
print(greet("Алексей"))
print(greet("Мария"))
print(greet("Иван"))`,
      },
      {
        label: "Результат:",
        code: `Привет, Алексей! Рад тебя видеть.
Привет, Мария! Рад тебя видеть.
Привет, Иван! Рад тебя видеть.`,
        comment: "Написали функцию один раз — использовали три раза с разными именами",
      },
    ],
  },
];

export default function OsnovyPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 1</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Основы Python</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              С чего начинается любая программа. Переменные, условия, циклы и функции — фундамент, на котором строится всё остальное.
            </p>
          </div>

          <ArtDecoDivider variant="stepped" />

          <div className="space-y-16 mt-12">
            {topics.map((topic) => (
              <div key={topic.title} className="relative p-8 bg-card border border-border">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary"><Icon name={topic.icon} size={22} /></span>
                  <h2 className="font-serif text-2xl text-foreground">{topic.title}</h2>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed text-base">{topic.intro}</p>

                {topic.link && (
                  <a
                    href={topic.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary border border-primary/40 hover:border-primary hover:bg-primary/5 transition-colors px-4 py-2 rounded-sm mb-6"
                  >
                    <Icon name="ExternalLink" size={14} />
                    Скачать Python с python.org
                  </a>
                )}

                {topic.steps && (
                  <div className="space-y-3 mb-6">
                    {topic.steps.map((step) => (
                      <div key={step.label} className="flex gap-3">
                        <span className="text-primary text-xs font-semibold uppercase tracking-wider shrink-0 mt-1 w-16">{step.label}</span>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {topic.visual === "structure" && <ProgramStructureChart />}
                {topic.visual === "interpreter" && <InterpreterFlowChart />}
                {topic.visual === "variables" && <VariablesChart />}
                {topic.visual === "io" && <IOFlowChart />}
                {topic.visual === "conditions" && <ConditionsChart />}
                {topic.visual === "loops" && <LoopsChart />}
                {topic.visual === "functions" && <FunctionsChart />}

                {topic.image && (
                  <div className="mb-6">
                    <div className="border border-border rounded-sm overflow-hidden">
                      <img
                        src={topic.image.src}
                        alt={topic.image.caption}
                        className="w-full h-auto block"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Icon name="Info" size={12} />
                      {topic.image.caption}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {topic.blocks.map((block, i) => (
                    <div key={i}>
                      <p className="text-xs text-primary/70 uppercase tracking-widest mb-2">{block.label}</p>
                      <pre className="bg-background border border-border rounded-sm p-4 overflow-x-auto text-sm text-primary leading-relaxed">
                        <code>{block.code}</code>
                      </pre>
                      {block.comment && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Icon name="Info" size={12} />
                          {block.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}