import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

const topics = [
  {
    title: "Определение функции",
    icon: "Code2",
    text: "def создаёт функцию. Функция выполняется только когда её вызывают. return возвращает результат.",
    code: `def add(a, b):
    return a + b

result = add(3, 5)
print(result)   # 8`,
  },
  {
    title: "Аргументы по умолчанию",
    icon: "Settings",
    text: "Параметрам можно задать значение по умолчанию. Тогда при вызове их можно не передавать.",
    code: `def greet(name, greeting="Привет"):
    return f"{greeting}, {name}!"

print(greet("Иван"))            # Привет, Иван!
print(greet("Мария", "Здравствуй"))  # Здравствуй, Мария!`,
  },
  {
    title: "Именованные аргументы",
    icon: "Tag",
    text: "Аргументы можно передавать по имени — тогда порядок не важен. Это делает код читаемее.",
    code: `def create_user(name, age, city):
    return f"{name}, {age} лет, {city}"

# Именованные — порядок не важен
print(create_user(city="Москва", name="Олег", age=28))`,
  },
  {
    title: "*args и **kwargs",
    icon: "Package",
    text: "*args принимает любое число позиционных аргументов, **kwargs — любое число именованных.",
    code: `def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3))       # 6
print(total(10, 20, 30, 40))  # 100

def show_info(**data):
    for key, val in data.items():
        print(f"{key}: {val}")

show_info(name="Анна", age=22)`,
  },
  {
    title: "Лямбда-функции",
    icon: "Zap",
    text: "lambda — короткая анонимная функция в одну строку. Удобна для сортировки и map/filter.",
    code: `# Обычная функция
def square(x):
    return x ** 2

# То же самое — лямбда
square = lambda x: x ** 2
print(square(5))   # 25

# Сортировка по второму элементу
pairs = [(1, 3), (2, 1), (4, 2)]
pairs.sort(key=lambda x: x[1])
print(pairs)   # [(2, 1), (4, 2), (1, 3)]`,
  },
  {
    title: "Область видимости",
    icon: "Eye",
    text: "Переменные внутри функции — локальные. Снаружи их не видно. Глобальные видны везде.",
    code: `x = 10   # глобальная

def change():
    x = 99   # локальная, не меняет глобальную
    print(x)   # 99

change()
print(x)   # 10 — глобальная не изменилась

# Чтобы изменить глобальную — используй global
def force_change():
    global x
    x = 99`,
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
