"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const EXAMPLES = [
  "kya haal hai bhai",
  "Pakistan zindabad",
  "Mujhe bhook lagi hai",
  "Karachi ki traffic main phasa hua hun",
  "Aaj bahut acha din hai aur mausam bhi acha hai",
];

export function RomanToUrduTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function convert() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "roman-to-urdu",
          input,
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

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <span className="text-xs uppercase tracking-wider text-fg-subtle">
          Roman Urdu (English letters)
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") convert();
          }}
          placeholder="Yahan Roman Urdu likho..."
          rows={10}
          className="mt-3 w-full resize-y rounded-xl border border-border bg-bg p-4 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-48"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setInput(ex)}
              className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-muted hover:text-fg"
            >
              {ex}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={convert} disabled={loading || !input.trim()}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Converting
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Convert to Nastaliq
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-fg-subtle">
            اردو نستعلیق
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
          className="mt-3 min-h-48 rounded-xl border border-border bg-bg p-4 font-urdu text-xl leading-[2.4] text-right whitespace-pre-wrap"
          lang="ur"
          dir="rtl"
        >
          {error ? (
            <span className="text-red-300 font-sans text-sm" dir="ltr">
              {error}
            </span>
          ) : output ? (
            output
          ) : (
            <span className="text-fg-subtle italic font-sans text-sm" dir="ltr">
              Nastaliq result yahan aayega...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
