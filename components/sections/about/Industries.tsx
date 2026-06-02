import {
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const INDUSTRIES = [
  {
    key: "ecommerce",
    icon: ShoppingCart,
    color: "from-blue-500/15 to-cyan-500/15",
    iconColor: "text-blue-500",
  },
  {
    key: "saas",
    icon: Sparkles,
    color: "from-violet-500/15 to-fuchsia-500/15",
    iconColor: "text-violet-500",
  },
  {
    key: "fintech",
    icon: Landmark,
    color: "from-emerald-500/15 to-teal-500/15",
    iconColor: "text-emerald-500",
  },
  {
    key: "healthtech",
    icon: HeartPulse,
    color: "from-rose-500/15 to-pink-500/15",
    iconColor: "text-rose-500",
  },
  {
    key: "edtech",
    icon: GraduationCap,
    color: "from-amber-500/15 to-orange-500/15",
    iconColor: "text-amber-500",
  },
  {
    key: "travel",
    icon: Plane,
    color: "from-indigo-500/15 to-blue-500/15",
    iconColor: "text-indigo-500",
  },
] as const;

type IndustryKey = (typeof INDUSTRIES)[number]["key"];

export function Industries() {
  const t = useTranslations("about.industries");

  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <SectionReveal direction="up">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon;
            const key = industry.key as IndustryKey;
            return (
              <SectionReveal
                key={industry.key}
                delay={i * 0.06}
                direction="up"
                className="card group relative h-full overflow-hidden p-6 sm:p-7"
              >
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${industry.color} opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative flex items-start gap-4">
                  <span
                    className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-2 ${industry.iconColor} transition-colors group-hover:border-foreground/20`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {t(`items.${key}.name`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {t(`items.${key}.desc`)}
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
