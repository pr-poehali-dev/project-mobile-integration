import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const ADMIN_URL = "https://functions.poehali.dev/5494a60d-ccbd-4046-84fe-f0f5f248d5ef";

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [secret, setSecret] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(ADMIN_URL, {
      headers: { "X-Admin-Secret": password },
    });

    setLoading(false);

    if (res.status === 401) {
      setError("Неверный пароль");
      return;
    }

    const data = JSON.parse(await res.json());
    setSubscribers(data.subscribers);
    setTotal(data.total);
    setSecret(password);
    setAuthed(true);
  };

  const handleRefresh = async () => {
    setLoading(true);
    const res = await fetch(ADMIN_URL, {
      headers: { "X-Admin-Secret": secret },
    });
    const data = JSON.parse(await res.json());
    setSubscribers(data.subscribers);
    setTotal(data.total);
    setLoading(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background dark">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-6">
          <div className="w-full max-w-sm">
            <div className="relative p-8 border border-border bg-card">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

              <div className="text-center mb-8">
                <p className="text-primary tracking-[0.2em] uppercase text-xs mb-2">Панель управления</p>
                <h1 className="font-serif text-2xl text-foreground">Вход для администратора</h1>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider text-sm"
                >
                  {loading ? "Проверяю..." : "Войти"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-primary tracking-[0.2em] uppercase text-xs mb-1">Администратор</p>
              <h1 className="font-serif text-3xl text-foreground">Подписчики портала</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-serif text-primary">{total}</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Всего</p>
              </div>
              <Button
                onClick={handleRefresh}
                disabled={loading}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Icon name="RefreshCw" size={16} className="mr-2" />
                {loading ? "..." : "Обновить"}
              </Button>
            </div>
          </div>

          <div className="relative border border-border bg-card">
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

            {subscribers.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="Users" size={40} className="mx-auto mb-4 opacity-30" />
                <p>Подписчиков пока нет</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 text-primary text-xs uppercase tracking-widest font-normal">#</th>
                    <th className="text-left px-6 py-4 text-primary text-xs uppercase tracking-widest font-normal">Email</th>
                    <th className="text-left px-6 py-4 text-primary text-xs uppercase tracking-widest font-normal">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, i) => (
                    <tr key={sub.id} className="border-b border-border/40 last:border-0 hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground text-sm font-mono">{i + 1}</td>
                      <td className="px-6 py-4 text-foreground">{sub.email}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{sub.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
