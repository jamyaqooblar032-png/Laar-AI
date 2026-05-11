"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { GithubIcon } from "./icons/BrandIcons";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/tools", label: "All Tools" },
  { href: "/#categories", label: "Categories" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border-soft bg-bg/85 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent bg-bg/30 backdrop-blur-md"
      )}
    >
      {/* Scroll progress bar */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary via-cyan-400 to-purple-400 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="https://github.com/jamyaqooblar032-png/Laar-AI"
            target="_blank"
            rel="noreferrer"
            className="text-fg-muted transition-all hover:text-fg hover:scale-110"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
          <Link href="/tools">
            <Button variant="primary" size="sm" className="magnetic">
              <Sparkles className="h-4 w-4" />
              Try Free
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-bg-elevated transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-border-soft transition-all duration-300 overflow-hidden glass-strong",
          open ? "max-h-96" : "max-h-0 border-t-transparent"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm text-fg-muted hover:bg-bg-elevated hover:text-fg transition-colors",
                open && "animate-fade-up"
              )}
              style={open ? { animationDelay: `${i * 40}ms` } : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/tools" onClick={() => setOpen(false)} className="mt-2">
            <Button variant="primary" size="sm" className="w-full">
              <Sparkles className="h-4 w-4" />
              Try Free
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
