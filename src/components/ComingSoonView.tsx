"use client";

import { useState } from "react";
import { Sparkles, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { CATEGORIES, getTool } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function ComingSoonView({ slug }: { slug: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const tool = getTool(slug);

  if (!tool) return null;
  const Icon = tool.icon;
  const cat = CATEGORIES[tool.category];
  const toolSlug = tool.slug;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    if (typeof window !== "undefined") {
      const key = "laarai_waitlist";
      const list: { email: string; tool: string; ts: number }[] = JSON.parse(
        localStorage.getItem(key) || "[]"
      );
      list.push({ email, tool: toolSlug, ts: Date.now() });
      localStorage.setItem(key, JSON.stringify(list));
    }
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all tools
      </Link>

      <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-card p-10 sm:p-14 text-center">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-primary/10" />

        <div className="relative">
          <div
            className={cn(
              "mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-inset ring-white/10",
              cat.gradient
            )}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>

          <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs uppercase tracking-wider text-purple-300">
            <Sparkles className="h-3 w-3" /> Coming Soon
          </p>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {tool.name}
          </h1>
          {tool.nameUr && (
            <p className="mt-2 font-urdu text-xl text-fg-muted">{tool.nameUr}</p>
          )}
          <p className="mx-auto mt-4 max-w-xl text-base text-fg-muted leading-relaxed">
            {tool.description}
          </p>

          <p className="mt-6 text-sm text-fg-subtle">
            Ye tool development mein hai. Launch hone par aapko email karenge.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="apka@email.com"
                className="flex-1 rounded-full border border-border bg-bg py-3 px-5 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button type="submit" variant="primary" size="default">
                <Bell className="h-4 w-4" /> Notify Me
              </Button>
            </form>
          ) : (
            <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Saved! Aapko launch pe email karenge.
            </div>
          )}

          <p className="mt-10 text-xs text-fg-subtle">
            <Link href="/tools" className="text-primary hover:underline">
              Browse all live tools
            </Link>{" "}
            jab tak ye ready ho.
          </p>
        </div>
      </div>
    </div>
  );
}
