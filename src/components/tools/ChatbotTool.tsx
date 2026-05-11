"use client";

import { useEffect, useRef, useState } from "react";
import {
  Send,
  Sparkles,
  Trash2,
  Loader2,
  Zap,
  Cpu,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Model = "auto" | "groq" | "gemini";

const SUGGESTIONS = [
  "Mujhe ek motivational shayari sunao",
  "Today's news in 3 bullet points",
  "Resume ke liye 5 strong action verbs do",
  "Make me a 30-sec script for a Karachi street food reel",
  "Translate 'I miss you' to Urdu in 5 different ways",
];

const MODELS: { value: Model; label: string; sub: string; Icon: typeof Zap }[] =
  [
    {
      value: "auto",
      label: "Auto",
      sub: "Smartest pick",
      Icon: Wand2,
    },
    {
      value: "groq",
      label: "Groq Llama",
      sub: "Fastest · 70B",
      Icon: Zap,
    },
    {
      value: "gemini",
      label: "Gemini 2.5",
      sub: "Smart · Google",
      Icon: Cpu,
    },
  ];

export function ChatbotTool() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<Model>("auto");
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setError(null);
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          provider: model === "auto" ? undefined : model,
        }),
      });

      if (!res.ok) {
        const data: { error?: string } = await res
          .json()
          .catch(() => ({}) as { error?: string });
        throw new Error(data.error ?? "Request failed");
      }

      const usedProvider = res.headers.get("x-llm-provider");
      if (usedProvider) setActiveProvider(usedProvider);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const last = m[m.length - 1];
          const next: Message = {
            role: "assistant",
            content: (last?.content ?? "") + chunk,
          };
          return [...m.slice(0, -1), next];
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setMessages((m) => m.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setMessages([]);
    setError(null);
    setActiveProvider(null);
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-bg-card overflow-hidden h-[680px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-soft px-5 py-3 bg-gradient-to-r from-bg-soft via-bg-card to-bg-soft">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-sm font-semibold">Laar AI Chatbot</span>
          {activeProvider && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary font-mono">
              via {activeProvider}
            </span>
          )}
        </div>
        {messages.length > 0 && (
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 rounded-full border border-border-soft bg-bg-card px-2.5 py-1 text-xs text-fg-muted transition hover:text-fg hover:border-fg-muted/30"
          >
            <Trash2 className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {/* Model selector */}
      <div className="flex items-center gap-1.5 border-b border-border-soft bg-bg-soft/60 px-4 py-2 overflow-x-auto">
        <span className="text-[10px] uppercase tracking-wider text-fg-subtle mr-1 shrink-0">
          Model:
        </span>
        {MODELS.map((m) => {
          const active = model === m.value;
          return (
            <button
              key={m.value}
              onClick={() => setModel(m.value)}
              className={cn(
                "group relative inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all active:scale-95 shrink-0",
                active
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-border bg-bg-card text-fg-muted hover:text-fg hover:border-fg-muted/30"
              )}
              title={m.sub}
            >
              <m.Icon className="h-3 w-3" />
              <span className="font-medium">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="relative inline-flex">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 blur-xl opacity-50" />
              <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500 shadow-xl ring-1 ring-inset ring-white/10">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
              Kya pochhna chahte ho?
            </h3>
            <p className="mt-1 max-w-md text-sm text-fg-muted leading-relaxed">
              Urdu, Roman Urdu, ya English mein kuch bhi pochho. Main hamesha
              taiyaar hun.
            </p>
            <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className={cn(
                    "group rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-left text-sm text-fg-muted transition-all hover:border-primary/40 hover:text-fg hover:translate-x-1 hover:shadow-[0_6px_18px_-6px_rgba(16,185,129,0.4)]",
                    `stagger-${(i % 5) + 1}`,
                    "animate-fade-up"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                    {s}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <ChatMessageBubble key={i} message={m} />
        ))}
        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex items-center gap-2 text-sm text-fg-muted">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Soch raha hun...
            </span>
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border-soft bg-bg-soft p-4"
      >
        <div className="flex items-end gap-2">
          <div className="relative flex-1 group">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/30 via-cyan-500/20 to-purple-500/30 opacity-0 blur-md transition-opacity duration-500 group-focus-within:opacity-100" />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Apna sawal yahan likho..."
              rows={1}
              className="relative w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 max-h-32 transition-all"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            variant="gradient"
            size="icon"
            className={cn("h-11 w-11 shrink-0 magnetic")}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-fg-subtle">
          Free tier: 60 messages/hour per user. AI can make mistakes — verify
          important info.
        </p>
      </form>
    </div>
  );
}

function ChatMessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-up",
        isUser && "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset",
          isUser
            ? "bg-bg-elevated text-fg-muted ring-white/5"
            : "bg-gradient-to-br from-primary to-cyan-500 text-white ring-white/10 shadow-md"
        )}
      >
        {isUser ? "Aap" : "AI"}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
          isUser
            ? "bg-gradient-to-br from-primary to-emerald-500 text-white"
            : "bg-bg-elevated text-fg border border-border-soft"
        )}
      >
        {message.content || (
          <Loader2 className="inline h-3 w-3 animate-spin" />
        )}
      </div>
    </div>
  );
}
