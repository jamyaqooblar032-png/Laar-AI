"use client";

import { useState } from "react";
import { Sparkles, Loader2, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const STYLES = [
  { key: "default", label: "Auto" },
  { key: "photorealistic", label: "Photorealistic" },
  { key: "anime", label: "Anime" },
  { key: "3d", label: "3D Render" },
  { key: "digital-art", label: "Digital Art" },
  { key: "cinematic", label: "Cinematic" },
];

const ASPECTS = [
  { key: "square", label: "Square 1:1", w: 1024, h: 1024 },
  { key: "portrait", label: "Portrait 3:4", w: 768, h: 1024 },
  { key: "landscape", label: "Landscape 16:9", w: 1280, h: 720 },
  { key: "story", label: "Story 9:16", w: 720, h: 1280 },
];

const EXAMPLES = [
  "A majestic Himalayan mountain peak at sunset, cinematic lighting",
  "Karachi skyline at night with glowing neon, cyberpunk style",
  "A traditional Pakistani truck art design, vibrant colors",
  "Astronaut riding a horse on Mars, photorealistic",
  "Cute baby panda in a Pakistani garden eating mangoes",
];

export function ImageGenTool() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("default");
  const [aspect, setAspect] = useState(ASPECTS[0]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 999999));

  async function generate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setImageUrl(null);

    const styledPrompt =
      style === "default" ? prompt : `${prompt}, ${style.replace("-", " ")}`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      styledPrompt
    )}?width=${aspect.w}&height=${aspect.h}&seed=${seed}&nologo=true`;

    // Pre-load to detect when ready
    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setLoading(false);
    };
    img.onerror = () => {
      setImageUrl(url); // still set; browser will show
      setLoading(false);
    };
    img.src = url;
  }

  function regenerate() {
    setSeed(Math.floor(Math.random() * 999999));
    generate();
  }

  function download() {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `laarai-${seed}.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-bg-card p-5 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-fg-subtle">
            Describe your image
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A serene mountain lake at sunset, photorealistic..."
            rows={5}
            className="mt-2 w-full resize-y rounded-xl border border-border bg-bg p-4 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-muted hover:text-fg"
              >
                {ex.slice(0, 40)}…
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-fg-subtle">
            Style
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s.key}
                onClick={() => setStyle(s.key)}
                className={
                  "rounded-full border px-3 py-1 text-xs transition " +
                  (style === s.key
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-bg-elevated text-fg-muted hover:text-fg")
                }
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-fg-subtle">
            Aspect Ratio
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {ASPECTS.map((a) => (
              <button
                key={a.key}
                onClick={() => setAspect(a)}
                className={
                  "rounded-full border px-3 py-1 text-xs transition " +
                  (aspect.key === a.key
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-bg-elevated text-fg-muted hover:text-fg")
                }
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          size="lg"
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Generating image...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate Image
            </>
          )}
        </Button>
        <p className="text-[11px] text-fg-subtle text-center">
          Powered by Pollinations.ai · FLUX model · Free unlimited
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-fg-subtle">
            Result
          </span>
          {imageUrl && (
            <div className="flex items-center gap-2">
              <button
                onClick={regenerate}
                disabled={loading}
                className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-fg disabled:opacity-50"
              >
                <RefreshCw className="h-3 w-3" /> New variation
              </button>
              <button
                onClick={download}
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover"
              >
                <Download className="h-3 w-3" /> Download
              </button>
            </div>
          )}
        </div>
        <div className="mt-3 flex aspect-square items-center justify-center rounded-xl border border-border bg-bg overflow-hidden">
          {loading ? (
            <div className="text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
              <p className="mt-3 text-sm text-fg-muted">
                Banayi ja rahi hai...
              </p>
              <p className="mt-1 text-xs text-fg-subtle">
                Free tier — usually 5-15 seconds.
              </p>
            </div>
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={prompt}
              className="h-full w-full object-contain"
            />
          ) : (
            <p className="px-6 text-center text-sm text-fg-subtle italic">
              Image yahan aayegi. Pehle prompt do aur Generate press karo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
