import { Navbar } from "@/components/Navbar";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { TopicCard } from "@/components/osnovy/TopicCard";
import { topics } from "@/components/osnovy/topicsData";

export default function OsnovyPage() {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Раздел 1</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Основы Python</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              С чего начинается любая программа. Переменные, условия, циклы и функции — фундамент, на котором строится всё остальное.
            </p>
          </div>

          <ArtDecoDivider variant="stepped" />

          <div className="space-y-16 mt-12">
            {topics.map((topic) => (
              <TopicCard key={topic.title} topic={topic} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
