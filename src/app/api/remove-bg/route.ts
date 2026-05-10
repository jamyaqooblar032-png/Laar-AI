import { NextRequest, NextResponse } from "next/server";
import { hfBackgroundRemove, HFError } from "@/lib/huggingface";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit(`remove-bg:${ip}`, { limit: 20, windowMs: 3600_000 });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Limit reached. Wait 1 hour or sign up for Pro." },
        { status: 429 }
      );
    }

    const contentType = req.headers.get("content-type") || "image/png";
    const buf = await req.arrayBuffer();
    if (buf.byteLength === 0) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }
    if (buf.byteLength > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 413 }
      );
    }

    const { blob, contentType: outType } = await hfBackgroundRemove(
      buf,
      contentType
    );
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": outType,
        "X-RateLimit-Remaining": String(limit.remaining),
      },
    });
  } catch (err) {
    const status = err instanceof HFError ? err.status ?? 500 : 500;
    const message = err instanceof Error ? err.message : "BG removal failed";
    return NextResponse.json({ error: message }, { status });
  }
}
