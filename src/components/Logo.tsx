import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const dimensions = {
    sm: { box: "h-7 w-7", text: "text-base" },
    default: { box: "h-9 w-9", text: "text-lg" },
    lg: { box: "h-12 w-12", text: "text-2xl" },
  }[size];

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display font-bold tracking-tight",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-emerald-400 to-cyan-500 p-px",
          dimensions.box
        )}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-bg">
          <span className="font-display text-base font-black bg-gradient-to-br from-primary to-cyan-400 bg-clip-text text-transparent">
            ل
          </span>
        </div>
      </div>
      <span className={cn("text-fg", dimensions.text)}>
        Laar<span className="text-primary">AI</span>
      </span>
    </Link>
  );
}
