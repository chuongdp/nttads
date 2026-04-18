import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-[var(--input-border)] bg-[var(--surface-card)] px-3 py-2 text-base text-[var(--foreground)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--secondary-text)] focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-[var(--muted)] disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
