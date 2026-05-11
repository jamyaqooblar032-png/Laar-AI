import { Search, Wand2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Tool choose karein",
    description:
      "80+ tools mein se apni zaroorat ka tool dhundein — chatbot, image gen, video editor, kuch bhi.",
    gradient: "from-primary to-emerald-400",
  },
  {
    step: "02",
    icon: Wand2,
    title: "Apna input dein",
    description:
      "Text, image, video — jo bhi chahiye. Urdu, Roman Urdu, English — sab samjha jata hai.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    step: "03",
    icon: Download,
    title: "Result download karein",
    description:
      "Seconds mein result milta hai — copy, download, ya directly social pe share karein.",
    gradient: "from-purple-500 to-pink-500",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-24 border-y border-border-soft bg-bg-soft overflow-hidden">
      {/* Subtle grid bg */}
      <div className="bg-grid absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            3 step mein{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI ka magic
            </span>
          </h2>
          <p className="mt-5 text-base text-fg-muted leading-relaxed sm:text-lg">
            Sign up ka jhanjat nahi. Credit card nahi. Bas kaam karo aur output
            le lo.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 relative">
          {/* Connector dashed line on desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px">
            <div
              className="h-full w-full bg-[linear-gradient(to_right,rgba(16,185,129,0.4)_50%,transparent_50%)]"
              style={{ backgroundSize: "12px 1px" }}
            />
          </div>

          {STEPS.map((s, i) => (
            <div key={s.step} className="relative group">
              {/* Big faded number */}
              <div className="absolute -top-6 -left-2 font-display text-8xl font-black text-fg/[0.05] select-none pointer-events-none">
                {s.step}
              </div>

              <div className="relative">
                {/* Icon with gradient ring */}
                <div className="relative inline-flex">
                  {/* Glow */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl blur-lg opacity-50 bg-gradient-to-br",
                      s.gradient
                    )}
                  />
                  <div
                    className={cn(
                      "relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-inset ring-white/10 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                      s.gradient
                    )}
                  >
                    <s.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-soft bg-bg-card/60 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-fg-subtle">
                  Step {i + 1}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
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
