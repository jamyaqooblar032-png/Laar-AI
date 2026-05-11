import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, type Tool } from "@/lib/tools";

export function ToolHeader({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const cat = CATEGORIES[tool.category];

  return (
    <div>
      <Link
        href="/tools"
        className="group inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        All tools
      </Link>

      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-bg-soft text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {tool.name}
            </h1>
            {tool.status === "beta" && <Badge variant="beta">Beta</Badge>}
            {tool.badge && <Badge variant="premium">{tool.badge}</Badge>}
          </div>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed max-w-2xl sm:text-base">
            {tool.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-bg-soft px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-fg-subtle">
              {cat.label}
            </span>
            {tool.status === "active" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                Live
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
