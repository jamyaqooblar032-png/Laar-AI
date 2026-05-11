import { Globe, Lock, Sparkles, Zap } from "lucide-react";
import { Reveal } from "./Reveal";

const WHY = [
  {
    icon: Zap,
    title: "Fast by default",
    description:
      "Powered by Groq, Gemini, FLUX and Whisper — most tools return results in seconds, not minutes.",
  },
  {
    icon: Globe,
    title: "Works in your language",
    description:
      "Multilingual support across the entire toolkit, including Urdu, Hindi, Arabic, Punjabi and English.",
  },
  {
    icon: Lock,
    title: "Privacy-first",
    description:
      "We never store your prompts, files or generations. Nothing is used for AI training, ever.",
  },
  {
    icon: Sparkles,
    title: "Free to start",
    description:
      "No signup, no credit card. All core tools are free forever — paid plans only unlock heavier limits.",
  },
];

export function Why() {
  return (
    <section className="relative py-24 sm:py-28 border-t border-border-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Why Laar AI
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
            Built like the tools you already love.
          </h2>
          <p className="mt-5 text-base text-fg-muted leading-relaxed sm:text-lg">
            One platform, one consistent design system, one shared account.
            Every tool ships with the same care.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal
              key={w.title}
              delay={i * 80}
              className="group relative bg-bg-card p-7 transition-colors hover:bg-bg-elevated"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-bg-soft text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-fg">
                {w.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                {w.description}
              </p>
              <span className="absolute top-5 right-5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle/60">
                0{i + 1}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
