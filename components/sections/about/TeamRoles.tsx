import { Code2, Palette, ShoppingBag, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const ROLES = [
  {
    key: "design",
    icon: Palette,
    initials: "DX",
    accent: "from-pink-500 via-rose-500 to-orange-500",
    headcount: 1,
  },
  {
    key: "web",
    icon: Code2,
    initials: "WE",
    accent: "from-blue-500 via-cyan-500 to-emerald-500",
    headcount: 1,
  },
  {
    key: "mobile",
    icon: Smartphone,
    initials: "ME",
    accent: "from-amber-500 via-orange-500 to-rose-500",
    headcount: 1,
  },
  {
    key: "product",
    icon: ShoppingBag,
    initials: "PS",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    headcount: 1,
  },
] as const;

type RoleKey = (typeof ROLES)[number]["key"];

export function TeamRoles() {
  const t = useTranslations("about.team");

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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((role, i) => {
            const Icon = role.icon;
            const key = role.key as RoleKey;
            const tools = t.raw(`roles.${key}.tools`) as string[];
            return (
              <SectionReveal
                key={role.key}
                delay={i * 0.08}
                direction="up"
                className="card group relative h-full overflow-hidden p-6 sm:p-7"
              >
                {/* Decorative gradient */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${role.accent}`}
                />
                <div className="relative flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${role.accent} font-display text-xs font-bold tracking-wider text-white shadow-[var(--shadow-card)]`}
                    >
                      {role.initials}
                    </span>
                    <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 text-[10px] uppercase tracking-wider text-foreground-muted">
                      <Icon className="h-3 w-3" strokeWidth={2.5} />
                      {role.headcount} {t(`roles.${key}.count`)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {t(`roles.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {t(`roles.${key}.desc`)}
                    </p>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-1.5 border-t border-border pt-4">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] text-foreground-muted"
                      >
                        {tool}
                      </span>
                    ))}
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
