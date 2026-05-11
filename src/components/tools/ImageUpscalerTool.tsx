"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Download,
  Loader2,
  Sparkles,
  ImageOff,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SCALES = [2, 4] as const;
type Scale = (typeof SCALES)[number];

export function ImageUpscalerTool() {
  const [input, setInput] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [scale, setScale] = useState<Scale>(2);
  const [originalSize, setOriginalSize] = useState<{ w: number; h: number } | null>(null);
  const [outputSize, setOutputSize] = useState<{ w: number; h: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const blobRef = useRef<Blob | null>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Sirf image files supported hain.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Max 8MB. Yeh file zyada bari hai.");
      return;
    }
    setError(null);
    setOutput(null);
    blobRef.current = file;
    const url = URL.createObjectURL(file);
    setInput(url);
    const img = new Image();
    img.onload = () => {
      setOriginalSize({ w: img.width, h: img.height });
    };
    img.src = url;
  }

  async function process() {
    if (!input || !originalSize) return;
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 100));
      const img = new Image();
      img.crossOrigin = "anonymous";
      const loaded = new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("Image load failed"));
      });
      img.src = input;
      await loaded;

      const newW = img.width * scale;
      const newH = img.height * scale;
      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, newW, newH);

      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob((b) => res(b), "image/png", 0.95)
      );
      if (!blob) throw new Error("Encode failed");
      setOutput(URL.createObjectURL(blob));
      setOutputSize({ w: newW, h: newH });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setLoading(false);
    }
  }

  function downloadResult() {
    if (!output) return;
    const a = document.createElement("a");
    a.href = output;
    a.download = `laarai-upscaled-${scale}x-${Date.now()}.png`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Original</h3>
            {originalSize && (
              <span className="text-xs text-fg-subtle">
                {originalSize.w}×{originalSize.h}
              </span>
            )}
          </div>
          {!input ? (
            <button
              onClick={() => fileRef.current?.click()}
              className="flex h-72 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border-soft bg-bg-elevated transition hover:border-primary/40 hover:bg-bg-soft"
            >
              <Upload className="h-6 w-6 text-fg-muted" />
              <p className="text-sm font-medium">Image upload karein</p>
              <p className="text-xs text-fg-subtle">PNG, JPG — max 8MB</p>
            </button>
          ) : (
            <div className="relative h-72 overflow-hidden rounded-xl bg-bg-elevated">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={input}
                alt="Original"
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Upscaled</h3>
            {outputSize && (
              <button
                onClick={downloadResult}
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover"
              >
                <Download className="h-3 w-3" /> {outputSize.w}×{outputSize.h}
              </button>
            )}
          </div>
          <div className="h-72 overflow-hidden rounded-xl bg-bg-elevated">
            {output ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={output}
                alt="Upscaled"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-fg-subtle">
                <ImageOff className="h-6 w-6" />
                <p className="mt-2 text-sm">Result yahan dikhega</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">Scale:</span>
          {SCALES.map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition",
                scale === s
                  ? "border-primary/40 bg-primary/5 text-primary"
                  : "border-border text-fg-muted hover:border-border-soft hover:bg-bg-elevated"
              )}
            >
              {s}x
            </button>
          ))}
          <Button
            variant="primary"
            size="default"
            className="ml-auto"
            onClick={process}
            disabled={!input || loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Upscaling...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Upscale Image
              </>
            )}
          </Button>
        </div>
        {error && (
          <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-300" />
          <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
            v1 · AI Upscale Coming Soon
          </p>
        </div>
        <h3 className="mt-2 font-display text-base font-semibold">
          Real-ESRGAN AI upscaling — Phase 2
        </h3>
        <p className="mt-1 text-sm text-fg-muted">
          This is the v1 high-quality canvas upscaler (browser-side, fast,
          unlimited). Phase 2 integrates Real-ESRGAN, which restores HD / 4K
          detail in old photos.
        </p>
      </div>
    </div>
  );
}
