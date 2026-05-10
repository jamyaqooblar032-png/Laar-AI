import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "./ui/button";
import { STATS } from "@/lib/tools";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="bg-spotlight absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-bg/40 to-bg" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative pb-16 pt-20 sm:pb-24 sm:pt-28 lg:pb-32 lg:pt-32">
          {/* Eyebrow */}
          <div className="flex justify-center">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/60 px-4 py-1.5 text-xs text-fg-muted backdrop-blur transition hover:border-primary/40 hover:text-fg"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Pakistan ka pehla all-in-one AI toolkit
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <h1 className="mt-8 text-center font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">AI tools that speak</span>
            <span className="block bg-gradient-to-r from-primary via-cyan-400 to-primary-hover bg-clip-text text-transparent">
              your language
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-base text-fg-muted leading-relaxed sm:text-lg">
            <span className="font-urdu text-xl text-fg" lang="ur">
              لاڑ اے آئی
            </span>{" "}
            — chatbot, image generator, captions, video editor, AI avatar,
            voiceover, Roman Urdu → Nastaliq aur{" "}
            <span className="font-semibold text-fg">{STATS.total}+ tools</span>
            <span> — sab ek jagah, free.</span>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/tools">
              <Button variant="primary" size="lg">
                <Sparkles className="h-4 w-4" />
                Explore {STATS.total}+ Tools
              </Button>
            </Link>
            <Link href="/tools/chatbot">
              <Button variant="secondary" size="lg">
                Try Chatbot Free
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <Stat
              value={`${STATS.active}+`}
              label="Live Tools"
              icon={<Zap className="h-4 w-4 text-primary" />}
            />
            <Stat
              value={`${STATS.comingSoon}+`}
              label="Coming Soon"
              icon={<Sparkles className="h-4 w-4 text-purple-400" />}
            />
            <Stat
              value="₨0"
              label="To Get Started"
              icon={<Star className="h-4 w-4 text-accent" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-fg-subtle">
        {icon}
        {label}
      </div>
      <span className="font-display text-2xl font-bold sm:text-3xl">
        {value}
      </span>
    </div>
  );
}
