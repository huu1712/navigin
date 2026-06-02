import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "gradient";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium font-sans rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:opacity-90 active:scale-[0.98] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)]",
  secondary:
    "bg-surface text-foreground border border-border hover:border-foreground/30 hover:bg-surface-2 active:scale-[0.98]",
  ghost: "text-foreground hover:bg-surface-2 active:scale-[0.98]",
  outline:
    "border border-border-strong text-foreground hover:border-foreground hover:bg-surface-2 active:scale-[0.98]",
  gradient:
    "btn-gradient text-white shadow-[0_10px_25px_-10px_var(--accent)] hover:shadow-[0_15px_32px_-10px_var(--accent)] active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 min-h-[3.25rem] px-7 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      />
    );
  },
);
