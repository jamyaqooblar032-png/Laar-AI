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
  tagline: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  icon: LucideIcon;
  hero?: boolean;
  badge?: string;
  api?:
    | "groq"
    | "huggingface"
    | "pollinations"
    | "whisper"
    | "elevenlabs"
    | "ffmpeg"
    | "client"
    | "external"
    | "devin";
};

export const CATEGORIES: Record<
  ToolCategory,
  { label: string; description: string; gradient: string }
> = {
  text: {
    label: "Text & Writing",
    description: "Chatbot, scripts, captions, translation",
    gradient: "from-indigo-500 to-indigo-400",
  },
  image: {
    label: "Image",
    description: "Generate, enhance, edit images with AI",
    gradient: "from-indigo-500 to-violet-500",
  },
  audio: {
    label: "Audio & Voice",
    description: "TTS, transcription, voice cloning, music",
    gradient: "from-indigo-500 to-sky-500",
  },
  video: {
    label: "Video",
    description: "Editor, captions, avatar, generation",
    gradient: "from-indigo-500 to-fuchsia-500",
  },
  document: {
    label: "Documents",
    description: "PDF tools, summarize, chat with docs",
    gradient: "from-indigo-500 to-amber-500",
  },
  developer: {
    label: "Developer",
    description: "Code, SQL, regex, README generators",
    gradient: "from-indigo-500 to-purple-500",
  },
  pakistani: {
    label: "Regional",
    description: "Urdu, Quran, salat times, local content",
    gradient: "from-indigo-500 to-emerald-500",
  },
  utility: {
    label: "Utilities",
    description: "QR codes, calculators, converters",
    gradient: "from-indigo-500 to-slate-500",
  },
};

