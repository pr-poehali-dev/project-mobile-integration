import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Icon from "@/components/ui/icon";

const PASSWORD = "welcome";

export default function LoginPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      localStorage.setItem("python_start_paid", "true");
      navigate("/osnovy");
    } else {
      setError(true);
      setValue("");
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-32 pb-20 px-6 flex justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-3">Доступ к курсу</p>
            <h1 className="font-serif text-3xl text-foreground">Введи пароль</h1>
            <p className="text-muted-foreground text-sm mt-2">Пароль ты получил после оплаты</p>
          </div>

          <div className="relative bg-card border border-border rounded-lg p-8">
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-primary" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setError(false); }}
                  placeholder="Введи пароль..."
                  className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                {error && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <Icon name="AlertCircle" size={14} />
                    Неверный пароль
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-6 py-3 font-semibold rounded-sm flex items-center justify-center gap-2"
              >
                <Icon name="Unlock" size={16} />
                Войти
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Ещё не оплатил?{" "}
            <a href="/payment" className="text-primary hover:underline">Купить курс — 500 ₽</a>
          </p>
        </div>
      </main>
    </div>
  );
}
