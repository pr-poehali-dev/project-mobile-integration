import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const CREATE_INVOICE_URL = (func2url as Record<string, string>)["lava-create-invoice"];

const features = [
  "8 полных разделов от основ до реальных проектов",
  "6 проектов для портфолио",
  "Примеры кода и практические задания",
  "Доступ навсегда — без подписки",
  "Обновления материалов бесплатно",
];

export default function PaymentPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const hasError = searchParams.get("error") === "1";

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Введи корректный email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(CREATE_INVOICE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentUrl) {
        setError(data.error || "Произошла ошибка. Попробуй ещё раз.");
        return;
      }

      window.location.href = data.paymentUrl;
    } catch {
      setError("Ошибка соединения. Проверь интернет и попробуй снова.");
    } finally {
      setLoading(false);
    }
  }

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

            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="font-serif text-xl text-foreground mb-2">Оформить доступ</h2>
              <p className="text-sm text-muted-foreground mb-6">
                После оплаты ссылка придёт на твой email
              </p>

              {hasError && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md mb-4 text-sm text-destructive">
                  <Icon name="AlertCircle" size={16} />
                  <span>Оплата не прошла. Попробуй ещё раз.</span>
                </div>
              )}

              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email для доступа</label>
                  <Input
                    type="email"
                    placeholder="твой@email.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="bg-background"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive flex items-center gap-1.5">
                    <Icon name="AlertCircle" size={14} />
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Icon name="Loader2" size={18} className="animate-spin" />
                      Создаём платёж...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Icon name="CreditCard" size={18} />
                      Оплатить 500 ₽
                    </span>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Безопасная оплата через lava.top. Карты Visa, Mastercard, Мир, СБП.
                </p>
              </form>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
                {["lock", "shield-check", "badge-check"].map((icon, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name={i === 0 ? "Lock" : i === 1 ? "ShieldCheck" : "BadgeCheck"} size={14} className="text-primary" />
                    <span>{["Защищённый", "Безопасный", "Официальный"][i]}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
