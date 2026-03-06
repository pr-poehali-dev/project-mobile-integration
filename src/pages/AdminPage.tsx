import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const ADMIN_URL = "https://functions.poehali.dev/5494a60d-ccbd-4046-84fe-f0f5f248d5ef";
const DELETE_URL = "https://functions.poehali.dev/21c26996-3ebc-4b57-b0f7-4ed9222e57bb";

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

async function fetchSubscribers(secret: string) {
  const res = await fetch(ADMIN_URL, { headers: { "X-Admin-Secret": secret } });
  const data = JSON.parse(await res.json());
  return data as { subscribers: Subscriber[]; total: number };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [secret, setSecret] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(ADMIN_URL, { headers: { "X-Admin-Secret": password } });

    if (res.status === 401) {
      setLoading(false);
      setError("Неверный пароль");
      return;
    }

    const data = JSON.parse(await res.json());
    setSubscribers(data.subscribers);
    setTotal(data.total);
    setSecret(password);
    setAuthed(true);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    const data = await fetchSubscribers(secret);
    setSubscribers(data.subscribers);
    setTotal(data.total);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить этого подписчика?")) return;
    setDeletingId(id);

    await fetch(DELETE_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
      body: JSON.stringify({ id }),
    });

    const data = await fetchSubscribers(secret);
    setSubscribers(data.subscribers);
    setTotal(data.total);
    setDeletingId(null);
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
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, i) => (
                    <tr key={sub.id} className="border-b border-border/40 last:border-0 hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground text-sm font-mono">{i + 1}</td>
                      <td className="px-6 py-4 text-foreground">{sub.email}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{sub.created_at}</td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => handleDelete(sub.id)}
                          disabled={deletingId === sub.id}
                          className="text-muted-foreground hover:text-red-400 transition-colors disabled:opacity-30"
                          title="Удалить"
                        >
                          {deletingId === sub.id
                            ? <Icon name="Loader" size={16} className="animate-spin" />
                            : <Icon name="Trash2" size={16} />
                          }
                        </button>
                      </td>
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
