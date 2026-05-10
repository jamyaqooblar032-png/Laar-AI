import { NextRequest, NextResponse } from "next/server";
import { createDevinSession } from "@/lib/devin";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!process.env.DEVIN_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Devin Coding tool not configured yet. Coming soon — admin must add DEVIN_API_KEY.",
      },
      { status: 503 }
    );
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`devin:${ip}`, { limit: 1, windowMs: 86_400_000 });
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          "Devin Coding limit reached: 1 task per day per user (beta). Try again tomorrow.",
      },
      { status: 429 }
    );
  }

  let body: { prompt?: string; title?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { prompt, title } = body;
  if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
    return NextResponse.json(
      { error: "Prompt must be at least 10 characters describing your task." },
      { status: 400 }
    );
  }
  if (prompt.length > 4000) {
    return NextResponse.json(
      { error: "Prompt too long. Max 4000 characters." },
      { status: 400 }
    );
  }

  try {
    const session = await createDevinSession({
      prompt: prompt.trim(),
      title: title?.trim() || prompt.slice(0, 60),
      tags: ["laar-ai-public-tool"],
    });

    return NextResponse.json({
      session_id: session.session_id,
      url: session.url,
      message:
        "Devin task queued. Check progress at the link below — Devin will plan, code, test, and finish autonomously.",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/devin/run] error:", msg);
    return NextResponse.json(
      {
        error:
          "Devin service unavailable. ACUs may be exhausted or service is down. Please try again later.",
      },
      { status: 503 }
    );
  }
}
