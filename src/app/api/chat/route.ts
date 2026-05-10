import { NextRequest, NextResponse } from "next/server";
import { type ChatMessage } from "@/lib/groq";
import { llmChatStream } from "@/lib/llm";
import { PROMPTS } from "@/lib/prompts";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = rateLimit(`chat:${ip}`, { limit: 60, windowMs: 3600_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again in an hour." },
      { status: 429 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Missing 'messages' array" },
      { status: 400 }
    );
  }

  // Always prepend chatbot system prompt
  const fullMessages: ChatMessage[] = [
    { role: "system", content: PROMPTS.chatbot },
    ...messages.slice(-20),
  ];

  try {
    const { stream, provider } = await llmChatStream(fullMessages);
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-LLM-Provider": provider,
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
