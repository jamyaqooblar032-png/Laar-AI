import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-noto-nastaliq",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laar-ai.vercel.app"),
  title: {
    default: "Laar AI — Pakistan ka All-in-One AI Toolkit",
    template: "%s · Laar AI",
  },
  description:
    "AI tools jo aap ki zubaan samajhte hain. Chatbot, image gen, captions, video editor, avatar, voiceover, Roman Urdu → Nastaliq, aur 60+ tools — sab ek jagah, free.",
  keywords: [
    "AI tools",
    "Urdu AI",
    "Pakistani AI",
    "AI image generator",
    "AI chatbot",
    "Urdu subtitles",
    "Roman Urdu to Urdu",
    "AI avatar",
    "video editor",
    "Laar AI",
  ],
  authors: [{ name: "Laar AI" }],
  creator: "Laar AI",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://laar-ai.vercel.app",
    title: "Laar AI — Pakistan ka All-in-One AI Toolkit",
    description:
      "60+ AI tools that speak your language. Built for Pakistani creators.",
    siteName: "Laar AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laar AI — Pakistan ka All-in-One AI Toolkit",
    description:
      "60+ AI tools that speak your language. Built for Pakistani creators.",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${nastaliq.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
