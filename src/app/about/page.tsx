import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Sparkles, Users, Heart, Zap, Globe2 } from "lucide-react";
import { STATS } from "@/lib/tools";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "About",
  description: "Laar AI ki kahaani — Pakistan ka pehla all-in-one AI toolkit.",
};

const BELIEFS = [
  {
    icon: Globe2,
    title: "Language matters",
    desc: "Urdu, Roman Urdu, English — sab native support. Translate karne ki zaroorat nahi.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.25)",
  },
  {
    icon: Heart,
    title: "Built with care",
    desc: "Har tool aap ke local context ke saath. Pakistani creators ke liye, Pakistanis ne banaya.",
    gradient: "from-rose-500 to-pink-500",
    glow: "rgba(244, 63, 94, 0.25)",
  },
  {
    icon: Zap,
    title: "Fast & free",
    desc: "Sign up bhi nahi. Credit card nahi. Daily limits hain lekin almost sab kuch free.",
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.25)",
  },
  {
    icon: Sparkles,
    title: "More coming",
    desc: "80+ tools ka start hai. Har hafte naye tools add hote hain. Suggestions welcome.",
    gradient: "from-purple-500 to-indigo-500",
    glow: "rgba(168, 85, 247, 0.25)",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="bg-spotlight absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 opacity-60">
            <div
              className="blob blob-1"
              style={{
                top: "0%",
                left: "10%",
                width: "350px",
                height: "350px",
              }}
            />
            <div
              className="blob blob-2"
              style={{
                top: "0%",
                right: "10%",
                width: "350px",
                height: "350px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-medium">
              <Heart className="h-3 w-3" />
              Our Story
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              AI tools made for{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                Pakistanis,
              </span>{" "}
              by Pakistanis
            </h1>
            <p className="mt-6 text-lg text-fg-muted leading-relaxed sm:text-xl">
              Western AI tools ko Urdu ki samajh nahi. Roman Urdu? Forget about
              it. Pakistani context? Bilkul nahi. Hum ne Laar AI banaya kyunki
              hum tired ho gaye the awkward translations, generic results, aur
              tools jo aap ki zubaan ko izzat nahi dete.
            </p>
            <p className="mt-4 text-lg text-fg-muted leading-relaxed sm:text-xl">
              Hum ne{" "}
              <span className="text-fg font-semibold tabular-nums">
                {STATS.total}+
              </span>{" "}
              AI tools ek hi platform pe lay aaye — chatbot, image gen, video
              editor, captions, avatar, voiceover, Roman Urdu → Nastaliq, Quran
              reels, salat times, aur bohat kuch. Sab Urdu/Roman Urdu/English
              samajhne wale. Sab free.
            </p>
          </div>
        </section>

        <section className="border-y border-border-soft bg-bg-soft py-20 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
                Our values
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                What we believe
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {BELIEFS.map((b, i) => (
                <div
                  key={b.title}
                  className="group lift-on-hover relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-primary/30"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-40 bg-gradient-to-br",
                      b.gradient
                    )}
                  />
                  <div
                    className={cn(
                      "relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                      b.gradient
                    )}
                    style={{ boxShadow: `0 8px 28px -10px ${b.glow}` }}
                  >
                    <b.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="relative mt-5 font-display text-base font-semibold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-fg-muted leading-relaxed">
                    {b.desc}
                  </p>
                  <span className="absolute top-5 right-5 text-[10px] uppercase tracking-wider text-fg-subtle/60 font-mono">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="py-20 overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
                Roadmap
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Aage kya{" "}
                <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  aa raha hai
                </span>
              </h2>
            </div>
            <div className="space-y-6">
              <Phase
                phase="Phase 1"
                title="Hero tools live"
                status="In progress"
                gradient="from-primary to-emerald-400"
                items={[
                  "AI Chatbot (Llama 3.3 + Urdu)",
                  "Reels script generator",
                  "AI Image generator (FLUX)",
                  "Roman Urdu → Nastaliq",
                  "AI Translator (120+ languages)",
                  "Resume builder",
                  "Code generator + explainer",
                ]}
              />
              <Phase
                phase="Phase 2"
                title="Video & Avatar"
                status="Coming weeks 5-8"
                gradient="from-cyan-500 to-blue-500"
                items={[
                  "CapCut-style timeline editor in browser",
                  "Auto Urdu captions (Submagic-style)",
                  "AI talking avatar (multi-tier quality)",
                  "AI dubbing (English → Urdu)",
                  "Vocals remover (karaoke maker)",
                  "Photo enhancer + colorizer",
                  "Wedding invitation maker",
                ]}
              />
              <Phase
                phase="Phase 3"
                title="Pakistani specials + utilities"
                status="Coming weeks 9-12"
                gradient="from-purple-500 to-pink-500"
                items={[
                  "Quran ayat reel maker",
                  "Salat times + Qibla compass",
                  "Cricket score graphics",
                  "Real estate reel maker",
                  "PDF tools (merge, split, chat)",
                  "All utility tools (QR, password, currency, EMI, invoice)",
                ]}
              />
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-border-soft py-20 overflow-hidden">
          <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative inline-flex">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 blur-xl opacity-50" />
              <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500 shadow-xl ring-1 ring-inset ring-white/10">
                <Users className="h-7 w-7 text-white" />
              </div>
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Want to help build this?
            </h2>
            <p className="mt-4 text-fg-muted leading-relaxed sm:text-lg">
              Open source contributors, content creators, designers, and early
              users — sab welcome. Reach out on{" "}
              <a
                href="https://github.com/jamyaqooblar032-png/Laar-AI"
                className="text-primary hover:underline font-medium"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>{" "}
              or email{" "}
              <a
                href="mailto:hello@laarai.app"
                className="text-primary hover:underline font-medium"
              >
                hello@laarai.app
              </a>
              .
            </p>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

function Phase({
  phase,
  title,
  status,
  gradient,
  items,
}: {
  phase: string;
  title: string;
  status: string;
  gradient: string;
  items: string[];
}) {
  return (
    <div className="group lift-on-hover relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-primary/30">
      <div
        className={cn(
          "pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-30 bg-gradient-to-br",
          gradient
        )}
      />
      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ring-1 ring-inset ring-white/10",
              gradient
            )}
          >
            <span className="text-xs font-bold text-white">
              {phase.replace("Phase ", "")}
            </span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-primary font-semibold">
              {phase}
            </span>
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {title}
            </h3>
          </div>
        </div>
        <span className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-muted">
          {status}
        </span>
      </div>
      <ul className="relative mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-fg-muted"
          >
            <span
              className={cn(
                "mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br",
                gradient
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
