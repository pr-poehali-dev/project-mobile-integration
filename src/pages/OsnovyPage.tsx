import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";

const topics = [
  {
    title: "Установка Python",
    icon: "Download",
    text: "Скачай Python с python.org (ссылка ниже). Выбери версию 3.10+. После установки открой терминал (на Windows — cmd или PowerShell) и введи одну из команд ниже. Если видишь версию — всё готово!",
    link: "https://www.python.org/downloads/",
    code: `# На Windows:
py --version
# или
python --version

# На Mac / Linux:
python3 --version

# Пример ответа:
# Python 3.11.0`,
  },
  {
    title: "Переменные и типы",
    icon: "Box",
    text: "Переменные хранят данные. В Python тип определяется автоматически — не нужно его указывать вручную.",
    code: `name = "Алексей"     # строка (str)
age = 25              # целое число (int)
height = 1.82         # дробное (float)
is_student = True     # булево (bool)

print(name, age)      # Алексей 25`,
  },
  {
    title: "Ввод и вывод",
    icon: "Terminal",
    text: "input() читает ввод пользователя, print() выводит на экран. Самые используемые функции в Python.",
    code: `name = input("Как тебя зовут? ")
print(f"Привет, {name}!")

# f-строки позволяют вставлять переменные прямо в текст`,
  },
  {
    title: "Условия (if/else)",
    icon: "GitBranch",
    text: "Условия управляют потоком программы. Python использует отступы вместо фигурных скобок.",
    code: `age = 18

if age >= 18:
    print("Совершеннолетний")
elif age >= 14:
    print("Подросток")
else:
    print("Ребёнок")`,
  },
  {
    title: "Циклы",
    icon: "RefreshCw",
    text: "for перебирает элементы, while повторяет пока условие истинно. Циклы — основа автоматизации.",
    code: `# Цикл for
for i in range(5):
    print(i)   # 0 1 2 3 4

# Цикл while
count = 0
while count < 3:
    print(count)
    count += 1`,
  },
  {
    title: "Функции",
    icon: "Code2",
    text: "Функция — блок кода с именем. Позволяет не повторяться и разбить программу на части.",
    code: `def greet(name):
    return f"Привет, {name}!"

result = greet("Мария")
print(result)   # Привет, Мария!`,
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

          <div className="space-y-12 mt-12">
            {topics.map((topic) => (
              <div key={topic.title} className="relative p-8 bg-card border border-border">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary"><Icon name={topic.icon} size={22} /></span>
                  <h2 className="font-serif text-2xl text-foreground">{topic.title}</h2>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">{topic.text}</p>

                {"link" in topic && topic.link && (
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