import { NextRequest, NextResponse } from "next/server";
import { groqChat, groqChatStream } from "@/lib/groq";
import { buildMessages, PROMPTS } from "@/lib/prompts";

export const runtime = "nodejs";

const ALLOWED_TOOLS = new Set(Object.keys(PROMPTS));

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_PER_HOUR = 30;

function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + hourMs });
    return { allowed: true, remaining: RATE_LIMIT_PER_HOUR - 1 };
  }
  if (entry.count >= RATE_LIMIT_PER_HOUR) {
    return { allowed: false, remaining: 0 };
  }
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_PER_HOUR - entry.count };
}

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

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";
  const limit = rateLimit(ip);
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
      const stream = await groqChatStream(messages);
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-RateLimit-Remaining": String(limit.remaining),
        },
      });
    }
    const text = await groqChat(messages);
    return NextResponse.json({
      output: text,
      remaining: limit.remaining,
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
