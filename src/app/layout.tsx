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
    default: "Laar AI — The all-in-one AI toolkit",
    template: "%s · Laar AI",
  },
  description:
    "60+ professional AI tools for writing, image generation, audio, video, documents, and developers. Free forever.",
  keywords: [
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
    title: "Laar AI — The all-in-one AI toolkit",
    description:
      "60+ professional AI tools for writing, images, audio, video, and code. Free forever.",
    siteName: "Laar AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laar AI — The all-in-one AI toolkit",
    description:
      "60+ professional AI tools for writing, images, audio, video, and code. Free forever.",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
