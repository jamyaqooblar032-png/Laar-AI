import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const limit = rateLimit(`avatar:${ip}`, {
      limit: 3,
      windowMs: 24 * 3600_000,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error:
            "Free tier limit: 3 avatars per day. Premium tier coming soon.",
        },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as {
      email?: string;
      script?: string;
      voiceId?: string;
      tier?: string;
      photoUrl?: string;
    } | null;

    if (!body?.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Valid email zaroori hai" },
        { status: 400 }
      );
    }
    if (!body.script || body.script.trim().length < 5) {
      return NextResponse.json(
        { error: "Script chahiye (kam se kam 5 character)" },
        { status: 400 }
      );
    }
    if (body.script.length > 1500) {
      return NextResponse.json(
        { error: "Script bohat lambi (max 1500 char)" },
        { status: 400 }
      );
    }

    const supabase = getServerClient();
    if (!supabase) {
      console.log(
        `[avatar-request] (no DB) email=${body.email} tier=${body.tier ?? "free"}`
      );
      return NextResponse.json({
        ok: true,
        persisted: false,
        message: "Request received. We'll email you when ready.",
      });
    }

    const { error } = await supabase.from("avatar_requests").insert({
      email: body.email.toLowerCase().trim(),
      script: body.script.trim(),
      voice_id: body.voiceId ?? null,
      photo_url: body.photoUrl ?? null,
      tier: body.tier ?? "free",
      status: "queued",
    });

    if (error) {
      console.error("[avatar-request] supabase error:", error);
      return NextResponse.json(
        { error: "Save nahi ho saka. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      persisted: true,
      message: "Request received. Queue position: ~5-15 min wait.",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown";
    console.error("[avatar-request]", msg);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
