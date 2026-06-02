import { cn } from "@/lib/cn";

type Tone = "default" | "accent" | "success" | "warning";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  withDot?: boolean;
};

const tones: Record<Tone, string> = {
  default: "bg-surface-2 text-foreground-muted border-border",
  accent:
    "bg-[var(--accent-soft)] text-[color:var(--accent)] border-[color:var(--accent-soft)]",
  success:
    "bg-[rgba(22,163,74,0.10)] text-[color:var(--success)] border-[rgba(22,163,74,0.18)]",
  warning:
    "bg-[var(--accent-2-soft)] text-[color:var(--accent-2)] border-[var(--accent-2-soft)]",
};

const dotTones: Record<Tone, string> = {
  default: "bg-foreground-subtle",
  accent: "bg-[color:var(--accent)]",
  success: "bg-[color:var(--success)]",
  warning: "bg-[color:var(--accent-2)]",
};

export function Badge({
  className,
  tone = "default",
  withDot = false,
  children,
  ...rest
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {withDot && (
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full pulse-dot text-current",
            dotTones[tone],
          )}
        />
      )}
      {children}
    </span>
  );
}
