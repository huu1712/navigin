import { Briefcase, Clock3, Globe2, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

const ITEMS = [
  {
    key: "projects",
    icon: Briefcase,
    target: 6,
    suffix: "",
  },
  {
    key: "specialists",
    icon: Users,
    target: 4,
    suffix: "",
  },
  {
    key: "countries",
    icon: Globe2,
    target: 2,
    suffix: "",
  },
  {
    key: "response",
    icon: Clock3,
    target: 24,
    suffix: "h",
  },
] as const;

type StatsKey = (typeof ITEMS)[number]["key"];

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
                className="card group relative overflow-hidden p-6 sm:p-8"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--accent-soft)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[color:var(--accent)]">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <AnimatedCounter
                    target={item.target}
                    suffix={item.suffix}
                    className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                  />
                  <p className="text-sm font-medium text-foreground-muted sm:text-base">
                    {t(item.key as StatsKey)}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
