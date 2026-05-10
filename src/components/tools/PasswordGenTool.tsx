"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Copy, Check, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const NUMBERS = "0123456789";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";

function randInt(max: number): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function generate(opts: {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
}): string {
  let pool = "";
  if (opts.upper) pool += UPPER;
  if (opts.lower) pool += LOWER;
  if (opts.numbers) pool += NUMBERS;
  if (opts.symbols) pool += SYMBOLS;
  if (!pool) return "";
  let out = "";
  for (let i = 0; i < opts.length; i++) {
    out += pool[randInt(pool.length)];
  }
  return out;
}

function strengthOf(pw: string): { label: string; color: string; pct: number } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2)
    return { label: "Weak", color: "bg-red-500", pct: 25 };
  if (score <= 4)
    return { label: "Fair", color: "bg-amber-500", pct: 50 };
  if (score <= 6)
    return { label: "Strong", color: "bg-emerald-500", pct: 75 };
  return { label: "Very Strong", color: "bg-emerald-400", pct: 100 };
}

export function PasswordGenTool() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const pw = useMemo(
    () => {
      void seed;
      return generate({ length, upper, lower, numbers, symbols });
    },
    [length, upper, lower, numbers, symbols, seed]
  );

  async function copy() {
    if (!pw) return;
    await navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const strength = strengthOf(pw);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Generated Password</h3>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
            <Shield className="h-3 w-3" /> Crypto-secure
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-bg p-4 font-mono text-base">
          <span className="flex-1 break-all">{pw}</span>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="rounded-lg bg-bg-elevated p-2 text-fg-muted hover:bg-bg-soft hover:text-fg"
            title="Generate new"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={copy}
            className="rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary/20"
            title="Copy"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs text-fg-muted w-20">{strength.label}</span>
          <div className="flex-1 h-1.5 rounded-full bg-bg-elevated overflow-hidden">
            <div
              className={cn("h-full transition-all", strength.color)}
              style={{ width: `${strength.pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Length</h3>
            <span className="rounded-full bg-bg-elevated px-3 py-0.5 text-sm font-mono">
              {length}
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "u", label: "Uppercase (A-Z)", val: upper, set: setUpper },
            { id: "l", label: "Lowercase (a-z)", val: lower, set: setLower },
            { id: "n", label: "Numbers (0-9)", val: numbers, set: setNumbers },
            { id: "s", label: "Symbols (!@#)", val: symbols, set: setSymbols },
          ].map((o) => (
            <label
              key={o.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition",
                o.val
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-bg-elevated hover:border-border-soft"
              )}
            >
              <input
                type="checkbox"
                checked={o.val}
                onChange={(e) => o.set(e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm">{o.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
