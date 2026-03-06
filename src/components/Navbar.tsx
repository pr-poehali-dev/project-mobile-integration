import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const sections = [
  { label: "Основы", path: "/osnovy" },
  { label: "Структуры данных", path: "/struktury" },
  { label: "Функции", path: "/funkcii" },
  { label: "ООП", path: "/oop" },
  { label: "Веб-разработка", path: "/web" },
  { label: "Базы данных", path: "/bazy-dannyh" },
  { label: "Автоматизация", path: "/avtomatizaciya" },
  { label: "Проекты", path: "/proekty" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-lg text-foreground flex items-center gap-2">
          <span className="text-gold-gradient">Python</span>
          <span>Старт</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {sections.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className={`px-3 py-1.5 text-sm transition-colors rounded-sm ${
                location.pathname === s.path
                  ? "text-primary border-b border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border px-6 py-4 flex flex-col gap-2">
          {sections.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              onClick={() => setOpen(false)}
              className={`py-2 text-sm border-b border-border/40 last:border-0 transition-colors ${
                location.pathname === s.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
