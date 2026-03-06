import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

const topics = [
  {
    title: "Что такое класс",
    icon: "Box",
    text: "Класс — шаблон для создания объектов. Объект — это экземпляр класса с собственными данными.",
    code: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} говорит: Гав!"

my_dog = Dog("Рекс", "Лабрадор")
print(my_dog.bark())   # Рекс говорит: Гав!`,
  },
  {
    title: "Атрибуты и методы",
    icon: "Sliders",
    text: "Атрибуты — данные объекта (self.name). Методы — функции объекта. __init__ вызывается при создании.",
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
        else:
            return "Недостаточно средств"

acc = BankAccount("Иван")
print(acc.deposit(1000))   # Баланс: 1000 руб.`,
  },
  {
    title: "Наследование",
    icon: "GitBranch",
    text: "Дочерний класс наследует все методы родителя и может добавлять свои или переопределять существующие.",
    code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):
        return f"{self.name} говорит: Мяу!"

class Dog(Animal):
    def speak(self):
        return f"{self.name} говорит: Гав!"

animals = [Cat("Мурка"), Dog("Бобик")]
for animal in animals:
    print(animal.speak())`,
  },
  {
    title: "Инкапсуляция",
    icon: "Lock",
    text: "Скрытие данных внутри класса. Двойное подчёркивание __ делает атрибут приватным — он недоступен снаружи.",
    code: `class User:
    def __init__(self, name, password):
        self.name = name
        self.__password = password   # приватный

    def check_password(self, pwd):
        return self.__password == pwd

user = User("Анна", "secret123")
print(user.name)                     # Анна
print(user.check_password("secret123"))  # True
# print(user.__password)             # ОШИБКА`,
  },
  {
    title: "Магические методы",
    icon: "Sparkles",
    text: "__str__ делает красивый вывод объекта. __len__, __add__ и другие перегружают операторы Python.",
    code: `class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __str__(self):
        return f'"{self.title}" ({self.pages} стр.)'

    def __len__(self):
        return self.pages

book = Book("Изучаем Python", 784)
print(book)      # "Изучаем Python" (784 стр.)
print(len(book)) # 784`,
  },
  {
    title: "Свойства (property)",
    icon: "Eye",
    text: "@property позволяет обращаться к методу как к атрибуту. Удобно для валидации данных.",
    code: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273:
            raise ValueError("Ниже абсолютного нуля!")
        self._celsius = value

t = Temperature(100)
print(t.fahrenheit)   # 212.0`,
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
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">ООП в Python</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Объектно-ориентированное программирование — способ организовать код через классы и объекты. Используется повсюду.
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
