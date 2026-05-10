"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TOOLS, CATEGORIES, type ToolCategory } from "@/lib/tools";
import { ToolCard } from "./ToolCard";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Live" },
  { key: "coming-soon", label: "Coming Soon" },
] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number]["key"];

export function ToolsExplorer({
  defaultCategory,
}: {
  defaultCategory?: ToolCategory | null;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">(
    defaultCategory ?? "all"
  );
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      if (activeCategory !== "all" && t.category !== activeCategory)
        return false;
      if (activeStatus === "active" && t.status === "coming-soon") return false;
      if (activeStatus === "coming-soon" && t.status !== "coming-soon")
        return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.slug.includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, activeStatus, query]);

  const categories = Object.entries(CATEGORIES) as [
    ToolCategory,
    (typeof CATEGORIES)[ToolCategory]
  ][];

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-subtle" />
        <input
          type="text"
          placeholder="Search 80+ tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-border bg-bg-card py-3 pl-11 pr-4 text-sm text-fg placeholder:text-fg-subtle focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <FilterPill
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          All Categories
        </FilterPill>
        {categories.map(([key, cat]) => (
          <FilterPill
            key={key}
            active={activeCategory === key}
            onClick={() => setActiveCategory(key)}
          >
            {cat.label}
          </FilterPill>
        ))}
      </div>

      {/* Status pills */}
      <div className="flex flex-wrap items-center gap-2 border-t border-border-soft pt-6">
        <span className="text-xs uppercase tracking-wider text-fg-subtle mr-1">
          Status:
        </span>
        {STATUS_FILTERS.map((s) => (
          <FilterPill
            key={s.key}
            active={activeStatus === s.key}
            onClick={() => setActiveStatus(s.key)}
            small
          >
            {s.label}
          </FilterPill>
        ))}
        <span className="ml-auto text-sm text-fg-muted">
          {filtered.length} tools
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-bg-card py-20 text-center">
          <p className="text-fg-muted">
            No tools match{" "}
            <span className="font-mono text-fg">&ldquo;{query}&rdquo;</span>
          </p>
          <p className="mt-2 text-xs text-fg-subtle">
            Try a different keyword or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-fg-subtle pt-8">
        <span className="font-urdu text-base text-primary mr-2" lang="ur">
          مزید آرہا ہے
        </span>
        New tools added every week. <a href="#" className="underline hover:text-fg">Suggest a tool</a>
      </p>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
  small,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border transition-colors",
        small ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
        active
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border bg-bg-card text-fg-muted hover:text-fg hover:border-border"
      )}
    >
      {children}
    </button>
  );
}
