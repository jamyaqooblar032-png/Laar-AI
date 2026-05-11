"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { ScrollProgress } from "./ScrollProgress";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/tools", label: "Tools" },
  { href: "/#categories", label: "Categories" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border-soft bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-bg/40 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link
            href="/settings"
            className="rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
          >
            Settings
          </Link>
          <Link href="/tools">
            <Button variant="primary" size="sm" className="magnetic">
              Get started
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border-soft bg-bg/95 backdrop-blur-xl transition-all duration-200",
          open ? "max-h-96" : "max-h-0 border-t-transparent"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-fg-muted hover:bg-bg-elevated hover:text-fg transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 text-sm text-fg-muted hover:bg-bg-elevated hover:text-fg transition-colors"
          >
            Settings
          </Link>
          <Link href="/tools" onClick={() => setOpen(false)} className="mt-2">
            <Button variant="primary" size="sm" className="w-full">
              Get started
            </Button>
          </Link>
        </nav>
      </div>

      <ScrollProgress />
    </header>
  );
}
