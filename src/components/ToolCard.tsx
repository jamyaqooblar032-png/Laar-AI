import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { type Tool, CATEGORIES } from "@/lib/tools";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function ToolCard({
  tool,
  className,
}: {
  tool: Tool;
  className?: string;
}) {
  const Icon = tool.icon;
  const isComingSoon = tool.status === "coming-soon";
  const isBeta = tool.status === "beta";

  const cat = CATEGORIES[tool.category];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:border-fg-subtle/30 hover:bg-bg-elevated",
        isComingSoon && "opacity-90",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-soft text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {isComingSoon && (
            <Badge variant="soon">
              <Lock className="h-2.5 w-2.5" />
              Soon
            </Badge>
          )}
          {isBeta && <Badge variant="beta">Beta</Badge>}
          {tool.badge && <Badge variant="premium">{tool.badge}</Badge>}
        </div>
      </div>

      <h3 className="mt-5 font-display text-base font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary">
        {tool.name}
      </h3>
      <p className="mt-2 text-xs text-fg-muted leading-relaxed line-clamp-3">
        {tool.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="text-[10px] uppercase tracking-wider text-fg-subtle">
          {cat.label}
        </span>
        <div
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium transition-all",
            isComingSoon
              ? "text-fg-subtle"
              : "text-primary group-hover:translate-x-0.5"
          )}
        >
          {isComingSoon ? "Notify me" : "Open"}
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
