import { ArtDecoSunburst } from "@/components/ArtDecoSunburst";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { ServiceCard } from "@/components/ServiceCard";
import { CTAForm } from "@/components/CTAForm";
import Icon from "@/components/ui/icon";

function App() {
  return (
    <main className="min-h-screen bg-background dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <ArtDecoSunburst />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-primary" />
              <div className="w-3 h-3 rotate-45 border border-primary" />
              <div className="w-16 h-px bg-primary" />
            </div>
          </div>

          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-6">Твой первый шаг в мир кода</p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
            <span className="text-gold-gradient">Python</span>Старт
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            Информационный портал для тех, кто делает первые шаги в программировании. Чёткий путь от «Hello, World!» до реальных проектов.
          </p>

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-primary" />
              <div className="w-2 h-2 rotate-45 bg-primary" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ArtDecoDivider variant="stepped" />

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Наш подход</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight text-balance">
                Учись так, как это работает в реальной жизни
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Никакой воды и академической скуки. PythonСтарт — это структурированный путь для новичков: от самых азов синтаксиса до написания первых рабочих программ и автоматизации повседневных задач.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Каждый раздел построен по принципу «теория → пример → практика». Ты не просто читаешь код — ты понимаешь, зачем он нужен и как применить его прямо сейчас.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Разделы портала</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">Твой путь в Python</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              title="Основы Python"
              description="Переменные, типы данных, условия, циклы и функции. Всё, что нужно, чтобы уверенно стартовать с нуля."
              icon={<Icon name="Code" size={48} />}
            />
            <ServiceCard
              title="Структуры данных"
              description="Списки, словари, кортежи и множества. Научись хранить и обрабатывать данные правильно и эффективно."
              icon={<Icon name="Database" size={48} />}
            />
            <ServiceCard
              title="Веб-разработка"
              description="Создай свой первый сайт или API на Python. Flask и FastAPI — без лишней сложности, с понятными примерами."
              icon={<Icon name="Globe" size={48} />}
            />
            <ServiceCard
              title="Автоматизация"
              description="Пусть Python работает за тебя. Скрипты для файлов, таблиц, браузера и рутинных задач — реальная польза с первых строк."
              icon={<Icon name="Zap" size={48} />}
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ArtDecoDivider variant="fan" />

          <div className="relative text-center py-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-primary/20 font-serif text-9xl leading-none">
              &ldquo;
            </div>

            <blockquote className="relative z-10">
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed italic mb-8">
                Я никогда не думал, что смогу написать код. После первого раздела PythonСтарт я уже автоматизировал свои рабочие таблицы и сэкономил 3 часа в неделю.
              </p>
              <footer className="text-muted-foreground">
                <span className="text-primary">—</span> Алексей, менеджер проектов,{" "}
                <span className="text-primary">Санкт-Петербург</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <ArtDecoSunburst />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <ArtDecoDivider variant="chevron" />
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Начни сегодня</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">Получи доступ к материалам</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Оставь email — и мы пришлём тебе стартовый гайд «Первые 7 дней с Python» и сообщим о новых уроках первым.
            </p>
          </div>

          <div className="relative p-8 md:p-12 border border-border">
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary" />

            <CTAForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-primary" />
              <span className="font-serif text-xl text-foreground">PythonСтарт</span>
              <div className="w-12 h-px bg-primary" />
            </div>

            <p className="text-muted-foreground text-sm text-center max-w-md">
              Портал для тех, кто начинает программировать на Python. Честно, понятно, с реальными примерами.
            </p>

            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <p className="text-muted-foreground text-xs tracking-widest uppercase">
                © 2024 PythonСтарт. Все права защищены.
              </p>
              <div className="w-1 h-1 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
