import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function CategoryGrid() {
  const entries = Object.entries(CATEGORIES) as [
    ToolCategory,
    (typeof CATEGORIES)[ToolCategory]
  ][];

  return (
    <section id="categories" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Har kaam ke liye AI tool
          </h2>
          <p className="mt-4 text-base text-fg-muted leading-relaxed">
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
                className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-primary/40 hover:bg-bg-elevated"
              >
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-50",
                    cat.gradient
                  )}
                />
                <div
                  className={cn(
                    "inline-flex h-2 w-12 rounded-full bg-gradient-to-r mb-6",
                    cat.gradient
                  )}
                />
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs">
                  <span className="text-fg-subtle">
                    <span className="text-primary font-semibold">{live}</span>{" "}
                    live · {count} total
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
