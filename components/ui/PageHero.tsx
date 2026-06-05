import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { cn } from "@/lib/cn";

type Crumb = {
  label: string;
  href?: "/" | "/services" | "/pricing" | "/about" | "/contact";
};

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  align = "center",
  className,
}: Props) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-noise pt-32 pb-16 sm:pt-40 sm:pb-20",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 20%, var(--accent-soft) 0px, transparent 50%), radial-gradient(at 80% 30%, var(--accent-2-soft) 0px, transparent 50%)",
        }}
      />
      <ParticlesBackground className="-z-10" quantity={40} />

      <Container size="wide">
        <SectionReveal
          direction="up"
          className={cn(
            "flex flex-col gap-5",
            align === "center" ? "items-center text-center" : "items-start",
          )}
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-foreground-muted"
            >
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <span key={i} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(isLast && "font-medium text-foreground")}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <ChevronRight
                        className="h-3.5 w-3.5 opacity-50"
                        strokeWidth={2}
                      />
                    )}
                  </span>
                );
              })}
            </nav>
          )}

          {eyebrow && (
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--accent)]">
              <span className="h-px w-6 bg-[color:var(--accent)]/40" />
              {eyebrow}
            </span>
          )}

          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              {subtitle}
            </p>
          )}
        </SectionReveal>
      </Container>
    </section>
  );
}
