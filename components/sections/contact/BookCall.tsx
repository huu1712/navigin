import { Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { SITE } from "@/lib/constants";

export function BookCall() {
  const t = useTranslations("contact.calendly");

  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <SectionReveal direction="up">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 sm:p-12 lg:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--accent-soft)] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[var(--accent-2-soft)] blur-3xl"
            />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-5">
                <span className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  <span className="h-px w-6 bg-[color:var(--accent)]/40" />
                  {t("eyebrow")}
                </span>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  {t("title")}
                </h2>
                <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                  {t("subtitle")}
                </p>
                <div className="flex items-center gap-2 text-sm text-foreground-muted">
                  <Clock className="h-4 w-4 text-[color:var(--accent)]" strokeWidth={2} />
                  <span>{t("note")}</span>
                </div>
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex h-13 min-h-[3.25rem] w-fit items-center gap-2 rounded-full bg-foreground px-7 text-base font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  <Calendar className="h-4 w-4" strokeWidth={2.5} />
                  {t("button")}
                </a>
              </div>

              {/* Calendar visual */}
              <div className="relative mx-auto w-full max-w-sm">
                <div className="card relative aspect-square overflow-hidden p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-soft)] via-transparent to-[var(--accent-2-soft)] opacity-50" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-semibold text-foreground">
                        Discovery Call
                      </span>
                      <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--accent)]">
                        30 min
                      </span>
                    </div>
                    <div className="mt-6 grid flex-1 grid-cols-7 gap-1.5 text-center text-[10px] text-foreground-muted">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                        <div
                          key={i}
                          className="py-1 font-mono uppercase tracking-wider opacity-60"
                        >
                          {d}
                        </div>
                      ))}
                      {Array.from({ length: 28 }).map((_, i) => {
                        const isActive = i === 13;
                        const isAvailable = [10, 11, 15, 17, 18, 22].includes(i);
                        return (
                          <div
                            key={i}
                            className={`flex aspect-square items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                              isActive
                                ? "bg-[color:var(--accent)] text-white"
                                : isAvailable
                                  ? "bg-[var(--accent-soft)] text-[color:var(--accent)]"
                                  : "text-foreground-subtle"
                            }`}
                          >
                            {i + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
