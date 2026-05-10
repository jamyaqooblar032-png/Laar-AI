"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRESETS = [
  { label: "URL", value: "https://laar-ai-iota.vercel.app" },
  { label: "WhatsApp", value: "https://wa.me/923001234567" },
  { label: "WiFi", value: "WIFI:T:WPA;S:MyNetwork;P:password;;" },
  { label: "Email", value: "mailto:hello@laarai.app" },
];

const COLORS = [
  { name: "Black", fg: "#000000", bg: "#FFFFFF" },
  { name: "Green", fg: "#10b981", bg: "#FFFFFF" },
  { name: "Pakistan", fg: "#01411C", bg: "#FFFFFF" },
  { name: "Inverted", fg: "#FFFFFF", bg: "#0a0a0a" },
];

export function QRCodeTool() {
  const [text, setText] = useState("https://laar-ai-iota.vercel.app");
  const [color, setColor] = useState(COLORS[1]);
  const [size, setSize] = useState(512);
  const [copied, setCopied] = useState(false);
  const [dataUrl, setDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;
    QRCode.toCanvas(
      canvasRef.current,
      text,
      {
        width: size,
        margin: 2,
        color: { dark: color.fg, light: color.bg },
        errorCorrectionLevel: "M",
      },
      () => {
        if (canvasRef.current) {
          setDataUrl(canvasRef.current.toDataURL("image/png"));
        }
      }
    );
  }, [text, color, size]);

  function download() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `laarai-qr-${Date.now()}.png`;
    a.click();
  }

  async function copyImage() {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        /* clipboard not supported */
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <h3 className="text-sm font-medium mb-3">Text ya URL</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="https://example.com ya koi text"
            className="w-full rounded-xl border border-border bg-bg p-4 text-sm leading-relaxed placeholder:text-fg-subtle focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setText(p.value)}
                className="rounded-lg border border-border bg-bg-elevated px-3 py-1.5 text-xs hover:border-primary/40 hover:bg-bg-soft"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <h3 className="text-sm font-medium mb-3">Color</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c)}
                className={cn(
                  "rounded-xl border p-3 text-left transition",
                  color.name === c.name
                    ? "border-primary/40 bg-primary/5"
                    : "border-border hover:border-border-soft"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-6 w-6 rounded-full border border-border-soft"
                    style={{ background: c.fg }}
                  />
                  <span className="text-xs font-medium">{c.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <h3 className="text-sm font-medium mb-3">Size: {size}px</h3>
          <input
            type="range"
            min={256}
            max={1024}
            step={64}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">QR Code</h3>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
            Live preview
          </span>
        </div>
        <div className="flex items-center justify-center rounded-xl bg-bg-elevated p-6">
          <canvas
            ref={canvasRef}
            className="max-h-[300px] max-w-full rounded-lg"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            variant="primary"
            size="default"
            onClick={download}
            disabled={!dataUrl}
          >
            <Download className="h-4 w-4" /> Download PNG
          </Button>
          <Button
            variant="secondary"
            size="default"
            onClick={copyImage}
            disabled={!dataUrl}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy
              </>
            )}
          </Button>
        </div>
        <p className="mt-3 text-xs text-fg-subtle text-center flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3" /> Free unlimited \u00b7 No watermark
        </p>
      </div>
    </div>
  );
}
