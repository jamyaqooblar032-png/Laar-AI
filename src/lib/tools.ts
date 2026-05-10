import {
  MessageCircle,
  Sparkles,
  Image as ImageIcon,
  Subtitles,
  Languages,
  PenTool,
  Type,
  FileText,
  Mic,
  Video,
  UserCircle,
  Wand2,
  Eraser,
  Maximize2,
  Palette,
  Music,
  FileImage,
  ScanText,
  Code2,
  TerminalSquare,
  QrCode,
  Calendar,
  Compass,
  BookOpen,
  Heart,
  Cake,
  Home as HomeIcon,
  Briefcase,
  Newspaper,
  Trophy,
  GraduationCap,
  Calculator,
  Receipt,
  Scissors,
  Music2,
  Gauge,
  Smile,
  PenLine,
  FileType,
  FileAudio,
  Volume2,
  Headphones,
  Quote,
  Shapes,
  Sticker,
  Wallpaper,
  RotateCw,
  PaintBucket,
  PartyPopper,
  Megaphone,
  Hash,
  ListOrdered,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type ToolStatus = "active" | "beta" | "coming-soon";

export type ToolCategory =
  | "text"
  | "image"
  | "audio"
  | "video"
  | "document"
  | "developer"
  | "pakistani"
  | "utility";

export type Tool = {
  slug: string;
  name: string;
  nameUr?: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  icon: LucideIcon;
  hero?: boolean;
  badge?: string;
  api?: "groq" | "huggingface" | "pollinations" | "whisper" | "elevenlabs" | "ffmpeg" | "client" | "external";
};

export const CATEGORIES: Record<
  ToolCategory,
  { label: string; description: string; gradient: string }
> = {
  text: {
    label: "Text & Writing",
    description: "AI chatbot, scripts, captions, translation",
    gradient: "from-emerald-500 to-cyan-500",
  },
  image: {
    label: "Image",
    description: "Generate, enhance, edit images with AI",
    gradient: "from-purple-500 to-pink-500",
  },
  audio: {
    label: "Audio & Voice",
    description: "TTS, transcription, voice cloning, music",
    gradient: "from-blue-500 to-indigo-500",
  },
  video: {
    label: "Video",
    description: "Editor, captions, avatar, generation",
    gradient: "from-rose-500 to-orange-500",
  },
  document: {
    label: "Documents",
    description: "PDF tools, summarize, chat with docs",
    gradient: "from-amber-500 to-yellow-500",
  },
  developer: {
    label: "Developer",
    description: "Code, SQL, regex, README generators",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  pakistani: {
    label: "Pakistani / Urdu",
    description: "Roman → Nastaliq, Quran, salat, poetry",
    gradient: "from-green-500 to-emerald-500",
  },
  utility: {
    label: "Utilities",
    description: "QR codes, calculators, converters",
    gradient: "from-slate-500 to-zinc-500",
  },
};

export const TOOLS: Tool[] = [
  // ============ TEXT / WRITING ============
  {
    slug: "chatbot",
    name: "AI Chatbot",
    nameUr: "اے آئی چیٹ بوٹ",
    tagline: "Apki zubaan mein jawab",
    description:
      "Urdu, Roman Urdu, English — sab samajhne wala AI assistant. Sawal puchen, kahaani likhwayein, mashwara lein — sab kuch.",
    category: "text",
    status: "active",
    icon: MessageCircle,
    hero: true,
    api: "groq",
  },
  {
    slug: "script-generator",
    name: "Reels & Shorts Script Generator",
    nameUr: "اسکرپٹ جنریٹر",
    tagline: "Viral hooks aur scripts",
    description:
      "TikTok, Reels, YouTube Shorts ke liye attention-grabbing hooks aur full scripts — Urdu ya English mein.",
    category: "text",
    status: "active",
    icon: PenTool,
    hero: true,
    api: "groq",
  },
  {
    slug: "translator",
    name: "AI Translator",
    nameUr: "ترجمہ کار",
    tagline: "120+ languages",
    description:
      "Tezi se aur natural translation — English, Urdu, Hindi, Arabic, Punjabi aur 100+ aur zubanen.",
    category: "text",
    status: "active",
    icon: Languages,
    hero: true,
    api: "groq",
  },
  {
    slug: "roman-to-urdu",
    name: "Roman Urdu → Nastaliq",
    nameUr: "نستعلیق میں تبدیلی",
    tagline: "Type Roman, get Nastaliq",
    description:
      "'kya haal hai' likho — اردو نستعلیق mein milega. Reels, posts, captions ke liye perfect.",
    category: "pakistani",
    status: "active",
    icon: Type,
    hero: true,
    api: "groq",
    badge: "Pakistan Special",
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    tagline: "Trending tags for any niche",
    description:
      "Apni post ka topic do, niche-specific viral hashtags milenge. Instagram, TikTok, Twitter ke liye.",
    category: "text",
    status: "active",
    icon: Hash,
    api: "groq",
  },
  {
    slug: "youtube-title",
    name: "YouTube Title Generator",
    tagline: "Click-worthy titles",
    description:
      "Apni video ka topic likho, AI 10+ click-worthy title options de ga — Urdu ya English mein.",
    category: "text",
    status: "active",
    icon: Sparkles,
    api: "groq",
  },
  {
    slug: "caption-writer",
    name: "Social Media Caption Writer",
    tagline: "Captions that convert",
    description:
      "Photo ya topic do — Instagram, Facebook, Twitter ke liye perfect captions with emojis.",
    category: "text",
    status: "active",
    icon: PenLine,
    api: "groq",
  },
  {
    slug: "blog-writer",
    name: "Blog Post Writer",
    tagline: "Long-form content in minutes",
    description:
      "Topic do, AI 500-2000 word blog post likh dega. SEO friendly. Urdu ya English mein.",
    category: "text",
    status: "active",
    icon: FileText,
    api: "groq",
  },
  {
    slug: "summarizer",
    name: "Article Summarizer",
    tagline: "Long article → bullet points",
    description:
      "Koi bhi article ya text paste karo — turant key points aur summary milegi.",
    category: "text",
    status: "active",
    icon: ListOrdered,
    api: "groq",
  },
  {
    slug: "paraphraser",
    name: "Paraphraser / Rewriter",
    tagline: "Same meaning, different words",
    description:
      "Plagiarism free re-writing. Tone change kar do — formal, casual, persuasive — kuch bhi.",
    category: "text",
    status: "active",
    icon: RotateCw,
    api: "groq",
  },
  {
    slug: "email-writer",
    name: "Email & Letter Writer",
    tagline: "Professional emails in seconds",
    description:
      "Job application, business email, complaint, leave request — sab kuch AI likh dega.",
    category: "text",
    status: "active",
    icon: PenTool,
    api: "groq",
  },
  {
    slug: "resume-builder",
    name: "Resume / CV Builder",
    tagline: "ATS-friendly resumes",
    description:
      "Apni info do, AI proper formatted CV banayega. Cover letter bhi mil jaye ga.",
    category: "text",
    status: "active",
    icon: Briefcase,
    hero: true,
    api: "groq",
  },
  {
    slug: "cover-letter",
    name: "Cover Letter Generator",
    tagline: "Job-winning cover letters",
    description:
      "Job description paste karo + apna CV info do — perfect cover letter milegi.",
    category: "text",
    status: "active",
    icon: FileText,
    api: "groq",
  },
  {
    slug: "story-generator",
    name: "Story / Kahaani Generator",
    tagline: "AI kahaani writer",
    description:
      "Genre choose karo (romance, horror, motivational, kids) — full Urdu ya English kahaani milegi.",
    category: "text",
    status: "active",
    icon: BookOpen,
    api: "groq",
  },
  {
    slug: "urdu-poetry",
    name: "Urdu Poetry / Shayari Generator",
    nameUr: "اردو شاعری",
    tagline: "Mir, Ghalib, Faiz style",
    description:
      "Topic ya mood do — Urdu shayari (ghazal, nazm, qata) generate karo. Famous shaaeron ke style mein.",
    category: "pakistani",
    status: "active",
    icon: Quote,
    api: "groq",
  },
  {
    slug: "slogan-generator",
    name: "Slogan / Tagline Generator",
    tagline: "Catchy brand slogans",
    description:
      "Apne brand ka name + niche batao — viral slogans aur taglines milengi.",
    category: "text",
    status: "active",
    icon: Megaphone,
    api: "groq",
  },
  {
    slug: "joke-generator",
    name: "Joke / Lateefa Generator",
    tagline: "Halal hasi mazaak",
    description:
      "Pakistani style jokes, lateefe, one-liners. Family safe option bhi.",
    category: "text",
    status: "active",
    icon: Smile,
    api: "groq",
  },
  {
    slug: "quote-generator",
    name: "Quote / Aqwal Generator",
    tagline: "Inspirational quotes",
    description:
      "Topic do — motivational, life, love, success — har topic pe quotes generate karo.",
    category: "text",
    status: "active",
    icon: Quote,
    api: "groq",
  },
  {
    slug: "username-generator",
    name: "Username Generator",
    tagline: "Unique handles",
    description:
      "Niche aur style do — Instagram/TikTok ke liye creative usernames milenge.",
    category: "text",
    status: "active",
    icon: UserCircle,
    api: "groq",
  },
  {
    slug: "idea-brainstormer",
    name: "Idea Brainstormer",
    tagline: "AI brainstorm partner",
    description:
      "Content ideas, business ideas, project ideas — AI 20+ ideas generate karega.",
    category: "text",
    status: "active",
    icon: Lightbulb,
    api: "groq",
  },
  {
    slug: "ai-tutor",
    name: "AI Tutor (Padhai Helper)",
    tagline: "Homework + concepts in Urdu",
    description:
      "Math, Physics, Biology, English — sawal puchen, AI Urdu mein step-by-step samjhayega.",
    category: "text",
    status: "active",
    icon: GraduationCap,
  },

  // ============ IMAGE ============
  {
    slug: "image-generator",
    name: "AI Image Generator",
    nameUr: "اے آئی تصویر ساز",
    tagline: "Text se realistic images",
    description:
      "Apni description do — FLUX/SDXL se professional images generate karo. Free, unlimited.",
    category: "image",
    status: "active",
    icon: ImageIcon,
    hero: true,
    api: "pollinations",
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    tagline: "1-click transparent PNG",
    description:
      "Photo upload karo, AI background hata dega — perfect for products, profiles, designs.",
    category: "image",
    status: "active",
    icon: Eraser,
    hero: true,
    api: "huggingface",
  },
  {
    slug: "image-upscaler",
    name: "Image Upscaler",
    tagline: "Low-res → HD",
    description:
      "Blurry image ko 2x, 4x sharpness pe upscale karo. Real-ESRGAN powered.",
    category: "image",
    status: "active",
    icon: Maximize2,
    hero: true,
    api: "huggingface",
  },
  {
    slug: "photo-enhancer",
    name: "Photo Enhancer",
    tagline: "Old photos → restored",
    description:
      "Purani aur dhundli photos enhance karo. Face restoration + clarity boost.",
    category: "image",
    status: "coming-soon",
    icon: Sparkles,
  },
  {
    slug: "photo-colorizer",
    name: "Photo Colorizer",
    tagline: "B&W → color",
    description:
      "Black & white photos ko AI se rangon mein convert karo. Old family photos perfect karo.",
    category: "image",
    status: "coming-soon",
    icon: PaintBucket,
  },
  {
    slug: "logo-generator",
    name: "Logo Generator",
    tagline: "AI brand logos",
    description:
      "Brand name + niche do — multiple professional logo options milengi. SVG export bhi.",
    category: "image",
    status: "active",
    icon: Sparkles,
  },
  {
    slug: "thumbnail-maker",
    name: "Thumbnail Maker",
    tagline: "YouTube + Insta",
    description:
      "Click-worthy thumbnails for YouTube, Insta posts, Facebook. Templates + AI.",
    category: "image",
    status: "active",
    icon: FileImage,
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    tagline: "Pakistani memes",
    description:
      "Trending Pakistani templates + custom text. Roman Urdu support.",
    category: "image",
    status: "active",
    icon: Smile,
  },
  {
    slug: "sticker-generator",
    name: "AI Sticker Generator",
    tagline: "WhatsApp / iMessage stickers",
    description:
      "Apna idea do — transparent PNG sticker pack ban jayega.",
    category: "image",
    status: "active",
    icon: Sticker,
  },
  {
    slug: "avatar-generator",
    name: "Profile Pic Generator",
    tagline: "AI avatars",
    description:
      "Cool profile pictures generate karo — anime, realistic, cartoon styles.",
    category: "image",
    status: "active",
    icon: UserCircle,
  },
  {
    slug: "wallpaper-generator",
    name: "AI Wallpaper Generator",
    tagline: "Phone & desktop wallpapers",
    description:
      "Description do, HD 4K wallpapers banao — phone, laptop, ya tablet ke liye.",
    category: "image",
    status: "active",
    icon: Wallpaper,
  },
  {
    slug: "ocr",
    name: "Image to Text (OCR)",
    tagline: "Extract text from images",
    description:
      "Photo se text nikalo — Urdu + English support. Receipts, screenshots, books.",
    category: "image",
    status: "coming-soon",
    icon: ScanText,
  },
  {
    slug: "color-palette",
    name: "Color Palette Extractor",
    tagline: "Photo → palette",
    description:
      "Image upload karo, dominant colors aur palette codes (HEX, RGB) milenge.",
    category: "image",
    status: "active",
    icon: Palette,
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Lossless compression",
    description:
      "JPG/PNG ko chhota karo bina quality khoye. Perfect for web aur uploads.",
    category: "image",
    status: "active",
    icon: Shapes,
  },

  // ============ AUDIO ============
  {
    slug: "ai-voiceover",
    name: "AI Voiceover (TTS)",
    nameUr: "اے آئی آواز",
    tagline: "Urdu + English",
    description:
      "Text type karo, natural human-like voice mein audio milega. Multiple voices.",
    category: "audio",
    status: "active",
    icon: Mic,
    hero: true,
    api: "elevenlabs",
  },
  {
    slug: "transcription",
    name: "Speech-to-Text (Transcription)",
    tagline: "Audio → text",
    description:
      "Recording, lecture, interview upload karo — Urdu/English text mein convert hoga.",
    category: "audio",
    status: "active",
    icon: FileAudio,
    api: "huggingface",
  },
  {
    slug: "voice-cloning",
    name: "Voice Cloning",
    tagline: "Apni awaaz clone karo",
    description:
      "30 sec apni awaaz record karo — phir koi bhi text usi awaaz mein bolo.",
    category: "audio",
    status: "coming-soon",
    icon: Volume2,
  },
  {
    slug: "music-generator",
    name: "AI Music Generator",
    tagline: "Custom background music",
    description:
      "Mood ya genre describe karo — AI free royalty music generate karega.",
    category: "audio",
    status: "coming-soon",
    icon: Music,
  },
  {
    slug: "vocals-remover",
    name: "Vocals Remover (Karaoke)",
    tagline: "Song → instrumental",
    description:
      "Kisi bhi song se vocals nikal do — perfect karaoke instrumental milega.",
    category: "audio",
    status: "coming-soon",
    icon: Music2,
  },
  {
    slug: "audio-enhancer",
    name: "Audio Enhancer",
    tagline: "Noise removal",
    description:
      "Background noise hatao, voice clarity barhao — recordings ke liye.",
    category: "audio",
    status: "coming-soon",
    icon: Headphones,
  },
  {
    slug: "ai-dubbing",
    name: "AI Video Dubbing",
    tagline: "English → Urdu in AI voice",
    description:
      "English video lo, AI Urdu mein dub kar dega — lip-sync ke saath.",
    category: "audio",
    status: "coming-soon",
    icon: Volume2,
    badge: "Premium",
  },
  {
    slug: "podcast-generator",
    name: "Podcast Generator",
    tagline: "Script → podcast audio",
    description:
      "Script + multiple voices = professional podcast episode ready.",
    category: "audio",
    status: "coming-soon",
    icon: Mic,
  },

  // ============ VIDEO ============
  {
    slug: "captions",
    name: "Auto Subtitles / Captions",
    nameUr: "آٹومیٹک سب ٹائٹل",
    tagline: "Animated Urdu captions",
    description:
      "Video upload karo, AI Urdu/English captions banayega — animated, styled, viral-ready (Submagic style).",
    category: "video",
    status: "active",
    icon: Subtitles,
    hero: true,
    api: "huggingface",
  },
  {
    slug: "video-editor",
    name: "Mini Video Editor",
    tagline: "CapCut-style in browser",
    description:
      "Trim, merge, resize (9:16, 16:9, 1:1), add captions, music. Browser mein chalta hai.",
    category: "video",
    status: "beta",
    icon: Video,
    hero: true,
    api: "ffmpeg",
  },
  {
    slug: "ai-avatar",
    name: "AI Avatar (Talking Head)",
    nameUr: "اے آئی اواتار",
    tagline: "Photo + script → real video",
    description:
      "Apni photo + Urdu/English script — AI realistic talking video banayega. Free 3/day, queue-based.",
    category: "video",
    status: "beta",
    icon: UserCircle,
    hero: true,
    badge: "Beta · Free queue",
  },
  {
    slug: "ai-video-generator",
    name: "AI Video Generator",
    tagline: "Text → video clips",
    description:
      "Description do — 5-10 second AI video clips banao (TikTok, Insta ready).",
    category: "video",
    status: "coming-soon",
    icon: Wand2,
  },
  {
    slug: "video-trimmer",
    name: "Video Trimmer / Cutter",
    tagline: "Trim without re-encoding",
    description:
      "Video se exact second cut karo bina quality khoye. FFmpeg powered.",
    category: "video",
    status: "coming-soon",
    icon: Scissors,
  },
  {
    slug: "video-merger",
    name: "Video Merger",
    tagline: "Multiple clips → 1",
    description:
      "Multiple videos ko ek mein combine karo — transitions ke saath bhi.",
    category: "video",
    status: "coming-soon",
    icon: Video,
  },
  {
    slug: "video-resizer",
    name: "Video Resizer",
    tagline: "9:16, 16:9, 1:1",
    description:
      "TikTok, YouTube, Instagram Reels — sab platforms ke liye resize karo.",
    category: "video",
    status: "coming-soon",
    icon: Maximize2,
  },
  {
    slug: "video-to-gif",
    name: "Video to GIF",
    tagline: "Convert clips to GIFs",
    description:
      "Short clips ko GIF mein convert karo — WhatsApp, social ke liye.",
    category: "video",
    status: "coming-soon",
    icon: FileImage,
  },
  {
    slug: "slideshow-maker",
    name: "Slideshow Maker",
    tagline: "Photos + music → video",
    description:
      "Multiple photos + background music = beautiful slideshow video.",
    category: "video",
    status: "coming-soon",
    icon: ImageIcon,
  },
  {
    slug: "subtitle-translator",
    name: "Subtitle Translator",
    tagline: "Translate any subtitle",
    description:
      "English subtitles to Urdu, ya kisi bhi 100+ language mein translate karo.",
    category: "video",
    status: "coming-soon",
    icon: Languages,
  },
  {
    slug: "video-summarizer",
    name: "Video Summarizer",
    tagline: "Long video → 1-min",
    description:
      "1 hour video ki AI summary 1 minute mein. Long-form se Shorts.",
    category: "video",
    status: "coming-soon",
    icon: Gauge,
  },

  // ============ DOCUMENTS ============
  {
    slug: "pdf-merger",
    name: "PDF Merger",
    tagline: "Combine multiple PDFs",
    description:
      "Multiple PDFs ko ek single PDF mein merge karo — order set kar sakte ho.",
    category: "document",
    status: "coming-soon",
    icon: FileText,
  },
  {
    slug: "pdf-splitter",
    name: "PDF Splitter",
    tagline: "Split PDF pages",
    description:
      "Big PDF se specific pages nikal do, ya har page alag PDF.",
    category: "document",
    status: "coming-soon",
    icon: Scissors,
  },
  {
    slug: "pdf-compressor",
    name: "PDF Compressor",
    tagline: "Reduce file size",
    description:
      "Big PDFs ko chhota karo bina quality khoye. WhatsApp upload ke liye.",
    category: "document",
    status: "coming-soon",
    icon: Shapes,
  },
  {
    slug: "chat-with-pdf",
    name: "Chat with PDF",
    tagline: "AI samjhayega aapka PDF",
    description:
      "PDF upload karo (book, report, paper) — AI sawal answer karega.",
    category: "document",
    status: "coming-soon",
    icon: FileText,
    badge: "Premium",
  },
  {
    slug: "document-summarizer",
    name: "Document Summarizer",
    tagline: "PDF/DOCX → bullets",
    description:
      "Long documents ko AI bullets mein summarize karega — Urdu ya English.",
    category: "document",
    status: "coming-soon",
    icon: FileType,
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    tagline: "Editable .docx",
    description:
      "PDF ko fully editable Word document mein convert karo.",
    category: "document",
    status: "coming-soon",
    icon: FileText,
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    tagline: "Professional PDF export",
    description:
      "Word, RTF, TXT files ko clean PDF mein convert karo.",
    category: "document",
    status: "coming-soon",
    icon: FileText,
  },

  // ============ DEVELOPER ============
  {
    slug: "code-generator",
    name: "AI Code Generator",
    tagline: "30+ languages",
    description:
      "Plain English mein describe karo — AI code likhe ga (Python, JS, Java, SQL, etc.).",
    category: "developer",
    status: "active",
    icon: Code2,
    api: "groq",
  },
  {
    slug: "code-explainer",
    name: "Code Explainer",
    tagline: "Code samjho easy",
    description:
      "Koi code paste karo — AI line-by-line easy English/Urdu mein samjhayega.",
    category: "developer",
    status: "active",
    icon: Code2,
    api: "groq",
  },
  {
    slug: "sql-generator",
    name: "SQL Query Generator",
    tagline: "Plain English → SQL",
    description:
      "Question English mein puchen, AI SQL query likh dega — table schema bhi support.",
    category: "developer",
    status: "active",
    icon: TerminalSquare,
    api: "groq",
  },
  {
    slug: "regex-generator",
    name: "Regex Generator",
    tagline: "AI regex builder",
    description:
      "Describe karo kya match karna hai — perfect regex + explanation milegi.",
    category: "developer",
    status: "active",
    icon: Code2,
    api: "groq",
  },
  {
    slug: "readme-generator",
    name: "README Generator",
    tagline: "Project → README.md",
    description:
      "Project info do — professional README with badges, sections, examples.",
    category: "developer",
    status: "active",
    icon: FileText,
    api: "groq",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    tagline: "Validate, format, minify",
    description:
      "Pretty print, validate, fix JSON — sab kuch.",
    category: "developer",
    status: "active",
    icon: Code2,
  },

  // ============ PAKISTANI / URDU SPECIAL ============
  {
    slug: "salat-times",
    name: "Salat / Prayer Times",
    nameUr: "اوقاتِ نماز",
    tagline: "Apke shehar ke times",
    description:
      "Apna shehar select karo — Fajr, Zuhr, Asr, Maghrib, Isha ke exact times.",
    category: "pakistani",
    status: "active",
    icon: Calendar,
  },
  {
    slug: "qibla-direction",
    name: "Qibla Compass",
    tagline: "Qibla direction finder",
    description:
      "Apni location se Qibla ki exact direction. GPS based.",
    category: "pakistani",
    status: "coming-soon",
    icon: Compass,
  },
  {
    slug: "islamic-calendar",
    name: "Islamic Calendar",
    tagline: "Hijri dates + events",
    description:
      "Hijri date converter, Islamic events, Ramadan calendar.",
    category: "pakistani",
    status: "coming-soon",
    icon: Calendar,
  },
  {
    slug: "quran-reel-maker",
    name: "Quran Ayat Reel Maker",
    tagline: "Beautiful Quran reels",
    description:
      "Ayat select karo + Urdu/English translation + nasheed background = professional Reel.",
    category: "pakistani",
    status: "coming-soon",
    icon: BookOpen,
    badge: "Pakistan Special",
  },
  {
    slug: "wedding-invite",
    name: "Wedding Invitation Maker",
    tagline: "Mehndi, baraat, valima",
    description:
      "Pakistani style animated wedding invitation videos — names, dates, venue.",
    category: "pakistani",
    status: "coming-soon",
    icon: Heart,
    badge: "Pakistan Special",
  },
  {
    slug: "real-estate-reel",
    name: "Real Estate Reel Maker",
    tagline: "Property videos quick",
    description:
      "Photos + price + location → professional property Reel with Urdu voiceover.",
    category: "pakistani",
    status: "coming-soon",
    icon: HomeIcon,
    badge: "B2B",
  },
  {
    slug: "cricket-graphic",
    name: "Cricket Score Graphics",
    tagline: "Match graphics maker",
    description:
      "Live match score, player stats, breaking news — Pakistani cricket-style graphics.",
    category: "pakistani",
    status: "coming-soon",
    icon: Trophy,
  },
  {
    slug: "news-graphic",
    name: "News Graphic Generator",
    tagline: "ARY/Geo style",
    description:
      "Breaking news graphics, lower-thirds, tickers — Pakistani channel style.",
    category: "pakistani",
    status: "coming-soon",
    icon: Newspaper,
  },
  {
    slug: "birthday-wishes",
    name: "Birthday Wishes Generator",
    tagline: "Personalized wishes",
    description:
      "Naam aur relation do — heartfelt birthday message Urdu ya English mein.",
    category: "pakistani",
    status: "active",
    icon: Cake,
  },
  {
    slug: "eid-wishes",
    name: "Eid / Festival Wishes",
    tagline: "Eid Mubarak posts",
    description:
      "Eid, Pakistan Day, Independence Day ke liye custom wishes + design templates.",
    category: "pakistani",
    status: "active",
    icon: PartyPopper,
  },

  // ============ UTILITY ============
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    tagline: "Custom QR codes",
    description:
      "URL, text, WiFi, contact — sab kuch ka QR. Custom colors aur logo support.",
    category: "utility",
    status: "active",
    icon: QrCode,
  },
  {
    slug: "password-generator",
    name: "Strong Password Generator",
    tagline: "Secure & memorable",
    description:
      "Customizable length, special chars — strong passwords for any account.",
    category: "utility",
    status: "active",
    icon: Code2,
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    tagline: "PKR ↔ USD ↔ AED ↔ ...",
    description:
      "Live exchange rates — PKR, USD, EUR, AED, SAR, INR sab.",
    category: "utility",
    status: "active",
    icon: Calculator,
  },
  {
    slug: "calculator",
    name: "Loan / EMI / Tax Calculator",
    tagline: "Pakistani financial tools",
    description:
      "Home loan EMI, car finance, income tax, zakat calculator.",
    category: "utility",
    status: "active",
    icon: Calculator,
  },
  {
    slug: "invoice-generator",
    name: "Invoice / Receipt Maker",
    tagline: "Professional invoices",
    description:
      "Quick invoices for freelancers/business — Pakistani GST format support.",
    category: "utility",
    status: "coming-soon",
    icon: Receipt,
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    tagline: "Length, weight, temp etc",
    description:
      "Meters/feet, kg/lbs, °C/°F, currency — sab convert karo.",
    category: "utility",
    status: "active",
    icon: Calculator,
  },
  {
    slug: "wedding-wishes",
    name: "Wedding Wishes Generator",
    tagline: "Shaadi mubarak messages",
    description:
      "Beautiful Urdu/English shaadi wishes — bride, groom, family ke liye.",
    category: "pakistani",
    status: "active",
    icon: Heart,
    api: "groq",
  },
  {
    slug: "condolence-message",
    name: "Condolence (Taziyat) Writer",
    tagline: "Sincere taziyat messages",
    description:
      "Respectful condolence messages with Islamic phrases — Urdu, Roman Urdu, English.",
    category: "pakistani",
    status: "active",
    icon: Heart,
    api: "groq",
  },
  {
    slug: "name-generator",
    name: "Baby Name Generator",
    tagline: "Muslim baby names + meaning",
    description:
      "10 beautiful Muslim baby names with meanings + origin — boy/girl, modern/classical.",
    category: "pakistani",
    status: "active",
    icon: Sparkles,
    api: "groq",
  },
  {
    slug: "interview-prep",
    name: "Interview Prep Coach",
    tagline: "10 Q&A in STAR format",
    description:
      "Job interview ke liye top 10 questions + STAR-format model answers.",
    category: "text",
    status: "active",
    icon: Briefcase,
    api: "groq",
  },
  {
    slug: "resume-bullet",
    name: "Resume Bullet Writer",
    tagline: "Achievement-focused bullets",
    description:
      "5 punchy resume bullets — quantified, action-verb led, STAR framework.",
    category: "text",
    status: "active",
    icon: FileText,
    api: "groq",
  },
  {
    slug: "real-estate-listing",
    name: "Real Estate Listing Writer",
    tagline: "Property descriptions in Pakistani style",
    description:
      "DHA, Bahria, Karachi, Lahore — attractive property listings with amenities highlights.",
    category: "pakistani",
    status: "active",
    icon: FileText,
    api: "groq",
  },
];

export const ACTIVE_TOOLS = TOOLS.filter((t) => t.status === "active");
export const BETA_TOOLS = TOOLS.filter((t) => t.status === "beta");
export const COMING_SOON_TOOLS = TOOLS.filter((t) => t.status === "coming-soon");
export const HERO_TOOLS = TOOLS.filter((t) => t.hero);

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export const STATS = {
  total: TOOLS.length,
  active: ACTIVE_TOOLS.length + BETA_TOOLS.length,
  comingSoon: COMING_SOON_TOOLS.length,
};
