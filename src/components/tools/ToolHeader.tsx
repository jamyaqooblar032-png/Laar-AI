import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function ToolHeader({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const cat = CATEGORIES[tool.category];

  return (
    <div>
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> All tools
      </Link>

      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-inset ring-white/10",
            cat.gradient
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {tool.name}
            </h1>
            {tool.status === "beta" && <Badge variant="beta">Beta</Badge>}
            {tool.badge && <Badge variant="premium">{tool.badge}</Badge>}
          </div>
          {tool.nameUr && (
            <p className="mt-1 font-urdu text-lg text-fg-muted">
              {tool.nameUr}
            </p>
          )}
          <p className="mt-2 text-sm text-fg-muted leading-relaxed max-w-2xl">
            {tool.description}
          </p>
        </div>
      </div>
    </div>
  );
}
