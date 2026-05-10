"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TextToolProps = {
  toolSlug: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel?: string;
  examples?: string[];
  cta?: string;
  outputClassName?: string;
  formatOutput?: (text: string) => string;
};

export function TextTool({
  toolSlug,
  inputLabel,
  inputPlaceholder,
  outputLabel = "Result",
  examples = [],
  cta = "Generate",
  outputClassName,
  formatOutput,
}: TextToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function generate(text: string) {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: toolSlug, input: text, stream: true }),
      });

      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}) as {
          error?: string;
        });
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
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
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

  const displayed = output && formatOutput ? formatOutput(output) : output;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Input */}
      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          {inputLabel}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          rows={10}
          className="mt-3 w-full resize-y rounded-xl border border-border bg-bg p-4 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-48"
        />
        {examples.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-muted hover:text-fg hover:border-border"
              >
                {ex}
              </button>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xs text-fg-subtle">
            {input.length} chars · max 8000
          </span>
          <Button
            onClick={() => generate(input)}
            disabled={loading || !input.trim()}
            size="default"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> {cta}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Output */}
      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {outputLabel}
          </label>
          <div className="flex items-center gap-2">
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
            {output && !loading && (
              <button
                onClick={() => generate(input)}
                className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-fg"
              >
                <RefreshCw className="h-3 w-3" /> Regenerate
              </button>
            )}
          </div>
        </div>
        <div
          className={
            "mt-3 min-h-48 max-h-[600px] overflow-y-auto rounded-xl border border-border bg-bg p-4 text-sm leading-relaxed whitespace-pre-wrap " +
            (outputClassName ?? "")
          }
        >
          {error ? (
            <p className="text-red-300">{error}</p>
          ) : displayed ? (
            displayed
          ) : (
            <p className="text-fg-subtle italic">
              {loading
                ? "Soch raha hun..."
                : "Result yahan aayega. Pehle input do aur Generate press karo."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
