import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-bg hover:bg-primary-hover shadow-[0_0_24px_-8px_rgba(16,185,129,0.6)] hover:shadow-[0_0_36px_-2px_rgba(16,185,129,0.85)]",
        secondary:
          "bg-bg-elevated/80 text-fg border border-border backdrop-blur-md hover:border-primary/30 hover:bg-bg-card hover:text-fg",
        ghost:
          "text-fg-muted hover:text-fg hover:bg-bg-elevated",
        outline:
          "border border-border bg-transparent text-fg hover:bg-bg-elevated hover:border-primary/30",
        accent:
          "bg-accent text-bg hover:bg-accent-hover shadow-[0_0_24px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_0_36px_-2px_rgba(245,158,11,0.85)]",
        gradient:
          "text-white bg-gradient-to-r from-primary via-cyan-500 to-purple-500 bg-[length:200%_auto] hover:bg-[position:right_center] shadow-[0_0_28px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_-2px_rgba(168,85,247,0.7)]",
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
