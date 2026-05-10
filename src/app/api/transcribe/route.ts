import { NextRequest, NextResponse } from "next/server";
import { hfTranscribe, HFError } from "@/lib/huggingface";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit(`transcribe:${ip}`, { limit: 10, windowMs: 3600_000 });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Limit reached. Wait 1 hour or sign up for Pro." },
        { status: 429 }
      );
    }

    const contentType = req.headers.get("content-type") || "audio/wav";
    const url = new URL(req.url);
    const wantsTimestamps = url.searchParams.get("timestamps") === "1";
    const buf = await req.arrayBuffer();
    if (buf.byteLength === 0) {
      return NextResponse.json({ error: "No audio uploaded" }, { status: 400 });
    }
    if (buf.byteLength > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 20MB)" },
        { status: 413 }
      );
    }

    const { text, chunks } = await hfTranscribe(buf, contentType, {
      returnTimestamps: wantsTimestamps,
    });
    return NextResponse.json({ text, chunks, remaining: limit.remaining });
  } catch (err) {
    const status = err instanceof HFError ? err.status ?? 500 : 500;
    const message = err instanceof Error ? err.message : "Transcription failed";
    return NextResponse.json({ error: message }, { status });
  }
}
