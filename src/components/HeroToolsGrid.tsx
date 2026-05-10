import { HERO_TOOLS } from "@/lib/tools";
import { ToolCard } from "./ToolCard";

export function HeroToolsGrid() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">
              Featured tools
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Sabse zyada use hone wale tools
            </h2>
          </div>
          <p className="text-sm text-fg-muted max-w-md">
            Pakistani creators, students aur businesses ke top 10+ AI tools —
            free use karein, sign up bhi nahi chahiye.
          </p>
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
