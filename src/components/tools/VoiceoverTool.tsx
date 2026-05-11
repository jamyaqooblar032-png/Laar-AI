"use client";

import { useRef, useState } from "react";
import { Loader2, Sparkles, Download, Mic, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOICES } from "@/lib/elevenlabs";
import { cn } from "@/lib/utils";

const SAMPLE_TEXTS: { label: string; text: string }[] = [
  {
    label: "English intro",
    text: "Hello and welcome to Laar AI — Pakistan's all-in-one AI toolkit. Let me show you something amazing.",
  },
  {
    label: "Roman Urdu",
    text: "Hi! Today I'm going to share something that could genuinely change your life. Get ready.",
  },
  {
    label: "News-style",
    text: "Breaking news: a major step was taken in Karachi today that has given technology enthusiasts fresh reasons to be optimistic.",
  },
];

export function VoiceoverTool() {
  const [text, setText] = useState("");
  const [voiceId, setVoiceId] = useState(VOICES[0].id);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  async function generate() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    try {
      const res = await fetch("/api/voiceover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceId }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res
          .json()
          .catch(() => ({}) as { error?: string });
        throw new Error(data.error ?? "Failed");
      }
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function downloadAudio() {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `laarai-voice-${Date.now()}.mp3`;
    a.click();
  }

  const charCount = text.length;
  const charLimit = 1500;
  const overLimit = charCount > charLimit;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-border bg-bg-card p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Script / Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your script... (English, Urdu and Roman Urdu are all supported)"
              rows={8}
              className="mt-2 w-full rounded-xl border border-border bg-bg p-4 text-sm leading-relaxed placeholder:text-fg-subtle focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-fg-muted">
                {SAMPLE_TEXTS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setText(s.text)}
                    className="mr-3 text-primary hover:underline"
                  >
                    {s.label}
                  </button>
                ))}
              </span>
              <span
                className={cn(
                  overLimit ? "text-red-400" : "text-fg-subtle"
                )}
              >
                {charCount}/{charLimit}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="default"
            className="w-full"
            onClick={generate}
            disabled={!text.trim() || loading || overLimit}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating... (~5s)
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate Voiceover
              </>
            )}
          </Button>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
              {error}
            </div>
          )}

          {audioUrl && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <AudioLines className="h-4 w-4" /> Ready
                </div>
                <button
                  onClick={downloadAudio}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover"
                >
                  <Download className="h-3 w-3" /> MP3
                </button>
              </div>
              <audio
                ref={audioRef}
                src={audioUrl}
                controls
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-6 h-fit">
        <div className="flex items-center gap-2 mb-4">
          <Mic className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Voice</h3>
        </div>
        <div className="space-y-2">
          {VOICES.map((v) => (
            <button
              key={v.id}
              onClick={() => setVoiceId(v.id)}
              className={cn(
                "w-full rounded-xl border p-3 text-left transition",
                voiceId === v.id
                  ? "border-primary/40 bg-primary/5"
                  : "border-border hover:border-border-soft hover:bg-bg-elevated"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{v.name}</span>
                <span className="text-[10px] uppercase tracking-wider text-fg-subtle">
                  {v.language}
                </span>
              </div>
              <p className="mt-1 text-xs text-fg-muted">{v.description}</p>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-fg-subtle">
          A native Urdu voice is coming to the premium tier. Multilingual voices
          (Bella) ab Urdu kaafi acha bolti hai.
        </p>
      </div>
    </div>
  );
}
