import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO_TOOLS } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

export function HeroToolsGrid() {
  return (
    <section className="relative py-24 sm:py-28 border-t border-border-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
              Featured tools
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              The most-used tools, in one place.
            </h2>
            <p className="mt-4 text-base text-fg-muted leading-relaxed max-w-xl">
              A hand-picked set of the tools people open every day — chatbot,
              image generator, captions, and more.
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            View all tools
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {HERO_TOOLS.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
