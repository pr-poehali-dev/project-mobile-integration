import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { SectionCard, SectionTopic } from "@/components/SectionCard";
import { FuncScopeChart, ArgsKwargsChart, LambdaChart } from "@/components/SectionCharts";

const topics: SectionTopic[] = [
  {
    title: "Определение функции",
    icon: "Code2",
    intro: "Функция — именованный блок кода, который выполняется по вызову. Ключевое слово def регистрирует функцию в памяти программы. Оператор return возвращает результат в точку вызова. Без return функция возвращает None.",
    steps: [
      { label: "def", text: "def имя(параметры): — объявление. Код внутри не выполняется сразу, а только когда функцию вызовут по имени." },
      { label: "return", text: "return значение — возвращает результат и завершает функцию. Вызов без return или с пустым return вернёт None." },
      { label: "Вызов", text: "result = add(3, 5) — вызов функции с аргументами. Результат можно сохранить в переменную или использовать напрямую в выражении." },
    ],
    blocks: [
      {
        label: "Код:",
        code: `def add(a, b):
    return a + b

result = add(3, 5)
print(result)   # 8`,
      },
      { label: "Результат:", code: `8` },
    ],
  },
  {
    title: "Аргументы по умолчанию",
    icon: "Settings",
    intro: "Параметрам можно задать значение по умолчанию. Если аргумент не передан при вызове — используется значение по умолчанию. Параметры с умолчаниями всегда идут после обычных параметров.",
    steps: [
      { label: "Синтаксис", text: "def greet(name, greeting=\"Привет\"): — greeting имеет умолчание. При вызове greet(\"Иван\") greeting будет \"Привет\"." },
      { label: "Порядок", text: "Параметры без умолчания — в начале, с умолчанием — в конце. Иначе Python выдаст SyntaxError." },
    ],
    blocks: [
      {
        label: "Код:",
        code: `def greet(name, greeting="Привет"):
    return f"{greeting}, {name}!"

print(greet("Иван"))                   # Привет, Иван!
print(greet("Мария", "Здравствуй"))   # Здравствуй, Мария!`,
      },
      { label: "Результат:", code: `Привет, Иван!\nЗдравствуй, Мария!` },
    ],
  },
  {
    title: "Именованные аргументы",
    icon: "Tag",
    intro: "Аргументы можно передавать по имени — тогда порядок не имеет значения. Это делает вызовы функций с многими параметрами читаемыми и защищает от ошибок перестановки аргументов.",
    steps: [
      { label: "Синтаксис", text: "func(city=\"Москва\", name=\"Олег\", age=28) — аргументы в любом порядке. Python сам разберёт, что куда." },
      { label: "Смешивание", text: "Можно смешивать: func(\"Олег\", city=\"Москва\"). Позиционные аргументы — первыми, именованные — после." },
    ],
    blocks: [
      {
        label: "Код:",
        code: `def create_user(name, age, city):
    return f"{name}, {age} лет, {city}"

# Именованные — порядок не важен
print(create_user(city="Москва", name="Олег", age=28))`,
      },
      { label: "Результат:", code: `Олег, 28 лет, Москва` },
    ],
  },
  {
    title: "*args и **kwargs",
    icon: "Package",
    intro: "*args позволяет принять любое количество позиционных аргументов — они приходят как кортеж. **kwargs принимает любое количество именованных аргументов — они приходят как словарь. Используются для гибких универсальных функций.",
    steps: [
      { label: "*args", text: "def total(*numbers): — numbers внутри функции — это кортеж всех переданных аргументов. Можно передать 2, 5 или 100 чисел." },
      { label: "**kwargs", text: "def show(**data): — data внутри функции — словарь. Вызов: show(name=\"Анна\", age=22). Удобно для функций с произвольными параметрами." },
    ],
    visual: <ArgsKwargsChart />,
    blocks: [
      {
        label: "Код:",
        code: `def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3))         # 6
print(total(10, 20, 30, 40))  # 100

def show_info(**data):
    for key, val in data.items():
        print(f"{key}: {val}")

show_info(name="Анна", age=22)`,
      },
      { label: "Результат:", code: `6\n100\nname: Анна\nage: 22` },
    ],
  },
  {
    title: "Лямбда-функции",
    icon: "Zap",
    intro: "Lambda — короткая анонимная функция, записанная в одну строку. Синтаксис: lambda параметры: выражение. Используется там, где функция нужна один раз — при сортировке, в map() и filter().",
    steps: [
      { label: "Синтаксис", text: "lambda x: x ** 2 — создаёт функцию, принимающую x и возвращающую x². Эквивалентна def с одной строкой return." },
      { label: "Применение", text: "Чаще всего используется как аргумент: pairs.sort(key=lambda x: x[1]) — сортировать по второму элементу каждой пары." },
    ],
    visual: <LambdaChart />,
    blocks: [
      {
        label: "Код:",
        code: `# Lambda для сортировки
pairs = [(1, 3), (2, 1), (4, 2)]
pairs.sort(key=lambda x: x[1])
print(pairs)   # [(2, 1), (4, 2), (1, 3)]

# Lambda в map
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)   # [2, 4, 6, 8, 10]`,
      },
      { label: "Результат:", code: `[(2, 1), (4, 2), (1, 3)]\n[2, 4, 6, 8, 10]` },
    ],
  },
  {
    title: "Область видимости",
    icon: "Eye",
    intro: "Область видимости (scope) определяет, откуда доступна переменная. Переменные внутри функции — локальные, они существуют только во время выполнения этой функции. Глобальные переменные видны в любом месте программы.",
    steps: [
      { label: "Локальная", text: "Переменная, созданная внутри функции, недоступна снаружи. Даже если имя совпадает с глобальной — это разные переменные." },
      { label: "Глобальная", text: "Переменная на уровне модуля видна везде. Чтобы изменить её внутри функции — нужно явно объявить: global x." },
      { label: "Правило LEGB", text: "Python ищет переменную в таком порядке: Local → Enclosing → Global → Built-in. Если нашёл — использует. Не нашёл — ошибка NameError." },
    ],
    visual: <FuncScopeChart />,
    blocks: [
      {
        label: "Код:",
        code: `x = 10   # глобальная

def change():
    x = 99   # локальная, не меняет глобальную
    print(x)   # 99

change()
print(x)   # 10 — глобальная не изменилась`,
      },
      { label: "Результат:", code: `99\n10`, comment: "Локальная x и глобальная x — разные переменные" },
    ],
  },
];

export default function FunkciiPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 3</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Функции</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Функции — строительные блоки любой программы. Научись писать чистый, переиспользуемый код.
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
