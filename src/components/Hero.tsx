"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { CountUp } from "./CountUp";
import { STATS } from "@/lib/tools";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-soft">
      {/* Subtle backgrounds — single layer, no rainbow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="bg-grid absolute inset-0" />
        <div className="bg-spotlight absolute inset-0" />
        {/* Floating orbs for depth */}
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative py-20 sm:py-28 lg:py-32">
          {/* Eyebrow */}
          <div className="flex justify-center animate-fade-up">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3.5 py-1 text-xs text-fg-muted transition-colors hover:border-fg-subtle/40 hover:text-fg"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Introducing Laar AI {STATS.total}+ tools
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Headline */}
          <h1 className="mx-auto mt-8 max-w-4xl text-center font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl animate-fade-up stagger-1">
            <span className="text-gradient-fg">The all-in-one</span>
            <br className="hidden sm:block" />{" "}
            <span className="text-primary">AI toolkit</span>
            <span className="text-gradient-fg"> for modern teams.</span>
          </h1>

          {/* Subhead */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-base text-fg-muted leading-relaxed sm:text-lg animate-fade-up stagger-2">
            Chatbot, image generator, captions, video editor, AI avatar,
            voiceover, transcription and{" "}
            <span className="font-medium text-fg">
              {STATS.total}+ professional tools
            </span>{" "}
            — built on top of the best open models. Free forever.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up stagger-3">
            <Link href="/tools">
              <Button variant="primary" size="lg" className="magnetic btn-shine">
                <Sparkles className="h-4 w-4" />
                Explore {STATS.total}+ tools
              </Button>
            </Link>
            <Link href="/tools/chatbot">
              <Button variant="outline" size="lg" className="magnetic">
                Try the chatbot
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-fg-subtle animate-fade-up stagger-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              No credit card required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Free forever tier
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Privacy-first
            </span>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border max-w-3xl mx-auto animate-fade-up stagger-5">
            <Stat
              value={
                <CountUp
                  end={STATS.active}
                  suffix="+"
                  className="tabular-nums"
                />
              }
              label="Live tools"
            />
            <Stat
              value={
                <CountUp end={120} suffix="+" className="tabular-nums" />
              }
              label="Languages"
            />
            <Stat value={<span className="tabular-nums">$0</span>} label="To get started" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="bg-bg-card p-5 sm:p-6">
      <p className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-xs text-fg-subtle uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
