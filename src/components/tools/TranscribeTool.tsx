"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Loader2,
  Sparkles,
  Copy,
  Check,
  FileAudio,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function TranscribeTool() {
  const [filename, setFilename] = useState<string | null>(null);
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [contentType, setContentType] = useState<string>("audio/wav");
  const fileRef = useRef<HTMLInputElement>(null);
  const blobRef = useRef<Blob | null>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("audio/") && !file.type.startsWith("video/")) {
      setError("Sirf audio/video files supported hain.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Max 20MB. Yeh file zyada bari hai.");
      return;
    }
    setError(null);
    setOutput("");
    setFilename(file.name);
    setContentType(file.type);
    blobRef.current = file;
  }

  async function process() {
    if (!blobRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": contentType },
        body: blobRef.current,
      });
      const data = (await res.json()) as { text?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Transcription failed");
      setOutput(data.text ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border-soft bg-bg-elevated py-12 transition hover:border-primary/40 hover:bg-bg-soft"
        >
          {filename ? (
            <>
              <FileAudio className="h-6 w-6 text-primary" />
              <p className="text-sm font-medium">{filename}</p>
              <p className="text-xs text-fg-subtle">Click to replace</p>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6 text-fg-muted" />
              <p className="text-sm font-medium">Audio ya video upload karein</p>
              <p className="text-xs text-fg-subtle">
                MP3, WAV, M4A, MP4 — max 20MB
              </p>
            </>
          )}
        </button>
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
          onClick={process}
          disabled={!filename || loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Transcribing... (~30s)
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Transcribe with Whisper
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-fg-subtle">
          Whisper-large-v3 supports Urdu, English, aur 50+ languages auto-detect.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {output && (
        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Transcript</h3>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy
                </>
              )}
            </button>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-fg max-h-[400px] overflow-y-auto">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
