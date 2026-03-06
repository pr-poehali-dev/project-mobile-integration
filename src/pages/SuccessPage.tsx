import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { ArtDecoSunburst } from "@/components/ArtDecoSunburst";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />

      <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <ArtDecoSunburst />

        <div className="relative z-10 text-center max-w-lg mx-auto">

          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Icon name="CheckCircle2" size={40} className="text-primary" />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-primary" />
              <div className="w-2 h-2 rotate-45 border border-primary" />
              <div className="w-12 h-px bg-primary" />
            </div>
          </div>

          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">Оплата прошла</p>

          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Добро пожаловать<br />в <span className="text-gold-gradient">PythonСтарт</span>!
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Письмо с доступом уже летит на твой email. Проверь папку «Входящие» (и «Спам» на всякий случай).
          </p>

          <p className="text-sm text-muted-foreground mb-10">
            Возникли вопросы? Напиши нам — поможем.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
              <Link to="/osnovy">
                <Icon name="BookOpen" size={18} className="mr-2" />
                Начать обучение
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8">
              <Link to="/">
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Link>
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}
