import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArtDecoSunburst } from "@/components/ArtDecoSunburst";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { ServiceCard } from "@/components/ServiceCard";
import { CTAForm } from "@/components/CTAForm";
import { Navbar } from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const SUBSCRIBERS_COUNT_URL = "https://functions.poehali.dev/2996483e-8588-416c-bee7-3462954a0fff";

import OsnovyPage from "@/pages/OsnovyPage";
import StruktуryPage from "@/pages/StruktуryPage";
import FunkciiPage from "@/pages/FunkciiPage";
import OopPage from "@/pages/OopPage";
import WebPage from "@/pages/WebPage";
import BazyDannyhPage from "@/pages/BazyDannyhPage";
import AvtomatizaciyaPage from "@/pages/AvtomatizaciyaPage";
import ProektyPage from "@/pages/ProektyPage";
import AdminPage from "@/pages/AdminPage";
import PaymentPage from "@/pages/PaymentPage";
import SuccessPage from "@/pages/SuccessPage";
import LoginPage from "@/pages/LoginPage";
import { Link } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const sections = [
  { title: "Основы Python", icon: "Code", desc: "Переменные, условия, циклы и функции. Всё, что нужно, чтобы уверенно стартовать с нуля.", path: "/osnovy", num: "01" },
  { title: "Структуры данных", icon: "Database", desc: "Списки, словари, кортежи и множества. Научись хранить и обрабатывать данные правильно.", path: "/struktury", num: "02" },
  { title: "Функции", icon: "Code2", desc: "def, аргументы, лямбды и область видимости. Строительные блоки любой программы.", path: "/funkcii", num: "03" },
  { title: "ООП", icon: "Boxes", desc: "Классы, объекты, наследование и инкапсуляция. Пиши код как профессионал.", path: "/oop", num: "04" },
  { title: "Веб-разработка", icon: "Globe", desc: "Flask и FastAPI — создай свой первый сайт или API без лишней сложности.", path: "/web", num: "05" },
  { title: "Базы данных", icon: "Server", desc: "SQLite, PostgreSQL, SQLAlchemy и Pandas. Хранение и анализ данных на практике.", path: "/bazy-dannyh", num: "06" },
  { title: "Автоматизация", icon: "Zap", desc: "Файлы, Excel, письма, парсинг и телеграм-боты. Пусть Python работает за тебя.", path: "/avtomatizaciya", num: "07" },
  { title: "Реальные проекты", icon: "Rocket", desc: "6 проектов для портфолио: от конвертера валют до полноценного REST API.", path: "/proekty", num: "08" },
];

function HomePage() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(SUBSCRIBERS_COUNT_URL)
      .then((r) => r.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-background dark">
      <Navbar />

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

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Информационный портал для тех, кто делает первые шаги в программировании. Чёткий путь от «Hello, World!» до реальных проектов.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/payment"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-8 py-4 text-base font-semibold rounded-sm"
            >
              <Icon name="CreditCard" size={18} />
              Купить курс — 500 ₽
            </Link>
            <a
              href="#sections"
              className="inline-flex items-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors px-8 py-4 text-base rounded-sm"
            >
              Посмотреть разделы
              <Icon name="ChevronDown" size={18} />
            </a>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary to-primary" />
              <div className="w-2 h-2 rotate-45 bg-primary" />
            </div>
          </div>
        </div>

        {count !== null && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40" />
              ))}
            </div>
            <span>
              <span className="text-foreground font-semibold">{count.toLocaleString("ru-RU")}</span> человек уже учатся
            </span>
          </div>
        )}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* Sections Grid */}
      <section id="sections" className="py-24 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Разделы портала</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">Твой путь в Python</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((s) => (
              <a key={s.path} href={s.path} className="block relative group">
                <ServiceCard
                  title={s.title}
                  description={s.desc}
                  icon={
                    <div className="relative">
                      <Icon name={s.icon} size={44} />
                      <span className="absolute -top-3 -right-5 text-xs text-primary/40 font-mono">{s.num}</span>
                    </div>
                  }
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 border border-border rounded-full px-2 py-0.5 text-xs text-muted-foreground">
                  <Icon name="Lock" size={11} />
                  <span>Платно</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 relative p-8 md:p-10 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

            <div>
              <p className="text-primary tracking-[0.2em] uppercase text-xs mb-1">Полный доступ</p>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-1">Все 8 разделов навсегда</h3>
              <p className="text-muted-foreground text-sm">Один платёж — без подписки, без ограничений по времени</p>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">500 ₽</p>
                <p className="text-xs text-muted-foreground mt-1">единоразово</p>
              </div>
              <Link
                to="/payment"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-8 py-4 text-base font-semibold rounded-sm"
              >
                <Icon name="CreditCard" size={18} />
                Купить доступ
              </Link>
            </div>
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
              Оставь e-mail — и мы будем присылать тебе новости про PythonСтарт.
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/osnovy" element={<ProtectedRoute><OsnovyPage /></ProtectedRoute>} />
      <Route path="/struktury" element={<ProtectedRoute><StruktуryPage /></ProtectedRoute>} />
      <Route path="/funkcii" element={<ProtectedRoute><FunkciiPage /></ProtectedRoute>} />
      <Route path="/oop" element={<ProtectedRoute><OopPage /></ProtectedRoute>} />
      <Route path="/web" element={<ProtectedRoute><WebPage /></ProtectedRoute>} />
      <Route path="/bazy-dannyh" element={<ProtectedRoute><BazyDannyhPage /></ProtectedRoute>} />
      <Route path="/avtomatizaciya" element={<ProtectedRoute><AvtomatizaciyaPage /></ProtectedRoute>} />
      <Route path="/proekty" element={<ProtectedRoute><ProektyPage /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;