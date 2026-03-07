import Icon from "@/components/ui/icon";

export interface SectionStep {
  label: string;
  text: string;
}

export interface SectionBlock {
  label: string;
  code: string;
  comment?: string;
}

export interface SectionTopic {
  title: string;
  icon: string;
  intro: string;
  steps?: SectionStep[];
  level?: string;
  visual?: React.ReactNode;
  blocks?: SectionBlock[];
}

const levelColors: Record<string, string> = {
  "Начинающий": "text-green-400 border-green-400/30 bg-green-400/10",
  "Средний": "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  "Продвинутый": "text-primary border-primary/30 bg-primary/10",
};

export function SectionCard({ topic }: { topic: SectionTopic }) {
  return (
    <div className="relative p-8 bg-card border border-border">
      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-primary"><Icon name={topic.icon} size={22} /></span>
          <h2 className="font-serif text-2xl text-foreground">{topic.title}</h2>
        </div>
        {topic.level && (
          <span className={`text-xs px-3 py-1 border rounded-sm font-medium tracking-wide ${levelColors[topic.level] ?? ""}`}>
            {topic.level}
          </span>
        )}
      </div>

      <p className="text-muted-foreground mb-6 leading-relaxed text-base">{topic.intro}</p>

      {topic.steps && topic.steps.length > 0 && (
        <div className="space-y-3 mb-6">
          {topic.steps.map((step) => (
            <div key={step.label} className="flex gap-3">
              <span className="text-primary text-xs font-semibold uppercase tracking-wider shrink-0 mt-1 w-20">{step.label}</span>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      )}

      {topic.visual && <div className="mb-6">{topic.visual}</div>}

      {topic.blocks && topic.blocks.length > 0 && (
        <div className="space-y-4">
          {topic.blocks.map((block, i) => (
            <div key={i}>
              <p className="text-xs text-primary/70 uppercase tracking-widest mb-2">{block.label}</p>
              <pre className="bg-background border border-border rounded-sm p-4 overflow-x-auto text-sm text-primary leading-relaxed">
                <code>{block.code}</code>
              </pre>
              {block.comment && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Icon name="Info" size={12} />
                  {block.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
