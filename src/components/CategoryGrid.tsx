import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function CategoryGrid() {
  const entries = Object.entries(CATEGORIES) as [
    ToolCategory,
    (typeof CATEGORIES)[ToolCategory],
  ][];

  return (
    <section id="categories" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
            Categories
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Har kaam ke liye{" "}
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI tool
            </span>
          </h2>
          <p className="mt-5 text-base text-fg-muted leading-relaxed sm:text-lg">
            8 categories. 80+ tools. Sab AI-powered, sab Urdu/English support
            ke saath. Pakistani creators, students, professionals — ek hi
            platform.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([key, cat]) => {
            const count = TOOLS.filter((t) => t.category === key).length;
            const live = TOOLS.filter(
              (t) => t.category === key && t.status !== "coming-soon"
            ).length;
            return (
              <Link
                key={key}
                href={`/tools?category=${key}`}
                className="group lift-on-hover shine-on-hover relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-primary/40 hover:bg-bg-elevated"
              >
                {/* Top accent line */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity",
                    cat.gradient
                  )}
                />

                {/* Corner glow blob */}
                <div
                  className={cn(
                    "pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-40 bg-gradient-to-br",
                    cat.gradient
                  )}
                />

                <div
                  className={cn(
                    "relative inline-flex h-2 w-12 rounded-full bg-gradient-to-r mb-6 transition-all duration-500 group-hover:w-16",
                    cat.gradient
                  )}
                />
                <h3 className="relative font-display text-lg font-semibold tracking-tight">
                  {cat.label}
                </h3>
                <p className="relative mt-2 text-sm text-fg-muted leading-relaxed">
                  {cat.description}
                </p>
                <div className="relative mt-6 flex items-center justify-between text-xs">
                  <span className="text-fg-subtle">
                    <span className="text-primary font-semibold tabular-nums">
                      {live}
                    </span>{" "}
                    live · <span className="tabular-nums">{count}</span> total
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-fg-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
