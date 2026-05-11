import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import {
  GithubIcon,
  TwitterIcon,
  InstagramIcon,
} from "./icons/BrandIcons";
import { CATEGORIES } from "@/lib/tools";

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "All tools", href: "/tools" },
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
    { label: "Blog", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "API docs", href: "#" },
    { label: "Status", href: "/about#status" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border-soft bg-bg-soft mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Logo size="lg" />
            <p className="mt-5 max-w-xs text-sm text-fg-muted leading-relaxed">
              A focused AI workspace for writers, designers, developers and
              operators. Built with taste.
            </p>
            <div className="mt-6 flex items-center gap-2">
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-card text-fg-subtle transition-colors hover:border-fg-subtle/40 hover:text-fg"
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
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
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
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-soft pt-8 md:flex-row">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} Laar AI. All rights reserved.
          </p>
          <p className="text-xs text-fg-subtle">
            Built for makers who ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
