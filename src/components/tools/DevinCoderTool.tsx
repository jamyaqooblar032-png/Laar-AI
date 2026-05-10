"use client";

import { useState } from "react";
import { Code2, Loader2, ExternalLink, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const EXAMPLES = [
  "Add a dark mode toggle to my Next.js portfolio site at github.com/myuser/portfolio",
  "Fix the failing tests in github.com/myuser/api-server — error logs in CI",
  "Build a simple to-do app with React + localStorage in a new repo",
  "Refactor the auth module in github.com/myuser/saas to use NextAuth v5",
];

type Result = {
  session_id: string;
  url: string;
  message: string;
};

export function DevinCoderTool() {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/devin/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, title }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Request failed");
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="mb-3 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
          <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <div>
            <strong>Beta · Powered by Devin AI.</strong> Each task uses
            premium AI compute (ACUs from Pro account). Limited to{" "}
            <strong>1 task / day per user</strong>. For real engineering
            work — not casual chat. Devin will plan, code, test, and complete
            the task autonomously over 5-30+ minutes.
          </div>
        </div>

        <label className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          Task title (optional)
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Fix login bug, Add dark mode"
          className="mt-2 w-full rounded-xl border border-border bg-bg p-3 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-fg-subtle">
          Describe the task in detail
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. In github.com/myuser/myrepo, add a button to download user data as JSON. Include tests."
          rows={8}
          className="mt-2 w-full resize-y rounded-xl border border-border bg-bg p-4 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-40"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setPrompt(ex)}
              className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs text-fg-muted hover:text-fg"
            >
              {ex.slice(0, 60)}…
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xs text-fg-subtle">
            {prompt.length} chars · min 10, max 4000
          </span>
          <Button
            onClick={submit}
            disabled={loading || prompt.trim().length < 10}
            size="default"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Spawning Devin
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Run Devin
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-bg-card p-5">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary" />
          <label className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            Devin Session
          </label>
        </div>

        {!result && !error && !loading && (
          <div className="mt-6 rounded-xl border border-dashed border-border bg-bg/40 p-8 text-center text-sm text-fg-subtle">
            Devin sessions take 5-30 minutes. After spawning, you&apos;ll get
            a link to watch Devin work in real time on app.devin.ai.
          </div>
        )}

        {loading && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-bg/40 p-6 text-sm text-fg-muted">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Spawning Devin session… this may take 10-20 seconds.
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              {result.message}
            </div>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm font-medium text-primary hover:bg-primary/20"
            >
              <span className="flex items-center gap-2">
                <Code2 className="h-4 w-4" /> Watch Devin Work
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <div className="rounded-xl border border-border bg-bg-elevated p-3 text-xs text-fg-subtle">
              <strong>Session ID:</strong>{" "}
              <code className="font-mono">{result.session_id}</code>
            </div>
            <p className="text-xs text-fg-subtle">
              Devin is now planning, coding, testing, and finishing your task
              autonomously. You can close this page — it will continue
              running. Visit the link above anytime to check progress.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
