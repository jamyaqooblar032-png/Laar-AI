"use client";

import Link from "next/link";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-soft bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="https://github.com/jamyaqooblar032-png/Laar-AI"
            target="_blank"
            rel="noreferrer"
            className="text-fg-muted transition-colors hover:text-fg"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
          <Link href="/tools">
            <Button variant="primary" size="sm">
              <Sparkles className="h-4 w-4" />
              Try Free
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-border-soft transition-all overflow-hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-bg-elevated hover:text-fg"
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
