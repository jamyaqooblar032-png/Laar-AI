import { NextRequest, NextResponse } from "next/server";
import { groqChatStream, type ChatMessage } from "@/lib/groq";
import { PROMPTS } from "@/lib/prompts";

export const runtime = "nodejs";

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 60;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
  if (!rateLimit(ip)) {
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
    const stream = await groqChatStream(fullMessages);
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 503 }
    );
  }
}
