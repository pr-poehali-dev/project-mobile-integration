import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const CATEGORY_META: Record<string, { label: string; color: string; icon: string }> = {
  импорт:       { label: "Импорт",        color: "border-blue-500/40 bg-blue-500/5 text-blue-400",    icon: "Package" },
  настройка:    { label: "Настройка",     color: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400", icon: "Settings" },
  подключение:  { label: "Подключение",   color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-400",    icon: "Wifi" },
  данные:       { label: "Данные",        color: "border-purple-500/40 bg-purple-500/5 text-purple-400", icon: "Database" },
  индикатор:    { label: "Индикатор",     color: "border-orange-500/40 bg-orange-500/5 text-orange-400", icon: "BarChart2" },
  сигнал:       { label: "Сигнал",        color: "border-pink-500/40 bg-pink-500/5 text-pink-400",    icon: "Radio" },
  ордер:        { label: "Ордер",         color: "border-green-500/40 bg-green-500/5 text-green-400", icon: "ShoppingCart" },
  логика:       { label: "Логика",        color: "border-primary/40 bg-primary/5 text-primary",        icon: "GitBranch" },
  вспомогательное: { label: "Утилита",   color: "border-gray-500/40 bg-gray-500/5 text-gray-400",    icon: "Wrench" },
  цикл:         { label: "Цикл",          color: "border-indigo-500/40 bg-indigo-500/5 text-indigo-400", icon: "RefreshCw" },
  ошибка:       { label: "Обработка ошибок", color: "border-red-500/40 bg-red-500/5 text-red-400",  icon: "AlertTriangle" },
};

const DEFAULT_CODE = `import ccxt
import pandas as pd
import time

exchange = ccxt.binance({
    'apiKey': 'YOUR_API_KEY',
    'secret': 'YOUR_SECRET',
})

symbol = 'BTC/USDT'
timeframe = '1h'
trade_amount = 0.001

while True:
    ohlcv = exchange.fetch_ohlcv(symbol, timeframe, limit=50)
    df = pd.DataFrame(ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
    
    df['sma20'] = df['close'].rolling(20).mean()
    
    last_close = df['close'].iloc[-1]
    last_sma   = df['sma20'].iloc[-1]
    
    if last_close > last_sma:
        exchange.create_market_buy_order(symbol, trade_amount)
        print(f"Куплено {trade_amount} BTC по {last_close}")
    elif last_close < last_sma:
        exchange.create_market_sell_order(symbol, trade_amount)
        print(f"Продано {trade_amount} BTC по {last_close}")
    
    time.sleep(3600)`;

interface Block {
  lines: string;
  code: string;
  category: string;
  explanation: string;
}

export default function DecoderPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const url = (func2url as Record<string, string>)["code-decoder"];

  async function handleDecode() {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    setBlocks([]);
    setActiveCategory(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сервера");
      setBlocks(data.blocks);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  }

  const categories = [...new Set(blocks.map((b) => b.category))];
  const filtered = activeCategory ? blocks.filter((b) => b.category === activeCategory) : blocks;

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Инструмент</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Дешифратор кода</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Вставь код торгового бота — получи построчное объяснение простым языком.
            </p>
          </div>

          <ArtDecoDivider variant="stepped" />

          <div className="mt-12 space-y-8">
            {/* Editor */}
            <div className="relative border border-border rounded-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Code2" size={13} />
                  <span className="font-mono">trading_bot.py</span>
                </div>
                <button
                  onClick={() => setCode("")}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Очистить
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                rows={18}
                className="w-full bg-card/30 text-foreground font-mono text-sm p-4 resize-none outline-none leading-relaxed"
                placeholder="# Вставь сюда код торгового бота..."
              />
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card/50">
                <span className="text-xs text-muted-foreground">
                  {code.split("\n").length} строк · {code.length} символов
                </span>
                <button
                  onClick={handleDecode}
                  disabled={loading || !code.trim()}
                  className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors px-6 py-2 text-sm font-semibold rounded-sm"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={15} className="animate-spin" />
                      Анализирую...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" size={15} />
                      Расшифровать
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 border border-red-500/40 bg-red-500/5 rounded-sm px-4 py-3 text-sm text-red-400">
                <Icon name="AlertTriangle" size={15} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {/* Results */}
            {blocks.length > 0 && (
              <div className="space-y-6">
                {/* Stats + filter */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors ${
                      activeCategory === null
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Icon name="LayoutList" size={12} />
                    Все ({blocks.length})
                  </button>
                  {categories.map((cat) => {
                    const m = CATEGORY_META[cat] ?? { label: cat, color: "border-border text-muted-foreground", icon: "Code" };
                    const cnt = blocks.filter((b) => b.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-colors ${
                          activeCategory === cat ? m.color : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        <Icon name={m.icon} size={11} />
                        {m.label} ({cnt})
                      </button>
                    );
                  })}
                </div>

                {/* Blocks */}
                <div className="space-y-3">
                  {filtered.map((block, i) => {
                    const m = CATEGORY_META[block.category] ?? { label: block.category, color: "border-border bg-card/30 text-muted-foreground", icon: "Code" };
                    return (
                      <div key={i} className={`border rounded-sm overflow-hidden ${m.color}`}>
                        {/* Block header */}
                        <div className="flex items-center gap-3 px-4 py-2 border-b border-current/20">
                          <Icon name={m.icon} size={13} className="shrink-0" />
                          <span className="text-xs font-semibold uppercase tracking-wider">{m.label}</span>
                          <span className="ml-auto text-xs opacity-50 font-mono">строки {block.lines}</span>
                        </div>
                        {/* Code */}
                        <div className="bg-background/60 px-4 py-3 border-b border-current/10 overflow-x-auto">
                          <pre className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                            {block.code}
                          </pre>
                        </div>
                        {/* Explanation */}
                        <div className="px-4 py-3">
                          <p className="text-sm text-foreground/80 leading-relaxed">{block.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary banner */}
                <div className="border border-primary/20 bg-primary/5 rounded-sm p-4 flex items-start gap-3 text-sm text-muted-foreground">
                  <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 shrink-0" />
                  <span>
                    Разобрано <span className="text-foreground font-semibold">{blocks.length} блоков</span> кода.
                    Используй фильтр выше, чтобы сосредоточиться на конкретной части логики бота.
                  </span>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && blocks.length === 0 && !error && (
              <div className="text-center py-16 text-muted-foreground">
                <Icon name="Code2" size={40} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">Вставь код и нажми «Расшифровать» — получишь разбор каждой строки.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
