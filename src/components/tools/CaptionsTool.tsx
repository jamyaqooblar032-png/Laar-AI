"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Loader2,
  Sparkles,
  Download,
  FileText,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Chunk = {
  text: string;
  timestamp: [number, number | null];
};

function pad(n: number, w = 2): string {
  return String(Math.floor(n)).padStart(w, "0");
}
function fmtSrtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds - Math.floor(seconds)) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}
function chunksToSRT(chunks: Chunk[]): string {
  const out: string[] = [];
  let i = 1;
  for (const c of chunks) {
    if (!c.text?.trim()) continue;
    const [start, end] = c.timestamp;
    if (typeof start !== "number") continue;
    const e = typeof end === "number" ? end : start + 2;
    out.push(`${i}`);
    out.push(`${fmtSrtTime(start)} --> ${fmtSrtTime(e)}`);
    out.push(c.text.trim());
    out.push("");
    i++;
  }
  return out.join("\n");
}

export function CaptionsTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [chunks, setChunks] = useState<Chunk[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    if (
      !f.type.startsWith("audio/") &&
      !f.type.startsWith("video/") &&
      !/\.(mp3|wav|m4a|ogg|webm|mp4|mov)$/i.test(f.name)
    ) {
      setError("Sirf audio/video files supported hain.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError("Max 20MB. File zyada bari hai.");
      return;
    }
    setError(null);
    setFile(f);
    setText(null);
    setChunks(null);
  }

  async function transcribe() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const buf = await file.arrayBuffer();
      const res = await fetch("/api/transcribe?timestamps=1", {
        method: "POST",
        headers: {
          "Content-Type": file.type || "audio/mpeg",
        },
        body: buf,
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Transcription failed");
      }
      const data = (await res.json()) as { text: string; chunks?: Chunk[] };
      setText(data.text);
      setChunks(data.chunks ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Try again");
    } finally {
      setLoading(false);
    }
  }

  function downloadTxt() {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name?.replace(/\.[^.]+$/, "") ?? "captions"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadSrt() {
    if (!chunks || chunks.length === 0) return;
    const srt = chunksToSRT(chunks);
    const blob = new Blob([srt], { type: "application/x-subrip;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name?.replace(/\.[^.]+$/, "") ?? "captions"}.srt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <h3 className="text-sm font-medium mb-3">Audio ya Video upload karein</h3>
        {!file ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border-soft bg-bg-elevated py-12 transition hover:border-primary/40 hover:bg-bg-soft"
          >
            <Upload className="h-6 w-6 text-fg-muted" />
            <p className="text-sm font-medium">File choose karein</p>
            <p className="text-xs text-fg-subtle">
              MP3, WAV, M4A, MP4, MOV · max 20MB
            </p>
          </button>
        ) : (
          <div className="flex items-center gap-4 rounded-xl border border-border bg-bg-elevated p-4">
            <Video className="h-5 w-5 text-fg-muted" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-fg-subtle">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setText(null);
                setChunks(null);
              }}
              className="text-xs text-fg-muted hover:text-fg"
            >
              Remove
            </button>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="audio/*,video/*"
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
          onClick={transcribe}
          disabled={!file || loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Transcribing... (30-60s)
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate Captions
            </>
          )}
        </Button>
        {error && (
          <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </p>
        )}
      </div>

      {text && (
        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Transcript</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={downloadTxt}
                disabled={!text}
              >
                <FileText className="h-3 w-3" /> .txt
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={downloadSrt}
                disabled={!chunks || chunks.length === 0}
              >
                <Download className="h-3 w-3" /> .srt
              </Button>
            </div>
          </div>

          {chunks && chunks.length > 0 ? (
            <div className="max-h-96 overflow-y-auto rounded-xl border border-border-soft bg-bg-elevated divide-y divide-border-soft">
              {chunks.map((c, i) => (
                <div key={i} className="flex gap-4 p-3">
                  <span className="font-mono text-xs text-fg-subtle min-w-[80px]">
                    {fmtSrtTime(c.timestamp[0]).slice(0, 8)}
                  </span>
                  <span
                    className={cn(
                      "text-sm leading-relaxed",
                      /[\u0600-\u06FF]/.test(c.text) && "font-urdu text-base"
                    )}
                  >
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "rounded-xl border border-border-soft bg-bg-elevated p-4 text-sm leading-relaxed whitespace-pre-wrap",
                /[\u0600-\u06FF]/.test(text) && "font-urdu text-base"
              )}
            >
              {text}
            </div>
          )}

          <p className="mt-3 text-xs text-fg-subtle">
            Download the SRT and import it into any video editor to add
            styled captions. Phase 2 will add direct burn-in (caption
            overlay rendered straight into the video).
          </p>
        </div>
      )}
    </div>
  );
}
