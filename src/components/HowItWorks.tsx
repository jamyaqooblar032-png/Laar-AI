import { Search, Wand2, Download } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Tool choose karein",
    description:
      "80+ tools mein se apni zaroorat ka tool dhundein — chatbot, image gen, video editor, kuch bhi.",
  },
  {
    step: "02",
    icon: Wand2,
    title: "Apna input dein",
    description:
      "Text, image, video — jo bhi chahiye. Urdu, Roman Urdu, English — sab samjha jata hai.",
  },
  {
    step: "03",
    icon: Download,
    title: "Result download karein",
    description:
      "Seconds mein result milta hai — copy, download, ya directly social pe share karein.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-24 border-y border-border-soft bg-bg-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            3 step mein AI ka magic
          </h2>
          <p className="mt-4 text-base text-fg-muted leading-relaxed">
            Sign up ka jhanjat nahi. Credit card nahi. Bas kaam karo aur output
            le lo.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="relative">
              <div className="absolute -top-2 -left-2 font-display text-7xl font-black text-fg/[0.04]">
                {s.step}
              </div>
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-bg-card text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
