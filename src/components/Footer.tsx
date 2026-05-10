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
    <footer className="border-t border-border-soft bg-bg-soft mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-fg-muted leading-relaxed">
              Pakistan ka pehla all-in-one AI toolkit. 80+ tools jo aap ki zubaan samajhte hain — Urdu, Roman Urdu, English.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="https://github.com/jamyaqooblar032-png/Laar-AI"
                target="_blank"
                rel="noreferrer"
                className="text-fg-subtle transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-fg-subtle transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-fg-subtle transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@laarai.app"
                className="text-fg-subtle transition-colors hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                {heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
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
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              Categories
            </h4>
            <ul className="mt-4 space-y-2.5">
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-soft pt-8 md:flex-row">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} Laar AI · Made in Pakistan with{" "}
            <span className="text-primary">love</span>
          </p>
          <p className="text-xs text-fg-subtle">
            Built for creators, students, businesses, and dreamers.
          </p>
        </div>
      </div>
    </footer>
  );
}
