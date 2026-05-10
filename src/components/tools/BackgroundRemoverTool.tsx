"use client";

import { useRef, useState } from "react";
import { Upload, Download, Loader2, ImageOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackgroundRemoverTool() {
  const [input, setInput] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string>("image/png");
  const fileRef = useRef<HTMLInputElement>(null);
  const blobRef = useRef<Blob | null>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Sirf image files supported hain.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Max 10MB. Yeh file zyada bari hai.");
      return;
    }
    setError(null);
    setOutput(null);
    setContentType(file.type);
    blobRef.current = file;
    setInput(URL.createObjectURL(file));
  }

  async function process() {
    if (!blobRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/remove-bg", {
        method: "POST",
        headers: { "Content-Type": contentType },
        body: blobRef.current,
      });
      if (!res.ok) {
        const data: { error?: string } = await res
          .json()
          .catch(() => ({}) as { error?: string });
        throw new Error(data.error ?? "Failed");
      }
      const blob = await res.blob();
      setOutput(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function downloadResult() {
    if (!output) return;
    const a = document.createElement("a");
    a.href = output;
    a.download = `laarai-no-bg-${Date.now()}.png`;
    a.click();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Original</h3>
          {input && (
            <button
              onClick={() => {
                setInput(null);
                setOutput(null);
                blobRef.current = null;
              }}
              className="text-xs text-fg-muted hover:text-fg"
            >
              Reset
            </button>
          )}
        </div>
        {!input ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex h-72 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border-soft bg-bg-elevated transition hover:border-primary/40 hover:bg-bg-soft"
          >
            <Upload className="h-6 w-6 text-fg-muted" />
            <p className="text-sm font-medium">Image upload karein</p>
            <p className="text-xs text-fg-subtle">PNG, JPG, WebP — max 10MB</p>
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
        <Button
          variant="primary"
          size="default"
          className="mt-4 w-full"
          onClick={process}
          disabled={!input || loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Remove Background
            </>
          )}
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Result</h3>
          {output && (
            <button
              onClick={downloadResult}
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover"
            >
              <Download className="h-3 w-3" /> Download
            </button>
          )}
        </div>
        <div
          className="relative h-72 overflow-hidden rounded-xl"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          {output ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={output}
              alt="Background removed"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-fg-subtle">
              <ImageOff className="h-6 w-6" />
              <p className="mt-2 text-sm">Result yahan dikhega</p>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </p>
        )}
        <p className="mt-4 text-xs text-fg-subtle">
          Processing browser ya server side hoti hai depending on your image. PNG output mein transparent background.
        </p>
      </div>
    </div>
  );
}
