const TECH = [
  "Groq Llama 3.3 70B",
  "Google Gemini 2.5",
  "FLUX Pro",
  "ElevenLabs TTS",
  "Whisper STT",
  "Pollinations",
  "HuggingFace",
  "Next.js 16",
  "Vercel Edge",
  "Supabase",
];

export function TechMarquee() {
  const items = [...TECH, ...TECH];

  return (
    <section className="relative border-y border-border-soft bg-bg-soft py-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-soft to-transparent" />

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-3 mx-6 text-sm text-fg-muted font-medium"
          >
            <span className="opacity-80">{label}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-primary/40" />
          </div>
        ))}
      </div>
    </section>
  );
}
