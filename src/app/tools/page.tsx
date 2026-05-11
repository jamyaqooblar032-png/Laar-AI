import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolsExplorer } from "@/components/ToolsExplorer";
import type { ToolCategory } from "@/lib/tools";
import { CATEGORIES, STATS } from "@/lib/tools";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "All Tools",
  description:
    "Sab AI tools ek jagah — chatbot, image gen, video editor, captions, avatar, voiceover, Roman Urdu, aur 70+ aur tools.",
};

const VALID_CATEGORIES = new Set(Object.keys(CATEGORIES));

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams;
  const cat =
    sp.category && VALID_CATEGORIES.has(sp.category)
      ? (sp.category as ToolCategory)
      : null;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border-soft">
          {/* Layered bg */}
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="bg-spotlight absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 opacity-60">
            <div
              className="blob blob-1"
              style={{
                top: "-10%",
                left: "10%",
                width: "320px",
                height: "320px",
              }}
            />
            <div
              className="blob blob-2"
              style={{
                top: "-10%",
                right: "10%",
                width: "320px",
                height: "320px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-medium">
              <Sparkles className="h-3 w-3" />
              Tools Library
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="tabular-nums bg-gradient-to-r from-primary via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {STATS.total}+
              </span>{" "}
              AI Tools
            </h1>
            <p className="mt-4 max-w-2xl text-base text-fg-muted sm:text-lg">
              <span className="text-fg font-semibold tabular-nums">
                {STATS.active}
              </span>{" "}
              live ·{" "}
              <span className="tabular-nums">{STATS.comingSoon}</span> coming
              soon. Browse, search, ya category se filter karein.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ToolsExplorer defaultCategory={cat} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
