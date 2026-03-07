import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const ADMIN_URL = "https://functions.poehali.dev/b048b876-35e0-4d0c-b783-9069d24606a9";

interface Buyer {
  id: number;
  name: string;
  telegram: string;
  note: string;
  created_at: string;
}

interface AdminData {
  subscribers_count: number;
  buyers: Buyer[];
  buyers_count: number;
  course_password: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [secret, setSecret] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [tab, setTab] = useState<"buyers" | "password" | "subscribers">("buyers");

  const [newBuyer, setNewBuyer] = useState({ name: "", telegram: "", note: "" });
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchData = async (s: string) => {
    const res = await fetch(ADMIN_URL, { headers: { "X-Admin-Secret": s } });
    if (res.status === 401) return null;
    const raw = await res.text();
    return JSON.parse(raw) as AdminData;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await fetchData(password);
    setLoading(false);
    if (!result) { setError("Неверный пароль"); return; }
    setData(result);
    setSecret(password);
    setAuthed(true);
  };

  const handleRefresh = async () => {
    setLoading(true);
    const result = await fetchData(secret);
    if (result) setData(result);
    setLoading(false);
  };

  const handleAddBuyer = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${ADMIN_URL}/buyers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
      body: JSON.stringify(newBuyer),
    });
    setNewBuyer({ name: "", telegram: "", note: "" });
    await handleRefresh();
  };

  const handleDeleteBuyer = async (id: number) => {
    if (!confirm("Удалить покупателя?")) return;
    setDeletingId(id);
    await fetch(`${ADMIN_URL}/buyers`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
      body: JSON.stringify({ id }),
    });
    await handleRefresh();
    setDeletingId(null);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${ADMIN_URL}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
      body: JSON.stringify({ password: newPassword }),
    });
    setPasswordSaved(true);
    setNewPassword("");
    await handleRefresh();
    setTimeout(() => setPasswordSaved(false), 3000);
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
                  placeholder="Пароль администратора"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                />
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider text-sm">
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
              <h1 className="font-serif text-3xl text-foreground">Панель управления</h1>
            </div>
            <Button onClick={handleRefresh} disabled={loading} variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Icon name="RefreshCw" size={16} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
              Обновить
            </Button>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <p className="text-4xl font-serif text-primary">{data?.buyers_count ?? 0}</p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Покупателей</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <p className="text-4xl font-serif text-primary">{data?.subscribers_count ?? 0}</p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Подписчиков</p>
            </div>
          </div>

          {/* Табы */}
          <div className="flex gap-1 mb-6 border-b border-border">
            {([["buyers", "Покупатели"], ["password", "Пароль курса"], ["subscribers", "Подписчики"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-2 text-sm transition-colors border-b-2 -mb-px ${tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Покупатели */}
          {tab === "buyers" && (
            <div className="space-y-6">
              <form onSubmit={handleAddBuyer} className="bg-card border border-border rounded-lg p-6 space-y-3">
                <p className="text-sm text-primary uppercase tracking-widest mb-2">Добавить покупателя</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input placeholder="Имя" value={newBuyer.name} onChange={(e) => setNewBuyer({ ...newBuyer, name: e.target.value })} className="bg-background border-border text-foreground" />
                  <Input placeholder="Telegram (@username)" value={newBuyer.telegram} onChange={(e) => setNewBuyer({ ...newBuyer, telegram: e.target.value })} className="bg-background border-border text-foreground" />
                  <Input placeholder="Заметка" value={newBuyer.note} onChange={(e) => setNewBuyer({ ...newBuyer, note: e.target.value })} className="bg-background border-border text-foreground" />
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </form>

              <div className="relative border border-border bg-card">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />
                {!data?.buyers.length ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Icon name="Users" size={40} className="mx-auto mb-4 opacity-30" />
                    <p>Покупателей пока нет</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-6 py-4 text-primary text-xs uppercase tracking-widest font-normal">Имя</th>
                        <th className="text-left px-6 py-4 text-primary text-xs uppercase tracking-widest font-normal">Telegram</th>
                        <th className="text-left px-6 py-4 text-primary text-xs uppercase tracking-widest font-normal">Заметка</th>
                        <th className="text-left px-6 py-4 text-primary text-xs uppercase tracking-widest font-normal">Дата</th>
                        <th className="px-4 py-4" />
                      </tr>
                    </thead>
                    <tbody>
                      {data.buyers.map((b) => (
                        <tr key={b.id} className="border-b border-border/40 last:border-0 hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 text-foreground">{b.name || "—"}</td>
                          <td className="px-6 py-4 text-muted-foreground">{b.telegram || "—"}</td>
                          <td className="px-6 py-4 text-muted-foreground text-sm">{b.note || "—"}</td>
                          <td className="px-6 py-4 text-muted-foreground text-sm">{b.created_at}</td>
                          <td className="px-4 py-4 text-right">
                            <button onClick={() => handleDeleteBuyer(b.id)} disabled={deletingId === b.id} className="text-muted-foreground hover:text-red-400 transition-colors disabled:opacity-30">
                              <Icon name={deletingId === b.id ? "Loader" : "Trash2"} size={16} className={deletingId === b.id ? "animate-spin" : ""} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Пароль курса */}
          {tab === "password" && (
            <div className="bg-card border border-border rounded-lg p-8 max-w-md">
              <p className="text-sm text-muted-foreground mb-2">Текущий пароль курса:</p>
              <p className="font-mono text-xl text-primary mb-6 bg-background border border-border rounded px-4 py-2">{data?.course_password}</p>
              <form onSubmit={handleChangePassword} className="space-y-3">
                <p className="text-sm text-primary uppercase tracking-widest">Сменить пароль</p>
                <Input
                  type="text"
                  placeholder="Новый пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="bg-background border-border text-foreground"
                />
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
                {passwordSaved && (
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <Icon name="CheckCircle" size={14} />
                    Пароль обновлён
                  </p>
                )}
              </form>
            </div>
          )}

          {/* Подписчики */}
          {tab === "subscribers" && (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <Icon name="Users" size={40} className="mx-auto mb-4 text-primary/40" />
              <p className="text-4xl font-serif text-primary mb-2">{data?.subscribers_count ?? 0}</p>
              <p className="text-muted-foreground">человек подписаны на рассылку</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}