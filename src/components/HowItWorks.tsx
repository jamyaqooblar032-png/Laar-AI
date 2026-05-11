import { Search, Wand2, Download } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Pick a tool",
    description:
      "Browse the library or search for what you need — chatbot, image generator, transcription, anything.",
  },
  {
    step: "02",
    icon: Wand2,
    title: "Give it your input",
    description:
      "Type, paste, upload or record. Every tool is designed around a single, focused flow.",
  },
  {
    step: "03",
    icon: Download,
    title: "Ship the result",
    description:
      "Copy, download, or share directly. No watermarks, no signup, no paywalls on core features.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-28 border-t border-border-soft bg-bg-soft overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
            Three steps. No setup.
          </h2>
          <p className="mt-5 text-base text-fg-muted leading-relaxed sm:text-lg">
            Skip the onboarding flows and pricing pages. Use the tool, get the
            result, move on with your day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="relative bg-bg-card p-8">
              <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                Step {s.step}
              </span>
              <div className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-soft text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
