import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolsExplorer } from "@/components/ToolsExplorer";
import type { ToolCategory } from "@/lib/tools";
import { CATEGORIES, STATS } from "@/lib/tools";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "All tools",
  description:
    "Every AI tool, in one place — chatbot, image generation, video editor, captions, voiceover, transcription and more.",
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
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="bg-spotlight absolute inset-0 -z-10" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3 py-1 text-xs text-fg-muted">
              <Sparkles className="h-3 w-3 text-primary" />
              Tools library
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              The complete{" "}
              <span className="text-primary">toolkit</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-fg-muted sm:text-lg">
              <span className="text-fg font-medium tabular-nums">
                {STATS.active}
              </span>{" "}
              focused tools across writing, design, audio, video, code and
              utilities. Search by name or filter by category.
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
