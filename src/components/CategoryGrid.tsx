import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools";
import { Reveal } from "./Reveal";

export function CategoryGrid() {
  const entries = Object.entries(CATEGORIES) as [
    ToolCategory,
    (typeof CATEGORIES)[ToolCategory],
  ][];

  return (
    <section
      id="categories"
      className="relative py-24 sm:py-28 border-t border-border-soft"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-3xl">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Categories
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              A tool for every job.
            </h2>
            <p className="mt-5 text-base text-fg-muted leading-relaxed sm:text-lg">
              {entries.length} categories, {TOOLS.length} tools, one design
              system. Choose the surface you need — the rest stays out of the
              way.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([key, cat], i) => {
            const count = TOOLS.filter((t) => t.category === key).length;
            const live = TOOLS.filter(
              (t) => t.category === key && t.status !== "coming-soon"
            ).length;
            return (
              <Reveal key={key} delay={i * 60}>
                <Link
                  href={`/tools?category=${key}`}
                  className="group relative block bg-bg-card p-6 transition-colors hover:bg-bg-elevated h-full"
                >
                  <div className="inline-flex h-1 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-14" />
                  <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-fg">
                    {cat.label}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-xs text-fg-subtle">
                    <span>
                      <span className="text-fg font-medium tabular-nums">
                        {live}
                      </span>{" "}
                      live · <span className="tabular-nums">{count}</span>{" "}
                      total
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-fg-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
