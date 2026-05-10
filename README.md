# Laar AI

**Pakistan's all-in-one AI toolkit** — 80+ AI tools across 8 categories, with Urdu, Roman Urdu, and English support. Built for Pakistani creators, students, and businesses.

> Sab kuch ek hi jagah. Aap ki zubaan mein.

---

## Phase 1 — Live Tools

- **AI Chatbot** — Llama 3.3 70B with full Urdu support
- **AI Image Generator** — Pollinations.ai (FLUX), unlimited free
- **Roman Urdu → Nastaliq** — accurate transliteration
- **Translator** — 120+ languages, Urdu-aware
- **Script / Hook Generator** — Reels & Shorts
- **Hashtag, YouTube Title, Caption, Blog, Email, Resume, Cover Letter Writers**
- **Story, Urdu Poetry, Slogan, Joke, Quote, Username, Idea Brainstormer**
- **Code, SQL, Regex, README Generators** — for developers

Plus 60+ more tools in active development (background remover, mini video editor, AI avatar, voiceover, captions, PDF tools, Quran reels, salat times, cricket graphics, real estate reels, and more).

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + React 19 + Tailwind CSS 4
- **AI:** Groq (Llama 3.3 / Llama 3.1) for text · Pollinations.ai for images
- **Coming:** HuggingFace (Whisper, FLUX), ElevenLabs (TTS), Supabase (auth/DB), FFmpeg.wasm (video editor)
- **Hosting:** Vercel

## Local Development

```bash
pnpm install
cp .env.local.example .env.local   # add your GROQ_API_KEY
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `GROQ_API_KEY` | yes | Get free at [console.groq.com](https://console.groq.com/keys) |
| `HUGGINGFACE_API_KEY` | optional | For Whisper transcription, FLUX images |
| `ELEVENLABS_API_KEY` | optional | For premium voiceover |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_KEY` | optional | For auth & user storage |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/         # Streaming chat endpoint
│   │   └── generate/     # Tool generation endpoint
│   ├── tools/
│   │   └── [slug]/       # Individual tool pages
│   ├── about/
│   ├── pricing/
│   └── page.tsx          # Landing page
├── components/
│   ├── tools/            # Per-tool UIs
│   ├── ui/               # Button, Badge, Card primitives
│   └── ...               # Hero, Footer, Navbar, etc.
└── lib/
    ├── tools.ts          # Central registry of all 80+ tools
    ├── prompts.ts        # System prompts per tool
    └── groq.ts           # Groq API client
```

## Pricing

- **Free forever** — all 80+ tools, 30 generations/hour, unlimited images
- **Pro** (coming soon) — ₨1,500/mo · unlimited everything · no watermark · API access
- **Business** (coming soon) — Custom pricing for agencies & enterprises

## Roadmap

- ✅ **Phase 1** (now) — 12 hero tools + landing + tool registry
- 🔨 **Phase 2** (weeks 5-8) — CapCut-style video editor, AI avatar, voiceover, dubbing
- 📋 **Phase 3** (weeks 9-12) — Quran reels, salat times, cricket graphics, real estate, all utilities

## License

All rights reserved © 2025 Laar AI.

محبت سے بنایا — Made with love in Pakistan.
