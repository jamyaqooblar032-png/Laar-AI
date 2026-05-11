"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Download,
  Loader2,
  Sparkles,
  Scissors,
  Maximize2,
  AudioLines,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FFmpegLib = {
  load: (opts?: {
    coreURL?: string;
    wasmURL?: string;
    workerURL?: string;
  }) => Promise<void>;
  writeFile: (name: string, data: Uint8Array) => Promise<void>;
  readFile: (name: string) => Promise<Uint8Array>;
  exec: (args: string[]) => Promise<number>;
  on: (event: string, cb: (data: { progress?: number }) => void) => void;
  loaded: boolean;
};

const RATIOS = [
  { label: "Original", value: "original", w: 0, h: 0 },
  { label: "9:16 (Reels/TikTok)", value: "9:16", w: 1080, h: 1920 },
  { label: "1:1 (Insta)", value: "1:1", w: 1080, h: 1080 },
  { label: "16:9 (YouTube)", value: "16:9", w: 1920, h: 1080 },
  { label: "4:5 (Insta portrait)", value: "4:5", w: 1080, h: 1350 },
];

type Action = "trim" | "resize" | "extract-audio";

export function VideoEditorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputName, setOutputName] = useState<string>("output.mp4");
  const [duration, setDuration] = useState<number>(0);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(0);
  const [ratio, setRatio] = useState<string>("9:16");
  const [action, setAction] = useState<Action>("trim");
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [loadingFFmpeg, setLoadingFFmpeg] = useState(false);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ffmpegRef = useRef<FFmpegLib | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  async function loadFFmpeg() {
    if (ffmpegReady || loadingFFmpeg) return;
    if (typeof SharedArrayBuffer === "undefined") {
      setError(
        "Your browser doesn't support SharedArrayBuffer. Please use the latest Chrome or Edge."
      );
      return;
    }
    setLoadingFFmpeg(true);
    setError(null);
    try {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { toBlobURL } = await import("@ffmpeg/util");
      const ffmpeg = new FFmpeg() as unknown as FFmpegLib;
      ffmpeg.on("progress", (e) => {
        if (typeof e.progress === "number") {
          setProgress(Math.min(100, Math.round(e.progress * 100)));
        }
      });
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
      ffmpegRef.current = ffmpeg;
      setFfmpegReady(true);
    } catch (err) {
      setError(
        "FFmpeg failed to load. This is usually a cross-origin headers issue — it should work correctly after deployment."
      );
      console.error(err);
    } finally {
      setLoadingFFmpeg(false);
    }
  }

  function handleFile(f: File) {
    if (!f.type.startsWith("video/")) {
      setError("Only video files are supported.");
      return;
    }
    if (f.size > 200 * 1024 * 1024) {
      setError("This file is over the 200 MB limit.");
      return;
    }
    setError(null);
    setOutputUrl(null);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function onLoadedMetadata() {
    if (!videoRef.current) return;
    const d = videoRef.current.duration;
    setDuration(d);
    setTrimStart(0);
    setTrimEnd(d);
  }

  async function process() {
    if (!file || !ffmpegRef.current) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setOutputUrl(null);
    try {
      const ff = ffmpegRef.current;
      const { fetchFile } = await import("@ffmpeg/util");
      const inputName = "input." + (file.name.split(".").pop() || "mp4");
      await ff.writeFile(inputName, await fetchFile(file));

      let cmd: string[] = [];
      let outName = "output.mp4";

      if (action === "trim") {
        cmd = [
          "-i",
          inputName,
          "-ss",
          String(trimStart),
          "-to",
          String(trimEnd),
          "-c",
          "copy",
          "-y",
          outName,
        ];
      } else if (action === "resize") {
        const r = RATIOS.find((x) => x.value === ratio);
        if (!r || r.value === "original") {
          throw new Error("Pick a target ratio.");
        }
        const filter = `scale=${r.w}:${r.h}:force_original_aspect_ratio=increase,crop=${r.w}:${r.h}`;
        cmd = [
          "-i",
          inputName,
          "-vf",
          filter,
          "-c:a",
          "copy",
          "-y",
          outName,
        ];
      } else if (action === "extract-audio") {
        outName = "output.mp3";
        cmd = [
          "-i",
          inputName,
          "-vn",
          "-q:a",
          "2",
          "-acodec",
          "libmp3lame",
          "-y",
          outName,
        ];
      }

      await ff.exec(cmd);
      const data = await ff.readFile(outName);
      const buf = data.buffer.slice(0) as ArrayBuffer;
      const mime = outName.endsWith(".mp3") ? "audio/mpeg" : "video/mp4";
      const blob = new Blob([buf], { type: mime });
      setOutputUrl(URL.createObjectURL(blob));
      setOutputName(outName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setLoading(false);
    }
  }

  function downloadOutput() {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `laarai-${outputName}`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        {!file ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border-soft bg-bg-elevated py-16 transition hover:border-primary/40 hover:bg-bg-soft"
          >
            <Upload className="h-7 w-7 text-fg-muted" />
            <p className="text-base font-medium">Video upload karein</p>
            <p className="text-xs text-fg-subtle">
              MP4, MOV, WebM — max 200 MB · everything is processed inside your browser
            </p>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl bg-black">
              <video
                ref={videoRef}
                src={previewUrl ?? undefined}
                controls
                onLoadedMetadata={onLoadedMetadata}
                className="w-full max-h-[480px]"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-fg-muted">
              <span>{file.name}</span>
              <button
                onClick={() => {
                  setFile(null);
                  setPreviewUrl(null);
                  setOutputUrl(null);
                }}
                className="hover:text-fg"
              >
                Replace
              </button>
            </div>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      {file && (
        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <div className="grid grid-cols-3 gap-2">
            <ActionTab
              active={action === "trim"}
              onClick={() => setAction("trim")}
              icon={Scissors}
              label="Trim"
            />
            <ActionTab
              active={action === "resize"}
              onClick={() => setAction("resize")}
              icon={Maximize2}
              label="Resize"
            />
            <ActionTab
              active={action === "extract-audio"}
              onClick={() => setAction("extract-audio")}
              icon={AudioLines}
              label="Audio"
            />
          </div>

          <div className="mt-6">
            {action === "trim" && (
              <div className="space-y-3">
                <p className="text-xs text-fg-muted">
                  Drag the handles to trim your video.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <NumberField
                    label="Start (s)"
                    value={trimStart}
                    max={duration}
                    onChange={setTrimStart}
                  />
                  <NumberField
                    label="End (s)"
                    value={trimEnd}
                    max={duration}
                    onChange={setTrimEnd}
                  />
                </div>
                <p className="text-xs text-fg-subtle">
                  New duration: {(trimEnd - trimStart).toFixed(1)}s · original {duration.toFixed(1)}s
                </p>
              </div>
            )}

            {action === "resize" && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {RATIOS.filter((r) => r.value !== "original").map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRatio(r.value)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition",
                      ratio === r.value
                        ? "border-primary/40 bg-primary/5"
                        : "border-border hover:border-border-soft hover:bg-bg-elevated"
                    )}
                  >
                    <span className="text-sm font-medium">{r.label}</span>
                    <p className="mt-1 text-xs text-fg-subtle">
                      {r.w}×{r.h}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {action === "extract-audio" && (
              <div className="rounded-xl border border-border bg-bg-elevated p-4">
                <p className="text-sm">
                  Extract audio track as MP3. Useful for podcasts, music
                  removal, or feeding into voiceover tools.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            {!ffmpegReady ? (
              <Button
                variant="primary"
                size="default"
                className="w-full"
                onClick={loadFFmpeg}
                disabled={loadingFFmpeg}
              >
                {loadingFFmpeg ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading FFmpeg.wasm... (~30MB)
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Load Editor Engine
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="default"
                className="w-full"
                onClick={process}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Processing... {progress}%
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Process Video
                  </>
                )}
              </Button>
            )}
            {loading && progress > 0 && (
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
              {error}
            </div>
          )}
        </div>
      )}

      {outputUrl && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-primary">Result ready</h3>
            <button
              onClick={downloadOutput}
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover"
            >
              <Download className="h-3 w-3" /> Download
            </button>
          </div>
          {outputName.endsWith(".mp3") ? (
            <audio src={outputUrl} controls className="w-full" />
          ) : (
            <video src={outputUrl} controls className="w-full rounded-xl" />
          )}
        </div>
      )}

      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
          Coming Soon
        </p>
        <h3 className="mt-2 font-display text-base font-semibold">
          Full timeline editor (CapCut-style)
        </h3>
        <p className="mt-1 text-sm text-fg-muted">
          Multi-track timeline · transitions · animated Urdu captions ·
          stickers · music library · merging clips. Live in Phase 2.
          hai.
        </p>
      </div>
    </div>
  );
}

function ActionTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl border py-3 transition",
        active
          ? "border-primary/40 bg-primary/5 text-primary"
          : "border-border text-fg-muted hover:border-border-soft hover:bg-bg-elevated hover:text-fg"
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function NumberField({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label className="text-xs text-fg-muted">{label}</label>
      <input
        type="number"
        min={0}
        max={max}
        step={0.1}
        value={value.toFixed(1)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-border bg-bg p-2 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
