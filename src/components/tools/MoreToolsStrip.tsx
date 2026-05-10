import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACTIVE_TOOLS, BETA_TOOLS, type Tool } from "@/lib/tools";

export function MoreToolsStrip({ excludeSlug }: { excludeSlug: string }) {
  const others: Tool[] = [...ACTIVE_TOOLS, ...BETA_TOOLS]
    .filter((t) => t.slug !== excludeSlug)
    .slice(0, 6);

  return (
    <div className="mt-16 border-t border-border-soft pt-12">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">More tools</h2>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-bg-card p-4 transition hover:border-primary/40 hover:bg-bg-elevated"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-elevated text-fg-muted group-hover:text-primary group-hover:bg-primary/10">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{t.name}</p>
                <p className="text-xs text-fg-muted truncate">{t.tagline}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
