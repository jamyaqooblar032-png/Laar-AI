import { Globe, Lock, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const WHY = [
  {
    icon: Globe,
    title: "Aap ki zubaan",
    description:
      "Urdu, Roman Urdu, English, Punjabi — sab tools native support karte hain. Translate karne ki zaroorat nahi.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.25)",
  },
  {
    icon: Zap,
    title: "Tezi se kaam",
    description:
      "Modern AI infrastructure (Groq, Gemini, FLUX, Whisper) — seconds mein results, ghantons mein nahi.",
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.25)",
  },
  {
    icon: Lock,
    title: "Privacy first",
    description:
      "Aapka data sirf processing tak. Hum store nahi karte, sell nahi karte, AI training mein use nahi karte.",
    gradient: "from-purple-500 to-pink-500",
    glow: "rgba(168, 85, 247, 0.25)",
  },
  {
    icon: Sparkles,
    title: "₨0 mein shuruwat",
    description:
      "Sign up bhi nahi chahiye. Sab basic tools forever free. Credit card mat dhundein.",
    gradient: "from-cyan-500 to-blue-500",
    glow: "rgba(6, 182, 212, 0.25)",
  },
];

export function Why() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Subtle bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <div
          className="blob blob-1"
          style={{
            top: "10%",
            left: "60%",
            width: "300px",
            height: "300px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
            Why Laar AI
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Pakistani creators ke liye,
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Pakistanis ne banaya
            </span>
          </h2>
          <p className="mt-5 text-base text-fg-muted leading-relaxed sm:text-lg">
            Western AI tools ko Urdu samajh nahi aati. Hum ne Pakistan ke
            creators, students aur businesses ke liye built kiya hai.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <div
              key={w.title}
              className="group lift-on-hover relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-primary/30"
              style={
                {
                  ["--glow" as string]: w.glow,
                } as React.CSSProperties
              }
            >
              {/* Hover gradient blob */}
              <div
                className={cn(
                  "pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-40 bg-gradient-to-br",
                  w.gradient
                )}
              />

              <div
                className={cn(
                  "relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                  w.gradient
                )}
                style={{ boxShadow: `0 8px 28px -10px ${w.glow}` }}
              >
                <w.icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="relative mt-5 font-display text-base font-semibold tracking-tight">
                {w.title}
              </h3>
              <p className="relative mt-2 text-sm text-fg-muted leading-relaxed">
                {w.description}
              </p>

              {/* Number badge */}
              <span className="absolute top-5 right-5 text-[10px] uppercase tracking-wider text-fg-subtle/60 font-mono">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
