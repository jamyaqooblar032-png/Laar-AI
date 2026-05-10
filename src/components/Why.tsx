import { Globe, Lock, Sparkles, Zap } from "lucide-react";

const WHY = [
  {
    icon: Globe,
    title: "Aap ki zubaan",
    description:
      "Urdu, Roman Urdu, English, Punjabi — sab tools native support karte hain. Translate karne ki zaroorat nahi.",
  },
  {
    icon: Zap,
    title: "Tezi se kaam",
    description:
      "Modern AI infrastructure (Groq, FLUX, Whisper) — seconds mein results, ghantons mein nahi.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    description:
      "Aapka data sirf processing tak. Hum store nahi karte, sell nahi karte, AI training mein use nahi karte.",
  },
  {
    icon: Sparkles,
    title: "₨0 mein shuruwat",
    description:
      "Sign up bhi nahi chahiye. Sab basic tools forever free. Credit card mat dhundein.",
  },
];

export function Why() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">
            Why Laar AI
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pakistani creators ke liye, Pakistanis ne banaya
          </h2>
          <p className="mt-4 text-base text-fg-muted leading-relaxed">
            Western AI tools ko Urdu samajh nahi aati. Hum ne Pakistan ke
            creators, students aur businesses ke liye built kiya hai.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <w.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">
                {w.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                {w.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
