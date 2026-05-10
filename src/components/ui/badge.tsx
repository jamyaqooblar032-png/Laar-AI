import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "primary"
  | "accent"
  | "soon"
  | "beta"
  | "premium"
  | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-bg-elevated text-fg-muted border-border",
  primary:
    "bg-primary/10 text-primary border-primary/20",
  accent:
    "bg-accent/10 text-accent border-accent/20",
  soon: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  beta: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  premium: "bg-accent/15 text-accent border-accent/30",
  outline: "bg-transparent text-fg-muted border-border",
};

export function Badge({
  variant = "default",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
