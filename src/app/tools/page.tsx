import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolsExplorer } from "@/components/ToolsExplorer";
import type { ToolCategory } from "@/lib/tools";
import { CATEGORIES, STATS } from "@/lib/tools";

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
        <section className="border-b border-border-soft">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold">
              Tools Library
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {STATS.total}+ AI Tools
            </h1>
            <p className="mt-4 max-w-2xl text-base text-fg-muted">
              {STATS.active} live, {STATS.comingSoon} coming soon. Browse,
              search, ya category se filter karein.
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
