import { NextRequest, NextResponse } from "next/server";
import { llmChat, llmChatStream } from "@/lib/llm";
import { buildMessages, PROMPTS } from "@/lib/prompts";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const ALLOWED_TOOLS = new Set(Object.keys(PROMPTS));

export async function POST(req: NextRequest) {
  let body: { tool?: string; input?: string; stream?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { tool, input, stream } = body;
  if (!tool || !input) {
    return NextResponse.json(
      { error: "Missing 'tool' or 'input'" },
      { status: 400 }
    );
  }
  if (!ALLOWED_TOOLS.has(tool)) {
    return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`generate:${ip}`, { limit: 30, windowMs: 3600_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          "Rate limit exceeded. 30 requests per hour for free tier. Pro launching soon.",
      },
      { status: 429 }
    );
  }

  const messages = buildMessages(tool, input.slice(0, 8000));

  try {
    if (stream) {
      const { stream: s, provider } = await llmChatStream(messages);
      return new Response(s, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-RateLimit-Remaining": String(limit.remaining),
          "X-LLM-Provider": provider,
        },
      });
    }
    const { text, provider } = await llmChat(messages);
    return NextResponse.json({
      output: text,
      remaining: limit.remaining,
      provider,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/generate] error:", msg);
    return NextResponse.json(
      { error: "AI service unavailable. Please try again." },
      { status: 503 }
    );
  }
}
