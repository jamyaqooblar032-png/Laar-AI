import Link from "next/link";
import { cn } from "@/lib/utils";

const SIZE = {
  sm: { box: "h-7 w-7", text: "text-base", mark: 28 },
  default: { box: "h-8 w-8", text: "text-[15px]", mark: 32 },
  lg: { box: "h-10 w-10", text: "text-xl", mark: 40 },
} as const;

export function Logo({
  className,
  size = "default",
  showWordmark = true,
}: {
  className?: string;
  size?: keyof typeof SIZE;
  showWordmark?: boolean;
}) {
  const dim = SIZE[size];

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 font-display font-semibold tracking-tight text-fg transition-opacity hover:opacity-90",
        className
      )}
      aria-label="Laar AI — home"
    >
      <LogoMark className={dim.box} size={dim.mark} />
      {showWordmark && (
        <span className={cn("leading-none", dim.text)}>Laar AI</span>
      )}
    </Link>
  );
}

function LogoMark({ className, size }: { className?: string; size: number }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Solid primary background */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="10"
          className="fill-primary"
        />
        {/* Subtle highlight */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="10"
          fill="url(#laar-shine)"
          opacity="0.35"
        />

        <defs>
          <linearGradient id="laar-shine" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The 'L' mark — geometric */}
        <path
          d="M 13 10 L 13 27 Q 13 30 16 30 L 28 30"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Accent dot */}
        <circle cx="28" cy="12" r="2.4" fill="white" />
      </svg>
    </span>
  );
}
