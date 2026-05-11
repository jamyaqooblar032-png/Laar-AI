import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-bg-card via-bg-elevated to-bg-card p-10 sm:p-16 text-center">
          {/* Layered backgrounds */}
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-purple-500/15" />

          {/* Floating blobs */}
          <div
            className="blob blob-1"
            style={{
              top: "-30%",
              left: "10%",
              width: "300px",
              height: "300px",
            }}
          />
          <div
            className="blob blob-2"
            style={{
              bottom: "-30%",
              right: "10%",
              width: "320px",
              height: "320px",
            }}
          />

          {/* Aurora ribbons */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(16,185,129,0.10),transparent_30%,rgba(168,85,247,0.10),transparent_70%)] animate-[gradient-spin_18s_linear_infinite]" />
          </div>

          <div className="relative">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-medium">
              <Sparkles className="h-3 w-3" />
              Bilkul free · No signup
            </div>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to build something{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                cool?
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-fg-muted leading-relaxed sm:text-lg">
              Apna pehla AI tool abhi try karein. Sign up bhi nahi chahiye, free
              hai, koi credit card nahi. Bas kaam karein.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/tools">
                <Button variant="gradient" size="lg" className="magnetic">
                  <Sparkles className="h-4 w-4" />
                  Explore All Tools
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools/chatbot">
                <Button variant="outline" size="lg" className="magnetic">
                  Try Free Chatbot
                </Button>
              </Link>
            </div>
            <p className="mt-7 text-xs text-fg-subtle">
              <span className="font-urdu text-base text-primary" lang="ur">
                مزید ٹولز بہت جلد
              </span>{" "}
              · More tools every week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
