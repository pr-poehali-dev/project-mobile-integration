import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

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
  blocks: { label: string; code: string; comment?: string }[];
}

const topics: Topic[] = [
  {
    title: "Установка Python",
    icon: "Download",
    intro: "Python — это язык программирования. Его нужно установить на компьютер, как любую другую программу.",
    link: "https://www.python.org/downloads/",
    steps: [
      { label: "Шаг 1", text: "Нажми на кнопку ниже и скачай Python. При установке обязательно поставь галочку «Add Python to PATH» — иначе ничего не заработает." },
      { label: "Шаг 2", text: "После установки нажми Win+R на клавиатуре, введи слово cmd и нажми Enter. Откроется чёрное окно — это командная строка." },
      { label: "Шаг 3", text: "В командной строке введи команду и нажми Enter. Если в ответ появилась версия — Python установлен и готов к работе!" },
      { label: "Где писать код", text: "В IDLE есть два режима. Консоль (Shell) — строка за строкой, туда нельзя вставить несколько строк сразу. Файл — можно писать сколько угодно строк. Чтобы открыть файл: в IDLE нажми File → New File, вставь код, нажми Run → Run Module (или F5)." },
      { label: "Ошибка в IDLE", text: "Если видишь «SyntaxError: multiple statements» — ты пытаешься вставить несколько строк в консоль. Используй файл (File → New File), а не консоль Shell." },
    ],
    blocks: [
      {
        label: "Вводишь в командной строке (cmd):",
        code: "py --version",
        comment: "Если py не работает, попробуй: python --version",
      },
      {
        label: "Должно появиться:",
        code: "Python 3.11.0",
        comment: "Цифры могут отличаться — главное, что Python нашёлся",
      },
    ],
  },
  {
    title: "Переменные и типы данных",
    icon: "Box",
    intro: "Переменная — это как коробка с именем, в которой хранится значение. Python сам понимает, что ты туда положил — число, текст или что-то ещё.",
    steps: [
      { label: "Как это работает", text: "Пишешь имя переменной, знак = и значение. Всё. Python сам разберётся с типом." },
      { label: "Типы данных", text: "Текст пишется в кавычках. Числа — просто числами. True/False — это да/нет (логическое значение)." },
    ],
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
    intro: "Программа должна уметь общаться с пользователем: спрашивать и отвечать. Для этого есть две функции: input() и print().",
    steps: [
      { label: "print()", text: "Выводит любое значение на экран. Можешь передать туда текст, число или переменную." },
      { label: "input()", text: "Задаёт вопрос пользователю и ждёт ответа. То, что введёт пользователь, сохраняется в переменную." },
      { label: "f-строки", text: "Это удобный способ вставить переменную прямо в текст. Перед кавычками ставишь букву f, а переменную берёшь в фигурные скобки." },
      { label: "Где { } на клавиатуре", text: "Фигурные скобки { и } — на клавише с буквой Х (русская). Нажми Shift + Х — получишь {. Shift + Ъ — получишь }. Раскладка должна быть английской!" },
    ],
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
    intro: "Условия позволяют программе принимать решения. Если что-то верно — делаем одно, иначе — другое. Как развилка на дороге.",
    steps: [
      { label: "if", text: "Проверяет условие. Если оно верно (True) — выполняется код внутри." },
      { label: "elif", text: "Сокращение от «else if». Проверяет следующее условие, если предыдущее не сработало." },
      { label: "else", text: "Выполняется если ни одно из условий выше не подошло. Это «на всякий случай»." },
      { label: "Важно про отступы", text: "Python требует отступы (4 пробела или Tab) перед кодом внутри if. Без них — ошибка." },
    ],
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
    intro: "Цикл — это способ повторить одно и то же действие много раз. Без него пришлось бы писать print() сто раз подряд.",
    steps: [
      { label: "for", text: "Перебирает элементы по порядку. range(5) означает числа от 0 до 4 (5 чисел всего)." },
      { label: "while", text: "Повторяет код пока условие верно. Следи чтобы условие когда-нибудь стало ложным — иначе цикл не остановится." },
    ],
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
    intro: "Функция — это блок кода, которому дали имя. Один раз написал — используй сколько угодно раз. Это основа любой большой программы.",
    steps: [
      { label: "def", text: "Ключевое слово для создания функции. После него — имя функции и скобки." },
      { label: "Параметры", text: "Это данные, которые передаёшь в функцию. Они пишутся в скобках." },
      { label: "return", text: "Функция возвращает результат с помощью return. Этот результат можно сохранить в переменную." },
    ],
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