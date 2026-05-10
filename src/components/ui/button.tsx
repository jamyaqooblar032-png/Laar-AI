import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-bg hover:bg-primary-hover shadow-[0_0_24px_-8px_rgba(16,185,129,0.6)] hover:shadow-[0_0_32px_-4px_rgba(16,185,129,0.8)]",
        secondary:
          "bg-bg-elevated text-fg border border-border hover:border-border hover:bg-bg-card",
        ghost: "text-fg-muted hover:text-fg hover:bg-bg-elevated",
        outline:
          "border border-border bg-transparent text-fg hover:bg-bg-elevated",
        accent:
          "bg-accent text-bg hover:bg-accent-hover shadow-[0_0_24px_-8px_rgba(245,158,11,0.6)]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
