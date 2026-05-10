"use client";

import { useState } from "react";
import { ArrowRightLeft, Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  "English",
  "Urdu (اردو)",
  "Roman Urdu",
  "Hindi (हिन्दी)",
  "Arabic (العربية)",
  "Punjabi (پنجابی)",
  "Pashto (پښتو)",
  "Sindhi (سنڌي)",
  "Spanish",
  "French",
  "German",
  "Chinese (中文)",
  "Japanese (日本語)",
  "Korean (한국어)",
  "Turkish",
  "Russian",
  "Portuguese",
  "Italian",
  "Indonesian",
  "Bengali (বাংলা)",
  "Persian (فارسی)",
];

export function TranslatorTool() {
  const [from, setFrom] = useState("English");
  const [to, setTo] = useState("Urdu (اردو)");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function translate() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setOutput("");

    const fullInput = `Translate the following from ${from} to ${to}:\n\n"""${input}"""\n\nReply with ONLY the translation.`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "translator",
          input: fullInput,
          stream: true,
        }),
      });
      if (!res.ok) {
        const data: { error?: string } = await res
          .json()
          .catch(() => ({}) as { error?: string });
        throw new Error(data.error ?? "Request failed");
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setOutput(acc);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function swap() {
    setFrom(to);
    setTo(from);
    setInput(output);
    setOutput("");
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const isUrduOutput = /Urdu|اردو|Arabic|العربية|Persian|فارسی|Pashto|پښتو|Sindhi|سنڌي|Punjabi|پنجابی/.test(
    to
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-xl border border-border bg-bg-card px-4 py-2 text-sm focus:border-primary/40 focus:outline-none"
        >
          {LANGUAGES.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <button
          onClick={swap}
          className="rounded-full border border-border bg-bg-card p-2 text-fg-muted hover:text-fg hover:border-primary/40 transition"
          aria-label="Swap languages"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="rounded-xl border border-border bg-bg-card px-4 py-2 text-sm focus:border-primary/40 focus:outline-none"
        >
          {LANGUAGES.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-fg-subtle">
              {from}
            </span>
            <span className="text-xs text-fg-subtle">{input.length}/4000</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 4000))}
            placeholder="Type or paste text to translate..."
            rows={10}
            className="mt-3 w-full resize-y rounded-xl border border-border bg-bg p-4 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-48"
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={translate} disabled={loading || !input.trim()}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Translating
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Translate
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-fg-subtle">
              {to}
            </span>
            {output && (
              <button
                onClick={copy}
                className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-fg"
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
            )}
          </div>
          <div
            className={cn(
              "mt-3 min-h-48 rounded-xl border border-border bg-bg p-4 text-sm leading-relaxed whitespace-pre-wrap",
              isUrduOutput && "font-urdu text-base leading-loose text-right"
            )}
            lang={isUrduOutput ? "ur" : undefined}
            dir={isUrduOutput ? "rtl" : "ltr"}
          >
            {error ? (
              <span className="text-red-300">{error}</span>
            ) : output ? (
              output
            ) : (
              <span className="text-fg-subtle italic">
                Translation yahan aayega...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
