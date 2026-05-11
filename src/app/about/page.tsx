import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Sparkles, Users, Heart, Zap, Globe2 } from "lucide-react";
import { STATS } from "@/lib/tools";

export const metadata = {
  title: "About",
  description:
    "An all-in-one AI toolkit built for writers, creators, students and developers.",
};

const BELIEFS = [
  {
    icon: Globe2,
    title: "Language is a feature",
    desc: "Multilingual handling is built into every tool — not a checkbox in settings, not an afterthought.",
  },
  {
    icon: Heart,
    title: "Built with taste",
    desc: "Every tool ships with the same care for typography, spacing and motion that you'd expect from a craft product.",
  },
  {
    icon: Zap,
    title: "Speed over signup",
    desc: "Tools open instantly. No accounts, no popups, no onboarding screens — just the surface and your work.",
  },
  {
    icon: Sparkles,
    title: "Always shipping",
    desc: `${STATS.total} tools today and growing. New tools land most weeks. Old tools stay free.`,
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

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3 py-1 text-xs text-fg-muted">
              <Heart className="h-3 w-3 text-primary" />
              Our story
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              AI tools that respect your{" "}
              <span className="text-primary">time, language and craft.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted leading-relaxed">
              Most AI products feel like dashboards bolted onto an API — heavy
              onboarding, hidden paywalls and inconsistent surfaces. Laar AI is
              the opposite: one focused workspace, one tool per problem, one
              design system everywhere.
            </p>
            <p className="mt-4 text-lg text-fg-muted leading-relaxed">
              We&apos;ve shipped{" "}
              <span className="text-fg font-medium tabular-nums">
                {STATS.total}
              </span>{" "}
              tools so far — for writing, design, audio, video, code and
              everything in between. Every one is free to open right now.
            </p>
          </div>
        </section>

        <section className="border-y border-border-soft bg-bg-soft py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium">
                Our values
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                What we believe
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
              {BELIEFS.map((b, i) => (
                <div
                  key={b.title}
                  className="relative bg-bg-card p-6 transition-colors hover:bg-bg-elevated"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-bg-soft text-primary">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted leading-relaxed">
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

        <section id="roadmap" className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium">
                Roadmap
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                What&apos;s coming next
              </h2>
            </div>
            <div className="space-y-4">
              <Phase
                phase="01"
                title="Core tools live"
                status="In progress"
                items={[
                  "AI chatbot (Llama 3.3 + multi-language)",
                  "Reels & script generator",
                  "AI image generator (FLUX / SDXL)",
                  "AI translator (120+ languages)",
                  "Resume & cover letter builder",
                  "Code generator and explainer",
                ]}
              />
              <Phase
                phase="02"
                title="Reliability & polish"
                status="Next 4 weeks"
                items={[
                  "Faster inference on every text tool",
                  "Higher-quality image and avatar output",
                  "Saved history and per-tool presets",
                  "Account sign-in and personal workspace",
                ]}
              />
              <Phase
                phase="03"
                title="What’s next"
                status="Soon"
                items={[
                  "More languages and richer voices",
                  "Document understanding (PDF Q&A)",
                  "Photo restoration and enhancement",
                  "Mobile apps for iOS and Android",
                ]}
              />
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-border-soft py-20"
        >
          <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-bg-soft text-primary">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Want to help build this?
            </h2>
            <p className="mt-4 text-fg-muted leading-relaxed sm:text-lg">
              Open source contributors, content creators, designers and early
              users — everyone is welcome. Reach out on{" "}
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
  items,
}: {
  phase: string;
  title: string;
  status: string;
  items: string[];
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:bg-bg-elevated">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-soft font-mono text-xs font-semibold text-primary">
            {phase}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.15em] text-fg-subtle font-medium">
              Phase {phase}
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
      <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
