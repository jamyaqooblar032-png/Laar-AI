import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-bg-card via-bg-elevated to-bg-card p-10 sm:p-14 text-center">
          <div className="bg-grid absolute inset-0 opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build something cool?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-fg-muted leading-relaxed">
              Apna pehla AI tool abhi try karein. Sign up bhi nahi chahiye, free
              hai, koi credit card nahi. Bas kaam karein.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/tools">
                <Button variant="primary" size="lg">
                  <Sparkles className="h-4 w-4" />
                  Explore All Tools
                </Button>
              </Link>
              <Link href="/tools/chatbot">
                <Button variant="outline" size="lg">
                  Try Free Chatbot
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-fg-subtle">
              <span className="font-urdu text-base text-primary" lang="ur">
                مزید ٹولز بہت جلد
              </span>{" "}
              · More tools coming soon every week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
