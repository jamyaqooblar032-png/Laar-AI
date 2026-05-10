"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Loader2,
  Sparkles,
  Mail,
  User,
  CheckCircle2,
  Clock,
  Zap,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOICES } from "@/lib/elevenlabs";
import { cn } from "@/lib/utils";

type Tier = "free" | "premium" | "beast";

const TIERS: {
  id: Tier;
  name: string;
  description: string;
  quality: string;
  wait: string;
  badge: string;
  badgeColor: string;
  icon: typeof Clock;
  available: boolean;
}[] = [
  {
    id: "free",
    name: "Free",
    description: "SadTalker open-source · watermarked · 1/day",
    quality: "Good · ⭐⭐⭐",
    wait: "5-15 min queue",
    badge: "Available now",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    icon: Clock,
    available: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "HeyGen-style realistic expressions · no watermark",
    quality: "Excellent · ⭐⭐⭐⭐⭐",
    wait: "1-3 min",
    badge: "Coming Soon",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    icon: Zap,
    available: false,
  },
  {
    id: "beast",
    name: "Beast Mode",
    description: "Hedra-style cinematic · 4K output · API access",
    quality: "Hollywood · ⭐⭐⭐⭐⭐",
    wait: "30-60s",
    badge: "Pro tier only",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    icon: Lock,
    available: false,
  },
];

export function AvatarTool() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [script, setScript] = useState("");
  const [voiceId, setVoiceId] = useState(VOICES[0].id);
  const [tier, setTier] = useState<Tier>("free");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhoto(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Sirf image files supported hain.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Max 5MB. Yeh photo zyada bari hai.");
      return;
    }
    setError(null);
    setPhoto(URL.createObjectURL(file));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/avatar-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          script: script.trim(),
          voiceId,
          tier,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Submit fail");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Try again later");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/30">
          <CheckCircle2 className="h-8 w-8 text-emerald-300" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-bold">
          Request received!
        </h2>
        <p className="mt-3 text-fg-muted">
          Aap ke avatar video ki request queue mein hai. 5-15 min mein
          ready ho jayegi — link aap ke email par milegi.
        </p>
        <p className="mt-6 text-xs text-fg-subtle">
          Email: <span className="text-fg">{email}</span>
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setScript("");
            setEmail("");
            setPhoto(null);
          }}
          className="mt-6 text-sm text-primary hover:text-primary-hover"
        >
          Make another →
        </button>
      </div>
    );
  }

  const canSubmit =
    email.trim().length > 5 &&
    script.trim().length > 5 &&
    tier === "free" &&
    !submitting;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <h3 className="text-sm font-medium mb-3">1. Photo (optional)</h3>
          {!photo ? (
            <button
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border-soft bg-bg-elevated py-8 transition hover:border-primary/40 hover:bg-bg-soft"
            >
              <Upload className="h-5 w-5 text-fg-muted" />
              <p className="text-sm font-medium">Apni photo upload karein</p>
              <p className="text-xs text-fg-subtle">
                Front-facing, clear face · max 5MB · ya skip karein default
                avatar use hoga
              </p>
            </button>
          ) : (
            <div className="flex items-center gap-4 rounded-xl border border-border bg-bg-elevated p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt="Photo"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Photo uploaded</p>
                <p className="text-xs text-fg-subtle">Click below to replace</p>
              </div>
              <button
                onClick={() => setPhoto(null)}
                className="text-xs text-fg-muted hover:text-fg"
              >
                Remove
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handlePhoto(f);
            }}
          />
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <h3 className="text-sm font-medium mb-3">
            2. Script (Urdu, English, ya Roman Urdu)
          </h3>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Asalam-o-Alaikum! Main Laar AI use kar raha hun, aap bhi try karein..."
            rows={6}
            className="w-full rounded-xl border border-border bg-bg p-4 text-sm leading-relaxed placeholder:text-fg-subtle focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <p className="mt-2 text-xs text-fg-subtle">
            {script.length}/1500 characters
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <h3 className="text-sm font-medium mb-3">3. Voice</h3>
          <div className="grid grid-cols-2 gap-2">
            {VOICES.map((v) => (
              <button
                key={v.id}
                onClick={() => setVoiceId(v.id)}
                className={cn(
                  "rounded-xl border p-3 text-left transition",
                  voiceId === v.id
                    ? "border-primary/40 bg-primary/5"
                    : "border-border hover:border-border-soft hover:bg-bg-elevated"
                )}
              >
                <span className="text-sm font-medium">{v.name}</span>
                <p className="mt-1 text-xs text-fg-subtle line-clamp-1">
                  {v.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-6">
          <h3 className="text-sm font-medium mb-3">4. Email (where to send result)</h3>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-bg px-4 py-3">
            <Mail className="h-4 w-4 text-fg-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="apka@email.com"
              className="flex-1 bg-transparent text-sm placeholder:text-fg-subtle focus:outline-none"
            />
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={submit}
          disabled={!canSubmit}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate Avatar Video
            </>
          )}
        </Button>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Quality Tier</h3>
          </div>
          <div className="space-y-2">
            {TIERS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => t.available && setTier(t.id)}
                  disabled={!t.available}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition",
                    tier === t.id && t.available
                      ? "border-primary/40 bg-primary/5"
                      : "border-border hover:border-border-soft hover:bg-bg-elevated",
                    !t.available && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-semibold">{t.name}</span>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider",
                        t.badgeColor
                      )}
                    >
                      {t.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-fg-muted">{t.description}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-fg-subtle">
                    <span>{t.quality}</span>
                    <span>{t.wait}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
            Phase 2 · Premium Features
          </p>
          <h3 className="mt-2 font-display text-sm font-semibold">
            HeyGen + D-ID + Hedra integration
          </h3>
          <p className="mt-1 text-xs text-fg-muted leading-relaxed">
            Hollywood-quality talking avatars with realistic expressions
            (eye-blink, head movement, emotion) — coming Phase 2. Pro tier
            members ko unlimited access milega.
          </p>
        </div>
      </div>
    </div>
  );
}
