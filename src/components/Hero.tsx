"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "./ui/button";
import { STATS } from "@/lib/tools";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Layered backgrounds */}
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="bg-spotlight absolute inset-0 -z-10" />
      <div className="bg-aurora -z-10" />
      <div className="bg-noise -z-10" />

      {/* Floating blobs */}
      <div
        className="blob blob-1 -z-10"
        style={{ top: "-10%", left: "-5%", width: "320px", height: "320px" }}
      />
      <div
        className="blob blob-2 -z-10"
        style={{ top: "20%", right: "-8%", width: "380px", height: "380px" }}
      />
      <div
        className="blob blob-3 -z-10"
        style={{
          bottom: "-15%",
          left: "30%",
          width: "300px",
          height: "300px",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-bg/40 to-bg" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative pb-16 pt-20 sm:pb-24 sm:pt-28 lg:pb-32 lg:pt-32">
          {/* Eyebrow */}
          <div className="flex justify-center animate-fade-up">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/60 px-4 py-1.5 text-xs text-fg-muted backdrop-blur-md transition hover:border-primary/40 hover:text-fg hover:bg-bg-card/80"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Pakistan ka pehla all-in-one AI toolkit
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <h1 className="mt-8 text-center font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block animate-fade-up stagger-1">
              AI tools that speak
            </span>
            <span className="block animate-fade-up stagger-2 bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              your language
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-base text-fg-muted leading-relaxed sm:text-lg animate-fade-up stagger-3">
            <span className="font-urdu text-xl text-fg" lang="ur">
              لاڑ اے آئی
            </span>{" "}
            — chatbot, image generator, captions, video editor, AI avatar,
            voiceover, Roman Urdu → Nastaliq aur{" "}
            <span className="font-semibold text-fg">{STATS.total}+ tools</span>
            <span> — sab ek jagah, free.</span>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up stagger-4">
            <Link href="/tools">
              <Button variant="primary" size="lg" className="magnetic">
                <Sparkles className="h-4 w-4" />
                Explore {STATS.total}+ Tools
              </Button>
            </Link>
            <Link href="/tools/chatbot">
              <Button variant="secondary" size="lg" className="magnetic">
                Try Chatbot Free
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto animate-fade-up stagger-5">
            <Stat
              value={STATS.active}
              suffix="+"
              label="Live Tools"
              icon={<Zap className="h-4 w-4 text-primary" />}
            />
            <Stat
              value={STATS.comingSoon}
              suffix="+"
              label="Coming Soon"
              icon={<Sparkles className="h-4 w-4 text-purple-400" />}
            />
            <Stat
              value={0}
              prefix="₨"
              label="To Get Started"
              icon={<Star className="h-4 w-4 text-accent" />}
            />
          </div>

          {/* Press / trust strip */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-fg-subtle animate-fade-up stagger-6">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              No credit card
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Urdu &amp; Roman Urdu
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              Multi-AI fallback
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Made in Pakistan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  prefix,
  suffix,
  label,
  icon,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}) {
  const display = useCountUp(value, 1100);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-fg-subtle">
        {icon}
        {label}
      </div>
      <span className="font-display text-2xl font-bold sm:text-3xl tabular-nums">
        {prefix ?? ""}
        {display}
        {suffix ?? ""}
      </span>
    </div>
  );
}

function useCountUp(target: number, durationMs = 1000) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    let raf = 0;
    const start = performance.now();

    const tick = (t: number) => {
      const elapsed = t - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return val;
}
