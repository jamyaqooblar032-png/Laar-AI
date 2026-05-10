import Link from "next/link";
import { Check, Sparkles, X, Bell } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Pricing",
  description:
    "Free forever for everyone. Pro plan launching soon for power users.",
};

const PLANS = [
  {
    name: "Free",
    price: "₨0",
    cadence: "forever",
    cta: "Get Started",
    href: "/tools",
    description: "All Pakistani creators, students, and dreamers.",
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
    price: "₨1,500",
    cadence: "per month",
    cta: "Join Waitlist",
    href: "#waitlist",
    description: "Power users, creators, and businesses.",
    badge: "Coming Soon",
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
    price: "Custom",
    cadence: "starting ₨10K/mo",
    cta: "Contact Sales",
    href: "mailto:hello@laarai.app",
    description: "Agencies, news channels, and enterprises.",
    badge: "Coming Soon",
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
        <section className="relative">
          <div className="bg-spotlight absolute inset-0 -z-10" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">
              Pricing
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Free for everyone, forever
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
                  className={
                    "relative flex flex-col rounded-2xl border bg-bg-card p-8 " +
                    (plan.highlight
                      ? "border-primary/40 ring-1 ring-primary/20"
                      : "border-border")
                  }
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="primary">
                        <Sparkles className="h-2.5 w-2.5" /> Most Popular
                      </Badge>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold">
                        {plan.name}
                      </h3>
                      {plan.badge && <Badge variant="soon">{plan.badge}</Badge>}
                    </div>
                    <p className="mt-2 text-sm text-fg-muted">
                      {plan.description}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold">
                        {plan.price}
                      </span>
                      <span className="text-sm text-fg-muted">
                        {plan.cadence}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2 text-sm">
                        {f.yes ? (
                          <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-fg-subtle mt-0.5" />
                        )}
                        <span className={f.yes ? "text-fg" : "text-fg-muted"}>
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

            <div className="mt-16 rounded-2xl border border-border bg-bg-soft p-8 text-center">
              <h3 className="font-display text-lg font-semibold">
                Frequently Asked
              </h3>
              <div className="mt-6 grid gap-6 text-left sm:grid-cols-2 max-w-3xl mx-auto">
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
    <div>
      <h4 className="font-medium text-sm">{q}</h4>
      <p className="mt-1 text-sm text-fg-muted leading-relaxed">{a}</p>
    </div>
  );
}
