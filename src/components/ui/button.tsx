import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-ring,rgba(99,102,241,0.4))] focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md",
        secondary:
          "bg-bg-elevated text-fg border border-border hover:border-fg-subtle/40",
        ghost:
          "text-fg-muted hover:text-fg hover:bg-bg-elevated",
        outline:
          "border border-border bg-transparent text-fg hover:bg-bg-elevated",
        accent:
          "bg-accent text-bg hover:opacity-90",
        gradient:
          "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-10 px-5",
        lg: "h-11 px-6 text-sm",
        xl: "h-12 px-8 text-base",
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
