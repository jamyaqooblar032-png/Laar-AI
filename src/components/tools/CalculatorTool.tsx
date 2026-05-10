"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

const KEYS: (string | { key: string; span?: number; cls?: string })[] = [
  "C",
  "(",
  ")",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "−",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "⌫",
  "=",
];

function evalExpr(expr: string): string {
  if (!expr) return "";
  try {
    const safe = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    if (/[^0-9+\-*/().\s]/.test(safe)) return "Error";
    const result = Function(`"use strict";return (${safe})`)();
    if (typeof result !== "number" || !isFinite(result)) return "Error";
    return String(Math.round(result * 1e10) / 1e10);
  } catch {
    return "Error";
  }
}

export function CalculatorTool() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  function press(k: string) {
    if (k === "C") {
      setExpr("");
      setResult("");
    } else if (k === "⌫") {
      setExpr((e) => e.slice(0, -1));
    } else if (k === "=") {
      setResult(evalExpr(expr));
    } else {
      setExpr((e) => e + k);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Calculator</h3>
        </div>

        <div className="rounded-xl bg-bg p-5 mb-4 text-right">
          <p className="font-mono text-sm text-fg-muted h-5 truncate">
            {expr || "0"}
          </p>
          <p className="font-mono text-3xl font-semibold text-fg mt-1 h-10 truncate">
            {result || "—"}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {KEYS.map((k) => {
            const key = typeof k === "string" ? k : k.key;
            const isOp = ["÷", "×", "−", "+", "="].includes(key);
            const isClear = key === "C";
            const isEq = key === "=";
            return (
              <button
                key={key}
                onClick={() => press(key)}
                className={cn(
                  "rounded-xl border py-4 text-base font-semibold transition active:scale-95",
                  isEq
                    ? "border-primary/30 bg-primary/10 text-primary col-span-1 hover:bg-primary/20"
                    : isOp
                      ? "border-border-soft bg-bg-elevated text-primary hover:bg-bg-soft"
                      : isClear
                        ? "border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                        : "border-border bg-bg-elevated hover:bg-bg-soft"
                )}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-fg-subtle">
        Free unlimited · Works offline · No tracking
      </p>
    </div>
  );
}
