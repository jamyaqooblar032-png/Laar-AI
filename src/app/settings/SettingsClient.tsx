"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const THEMES = [
  {
    value: "light",
    label: "Light",
    description: "Clean white background with deep text.",
    Icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Low-contrast dark surfaces, easier on the eyes at night.",
    Icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description: "Match your operating system automatically.",
    Icon: Monitor,
  },
] as const;

export function SettingsClient() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="mt-10 space-y-10">
      <section>
        <header className="border-b border-border-soft pb-4">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Appearance
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            Choose how Laar AI looks on this device.
          </p>
        </header>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {THEMES.map((t) => {
            const active = mounted ? theme === t.value : false;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setTheme(t.value)}
                className={cn(
                  "group relative flex flex-col rounded-2xl border bg-bg-card p-5 text-left transition-colors",
                  active
                    ? "border-primary/50 ring-1 ring-primary/30"
                    : "border-border hover:border-fg-subtle/40 hover:bg-bg-elevated"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-bg-soft text-primary">
                    <t.Icon className="h-4 w-4" />
                  </div>
                  {active && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold tracking-tight">
                  {t.label}
                </h3>
                <p className="mt-1 text-xs text-fg-muted leading-relaxed">
                  {t.description}
                </p>
              </button>
            );
          })}
        </div>

        {mounted && (
          <p className="mt-4 text-xs text-fg-subtle">
            Currently active:{" "}
            <span className="font-medium text-fg-muted">
              {resolvedTheme === "dark" ? "Dark" : "Light"}
            </span>
            {theme === "system" && " (via system)"}
          </p>
        )}
      </section>

      <section>
        <header className="border-b border-border-soft pb-4">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Language
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            The interface is currently English. More languages are coming.
          </p>
        </header>

        <div className="mt-5 rounded-2xl border border-border bg-bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-sm font-semibold tracking-tight">
                Interface language
              </h3>
              <p className="mt-1 text-xs text-fg-muted">
                The tools themselves understand Urdu, Hindi, Arabic and 100+
                more languages — just type in your preferred language.
              </p>
            </div>
            <div className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-soft px-3 py-1 text-xs text-fg-muted">
              English
            </div>
          </div>
        </div>
      </section>

      <section>
        <header className="border-b border-border-soft pb-4">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Account
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            Laar AI is free to use without an account. Sign-in is coming soon.
          </p>
        </header>

        <div className="mt-5 rounded-2xl border border-border bg-bg-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-sm font-semibold tracking-tight">
                Signed in
              </h3>
              <p className="mt-1 text-xs text-fg-muted">
                You&apos;re using Laar AI as a guest. All features are unlocked.
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-soft px-3 py-1 text-xs text-fg-muted">
              Guest
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
