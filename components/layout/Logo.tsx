import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className, showText = true }: Props) {
  return (
    <Link
      href="/"
      aria-label="Navigin home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-foreground",
        className,
      )}
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-border bg-foreground text-background transition-transform duration-300 group-hover:rotate-[8deg]">
        <span className="font-display text-base font-bold leading-none">
          N
        </span>
        <span className="absolute -bottom-2 -right-2 h-3 w-3 rounded-full bg-[color:var(--accent-2)] ring-2 ring-background" />
      </span>
      {showText && (
        <span className="flex items-baseline gap-1 text-lg font-semibold tracking-tight">
          Navigin<span className="text-[color:var(--accent)]">.</span>
        </span>
      )}
    </Link>
  );
}
