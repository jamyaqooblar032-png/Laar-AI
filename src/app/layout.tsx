import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://laar-ai.vercel.app"),
  title: {
    default: "Laar AI — A complete AI workspace",
    template: "%s · Laar AI",
  },
  description:
    "A focused AI workspace with 58 production-ready tools for writing, design, audio, video and code. Free forever. No signup.",
  keywords: [
    "AI workspace",
    "AI tools",
    "AI chatbot",
    "AI image generator",
    "AI voiceover",
    "AI subtitles",
    "AI avatar",
    "AI video editor",
    "free AI toolkit",
    "Laar AI",
  ],
  authors: [{ name: "Laar AI" }],
  creator: "Laar AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://laar-ai.vercel.app",
    title: "Laar AI — A complete AI workspace",
    description:
      "58 focused AI tools for writing, design, audio, video and code. Built on the best open models. Free forever.",
    siteName: "Laar AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laar AI — A complete AI workspace",
    description:
      "58 focused AI tools for writing, design, audio, video and code. Built on the best open models. Free forever.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08080c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="page-enter min-h-full flex flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
