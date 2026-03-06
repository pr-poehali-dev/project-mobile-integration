import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

const topics = [
  {
    title: "Списки (list)",
    icon: "List",
    text: "Список — упорядоченная коллекция элементов. Можно изменять, добавлять и удалять элементы.",
    code: `fruits = ["яблоко", "банан", "вишня"]

fruits.append("груша")      # добавить в конец
fruits.remove("банан")      # удалить элемент
print(fruits[0])            # яблоко — первый элемент
print(len(fruits))          # 3 — длина списка`,
  },
  {
    title: "Словари (dict)",
    icon: "BookOpen",
    text: "Словарь хранит пары ключ-значение. Идеален для структурированных данных — как JSON.",
    code: `person = {
    "имя": "Иван",
    "возраст": 30,
    "город": "Москва"
}

print(person["имя"])        # Иван
person["email"] = "i@i.ru" # добавить ключ
print(person.keys())        # все ключи`,
  },
  {
    title: "Кортежи (tuple)",
    icon: "Lock",
    text: "Кортеж похож на список, но неизменяемый. Используется для данных, которые не должны меняться.",
    code: `coordinates = (55.75, 37.62)   # Москва
rgb = (255, 0, 128)

print(coordinates[0])   # 55.75
# coordinates[0] = 0   # ОШИБКА — нельзя изменить`,
  },
  {
    title: "Множества (set)",
    icon: "Layers",
    text: "Множество хранит уникальные значения. Автоматически убирает дубликаты и поддерживает математические операции.",
    code: `tags = {"python", "код", "python", "обучение"}
print(tags)  # {'python', 'код', 'обучение'} — без дублей

a = {1, 2, 3}
b = {2, 3, 4}
print(a & b)   # {2, 3} — пересечение
print(a | b)   # {1, 2, 3, 4} — объединение`,
  },
  {
    title: "Перебор коллекций",
    icon: "Repeat",
    text: "Все коллекции можно перебирать циклом for. Для словаря есть удобные методы .items(), .keys(), .values().",
    code: `# Перебор списка
for fruit in ["яблоко", "банан"]:
    print(fruit)

# Перебор словаря
user = {"имя": "Анна", "возраст": 25}
for key, value in user.items():
    print(f"{key}: {value}")`,
  },
  {
    title: "List comprehension",
    icon: "Zap",
    text: "Мощный способ создать список одной строкой. Заменяет цикл for с append() и делает код чище.",
    code: `numbers = [1, 2, 3, 4, 5]

# Квадраты чисел одной строкой
squares = [n ** 2 for n in numbers]
print(squares)   # [1, 4, 9, 16, 25]

# Только чётные
evens = [n for n in numbers if n % 2 == 0]
print(evens)     # [2, 4]`,
  },
];

export default function StruktуryPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 2</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Структуры данных</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Списки, словари, кортежи и множества — основные способы хранить и организовывать данные в Python.
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
