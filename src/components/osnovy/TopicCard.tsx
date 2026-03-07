import Icon from "@/components/ui/icon";
import {
  ProgramStructureChart,
  InterpreterFlowChart,
  VariablesChart,
  IOFlowChart,
  ConditionsChart,
  LoopsChart,
  FunctionsChart,
  IDLEChart,
} from "@/components/osnovy/TopicCharts";

export interface Step {
  label: string;
  text: string;
}

export interface Topic {
  title: string;
  icon: string;
  intro: string;
  steps?: Step[];
  link?: string;
  image?: { src: string; caption: string };
  visual?: "structure" | "interpreter" | "variables" | "io" | "conditions" | "loops" | "functions" | "idle";
  blocks: { label: string; code: string; comment?: string }[];
}

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="relative p-8 bg-card border border-border">
      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />

      <div className="flex items-center gap-3 mb-4">
        <span className="text-primary"><Icon name={topic.icon} size={22} /></span>
        <h2 className="font-serif text-2xl text-foreground">{topic.title}</h2>
      </div>

      <p className="text-muted-foreground mb-6 leading-relaxed text-base">{topic.intro}</p>

      {topic.link && (
        <a
          href={topic.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary border border-primary/40 hover:border-primary hover:bg-primary/5 transition-colors px-4 py-2 rounded-sm mb-6"
        >
          <Icon name="ExternalLink" size={14} />
          Скачать Python с python.org
        </a>
      )}

      {topic.steps && (
        <div className="space-y-3 mb-6">
          {topic.steps.map((step) => (
            <div key={step.label} className="flex gap-3">
              <span className="text-primary text-xs font-semibold uppercase tracking-wider shrink-0 mt-1 w-16">{step.label}</span>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      )}

      {topic.visual === "structure" && <ProgramStructureChart />}
      {topic.visual === "interpreter" && <InterpreterFlowChart />}
      {topic.visual === "variables" && <VariablesChart />}
      {topic.visual === "io" && <IOFlowChart />}
      {topic.visual === "conditions" && <ConditionsChart />}
      {topic.visual === "loops" && <LoopsChart />}
      {topic.visual === "functions" && <FunctionsChart />}
      {topic.visual === "idle" && <IDLEChart />}

      {topic.image && (
        <div className="mb-6">
          <div className="border border-border rounded-sm overflow-hidden">
            <img
              src={topic.image.src}
              alt={topic.image.caption}
              className="w-full h-auto block"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Icon name="Info" size={12} />
            {topic.image.caption}
          </p>
        </div>
      )}

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
    </div>
  );
}