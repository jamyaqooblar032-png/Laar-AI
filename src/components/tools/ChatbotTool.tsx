"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Mujhe ek motivational shayari sunao",
  "Today's news in 3 bullet points",
  "Resume ke liye 5 strong action verbs do",
  "Make me a 30-sec script for a Karachi street food reel",
  "Translate 'I miss you' to Urdu in 5 different ways",
];

export function ChatbotTool() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const data: { error?: string } = await res
          .json()
          .catch(() => ({}) as { error?: string });
        throw new Error(data.error ?? "Request failed");
      }

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
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-bg-card overflow-hidden h-[640px]">
      <div className="flex items-center justify-between border-b border-border-soft px-5 py-3 bg-bg-soft">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium">Laar AI Chatbot</span>
          <span className="text-xs text-fg-subtle">
            · Llama 3.3 70B · Urdu/English
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-fg"
          >
            <Trash2 className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">
              Kya pochhna chahte ho?
            </h3>
            <p className="mt-1 max-w-md text-sm text-fg-muted">
              Urdu, Roman Urdu, ya English mein kuch bhi pochho. Main hamesha
              taiyaar hun.
            </p>
            <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-left text-sm text-fg-muted transition hover:border-primary/40 hover:text-fg"
                >
                  {s}
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
            <Loader2 className="h-4 w-4 animate-spin" /> Soch raha hun...
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border-soft bg-bg-soft p-4"
      >
        <div className="flex items-end gap-2">
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
            className="flex-1 resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 max-h-32"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            size="icon"
            className={cn("h-11 w-11 shrink-0")}
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
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isUser
            ? "bg-bg-elevated text-fg-muted"
            : "bg-primary/15 text-primary"
        )}
      >
        {isUser ? "Aap" : "AI"}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-primary text-bg"
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
