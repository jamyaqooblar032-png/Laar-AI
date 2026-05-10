"use client";

import { useState } from "react";
import { Sparkles, Loader2, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ImagePreset = {
  toolSlug: string;
  inputLabel: string;
  inputPlaceholder: string;
  buildPrompt: (input: string, style?: string) => string;
  styles?: { key: string; label: string }[];
  width: number;
  height: number;
  examples?: string[];
};

export function ImagePresetTool({ slug }: { slug: string }) {
  const preset = PRESETS[slug];
  const [input, setInput] = useState("");
  const [style, setStyle] = useState(preset?.styles?.[0]?.key ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 999999));

  if (!preset) {
    return (
      <div className="rounded-2xl border border-border bg-bg-card p-6 text-center text-sm text-fg-muted">
        Preset not found.
      </div>
    );
  }

  async function generate() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setImageUrl(null);

    const builtPrompt = preset.buildPrompt(input, style);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      builtPrompt
    )}?width=${preset.width}&height=${preset.height}&seed=${seed}&nologo=true`;

    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setLoading(false);
    };
    img.onerror = () => {
      setImageUrl(url);
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
    a.download = `laarai-${preset.toolSlug}-${seed}.png`;
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
            {preset.inputLabel}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={preset.inputPlaceholder}
            rows={5}
            className="mt-2 w-full resize-y rounded-xl border border-border bg-bg p-4 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {preset.examples && preset.examples.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {preset.examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setInput(ex)}
                  className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-muted hover:text-fg"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
        </div>

        {preset.styles && preset.styles.length > 0 && (
          <div>
            <label className="text-xs uppercase tracking-wider text-fg-subtle">
              Style
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {preset.styles.map((s) => (
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
        )}

        <div className="flex gap-2">
          <Button
            variant="primary"
            size="default"
            className="flex-1"
            onClick={generate}
            disabled={!input.trim() || loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate
              </>
            )}
          </Button>
          {imageUrl && (
            <Button variant="secondary" size="default" onClick={regenerate}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Result</h3>
          {imageUrl && !loading && (
            <Button variant="secondary" size="sm" onClick={download}>
              <Download className="h-3 w-3" /> Download
            </Button>
          )}
        </div>
        <div
          className="overflow-hidden rounded-xl bg-bg-elevated"
          style={{ aspectRatio: `${preset.width} / ${preset.height}` }}
        >
          {loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-fg-muted">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p className="text-xs">10-30 seconds...</p>
            </div>
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="Generated"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-fg-subtle text-sm">
              Result yahan dikhega
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const PRESETS: Record<string, ImagePreset> = {
  "logo-generator": {
    toolSlug: "logo-generator",
    inputLabel: "Brand / Business name + idea",
    inputPlaceholder: "e.g. 'Karachi Coffee' — minimalist coffee bean icon",
    buildPrompt: (input, style) =>
      `professional minimalist logo design for "${input}"${
        style ? `, ${style} style` : ""
      }, vector, clean lines, modern, white background, centered, high quality`,
    styles: [
      { key: "minimalist", label: "Minimalist" },
      { key: "geometric", label: "Geometric" },
      { key: "playful", label: "Playful" },
      { key: "luxurious", label: "Luxurious" },
      { key: "tech", label: "Tech / Modern" },
    ],
    width: 1024,
    height: 1024,
    examples: [
      "FoodPanda Pakistan",
      "Karachi Real Estate",
      "Lahore Cricket Club",
    ],
  },
  "thumbnail-maker": {
    toolSlug: "thumbnail-maker",
    inputLabel: "Video topic + style",
    inputPlaceholder: "e.g. 'iPhone 17 review' with shocked face reaction",
    buildPrompt: (input, style) =>
      `eye-catching YouTube thumbnail for "${input}"${
        style ? `, ${style}` : ""
      }, bold colors, dramatic lighting, professional photography, high contrast, viral style, 16:9`,
    styles: [
      { key: "mr-beast style", label: "MrBeast Style" },
      { key: "minimalist clean", label: "Clean / Minimal" },
      { key: "shocked reaction", label: "Reaction" },
      { key: "tutorial", label: "Tutorial" },
    ],
    width: 1280,
    height: 720,
    examples: [
      "How I made 10 lakh in 30 days",
      "iPhone 17 vs Samsung S25",
      "Pakistan vs India cricket review",
    ],
  },
  "sticker-generator": {
    toolSlug: "sticker-generator",
    inputLabel: "Sticker idea",
    inputPlaceholder: "e.g. 'Cute panda holding a Pakistani flag'",
    buildPrompt: (input) =>
      `cute kawaii sticker design of "${input}", die-cut sticker, white border, vibrant colors, vector art style, simple background, high quality, 4k`,
    width: 1024,
    height: 1024,
    examples: [
      "Cricket bat with stars",
      "Cute samosa with face",
      "Pakistani truck art design",
    ],
  },
  "avatar-generator": {
    toolSlug: "avatar-generator",
    inputLabel: "Avatar / character description",
    inputPlaceholder: "e.g. 'Pakistani man with beard, wearing kurta'",
    buildPrompt: (input, style) =>
      `${style ?? "anime"} style avatar portrait of "${input}", looking at camera, clean background, high detail, professional, 4k`,
    styles: [
      { key: "anime", label: "Anime" },
      { key: "3d cartoon", label: "3D Cartoon" },
      { key: "pixar", label: "Pixar" },
      { key: "realistic photo", label: "Realistic" },
      { key: "cyberpunk", label: "Cyberpunk" },
    ],
    width: 1024,
    height: 1024,
    examples: ["Pakistani student in shalwar kameez", "Female doctor in coat"],
  },
  "wallpaper-generator": {
    toolSlug: "wallpaper-generator",
    inputLabel: "Wallpaper theme",
    inputPlaceholder: "e.g. 'Northern Pakistan mountains at golden hour'",
    buildPrompt: (input, style) =>
      `stunning ${style ?? "cinematic"} wallpaper of "${input}", high resolution, beautiful composition, professional photography, 4k`,
    styles: [
      { key: "cinematic", label: "Cinematic" },
      { key: "anime aesthetic", label: "Anime" },
      { key: "minimalist", label: "Minimalist" },
      { key: "abstract", label: "Abstract" },
      { key: "nature", label: "Nature" },
    ],
    width: 1280,
    height: 720,
    examples: [
      "Karachi beach at sunset",
      "Hunza valley spring",
      "Cyberpunk Lahore",
    ],
  },
  "meme-generator": {
    toolSlug: "meme-generator",
    inputLabel: "Meme idea",
    inputPlaceholder: "e.g. 'Cat looking shocked at chai cup'",
    buildPrompt: (input) =>
      `funny meme image of "${input}", classic meme style, exaggerated expressions, comedic, internet meme aesthetic`,
    width: 1024,
    height: 1024,
    examples: [
      "Drake meme template",
      "Surprised Pakistani uncle",
      "Cricket fan disappointed",
    ],
  },
};
