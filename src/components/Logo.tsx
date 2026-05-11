import Link from "next/link";
import { cn } from "@/lib/utils";

const SIZE = {
  sm: { box: "h-7 w-7", text: "text-base", mark: 28 },
  default: { box: "h-9 w-9", text: "text-lg", mark: 36 },
  lg: { box: "h-12 w-12", text: "text-2xl", mark: 48 },
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
        "group relative inline-flex items-center gap-2.5 font-display font-bold tracking-tight transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
      aria-label="Laar AI — home"
    >
      <LogoMark className={dim.box} size={dim.mark} />
      {showWordmark && (
        <span className={cn("relative leading-none", dim.text)}>
          <span className="text-fg">Laar</span>
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            AI
          </span>
          {/* Animated underline on hover */}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500 group-hover:w-full" />
        </span>
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
      {/* Outer glow on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/60 to-purple-500/40 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          <linearGradient
            id="laar-bg"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10b981" />
            <stop offset="0.5" stopColor="#06b6d4" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient
            id="laar-stroke"
            x1="0"
            y1="0"
            x2="48"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient
            id="laar-spark"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop stopColor="#fde68a" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12"
          fill="url(#laar-bg)"
        />

        {/* Subtle inner stroke */}
        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="43"
          rx="11.5"
          stroke="white"
          strokeOpacity="0.18"
          strokeWidth="0.6"
        />

        {/* The 'L' mark — geometric, modern */}
        <path
          d="M 16 12 L 16 32 Q 16 36 20 36 L 33 36"
          stroke="url(#laar-stroke)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Spark dot — denotes 'AI' */}
        <circle
          cx="34"
          cy="14"
          r="3"
          fill="url(#laar-spark)"
          className="origin-center"
        >
          <animate
            attributeName="r"
            values="3;3.5;3"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.9;1;0.9"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Tiny secondary spark */}
        <circle cx="30" cy="18" r="0.9" fill="#fde68a" opacity="0.7">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </span>
  );
}
