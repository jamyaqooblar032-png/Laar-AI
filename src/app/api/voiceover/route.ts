import { NextRequest, NextResponse } from "next/server";
import { elTextToSpeech, ElevenLabsError, VOICES } from "@/lib/elevenlabs";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const VOICE_IDS = new Set(VOICES.map((v) => v.id));

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit(`voiceover:${ip}`, {
      limit: 5,
      windowMs: 3600_000,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Limit reached. 5 voiceovers/hour on free tier." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as {
      text?: string;
      voiceId?: string;
    } | null;

    if (!body?.text || !body.voiceId) {
      return NextResponse.json(
        { error: "Missing 'text' or 'voiceId'" },
        { status: 400 }
      );
    }
    if (!VOICE_IDS.has(body.voiceId)) {
      return NextResponse.json({ error: "Unknown voice" }, { status: 400 });
    }
    if (body.text.length > 1500) {
      return NextResponse.json(
        { error: "Text too long. Max 1500 characters on free tier." },
        { status: 400 }
      );
    }

    const blob = await elTextToSpeech(body.text, body.voiceId);
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "X-RateLimit-Remaining": String(limit.remaining),
      },
    });
  } catch (err) {
    const status =
      err instanceof ElevenLabsError ? err.status ?? 500 : 500;
    const message =
      err instanceof Error ? err.message : "Voiceover generation failed";
    return NextResponse.json({ error: message }, { status });
  }
}
