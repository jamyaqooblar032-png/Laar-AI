"use client";

import { useState } from "react";
import { RefreshCw, Copy, Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

function hslToHex(h: number, s: number, l: number): string {
  const a = (s * Math.min(l, 1 - l)) / 1;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function generatePalette(scheme: string, baseHue?: number): string[] {
  const h = baseHue ?? Math.floor(Math.random() * 360);
  const out: string[] = [];
  if (scheme === "monochrome") {
    for (let i = 0; i < 5; i++) {
      out.push(hslToHex(h, 0.6, 0.2 + i * 0.15));
    }
  } else if (scheme === "analogous") {
    for (let i = 0; i < 5; i++) {
      out.push(hslToHex((h + i * 30) % 360, 0.65, 0.55));
    }
  } else if (scheme === "complementary") {
    out.push(hslToHex(h, 0.7, 0.5));
    out.push(hslToHex(h, 0.5, 0.7));
    out.push(hslToHex(h, 0.5, 0.3));
    out.push(hslToHex((h + 180) % 360, 0.7, 0.5));
    out.push(hslToHex((h + 180) % 360, 0.5, 0.3));
  } else if (scheme === "triadic") {
    for (let i = 0; i < 5; i++) {
      out.push(hslToHex((h + (i % 3) * 120) % 360, 0.65, 0.45 + (i * 0.05)));
    }
  } else {
    // pakistan-inspired
    out.push("#01411C"); // dark green
    out.push("#10b981");
    out.push("#FFFFFF");
    out.push("#D4AF37"); // gold
    out.push("#0a0a0a");
  }
  return out;
}

const SCHEMES = [
  { id: "monochrome", label: "Monochrome" },
  { id: "analogous", label: "Analogous" },
  { id: "complementary", label: "Complementary" },
  { id: "triadic", label: "Triadic" },
  { id: "pakistan", label: "Pakistan" },
];

export function ColorPaletteTool() {
  const [scheme, setScheme] = useState("analogous");
  const [palette, setPalette] = useState<string[]>(
    generatePalette("analogous", 145)
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  function regenerate() {
    setPalette(generatePalette(scheme));
  }

  async function copyHex(hex: string, idx: number) {
    await navigator.clipboard.writeText(hex);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Color Scheme</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {SCHEMES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setScheme(s.id);
                setPalette(generatePalette(s.id));
              }}
              className={
                scheme === s.id
                  ? "rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm text-primary"
                  : "rounded-full border border-border bg-bg-elevated px-4 py-1.5 text-sm text-fg-muted hover:text-fg"
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {palette.map((hex, i) => (
          <button
            key={i}
            onClick={() => copyHex(hex, i)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border-soft transition hover:scale-[1.02]"
            style={{ background: hex }}
          >
            <div className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-sm p-3 text-left">
              <p className="font-mono text-xs font-semibold text-white">
                {hex}
              </p>
              <p className="mt-1 text-[10px] text-white/70 flex items-center gap-1">
                {copiedIdx === i ? (
                  <>
                    <Check className="h-3 w-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Click to copy
                  </>
                )}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Button
        variant="primary"
        size="lg"
        className="mx-auto block"
        onClick={regenerate}
      >
        <RefreshCw className="h-4 w-4" /> Generate New Palette
      </Button>
    </div>
  );
}
