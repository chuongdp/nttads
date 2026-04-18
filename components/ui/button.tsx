import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-[22px] py-2.5 text-sm font-normal tracking-[-0.01em] transition-[background-color,color,transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/45 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-pressed)] hover:scale-[1.02] active:scale-[0.98] disabled:bg-[var(--cta-disabled-bg)] disabled:text-[var(--cta-disabled-text)] disabled:shadow-none disabled:hover:scale-100",
        outline:
          "border-2 border-[rgba(10,19,23,0.14)] bg-transparent text-[var(--foreground)]/85 hover:bg-[rgba(70,90,105,0.75)] hover:text-white dark:border-[var(--border)] dark:bg-transparent dark:text-[var(--foreground)] dark:hover:bg-white/12 dark:hover:text-white",
        ghost:
          "rounded-3xl border-transparent bg-transparent px-3 py-1 text-[#385898] hover:bg-black/[0.05] dark:text-[var(--primary)] dark:hover:bg-white/10",
        toolbar:
          "border border-[var(--border)] bg-[var(--surface-card)] text-[var(--foreground)] hover:bg-[var(--surface-nested)] hover:scale-100 dark:bg-[var(--surface-card)] dark:hover:bg-[var(--surface-nested)]",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-9 px-4 py-2 text-xs",
        lg: "min-h-12 px-8 py-3 text-base",
        icon: "h-11 w-11 min-h-11 min-w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
