"use client";

import { useRef, useState } from "react";
import { Upload, Download, Loader2, ImageOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function ImageCompressorTool() {
  const [input, setInput] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [output, setOutput] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState(0);
  const [quality, setQuality] = useState(70);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Sirf image files supported hain.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError("Max 15MB.");
      return;
    }
    setError(null);
    setInput(URL.createObjectURL(file));
    setOriginalSize(file.size);
    setOutput(null);
    setOutputSize(0);
  }

  async function compress() {
    if (!input) return;
    setLoading(true);
    setError(null);
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("Image load failed"));
        img.src = input;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob((b) => res(b), "image/jpeg", quality / 100)
      );
      if (!blob) throw new Error("Compression failed");
      setOutput(URL.createObjectURL(blob));
      setOutputSize(blob.size);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!output) return;
    const a = document.createElement("a");
    a.href = output;
    a.download = `laarai-compressed-${Date.now()}.jpg`;
    a.click();
  }

  const savings =
    originalSize && outputSize
      ? Math.round(((originalSize - outputSize) / originalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Original</h3>
            {originalSize > 0 && (
              <span className="text-xs text-fg-subtle">
                {fmtSize(originalSize)}
              </span>
            )}
          </div>
          {!input ? (
            <button
              onClick={() => fileRef.current?.click()}
              className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border-soft bg-bg-elevated transition hover:border-primary/40"
            >
              <Upload className="h-6 w-6 text-fg-muted" />
              <p className="text-sm font-medium">Image upload karein</p>
              <p className="text-xs text-fg-subtle">Max 15MB · JPG, PNG</p>
            </button>
          ) : (
            <div className="h-64 overflow-hidden rounded-xl bg-bg-elevated">
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
            <h3 className="text-sm font-medium">Compressed</h3>
            {outputSize > 0 && (
              <button
                onClick={download}
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover"
              >
                <Download className="h-3 w-3" /> {fmtSize(outputSize)}
              </button>
            )}
          </div>
          <div className="h-64 overflow-hidden rounded-xl bg-bg-elevated">
            {output ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={output}
                alt="Compressed"
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Quality: {quality}%</h3>
          <span className="text-xs text-fg-subtle">
            Lower = chhoti file, higher = better quality
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          value={quality}
          onChange={(e) => setQuality(parseInt(e.target.value))}
          className="w-full"
        />
        <Button
          variant="primary"
          size="default"
          className="mt-4 w-full"
          onClick={compress}
          disabled={!input || loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Compressing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Compress Image
            </>
          )}
        </Button>
        {savings > 0 && (
          <p className="mt-3 text-center text-sm text-emerald-300">
            🎉 {savings}% smaller — {fmtSize(originalSize - outputSize)} saved
          </p>
        )}
        {error && (
          <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
