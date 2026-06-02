import { MessageSquareDot, Timer, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const ITEMS = [
  {
    key: "communication",
    icon: MessageSquareDot,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    key: "ontime",
    icon: Timer,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    key: "quality",
    icon: ShieldCheck,
    color: "from-violet-500/20 to-fuchsia-500/20",
  },
] as const;

type ItemKey = (typeof ITEMS)[number]["key"];

export function Values() {
  const t = useTranslations("about.values");
  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <SectionReveal direction="up">
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        </SectionReveal>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            const key = item.key as ItemKey;
            return (
              <SectionReveal
                key={item.key}
                delay={i * 0.08}
                direction="up"
                className="card group relative overflow-hidden p-7 sm:p-8"
              >
                <div
                  className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80`}
                />
                <div className="relative flex flex-col gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-2 text-foreground transition-colors group-hover:border-foreground/30 group-hover:text-[color:var(--accent)]">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted sm:text-base">
                    {t(`items.${key}.desc`)}
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
