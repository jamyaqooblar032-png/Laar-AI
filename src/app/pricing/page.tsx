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
    price: "₨0",
    cadence: "forever",
    cta: "Get Started",
    href: "/tools",
    description: "All Pakistani creators, students, and dreamers.",
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.25)",
    features: [
      { text: "All 80+ tools accessible", yes: true },
      { text: "30 AI text generations / hour", yes: true },
      { text: "60 chatbot messages / hour", yes: true },
      { text: "Unlimited image generation (Pollinations)", yes: true },
      { text: "1 AI avatar video / day", yes: true },
      { text: "Watermark on exports", yes: false, note: "small Laar AI tag" },
      { text: "Email support", yes: true },
      { text: "Priority queue", yes: false },
      { text: "API access", yes: false },
    ],
    highlight: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "₨1,500",
    cadence: "per month",
    cta: "Join Waitlist",
    href: "#waitlist",
    description: "Power users, creators, and businesses.",
    badge: "Coming Soon",
    accent: "from-primary via-cyan-500 to-purple-500",
    glow: "rgba(168, 85, 247, 0.35)",
    features: [
      { text: "Everything in Free", yes: true },
      { text: "Unlimited AI generations", yes: true },
      { text: "Unlimited chatbot messages", yes: true },
      { text: "Premium image models (HD, FLUX Pro)", yes: true },
      { text: "5 AI avatar videos / day", yes: true },
      { text: "No watermark on exports", yes: true },
      { text: "Premium voice models (ElevenLabs Pro)", yes: true },
      { text: "Priority queue & faster speeds", yes: true },
      { text: "API access (10k req/month)", yes: true },
    ],
    highlight: true,
  },
  {
    name: "Business",
    icon: Building2,
    price: "Custom",
    cadence: "starting ₨10K/mo",
    cta: "Contact Sales",
    href: "mailto:hello@laarai.app",
    description: "Agencies, news channels, and enterprises.",
    badge: "Coming Soon",
    accent: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.25)",
    features: [
      { text: "Everything in Pro", yes: true },
      { text: "Unlimited team seats", yes: true },
      { text: "White-label exports", yes: true },
      { text: "Custom AI avatars (10+ characters)", yes: true },
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
          {/* Layered bg */}
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="bg-spotlight absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 opacity-60">
            <div
              className="blob blob-1"
              style={{
                top: "10%",
                left: "10%",
                width: "350px",
                height: "350px",
              }}
            />
            <div
              className="blob blob-2"
              style={{
                top: "5%",
                right: "10%",
                width: "350px",
                height: "350px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-medium">
              <Sparkles className="h-3 w-3" />
              Pricing
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Free for everyone,{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                forever
              </span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted leading-relaxed">
              Sab tools free hain — koi credit card nahi, koi subscription
              nahi. Pro plan power users ke liye launching soon.
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
                    "group lift-on-hover relative flex flex-col overflow-hidden rounded-2xl border bg-bg-card p-8 transition-all",
                    plan.highlight
                      ? "border-primary/40 ring-1 ring-primary/30 md:scale-105"
                      : "border-border"
                  )}
                  style={
                    plan.highlight
                      ? {
                          boxShadow: `0 30px 60px -20px ${plan.glow}, 0 0 0 1px rgba(168, 85, 247, 0.1)`,
                        }
                      : undefined
                  }
                >
                  {/* Top accent line */}
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-80",
                      plan.accent
                    )}
                  />

                  {/* Hover corner glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-40 bg-gradient-to-br",
                      plan.accent
                    )}
                  />

                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="primary">
                        <Sparkles className="h-2.5 w-2.5" /> Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="relative">
                    {/* Icon tile */}
                    <div
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-inset ring-white/10 shadow-lg",
                        plan.accent
                      )}
                      style={{ boxShadow: `0 8px 28px -10px ${plan.glow}` }}
                    >
                      <plan.icon className="h-5 w-5 text-white" />
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold tracking-tight">
                        {plan.name}
                      </h3>
                      {plan.badge && <Badge variant="soon">{plan.badge}</Badge>}
                    </div>
                    <p className="mt-2 text-sm text-fg-muted">
                      {plan.description}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold tabular-nums">
                        {plan.price}
                      </span>
                      <span className="text-sm text-fg-muted">
                        / {plan.cadence}
                      </span>
                    </div>
                  </div>

                  <ul className="relative mt-8 space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5 text-sm">
                        {f.yes ? (
                          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Check className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-fg-subtle/10 text-fg-subtle">
                            <X className="h-3 w-3" />
                          </span>
                        )}
                        <span className={f.yes ? "text-fg" : "text-fg-muted line-through opacity-60"}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-8">
                    {plan.href.startsWith("mailto:") ? (
                      <a href={plan.href}>
                        <Button
                          variant={plan.highlight ? "gradient" : "secondary"}
                          size="default"
                          className="w-full magnetic"
                        >
                          {plan.cta}
                        </Button>
                      </a>
                    ) : (
                      <Link href={plan.href}>
                        <Button
                          variant={plan.highlight ? "gradient" : "secondary"}
                          size="default"
                          className="w-full magnetic"
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
                <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
                  FAQ
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Frequently asked questions
                </h3>
              </div>
              <div className="mt-10 grid gap-8 text-left sm:grid-cols-2 max-w-3xl mx-auto">
                <FAQ
                  q="Kya sach mein free hai?"
                  a="Haan. Hamari free tier mein 80+ tools, 30 generations/hour, unlimited images, aur 1 avatar/day shamil hain. Free forever."
                />
                <FAQ
                  q="Pro plan kab launch hoga?"
                  a="Phase 2 (4-6 weeks) mein. Waitlist join karein, early access aur 30% discount milega first 100 signups ko."
                />
                <FAQ
                  q="Kya mera data save hota hai?"
                  a="Nahi. Hum tools mein input data store nahi karte. Sirf processing tak rakhi jaati hai, phir delete."
                />
                <FAQ
                  q="Pakistani payments kaise honge?"
                  a="EasyPaisa, JazzCash, bank transfer accept karenge. International users ke liye Stripe."
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
    <div className="group relative rounded-xl border border-border-soft bg-bg-card/50 p-5 transition-all hover:border-primary/30 hover:bg-bg-card">
      <h4 className="font-medium text-sm flex items-start gap-2">
        <span className="text-primary">Q.</span>
        {q}
      </h4>
      <p className="mt-2 text-sm text-fg-muted leading-relaxed pl-5">{a}</p>
    </div>
  );
}
