import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-bg-card p-12 sm:p-16 text-center">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="bg-glow absolute inset-0" />

          <div className="relative">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-muted">
              <Sparkles className="h-3 w-3 text-primary" />
              Free forever · No signup
            </div>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Try one tool.{" "}
              <span className="text-primary">Decide for yourself.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-fg-muted leading-relaxed sm:text-lg">
              Every Laar AI tool is open and free right now. No account, no
              card, no demo call. Open the one you need and start producing.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/tools">
                <Button variant="primary" size="lg" className="magnetic btn-shine">
                  <Sparkles className="h-4 w-4" />
                  Browse the toolkit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools/chatbot">
                <Button variant="outline" size="lg" className="magnetic">
                  Open the chatbot
                </Button>
              </Link>
            </div>
            <p className="mt-7 text-xs text-fg-subtle">
              New tools ship every week.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
