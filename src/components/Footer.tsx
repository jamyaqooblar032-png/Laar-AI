import Link from "next/link";
import { Mail, Heart, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import {
  GithubIcon,
  TwitterIcon,
  InstagramIcon,
} from "./icons/BrandIcons";
import { CATEGORIES } from "@/lib/tools";

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "All Tools", href: "/tools" },
    { label: "Pricing", href: "/pricing" },
    { label: "Roadmap", href: "/about#roadmap" },
    { label: "Changelog", href: "/about#changelog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/about#contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Resources: [
    { label: "Blog (soon)", href: "#" },
    { label: "Tutorials (soon)", href: "#" },
    { label: "API Docs (soon)", href: "#" },
    { label: "Status", href: "/about#status" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border-soft bg-bg-soft mt-24 overflow-hidden">
      {/* Decorative gradient ribbon */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div
          className="blob blob-2"
          style={{
            top: "-20%",
            left: "5%",
            width: "320px",
            height: "320px",
          }}
        />
        <div
          className="blob blob-3"
          style={{
            top: "-20%",
            right: "5%",
            width: "320px",
            height: "320px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Logo size="lg" />
            <p className="mt-5 max-w-xs text-sm text-fg-muted leading-relaxed">
              Pakistan ka pehla all-in-one AI toolkit. 80+ tools jo aap ki
              zubaan samajhte hain — Urdu, Roman Urdu, English.
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-bg-card/60 px-3 py-1 text-[11px] text-fg-subtle">
              <MapPin className="h-3 w-3 text-primary" />
              Karachi · Lahore · Islamabad · Pakistan
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  href: "https://github.com/jamyaqooblar032-png/Laar-AI",
                  label: "GitHub",
                  Icon: GithubIcon,
                },
                { href: "#", label: "Twitter", Icon: TwitterIcon },
                { href: "#", label: "Instagram", Icon: InstagramIcon },
                {
                  href: "mailto:hello@laarai.app",
                  label: "Email",
                  Icon: Mail,
                },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-soft bg-bg-card text-fg-subtle transition-all hover:border-primary/40 hover:text-primary hover:scale-110 hover:shadow-[0_0_18px_-4px_rgba(16,185,129,0.5)]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">
                {heading}
              </h4>
              <ul className="mt-5 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      <span className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">
              Categories
            </h4>
            <ul className="mt-5 space-y-2.5">
              {Object.entries(CATEGORIES)
                .slice(0, 6)
                .map(([key, cat]) => (
                  <li key={key}>
                    <Link
                      href={`/tools?category=${key}`}
                      className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      <span className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                      {cat.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-soft pt-8 md:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-fg-subtle">
            © {new Date().getFullYear()} Laar AI · Made in Pakistan with{" "}
            <Heart className="inline h-3 w-3 text-rose-500 fill-rose-500 animate-pulse" />
          </p>
          <p className="text-xs text-fg-subtle">
            Built for creators, students, businesses, and dreamers.
          </p>
        </div>
      </div>
    </footer>
  );
}
