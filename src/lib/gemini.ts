/**
 * Google Gemini client — uses the AI Studio REST API.
 * Free tier: 1500 req/day on Gemini 2.5 Flash.
 *
 * https://ai.google.dev/api/generate-content
 */

import type { ChatMessage } from "./groq";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

export const GEMINI_DEFAULT_MODEL = "gemini-2.5-flash";
export const GEMINI_FAST_MODEL = "gemini-2.5-flash-lite";

export type GeminiOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
};

type GeminiPart = { text: string };
type GeminiContent = { role: "user" | "model"; parts: GeminiPart[] };
type GeminiResponse = {
  candidates?: { content?: { parts?: GeminiPart[] } }[];
  error?: { message: string };
};

function toGeminiContents(messages: ChatMessage[]): {
  systemInstruction?: { parts: GeminiPart[] };
  contents: GeminiContent[];
} {
  const systemMsgs = messages.filter((m) => m.role === "system");
  const conv = messages.filter((m) => m.role !== "system");
  const systemText = systemMsgs.map((m) => m.content).join("\n\n");

  const contents: GeminiContent[] = conv.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  return {
    systemInstruction: systemText ? { parts: [{ text: systemText }] } : undefined,
    contents,
  };
}

export async function geminiChat(
  messages: ChatMessage[],
  options: GeminiOptions = {}
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY missing");

  const model = options.model ?? GEMINI_DEFAULT_MODEL;
  const url = `${GEMINI_BASE}/models/${model}:generateContent?key=${apiKey}`;
  const { systemInstruction, contents } = toGeminiContents(messages);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction,
      contents,
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 2048,
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Gemini error ${res.status}: ${errBody.slice(0, 200)}`);
  }

  const data = (await res.json()) as GeminiResponse;
  if (data.error) throw new Error(`Gemini error: ${data.error.message}`);
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("Empty response from Gemini");
  return text;
}

export async function geminiChatStream(
  messages: ChatMessage[],
  options: GeminiOptions = {}
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY missing");

  const model = options.model ?? GEMINI_DEFAULT_MODEL;
  const url = `${GEMINI_BASE}/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
  const { systemInstruction, contents } = toGeminiContents(messages);

  const upstream = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction,
      contents,
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 2048,
      },
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errBody = await upstream.text();
    throw new Error(
      `Gemini error ${upstream.status}: ${errBody.slice(0, 200)}`
    );
  }

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let idx;
          while ((idx = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, idx).trim();
            buffer = buffer.slice(idx + 1);
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            try {
              const parsed = JSON.parse(payload) as GeminiResponse;
              const text =
                parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}
