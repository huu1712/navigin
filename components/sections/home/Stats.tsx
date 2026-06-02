import { Briefcase, Clock3, Globe2, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

type StatItem = {
  key: "projects" | "specialists" | "countries" | "response";
  icon: typeof Briefcase;
  target: number;
  suffix: string;
  accent: string;
  hue: string;
  live?: boolean;
};

const ITEMS: readonly StatItem[] = [
  {
    key: "projects",
    icon: Briefcase,
    target: 20,
    suffix: "+",
    accent: "from-blue-500 via-cyan-500 to-emerald-500",
    hue: "#22d3ee",
    live: true,
  },
  {
    key: "specialists",
    icon: Users,
    target: 4,
    suffix: "",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    hue: "#a855f7",
  },
  {
    key: "countries",
    icon: Globe2,
    target: 3,
    suffix: "",
    accent: "from-amber-500 via-orange-500 to-rose-500",
    hue: "#f59e0b",
  },
  {
    key: "response",
    icon: Clock3,
    target: 24,
    suffix: "h",
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
    hue: "#10b981",
  },
];

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-20 sm:py-24">
      <Container size="wide">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <SectionReveal
                key={item.key}
                delay={i * 0.08}
                direction="up"
                className="card group relative h-full overflow-hidden p-6 sm:p-7"
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: item.hue }}
                />

                <div className="relative flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-[var(--shadow-card)]`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    {item.live ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-foreground-muted">
                        <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        {t("liveBadge")}
                      </span>
                    ) : (
                      <span
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-mono font-bold uppercase"
                        style={{
                          color: item.hue,
                          backgroundColor: `color-mix(in oklab, ${item.hue} 14%, transparent)`,
                        }}
                      >
                        0{i + 1}
                      </span>
                    )}
                  </div>

                  <AnimatedCounter
                    target={item.target}
                    suffix={item.suffix}
                    className="font-display text-4xl font-bold leading-none tracking-tight text-foreground sm:text-5xl"
                  />

                  <div className="mt-auto flex flex-col gap-1.5">
                    <p className="text-sm font-semibold text-foreground sm:text-base">
                      {t(`${item.key}.label`)}
                    </p>
                    <p className="text-xs leading-relaxed text-foreground-subtle sm:text-[13px]">
                      {t(`${item.key}.sub`)}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
