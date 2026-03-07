import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { SectionCard, SectionTopic } from "@/components/SectionCard";
import { ClassObjectChart, InheritanceChart, EncapsulationChart } from "@/components/SectionCharts";

const topics: SectionTopic[] = [
  {
    title: "Что такое класс",
    icon: "Box",
    intro: "Класс — шаблон (чертёж) для создания объектов. Объект — конкретный экземпляр класса с собственными данными. Один класс Dog позволяет создать тысячи объектов-собак, каждая со своим именем и породой, но с одинаковыми методами.",
    steps: [
      { label: "class", text: "Ключевое слово class создаёт новый тип данных. Имя класса пишется с заглавной буквы — это соглашение PEP 8." },
      { label: "__init__", text: "Специальный метод-конструктор. Вызывается автоматически при создании каждого нового объекта. Здесь задаются начальные значения атрибутов." },
      { label: "self", text: "Первый параметр любого метода — self. Это ссылка на сам объект. Через self методы обращаются к атрибутам: self.name, self.age." },
    ],
    visual: <ClassObjectChart />,
    blocks: [
      {
        label: "Код:",
        code: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} говорит: Гав!"

my_dog = Dog("Рекс", "Лабрадор")
print(my_dog.bark())   # Рекс говорит: Гав!
print(my_dog.name)     # Рекс`,
      },
      { label: "Результат:", code: `Рекс говорит: Гав!\nРекс` },
    ],
  },
  {
    title: "Атрибуты и методы",
    icon: "Sliders",
    intro: "Атрибуты — данные объекта (self.name, self.balance). Методы — функции объекта, определённые внутри класса. Методы могут читать и изменять атрибуты через self. Это позволяет инкапсулировать логику внутри объекта.",
    steps: [
      { label: "Атрибуты", text: "Задаются в __init__: self.balance = 0. Доступны через точку: acc.balance. Можно добавлять новые атрибуты и снаружи класса." },
      { label: "Методы", text: "Обычные функции внутри класса, первым параметром принимающие self. Вызываются через точку: acc.deposit(1000)." },
    ],
    blocks: [
      {
        label: "Код:",
        code: `class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount
        return f"Баланс: {self.balance} руб."

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return f"Выдано: {amount} руб."
        return "Недостаточно средств"

acc = BankAccount("Иван")
print(acc.deposit(1000))    # Баланс: 1000 руб.
print(acc.withdraw(300))    # Выдано: 300 руб.
print(acc.balance)          # 700`,
      },
      { label: "Результат:", code: `Баланс: 1000 руб.\nВыдано: 300 руб.\n700` },
    ],
  },
  {
    title: "Наследование",
    icon: "GitBranch",
    intro: "Наследование позволяет создать дочерний класс на основе родительского. Дочерний класс автоматически получает все атрибуты и методы родителя. Можно добавить новые методы или переопределить существующие — это называется полиморфизмом.",
    steps: [
      { label: "Синтаксис", text: "class Dog(Animal): — Dog наследует от Animal. В скобках указывается родительский класс." },
      { label: "super()", text: "super().__init__() вызывает конструктор родителя. Это нужно, чтобы инициализировать атрибуты, объявленные в родительском классе." },
      { label: "Переопределение", text: "Метод с тем же именем в дочернем классе перекрывает родительский. Это позволяет каждому подклассу вести себя по-своему." },
    ],
    visual: <InheritanceChart />,
    blocks: [
      {
        label: "Код:",
        code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return f"{self.name}: Гав!"

class Cat(Animal):
    def speak(self):
        return f"{self.name}: Мяу!"

animals = [Dog("Шарик"), Cat("Мурка")]
for a in animals:
    print(a.speak())`,
      },
      { label: "Результат:", code: `Шарик: Гав!\nМурка: Мяу!`, comment: "Один интерфейс (speak) — разное поведение. Это полиморфизм." },
    ],
  },
  {
    title: "Инкапсуляция",
    icon: "Lock",
    intro: "Инкапсуляция — сокрытие внутренней реализации объекта. Атрибуты с двойным подчёркиванием (__balance) становятся приватными: к ним нельзя обратиться напрямую снаружи класса. Доступ к данным осуществляется только через методы.",
    steps: [
      { label: "Приватные атрибуты", text: "self.__balance = 0 — атрибут с двумя подчёркиваниями приватный. Попытка обратиться к acc.__balance снаружи вызовет AttributeError." },
      { label: "Зачем это нужно", text: "Защита данных от случайного изменения. Нельзя напрямую установить acc.__balance = 1000000 — нужно пройти через метод deposit(), который проверит корректность." },
    ],
    visual: <EncapsulationChart />,
    blocks: [
      {
        label: "Код:",
        code: `class SecureAccount:
    def __init__(self):
        self.__balance = 0   # приватный атрибут

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance   # читаем через метод

acc = SecureAccount()
acc.deposit(500)
print(acc.get_balance())    # 500
# print(acc.__balance)      # ошибка!`,
      },
      { label: "Результат:", code: `500` },
    ],
  },
  {
    title: "Магические методы",
    icon: "Wand2",
    intro: "Магические (dunder) методы — специальные методы с двойными подчёркиваниями, которые Python вызывает автоматически в определённых ситуациях. __str__ определяет строковое представление объекта, __len__ — его длину, __add__ — поведение при сложении.",
    steps: [
      { label: "__str__", text: "Вызывается при print(obj) или str(obj). Возвращает строку — читаемое описание объекта. Без него Python выведет непонятный адрес в памяти." },
      { label: "__len__", text: "Вызывается при len(obj). Позволяет использовать встроенную функцию len() для своих объектов." },
      { label: "__add__", text: "Вызывается при obj1 + obj2. Позволяет определить, что означает сложение для ваших объектов." },
    ],
    blocks: [
      {
        label: "Код:",
        code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Точка({self.x}, {self.y})"

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

p1 = Point(1, 2)
p2 = Point(3, 4)
print(p1)          # Точка(1, 2)
print(p1 + p2)     # Точка(4, 6)`,
      },
      { label: "Результат:", code: `Точка(1, 2)\nТочка(4, 6)` },
    ],
  },
  {
    title: "Датаклассы (dataclass)",
    icon: "Table",
    intro: "Декоратор @dataclass автоматически генерирует __init__, __str__ и другие методы на основе аннотаций типов. Это современный питоновский способ создавать простые классы-контейнеры данных без лишнего кода.",
    steps: [
      { label: "@dataclass", text: "Декоратор из модуля dataclasses. Автоматически создаёт конструктор, метод сравнения и строковое представление." },
      { label: "Аннотации", text: "name: str, age: int — указываем имя и тип каждого поля. Python генерирует __init__ с этими параметрами." },
    ],
    blocks: [
      {
        label: "Код:",
        code: `from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
    city: str = "Москва"   # значение по умолчанию

u1 = User("Иван", 30)
u2 = User("Анна", 25, "Питер")

print(u1)   # User(name='Иван', age=30, city='Москва')
print(u2)   # User(name='Анна', age=25, city='Питер')`,
      },
      { label: "Результат:", code: `User(name='Иван', age=30, city='Москва')\nUser(name='Анна', age=25, city='Питер')`, comment: "__init__ и __str__ созданы автоматически" },
    ],
  },
];

export default function OopPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 4</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">ООП</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Объектно-ориентированное программирование — способ моделировать реальный мир через классы и объекты.
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
