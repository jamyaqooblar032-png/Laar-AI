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
  Eraser,
  Maximize2,
  Palette,
  Code2,
  TerminalSquare,
  QrCode,
  Calendar,
  BookOpen,
  Heart,
  Cake,
  Briefcase,
  GraduationCap,
  Calculator,
  Smile,
  PenLine,
  FileAudio,
  Quote,
  Shapes,
  Sticker,
  Wallpaper,
  RotateCw,
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
    description: "Voiceover and transcription, multilingual",
    gradient: "from-indigo-500 to-sky-500",
  },
  video: {
    label: "Video",
    description: "Editor, captions and AI avatar",
    gradient: "from-indigo-500 to-fuchsia-500",
  },
  developer: {
    label: "Developer",
    description: "Code, SQL, regex and README helpers",
    gradient: "from-indigo-500 to-purple-500",
  },
  pakistani: {
    label: "Regional",
    description: "Urdu, prayer times and local content",
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
    api: "groq",
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
      "Upscale blurry images to 2x or 4x sharpness with a fast, browser-side enhancer.",
    category: "image",
    status: "active",
    icon: Maximize2,
    hero: true,
    api: "client",
  },
  {
    slug: "logo-generator",
    name: "Logo Generator",
    tagline: "AI brand logos",
    description:
      "Provide a brand name and niche and get multiple professional logo options — ready to download.",
    category: "image",
    status: "active",
    icon: Sparkles,
    api: "pollinations",
  },
  {
    slug: "thumbnail-maker",
    name: "Thumbnail Maker",
    tagline: "YouTube and Instagram",
    description:
      "Create click-worthy thumbnails for YouTube, Instagram and Facebook with AI.",
    category: "image",
    status: "active",
    icon: ImageIcon,
    api: "pollinations",
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    tagline: "Trending memes",
    description:
      "Generate meme images with AI — describe the joke or scene and get a meme back.",
    category: "image",
    status: "active",
    icon: Smile,
    api: "pollinations",
  },
  {
    slug: "sticker-generator",
    name: "AI Sticker Generator",
    tagline: "WhatsApp / iMessage stickers",
    description:
      "Describe a sticker idea and get back a transparent-PNG sticker.",
    category: "image",
    status: "active",
    icon: Sticker,
    api: "pollinations",
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
    api: "pollinations",
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
    api: "pollinations",
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
    api: "client",
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
    api: "client",
  },

  // ============ AUDIO ============
  {
    slug: "ai-voiceover",
    name: "AI Voiceover (TTS)",
    tagline: "Natural voices",
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

  // ============ VIDEO ============
  {
    slug: "captions",
    name: "Auto Subtitles / Captions",
    tagline: "Animated captions",
    description:
      "Upload a video and get animated, styled, viral-ready subtitles in Urdu or English.",
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
    api: "client",
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
    api: "external",
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
    api: "groq",
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
    api: "groq",
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
    api: "client",
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
    api: "client",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    tagline: "Live exchange rates",
    description:
      "Live exchange rates across PKR, USD, EUR, AED, SAR, INR and more.",
    category: "utility",
    status: "active",
    icon: Calculator,
    api: "external",
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
    api: "client",
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
    api: "client",
  },
  {
    slug: "devin-coder",
    name: "Devin Coding Pro",
    tagline: "Premium AI engineer · 1 task/day",
    description:
      "Devin AI plans, codes, tests and ships real software autonomously. Premium compute. 1 task / day per user.",
    category: "developer",
    status: "beta",
    icon: Code2,
    api: "devin",
    badge: "Beta",
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
