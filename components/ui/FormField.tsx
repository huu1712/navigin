import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type FieldWrapperProps = {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
};

export function FieldWrapper({
  label,
  required,
  error,
  hint,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-[color:var(--accent)]">*</span>}
      </span>
      {children}
      {error ? (
        <span className="text-xs text-[color:var(--danger)]">{error}</span>
      ) : hint ? (
        <span className="text-xs text-foreground-subtle">{hint}</span>
      ) : null}
    </label>
  );
}

const inputBase =
  "h-11 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-foreground-subtle transition-all focus:border-[color:var(--accent)] focus:bg-surface focus:outline-none focus:ring-4 focus:ring-[color:var(--ring)]/20";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }>(
  function Input({ className, hasError, ...rest }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          inputBase,
          hasError && "border-[color:var(--danger)] focus:border-[color:var(--danger)] focus:ring-[color:var(--danger)]/20",
          className,
        )}
        {...rest}
      />
    );
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }
>(function Textarea({ className, hasError, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        inputBase,
        "min-h-[140px] py-3 leading-relaxed resize-none",
        hasError && "border-[color:var(--danger)] focus:border-[color:var(--danger)] focus:ring-[color:var(--danger)]/20",
        className,
      )}
      {...rest}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }
>(function Select({ className, hasError, children, ...rest }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          inputBase,
          "appearance-none pr-10",
          hasError && "border-[color:var(--danger)] focus:border-[color:var(--danger)] focus:ring-[color:var(--danger)]/20",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-foreground-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 1l5 5 5-5" />
      </svg>
    </div>
  );
});
