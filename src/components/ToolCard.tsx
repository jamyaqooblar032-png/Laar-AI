import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { type Tool, CATEGORIES } from "@/lib/tools";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, className }: { tool: Tool; className?: string }) {
  const Icon = tool.icon;
  const isComingSoon = tool.status === "coming-soon";
  const isBeta = tool.status === "beta";

  const cat = CATEGORIES[tool.category];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-primary/40 hover:bg-bg-elevated",
        isComingSoon && "opacity-90",
        className
      )}
    >
      {/* Gradient accent on hover */}
      <div
        className={cn(
          "pointer-events-none absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100",
          `via-primary`
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ring-inset ring-white/10",
            cat.gradient
          )}
        >
          <Icon className="h-5 w-5 text-white" />
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

      <h3 className="mt-5 font-display text-base font-semibold leading-tight tracking-tight">
        {tool.name}
      </h3>
      {tool.nameUr && (
        <p className="mt-1 font-urdu text-sm text-fg-muted">{tool.nameUr}</p>
      )}
      <p className="mt-2 text-xs text-fg-muted leading-relaxed line-clamp-3">
        {tool.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="text-[10px] uppercase tracking-wider text-fg-subtle">
          {cat.label}
        </span>
        <div
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium transition-colors",
            isComingSoon
              ? "text-fg-subtle"
              : "text-primary group-hover:text-primary-hover"
          )}
        >
          {isComingSoon ? "Notify me" : "Open"}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
