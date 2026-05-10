/**
 * Multi-provider LLM router with automatic fallback.
 *
 * Provider priority:
 *   1. Groq (primary — fastest, 14k req/day free)
 *   2. Gemini (backup — 1500 req/day free)
 *   3. OpenRouter free models (last resort)
 *
 * Auto-falls-back on rate-limit (429), quota errors, or upstream failures.
 */

import { groqChat, groqChatStream, type ChatMessage } from "./groq";
import { geminiChat, geminiChatStream } from "./gemini";

export type Provider = "groq" | "gemini" | "openrouter";

export type LLMOptions = {
  temperature?: number;
  maxTokens?: number;
  preferredProvider?: Provider;
  forceProvider?: Provider;
};

const ORDER: Provider[] = ["groq", "gemini", "openrouter"];

function isAvailable(provider: Provider): boolean {
  switch (provider) {
    case "groq":
      return !!process.env.GROQ_API_KEY;
    case "gemini":
      return !!process.env.GEMINI_API_KEY;
    case "openrouter":
      return !!process.env.OPENROUTER_API_KEY;
  }
}

function shouldFallback(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes("429") ||
    /rate.?limit/i.test(msg) ||
    /quota/i.test(msg) ||
    /503/.test(msg) ||
    /500/.test(msg) ||
    /timeout/i.test(msg)
  );
}

function getOrder(opts: LLMOptions): Provider[] {
  if (opts.forceProvider) return [opts.forceProvider];
  const order = [...ORDER];
  if (opts.preferredProvider) {
    const idx = order.indexOf(opts.preferredProvider);
    if (idx > 0) {
      order.splice(idx, 1);
      order.unshift(opts.preferredProvider);
    }
  }
  return order.filter(isAvailable);
}

async function openrouterChat(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY missing");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://laar-ai-iota.vercel.app",
      "X-Title": "Laar AI",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
    }),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${errBody.slice(0, 200)}`);
  }
  const data: { choices?: { message?: { content?: string } }[] } =
    await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty response from OpenRouter");
  return content;
}

export type LLMResult = {
  text: string;
  provider: Provider;
};

export async function llmChat(
  messages: ChatMessage[],
  options: LLMOptions = {}
): Promise<LLMResult> {
  const order = getOrder(options);
  if (order.length === 0) {
    throw new Error("No LLM providers configured. Set GROQ_API_KEY at minimum.");
  }

  let lastErr: unknown;
  for (const provider of order) {
    try {
      let text: string;
      switch (provider) {
        case "groq":
          text = await groqChat(messages, {
            temperature: options.temperature,
            maxTokens: options.maxTokens,
          });
          break;
        case "gemini":
          text = await geminiChat(messages, {
            temperature: options.temperature,
            maxTokens: options.maxTokens,
          });
          break;
        case "openrouter":
          text = await openrouterChat(messages, {
            temperature: options.temperature,
            maxTokens: options.maxTokens,
          });
          break;
      }
      return { text, provider };
    } catch (err) {
      lastErr = err;
      if (!shouldFallback(err)) {
        throw err;
      }
      console.warn(
        `[llm] ${provider} failed, trying next:`,
        err instanceof Error ? err.message : err
      );
    }
  }
  throw lastErr ?? new Error("All LLM providers failed");
}

export async function llmChatStream(
  messages: ChatMessage[],
  options: LLMOptions = {}
): Promise<{ stream: ReadableStream<Uint8Array>; provider: Provider }> {
  const order = getOrder(options);
  if (order.length === 0) {
    throw new Error("No LLM providers configured. Set GROQ_API_KEY at minimum.");
  }

  let lastErr: unknown;
  for (const provider of order) {
    try {
      let stream: ReadableStream<Uint8Array>;
      switch (provider) {
        case "groq":
          stream = await groqChatStream(messages, {
            temperature: options.temperature,
            maxTokens: options.maxTokens,
          });
          break;
        case "gemini":
          stream = await geminiChatStream(messages, {
            temperature: options.temperature,
            maxTokens: options.maxTokens,
          });
          break;
        case "openrouter": {
          const text = await openrouterChat(messages, {
            temperature: options.temperature,
            maxTokens: options.maxTokens,
          });
          const encoder = new TextEncoder();
          stream = new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(text));
              controller.close();
            },
          });
          break;
        }
      }
      return { stream, provider };
    } catch (err) {
      lastErr = err;
      if (!shouldFallback(err)) {
        throw err;
      }
      console.warn(
        `[llm] ${provider} stream failed, trying next:`,
        err instanceof Error ? err.message : err
      );
    }
  }
  throw lastErr ?? new Error("All LLM providers failed");
}