export const TOOLS: Tool[] = [
  // ============ TEXT / WRITING ============
  {
    slug: "chatbot",
    name: "AI Chatbot",
    tagline: "Conversational AI in your language",
    description:
      "A multilingual assistant that understands English, Urdu, Hindi, Arabic and 100+ more languages. Ask questions, brainstorm, draft anything.",
    category: "text",
    status: "active",
    icon: MessageCircle,
    hero: true,
    api: "groq",
  },
  {
    slug: "script-generator",
    name: "Reels & Shorts Script Generator",
    tagline: "Viral hooks and scripts",
    description:
      "Attention-grabbing hooks and full scripts for TikTok, Reels and YouTube Shorts in your preferred language.",
    category: "text",
    status: "active",
    icon: PenTool,
    hero: true,
    api: "groq",
  },
  {
    slug: "translator",
    name: "AI Translator",
    tagline: "120+ languages",
    description:
      "Fast, natural translation across English, Urdu, Hindi, Arabic, Punjabi and 100+ more languages.",
    category: "text",
    status: "active",
    icon: Languages,
    hero: true,
    api: "groq",
  },
  {
    slug: "roman-to-urdu",
    name: "Roman Urdu → Nastaliq",
    tagline: "Type Roman, get Nastaliq",
    description:
      "Type Urdu in English letters and get clean Nastaliq script back. Perfect for reels, posts and captions.",
    category: "pakistani",
    status: "active",
    icon: Type,
    hero: true,
    api: "groq",
    badge: "Regional",
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    tagline: "Trending tags for any niche",
    description:
      "Drop your topic and get niche-specific viral hashtags for Instagram, TikTok and Twitter.",
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
      "Enter your video topic and get 10+ click-worthy title options to choose from.",
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
      "Give it a photo or topic — get high-performing captions for Instagram, Facebook and Twitter, complete with emojis.",
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
      "Give a topic, get a 500–2000 word, SEO-friendly blog post written for you.",
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
      "Paste any article or text and instantly get a concise summary plus the key takeaways.",
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
      "Plagiarism-free rewriting with tone control — formal, casual, persuasive, anything you need.",
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
      "Job applications, business emails, complaints, leave requests — written for you in seconds.",
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
      "Share your info and get a properly formatted CV — cover letter included.",
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
      "Paste a job description, add your CV details and get a tailored cover letter back.",
    category: "text",
    status: "active",
    icon: FileText,
    api: "groq",
  },
  {
    slug: "story-generator",
    name: "Story Generator",
    tagline: "Short stories on demand",
    description:
      "Pick a genre — romance, horror, motivational, kids — and get a full short story in English or Urdu.",
    category: "text",
    status: "active",
    icon: BookOpen,
    api: "groq",
  },
  {
    slug: "urdu-poetry",
    name: "Urdu Poetry / Shayari Generator",
    tagline: "Mir, Ghalib, Faiz style",
    description:
      "Provide a topic or mood and generate Urdu shayari — ghazal, nazm or qata — in the style of famous poets.",
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
      "Give your brand name and niche and get a list of viral slogans and taglines.",
    category: "text",
    status: "active",
    icon: Megaphone,
    api: "groq",
  },
  {
    slug: "joke-generator",
    name: "Joke Generator",
    tagline: "Clean humour, on tap",
    description:
      "Family-safe jokes, one-liners and local-style humour for any context.",
    category: "text",
    status: "active",
    icon: Smile,
    api: "groq",
  },
  {
    slug: "quote-generator",
    name: "Quote Generator",
    tagline: "Inspirational quotes",
    description:
      "Generate quotes on any topic — motivation, life, love, success.",
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
      "Tell us your niche and style and get creative usernames for Instagram, TikTok and more.",
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
      "Generate 20+ ideas for content, business, projects — whatever you're working on.",
    category: "text",
    status: "active",
    icon: Lightbulb,
    api: "groq",
  },
  {
    slug: "ai-tutor",
    name: "AI Tutor",
    tagline: "Homework and concepts",
    description:
      "Maths, physics, biology, English — ask a question and get a step-by-step explanation.",
    category: "text",
    status: "active",
    icon: GraduationCap,
  },

  // ============ IMAGE ============
  {
    slug: "image-generator",
    name: "AI Image Generator",
    tagline: "Text to realistic images",
    description:
      "Describe what you want and generate professional images with FLUX / SDXL. Free and unlimited.",
    category: "image",
    status: "active",
    icon: ImageIcon,
    hero: true,
    api: "pollinations",
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    tagline: "One-click transparent PNG",
    description:
      "Upload a photo and instantly remove the background — perfect for products, profiles and designs.",
    category: "image",
    status: "active",
    icon: Eraser,
    hero: true,
    api: "huggingface",
  },
  {
    slug: "image-upscaler",
    name: "Image Upscaler",
    tagline: "Low-res to HD",
    description:
      "Upscale blurry images to 2x or 4x sharpness with Real-ESRGAN.",
    category: "image",
    status: "active",
    icon: Maximize2,
    hero: true,
    api: "huggingface",
  },
  {
    slug: "photo-enhancer",
    name: "Photo Enhancer",
    tagline: "Old photos, restored",
    description:
      "Enhance old, blurry photos with face restoration and a clarity boost.",
    category: "image",
    status: "coming-soon",
    icon: Sparkles,
  },
  {
    slug: "photo-colorizer",
    name: "Photo Colorizer",
    tagline: "B&W to colour",
    description:
      "Bring black-and-white photos back to life by colourising them with AI.",
    category: "image",
    status: "coming-soon",
    icon: PaintBucket,
  },
  {
    slug: "logo-generator",
    name: "Logo Generator",
    tagline: "AI brand logos",
    description:
      "Provide a brand name and niche and get multiple professional logo options — SVG export included.",
    category: "image",
    status: "active",
    icon: Sparkles,
  },
  {
    slug: "thumbnail-maker",
    name: "Thumbnail Maker",
    tagline: "YouTube and Instagram",
    description:
      "Create click-worthy thumbnails for YouTube, Instagram and Facebook with templates plus AI.",
    category: "image",
    status: "active",
    icon: FileImage,
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    tagline: "Trending memes",
    description:
      "Trending meme templates and custom text in any language.",
    category: "image",
    status: "active",
    icon: Smile,
  },
  {
    slug: "sticker-generator",
    name: "AI Sticker Generator",
    tagline: "WhatsApp / iMessage stickers",
    description:
      "Describe a sticker idea and get back a transparent-PNG sticker pack.",
    category: "image",
    status: "active",
    icon: Sticker,
  },
  {
    slug: "avatar-generator",
    name: "Profile Pic Generator",
    tagline: "AI avatars",
    description:
      "Generate cool profile pictures in anime, realistic and cartoon styles.",
    category: "image",
    status: "active",
    icon: UserCircle,
  },
  {
    slug: "wallpaper-generator",
    name: "AI Wallpaper Generator",
    tagline: "Phone and desktop wallpapers",
    description:
      "Describe a scene and generate HD or 4K wallpapers for phone, laptop or tablet.",
    category: "image",
    status: "active",
    icon: Wallpaper,
  },
  {
    slug: "ocr",
    name: "Image to Text (OCR)",
    tagline: "Extract text from images",
    description:
      "Pull text out of photos with Urdu and English support — receipts, screenshots, books.",
    category: "image",
    status: "coming-soon",
    icon: ScanText,
  },
  {
    slug: "color-palette",
    name: "Color Palette Extractor",
    tagline: "Photo to palette",
    description:
      "Upload an image and extract the dominant colours and palette codes (HEX, RGB).",
    category: "image",
    status: "active",
    icon: Palette,
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Lossless compression",
    description:
      "Compress JPG and PNG files without losing quality — perfect for web and uploads.",
    category: "image",
    status: "active",
    icon: Shapes,
  },

  // ============ AUDIO ============
  {
    slug: "ai-voiceover",
    name: "AI Voiceover (TTS)",
    tagline: "Urdu and English",
    description:
      "Type text and get a natural, human-like voiceover. Multiple voice options.",
    category: "audio",
    status: "active",
    icon: Mic,
    hero: true,
    api: "elevenlabs",
  },
  {
    slug: "transcription",
    name: "Speech to Text",
    tagline: "Audio to text",
    description:
      "Upload a recording, lecture or interview and get accurate text — Urdu and English supported.",
    category: "audio",
    status: "active",
    icon: FileAudio,
    api: "huggingface",
  },
  {
    slug: "voice-cloning",
    name: "Voice Cloning",
    tagline: "Clone your own voice",
    description:
      "Record 30 seconds of your voice, then speak any text in that same voice.",
    category: "audio",
    status: "coming-soon",
    icon: Volume2,
  },
  {
    slug: "music-generator",
    name: "AI Music Generator",
    tagline: "Custom background music",
    description:
      "Describe a mood or genre and generate royalty-free background music.",
    category: "audio",
    status: "coming-soon",
    icon: Music,
  },
  {
    slug: "vocals-remover",
    name: "Vocals Remover (Karaoke)",
    tagline: "Song to instrumental",
    description:
      "Strip vocals from any song and get a clean karaoke-ready instrumental track.",
    category: "audio",
    status: "coming-soon",
    icon: Music2,
  },
  {
    slug: "audio-enhancer",
    name: "Audio Enhancer",
    tagline: "Noise removal",
    description:
      "Remove background noise and boost voice clarity in your recordings.",
    category: "audio",
    status: "coming-soon",
    icon: Headphones,
  },
  {
    slug: "ai-dubbing",
    name: "AI Video Dubbing",
    tagline: "English to Urdu, AI-voiced",
    description:
      "Dub an English video into Urdu with an AI voice and lip-sync.",
    category: "audio",
    status: "coming-soon",
    icon: Volume2,
    badge: "Premium",
  },
  {
    slug: "podcast-generator",
    name: "Podcast Generator",
    tagline: "Script to podcast audio",
    description:
      "Combine a script with multiple voices and get a polished podcast episode.",
    category: "audio",
    status: "coming-soon",
    icon: Mic,
  },

  // ============ VIDEO ============
  {
    slug: "captions",
    name: "Auto Subtitles / Captions",
    tagline: "Animated captions",
    description:
      "Upload a video and get animated, styled, viral-ready subtitles in Urdu or English (Submagic-style).",
    category: "video",
    status: "active",
    icon: Subtitles,
    hero: true,
    api: "huggingface",
  },
  {
    slug: "video-editor",
    name: "Mini Video Editor",
    tagline: "CapCut-style, in browser",
    description:
      "Trim, merge, resize (9:16, 16:9, 1:1), add captions and music — all in the browser.",
    category: "video",
    status: "beta",
    icon: Video,
    hero: true,
    api: "ffmpeg",
  },
  {
    slug: "ai-avatar",
    name: "AI Avatar (Talking Head)",
    tagline: "Photo + script to video",
    description:
      "Give a photo and a script and get a realistic talking-head video back. Free queue, 3 per day.",
    category: "video",
    status: "beta",
    icon: UserCircle,
    hero: true,
    badge: "Beta · Free queue",
  },
  {
    slug: "ai-video-generator",
    name: "AI Video Generator",
    tagline: "Text to video clips",
    description:
      "Describe what you want and generate 5–10 second AI video clips, ready for TikTok and Instagram.",
    category: "video",
    status: "coming-soon",
    icon: Wand2,
  },
  {
    slug: "video-trimmer",
    name: "Video Trimmer / Cutter",
    tagline: "Trim without re-encoding",
    description:
      "Cut exact seconds out of a video without losing quality, powered by FFmpeg.",
    category: "video",
    status: "coming-soon",
    icon: Scissors,
  },
  {
    slug: "video-merger",
    name: "Video Merger",
    tagline: "Multiple clips to one",
    description:
      "Combine multiple videos into one — optional transitions included.",
    category: "video",
    status: "coming-soon",
    icon: Video,
  },
  {
    slug: "video-resizer",
    name: "Video Resizer",
    tagline: "9:16, 16:9, 1:1",
    description:
      "Resize videos for TikTok, YouTube, Instagram Reels and every other platform.",
    category: "video",
    status: "coming-soon",
    icon: Maximize2,
  },
  {
    slug: "video-to-gif",
    name: "Video to GIF",
    tagline: "Convert clips to GIFs",
    description:
      "Turn short clips into GIFs for WhatsApp, chat apps and social.",
    category: "video",
    status: "coming-soon",
    icon: FileImage,
  },
  {
    slug: "slideshow-maker",
    name: "Slideshow Maker",
    tagline: "Photos + music to video",
    description:
      "Combine multiple photos with background music to produce a beautiful slideshow video.",
    category: "video",
    status: "coming-soon",
    icon: ImageIcon,
  },
  {
    slug: "subtitle-translator",
    name: "Subtitle Translator",
    tagline: "Translate any subtitle",
    description:
      "Translate English subtitles to Urdu — or any of 100+ supported languages.",
    category: "video",
    status: "coming-soon",
    icon: Languages,
  },
  {
    slug: "video-summarizer",
    name: "Video Summarizer",
    tagline: "Long video to one minute",
    description:
      "Turn an hour-long video into a one-minute AI summary. Long-form into shorts.",
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
      "Merge multiple PDFs into a single document — and reorder pages as you go.",
    category: "document",
    status: "coming-soon",
    icon: FileText,
  },
  {
    slug: "pdf-splitter",
    name: "PDF Splitter",
    tagline: "Split PDF pages",
    description:
      "Extract specific pages from a large PDF or split every page into its own file.",
    category: "document",
    status: "coming-soon",
    icon: Scissors,
  },
  {
    slug: "pdf-compressor",
    name: "PDF Compressor",
    tagline: "Reduce file size",
    description:
      "Shrink large PDFs without losing quality — perfect for email and chat uploads.",
    category: "document",
    status: "coming-soon",
    icon: Shapes,
  },
  {
    slug: "chat-with-pdf",
    name: "Chat with PDF",
    tagline: "Ask your document anything",
    description:
      "Upload a PDF — book, report, paper — and have AI answer questions about it.",
    category: "document",
    status: "coming-soon",
    icon: FileText,
    badge: "Premium",
  },
  {
    slug: "document-summarizer",
    name: "Document Summarizer",
    tagline: "PDF / DOCX to bullets",
    description:
      "Summarize long documents into clear bullet points in English or Urdu.",
    category: "document",
    status: "coming-soon",
    icon: FileType,
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    tagline: "Editable .docx",
    description:
      "Convert PDFs into fully editable Word documents.",
    category: "document",
    status: "coming-soon",
    icon: FileText,
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    tagline: "Professional PDF export",
    description:
      "Convert Word, RTF and TXT files into clean PDF documents.",
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
      "Describe what you need in plain English and get working code in Python, JS, Java, SQL and more.",
    category: "developer",
    status: "active",
    icon: Code2,
    api: "groq",
  },
  {
    slug: "code-explainer",
    name: "Code Explainer",
    tagline: "Understand any code",
    description:
      "Paste any snippet and get a clear, line-by-line explanation in simple English.",
    category: "developer",
    status: "active",
    icon: Code2,
    api: "groq",
  },
  {
    slug: "sql-generator",
    name: "SQL Query Generator",
    tagline: "Plain English to SQL",
    description:
      "Ask a question in English and get a working SQL query — optional table schema supported.",
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
      "Describe the pattern you want to match and get a working regex with a clear explanation.",
    category: "developer",
    status: "active",
    icon: Code2,
    api: "groq",
  },
  {
    slug: "readme-generator",
    name: "README Generator",
    tagline: "Project to README.md",
    description:
      "Share your project info and get a polished README with badges, sections and examples.",
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
      "Pretty-print, validate and fix JSON — all in one place.",
    category: "developer",
    status: "active",
    icon: Code2,
  },

  // ============ REGIONAL ============
  {
    slug: "salat-times",
    name: "Salat / Prayer Times",
    tagline: "Local prayer times",
    description:
      "Pick your city and get accurate Fajr, Dhuhr, Asr, Maghrib and Isha times.",
    category: "pakistani",
    status: "active",
    icon: Calendar,
  },
  {
    slug: "qibla-direction",
    name: "Qibla Compass",
    tagline: "Qibla direction finder",
    description:
      "Find the exact qibla direction from your location, GPS-based.",
    category: "pakistani",
    status: "coming-soon",
    icon: Compass,
  },
  {
    slug: "islamic-calendar",
    name: "Islamic Calendar",
    tagline: "Hijri dates and events",
    description:
      "Hijri date converter, Islamic events and a Ramadan calendar.",
    category: "pakistani",
    status: "coming-soon",
    icon: Calendar,
  },
  {
    slug: "quran-reel-maker",
    name: "Quran Ayat Reel Maker",
    tagline: "Beautiful Quran reels",
    description:
      "Pick an ayat, add an Urdu or English translation and a nasheed background, and export a polished reel.",
    category: "pakistani",
    status: "coming-soon",
    icon: BookOpen,
    badge: "Regional",
  },
  {
    slug: "wedding-invite",
    name: "Wedding Invitation Maker",
    tagline: "Mehndi, baraat, valima",
    description:
      "Animated wedding invitation videos — names, dates and venue, ready to share.",
    category: "pakistani",
    status: "coming-soon",
    icon: Heart,
    badge: "Regional",
  },
  {
    slug: "real-estate-reel",
    name: "Real Estate Reel Maker",
    tagline: "Property videos, fast",
    description:
      "Photos, price and location turn into a professional property reel with an Urdu voiceover.",
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
      "Live match scores, player stats and breaking news in clean cricket-style graphics.",
    category: "pakistani",
    status: "coming-soon",
    icon: Trophy,
  },
  {
    slug: "news-graphic",
    name: "News Graphic Generator",
    tagline: "TV channel style",
    description:
      "Breaking-news graphics, lower-thirds and tickers in classic news-channel style.",
    category: "pakistani",
    status: "coming-soon",
    icon: Newspaper,
  },
  {
    slug: "birthday-wishes",
    name: "Birthday Wishes Generator",
    tagline: "Personalized wishes",
    description:
      "Give a name and relation and get a heartfelt birthday message in Urdu or English.",
    category: "pakistani",
    status: "active",
    icon: Cake,
  },
  {
    slug: "eid-wishes",
    name: "Eid / Festival Wishes",
    tagline: "Festival greeting posts",
    description:
      "Custom wishes and design templates for Eid, Independence Day and other festivals.",
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
      "Generate QR codes for URLs, text, WiFi or contacts — with custom colours and logo support.",
    category: "utility",
    status: "active",
    icon: QrCode,
  },
  {
    slug: "password-generator",
    name: "Strong Password Generator",
    tagline: "Secure and memorable",
    description:
      "Customizable length and character sets — strong passwords for any account.",
    category: "utility",
    status: "active",
    icon: Code2,
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    tagline: "PKR ↔ USD ↔ AED",
    description:
      "Live exchange rates across PKR, USD, EUR, AED, SAR, INR and more.",
    category: "utility",
    status: "active",
    icon: Calculator,
  },
  {
    slug: "calculator",
    name: "Loan / EMI / Tax Calculator",
    tagline: "Financial tools",
    description:
      "Home loan EMI, car finance, income tax and zakat — all in one place.",
    category: "utility",
    status: "active",
    icon: Calculator,
  },
  {
    slug: "invoice-generator",
    name: "Invoice / Receipt Maker",
    tagline: "Professional invoices",
    description:
      "Quick invoices for freelancers and small businesses — local tax formats supported.",
    category: "utility",
    status: "coming-soon",
    icon: Receipt,
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    tagline: "Length, weight, temp, more",
    description:
      "Convert metres / feet, kg / lbs, °C / °F, currency — anything you need.",
    category: "utility",
    status: "active",
    icon: Calculator,
  },
  {
    slug: "wedding-wishes",
    name: "Wedding Wishes Generator",
    tagline: "Heartfelt wedding messages",
    description:
      "Warm, personalized wedding messages for the bride, groom and family in Urdu or English.",
    category: "pakistani",
    status: "active",
    icon: Heart,
    api: "groq",
  },
  {
    slug: "condolence-message",
    name: "Condolence Writer",
    tagline: "Respectful condolence notes",
    description:
      "Sincere, respectful condolence messages with appropriate phrases in English, Urdu or Roman Urdu.",
    category: "pakistani",
    status: "active",
    icon: Heart,
    api: "groq",
  },
  {
    slug: "name-generator",
    name: "Baby Name Generator",
    tagline: "Names with meanings",
    description:
      "Ten beautiful baby names with meanings and origin — boy or girl, modern or classical.",
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
      "Top ten interview questions plus model answers in the STAR framework, tailored to the role.",
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
      "Five punchy resume bullets — quantified, action-verb led, STAR-style.",
    category: "text",
    status: "active",
    icon: FileText,
    api: "groq",
  },
  {
    slug: "real-estate-listing",
    name: "Real Estate Listing Writer",
    tagline: "Property descriptions",
    description:
      "Attractive property listings with the amenities and location highlights buyers care about.",
    category: "pakistani",
    status: "active",
    icon: FileText,
    api: "groq",
  },
  {
    slug: "devin-coder",
    name: "Devin Coding Pro (Beta)",
    tagline: "Premium AI engineer · 1 task/day",
    description:
      "Devin AI plans, codes, tests and ships real software autonomously. Premium compute. 1 task / day per user.",
    category: "text",
    status: "beta",
    icon: Code2,
    api: "devin",
  },
];

export const ACTIVE_TOOLS = TOOLS.filter((t) => t.status === "active");
export const BETA_TOOLS = TOOLS.filter((t) => t.status === "beta");
export const COMING_SOON_TOOLS = TOOLS.filter(
  (t) => t.status === "coming-soon"
);
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
