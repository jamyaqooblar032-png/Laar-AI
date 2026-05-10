"use client";

import { useState } from "react";
import { Check, Copy, FileJson, ChevronsDown, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAMPLE = `{"name":"Laar AI","tools":["chatbot","image","voiceover"],"users":1000,"isLive":true}`;

export function JSONFormatterTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function format(indent: number) {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  }

  async function copy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Input JSON</h3>
          <button
            onClick={() => setInput(SAMPLE)}
            className="text-xs text-fg-subtle hover:text-fg"
          >
            Load sample
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          spellCheck={false}
          className="w-full rounded-xl border border-border bg-bg p-3 font-mono text-xs focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="primary" size="sm" onClick={() => format(2)}>
            <ChevronsDown className="h-3 w-3" /> Beautify (2 spaces)
          </Button>
          <Button variant="secondary" size="sm" onClick={() => format(4)}>
            Beautify (4 spaces)
          </Button>
          <Button variant="secondary" size="sm" onClick={() => format(0)}>
            <Minimize2 className="h-3 w-3" /> Minify
          </Button>
        </div>
        {error && (
          <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <FileJson className="h-4 w-4 text-primary" /> Output
          </h3>
          {output && (
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
          )}
        </div>
        <pre className="h-[400px] overflow-auto rounded-xl border border-border bg-bg p-3 font-mono text-xs whitespace-pre-wrap">
          {output || (
            <span className="text-fg-subtle">
              Beautify ya Minify dabaayein...
            </span>
          )}
        </pre>
      </div>
    </div>
  );
}
