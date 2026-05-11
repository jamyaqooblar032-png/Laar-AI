import { Search, Wand2, Download } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Choose a tool",
    description:
      "Search 58 tools by name, category or keyword. Each one solves a single, clearly defined problem.",
  },
  {
    step: "02",
    icon: Wand2,
    title: "Provide your input",
    description:
      "Type, paste, upload or record. Every interface is built around a single focused interaction.",
  },
  {
    step: "03",
    icon: Download,
    title: "Take the result",
    description:
      "Copy, download or share in one click. No watermarks, no signup walls, no upsell on output.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-28 border-t border-border-soft bg-bg-soft overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
            From idea to output, in three moves.
          </h2>
          <p className="mt-5 text-base text-fg-muted leading-relaxed sm:text-lg">
            We optimized for the path from question to answer. No dashboards,
            no onboarding flows — just the tool, your input, the result.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.step}
              delay={i * 120}
              className="group relative bg-bg-card p-8 transition-colors hover:bg-bg-elevated"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                Step {s.step}
              </span>
              <div className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-soft text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                {s.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
