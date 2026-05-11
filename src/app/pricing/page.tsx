import Link from "next/link";
import { Check, Sparkles, X, Bell, Zap, Crown, Building2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Pricing",
  description:
    "Free forever for everyone. Pro plan launching soon for power users.",
};

const PLANS = [
  {
    name: "Free",
    icon: Zap,
    price: "$0",
    cadence: "forever",
    cta: "Get started",
    href: "/tools",
    description: "For creators, students and anyone exploring AI.",
    features: [
      { text: "All 60+ tools accessible", yes: true },
      { text: "30 AI text generations / hour", yes: true },
      { text: "60 chatbot messages / hour", yes: true },
      { text: "Unlimited image generation", yes: true },
      { text: "1 AI avatar video / day", yes: true },
      { text: "No watermark", yes: false, note: "small Laar AI tag" },
      { text: "Email support", yes: true },
      { text: "Priority queue", yes: false },
      { text: "API access", yes: false },
    ],
    highlight: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "$9",
    cadence: "per month",
    cta: "Join waitlist",
    href: "#waitlist",
    description: "For power users, creators and small businesses.",
    badge: "Coming Soon",
    features: [
      { text: "Everything in Free", yes: true },
      { text: "Unlimited AI generations", yes: true },
      { text: "Unlimited chatbot messages", yes: true },
      { text: "Premium image models (HD, FLUX Pro)", yes: true },
      { text: "5 AI avatar videos / day", yes: true },
      { text: "No watermark on exports", yes: true },
      { text: "Premium voice models", yes: true },
      { text: "Priority queue & faster speeds", yes: true },
      { text: "API access (10k req/month)", yes: true },
    ],
    highlight: true,
  },
  {
    name: "Business",
    icon: Building2,
    price: "Custom",
    cadence: "starting $99/mo",
    cta: "Contact sales",
    href: "mailto:hello@laarai.app",
    description: "For agencies, media teams and enterprises.",
    badge: "Coming Soon",
    features: [
      { text: "Everything in Pro", yes: true },
      { text: "Unlimited team seats", yes: true },
      { text: "White-label exports", yes: true },
      { text: "Custom AI avatars", yes: true },
      { text: "Dedicated account manager", yes: true },
      { text: "SLA + 99.9% uptime guarantee", yes: true },
      { text: "Custom API rate limits", yes: true },
      { text: "On-premise option", yes: true },
      { text: "Training & onboarding", yes: true },
    ],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="bg-spotlight absolute inset-0 -z-10" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3 py-1 text-xs text-fg-muted">
              <Sparkles className="h-3 w-3 text-primary" />
              Pricing
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Free for everyone,{" "}
              <span className="text-primary">forever.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted leading-relaxed">
              All tools are free to use. No credit card. Pro plans are
              launching soon for users who need higher limits.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col rounded-2xl border bg-bg-card p-8 transition-colors",
                    plan.highlight
                      ? "border-primary/40 ring-1 ring-primary/30 shadow-md"
                      : "border-border hover:bg-bg-elevated"
                  )}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="primary">
                        <Sparkles className="h-2.5 w-2.5" /> Most popular
                      </Badge>
                    </div>
                  )}

                  <div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-soft text-primary">
                      <plan.icon className="h-5 w-5" />
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <h3 className="font-display text-xl font-semibold tracking-tight">
                        {plan.name}
                      </h3>
                      {plan.badge && <Badge variant="soon">{plan.badge}</Badge>}
                    </div>
                    <p className="mt-2 text-sm text-fg-muted">
                      {plan.description}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-semibold tabular-nums">
                        {plan.price}
                      </span>
                      <span className="text-sm text-fg-muted">
                        / {plan.cadence}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f.text}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        {f.yes ? (
                          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Check className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-fg-subtle/10 text-fg-subtle">
                            <X className="h-3 w-3" />
                          </span>
                        )}
                        <span
                          className={
                            f.yes
                              ? "text-fg"
                              : "text-fg-muted line-through opacity-60"
                          }
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {plan.href.startsWith("mailto:") ? (
                      <a href={plan.href}>
                        <Button
                          variant={plan.highlight ? "primary" : "secondary"}
                          size="default"
                          className="w-full"
                        >
                          {plan.cta}
                        </Button>
                      </a>
                    ) : (
                      <Link href={plan.href}>
                        <Button
                          variant={plan.highlight ? "primary" : "secondary"}
                          size="default"
                          className="w-full"
                        >
                          {plan.badge ? (
                            <>
                              <Bell className="h-4 w-4" /> {plan.cta}
                            </>
                          ) : (
                            plan.cta
                          )}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 rounded-2xl border border-border bg-bg-soft p-8 sm:p-12">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium">
                  FAQ
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Frequently asked questions
                </h3>
              </div>
              <div className="mt-10 grid gap-6 text-left sm:grid-cols-2 max-w-3xl mx-auto">
                <FAQ
                  q="Is it really free?"
                  a="Yes. The free tier includes all 60+ tools, 30 generations/hour, unlimited images and 1 avatar per day. Free, forever."
                />
                <FAQ
                  q="When does Pro launch?"
                  a="In phase 2 (4-6 weeks). Join the waitlist to get early access and an introductory discount."
                />
                <FAQ
                  q="Is my data stored?"
                  a="No. We don't store the inputs you send to any tool — they are kept only for the duration of the request, then deleted."
                />
                <FAQ
                  q="What payment methods will Pro support?"
                  a="Stripe for cards globally, plus local payment methods (where available) at launch."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border border-border-soft bg-bg-card p-5 transition-colors hover:border-fg-subtle/40">
      <h4 className="font-medium text-sm flex items-start gap-2">
        <span className="text-primary">Q.</span>
        {q}
      </h4>
      <p className="mt-2 text-sm text-fg-muted leading-relaxed pl-5">{a}</p>
    </div>
  );
}
