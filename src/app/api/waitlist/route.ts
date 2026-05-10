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
    const limit = rateLimit(`waitlist:${ip}`, {
      limit: 10,
      windowMs: 3600_000,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Bohat zyada attempts. Wait an hour." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as {
      email?: string;
      toolSlug?: string;
      source?: string;
    } | null;

    if (!body?.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Valid email zaroori hai" },
        { status: 400 }
      );
    }

    const supabase = getServerClient();
    if (!supabase) {
      // Supabase not yet configured \u2014 log and accept silently
      console.log(
        `[waitlist] (no DB) email=${body.email} tool=${body.toolSlug ?? "-"}`
      );
      return NextResponse.json({ ok: true, persisted: false });
    }

    const { error } = await supabase.from("waitlist").upsert(
      {
        email: body.email.toLowerCase().trim(),
        tool_slug: body.toolSlug ?? null,
        source: body.source ?? "coming-soon-card",
      },
      { onConflict: "email,tool_slug" }
    );

    if (error) {
      console.error("[waitlist] supabase error:", error);
      return NextResponse.json(
        { error: "Save nahi ho saka. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown";
    console.error("[waitlist]", msg);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
