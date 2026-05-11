import { NextRequest, NextResponse } from "next/server";
import { type ChatMessage } from "@/lib/groq";
import { llmChatStream, type Provider } from "@/lib/llm";
import { PROMPTS } from "@/lib/prompts";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const VALID_PROVIDERS: Provider[] = ["groq", "gemini", "openrouter"];

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = rateLimit(`chat:${ip}`, { limit: 60, windowMs: 3600_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again in an hour." },
      { status: 429 }
    );
  }

  let body: { messages?: ChatMessage[]; provider?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages, provider } = body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Missing 'messages' array" },
      { status: 400 }
    );
  }

  const preferred =
    provider && VALID_PROVIDERS.includes(provider as Provider)
      ? (provider as Provider)
      : undefined;

  // Always prepend chatbot system prompt
  const fullMessages: ChatMessage[] = [
    { role: "system", content: PROMPTS.chatbot },
    ...messages.slice(-20),
  ];

  try {
    const { stream, provider: usedProvider } = await llmChatStream(
      fullMessages,
      { preferredProvider: preferred }
    );
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-LLM-Provider": usedProvider,
      },
    });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 503 }
    );
  }
}
