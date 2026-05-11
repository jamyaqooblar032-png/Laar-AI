import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO_TOOLS } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

export function HeroToolsGrid() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
              Featured tools
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Sabse zyada use hone wale{" "}
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                tools
              </span>
            </h2>
            <p className="mt-4 text-sm text-fg-muted leading-relaxed sm:text-base max-w-xl">
              Pakistani creators, students aur businesses ke top 10+ AI tools —
              free use karein, sign up bhi nahi chahiye.
            </p>
          </div>
          <Link
            href="/tools"
            className="group inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-hover transition-colors"
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
