import { QRCodeSVG } from "qrcode.react";
import { Navbar } from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const SBP_PHONE = "79059623200";

const features = [
  "8 полных разделов от основ до реальных проектов",
  "6 проектов для портфолио",
  "Примеры кода и практические задания",
  "Доступ навсегда — без подписки",
  "Обновления материалов бесплатно",
];

export default function PaymentPage() {

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">Полный доступ</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Курс <span className="text-gold-gradient">PythonСтарт</span>
            </h1>
            <p className="text-muted-foreground text-lg">Один платёж — всё навсегда</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">

            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Полный курс Python</p>
                  <p className="text-sm text-muted-foreground">Разовый платёж</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-6">
                <div className="flex items-end justify-between">
                  <span className="text-muted-foreground text-sm">Итого</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-foreground">500 ₽</span>
                    <p className="text-xs text-muted-foreground mt-1">единоразово</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 flex flex-col items-center text-center">
              <h2 className="font-serif text-xl text-foreground mb-2">Оплата через СБП</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Отсканируй QR-код или переведи по номеру телефона
              </p>

              <div className="relative inline-block p-4 bg-white border border-border">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />
                <QRCodeSVG
                  value={`+${SBP_PHONE}`}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#1a1a2e"
                  level="M"
                />
              </div>

              <p className="mt-4 text-sm text-muted-foreground">Введите сумму: <span className="text-foreground font-semibold">500 ₽</span></p>

              <div className="mt-3 flex items-center gap-2 text-foreground">
                <Icon name="Smartphone" size={18} className="text-primary" />
                <span className="font-medium tracking-widest text-lg">+7 905 962-32-00</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 mb-6">СБП — Система быстрых платежей</p>

              <div className="w-full border-t border-border pt-6 text-left space-y-3">
                <p className="text-primary tracking-[0.15em] uppercase text-xs font-medium">Как получить доступ</p>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary font-serif">1.</span><span>Переведи 500 ₽ через СБП по QR или номеру телефона</span></li>
                  <li className="flex gap-2"><span className="text-primary font-serif">2.</span><span>В комментарии к переводу укажи свой email</span></li>
                  <li className="flex gap-2"><span className="text-primary font-serif">3.</span><span>Напиши нам в Telegram — пришли скриншот и получи доступ</span></li>
                </ol>
              </div>

              <a
                href="https://t.me/+QgiLIa1gFRY4Y2Iy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-6 py-3 text-sm font-semibold rounded-sm w-full justify-center"
              >
                <Icon name="Send" size={16} />
                Написать в Telegram
              </a>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}