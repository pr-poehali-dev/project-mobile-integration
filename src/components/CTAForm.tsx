import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SUBSCRIBE_URL = "https://functions.poehali.dev/d7b19161-4f62-4489-a769-b693c50413ba";

export function CTAForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(SUBSCRIBE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (res.status === 201 || res.status === 200) {
      setSubmitted(true);
    } else {
      setError("Что-то пошло не так. Попробуй ещё раз.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="font-serif text-2xl text-primary mb-2">Отлично, ты в деле!</p>
        <p className="text-muted-foreground">
          Гайд «Первые 7 дней с Python» уже летит на твою почту. Добро пожаловать в мир кода!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Твой email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wider uppercase text-sm px-8 transition-all duration-300"
      >
        {loading ? "..." : "Начать учиться"}
      </Button>
      {error && <p className="text-red-400 text-sm w-full text-center">{error}</p>}
    </form>
  );
}
