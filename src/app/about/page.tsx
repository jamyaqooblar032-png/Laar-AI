import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Sparkles, Users, Heart, Zap, Globe2 } from "lucide-react";
import { STATS } from "@/lib/tools";

export const metadata = {
  title: "About",
  description: "Laar AI ki kahaani — Pakistan ka pehla all-in-one AI toolkit.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative">
          <div className="bg-spotlight absolute inset-0 -z-10" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">
              Our Story
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              AI tools made for{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary-hover bg-clip-text text-transparent">
                Pakistanis,
              </span>{" "}
              by Pakistanis
            </h1>
            <p className="mt-6 text-lg text-fg-muted leading-relaxed">
              Western AI tools ko Urdu ki samajh nahi. Roman Urdu? Forget about
              it. Pakistani context? Bilkul nahi. Hum ne Laar AI banaya kyunki
              hum tired ho gaye the awkward translations, generic results, aur
              tools jo aap ki zubaan ko izzat nahi dete.
            </p>
            <p className="mt-4 text-lg text-fg-muted leading-relaxed">
              Hum ne {STATS.total}+ AI tools ek hi platform pe lay aaye —
              chatbot, image gen, video editor, captions, avatar, voiceover,
              Roman Urdu → Nastaliq, Quran reels, salat times, aur bohat kuch.
              Sab Urdu/Roman Urdu/English samajhne wale. Sab free.
            </p>
          </div>
        </section>

        <section className="border-y border-border-soft bg-bg-soft py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold mb-12">
              What we believe
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Belief
                icon={Globe2}
                title="Language matters"
                desc="Urdu, Roman Urdu, English — sab native support. Translate karne ki zaroorat nahi."
              />
              <Belief
                icon={Heart}
                title="Built with care"
                desc="Har tool aap ke local context ke saath. Pakistani creators ke liye, Pakistanis ne banaya."
              />
              <Belief
                icon={Zap}
                title="Fast & free"
                desc="Sign up bhi nahi. Credit card nahi. Daily limits hain lekin almost sab kuch free."
              />
              <Belief
                icon={Sparkles}
                title="More coming"
                desc="80+ tools ka start hai. Har hafte naye tools add hote hain. Suggestions welcome."
              />
            </div>
          </div>
        </section>

        <section id="roadmap" className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">
              Roadmap
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              Aage kya aa raha hai
            </h2>
            <div className="mt-12 space-y-6">
              <Phase
                phase="Phase 1"
                title="Hero tools live"
                status="In progress"
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

        <section id="contact" className="border-t border-border-soft py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <Users className="mx-auto h-8 w-8 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold">
              Want to help build this?
            </h2>
            <p className="mt-3 text-fg-muted">
              Open source contributors, content creators, designers, and early
              users — sab welcome. Reach out on{" "}
              <a
                href="https://github.com/jamyaqooblar032-png/Laar-AI"
                className="text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>{" "}
              or email{" "}
              <a
                href="mailto:hello@laarai.app"
                className="text-primary hover:underline"
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

function Belief({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-card p-6">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-5 font-display text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-fg-muted leading-relaxed">{desc}</p>
    </div>
  );
}

function Phase({
  phase,
  title,
  status,
  items,
}: {
  phase: string;
  title: string;
  status: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-primary font-semibold">
            {phase}
          </span>
          <h3 className="mt-1 font-display text-lg font-semibold">{title}</h3>
        </div>
        <span className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-muted">
          {status}
        </span>
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-fg-muted"
          >
            <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
