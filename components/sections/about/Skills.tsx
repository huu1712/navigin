import {
  Code2,
  Server,
  Smartphone,
  Cloud,
  Palette,
  Database,
  TestTube2,
  FileText,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const CATEGORIES = [
  { key: "frontend", icon: Code2, color: "from-blue-500/20 to-cyan-500/20" },
  { key: "backend", icon: Server, color: "from-emerald-500/20 to-teal-500/20" },
  { key: "mobile", icon: Smartphone, color: "from-amber-500/20 to-orange-500/20" },
  { key: "devops", icon: Cloud, color: "from-violet-500/20 to-fuchsia-500/20" },
  { key: "design", icon: Palette, color: "from-pink-500/20 to-rose-500/20" },
  { key: "database", icon: Database, color: "from-indigo-500/20 to-blue-500/20" },
  { key: "testing", icon: TestTube2, color: "from-green-500/20 to-emerald-500/20" },
  { key: "cms", icon: FileText, color: "from-orange-500/20 to-amber-500/20" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

export function Skills() {
  const t = useTranslations("about.skills");

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

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const key = cat.key as CategoryKey;
            return (
              <SectionReveal
                key={cat.key}
                delay={i * 0.05}
                direction="up"
                className="card group relative h-full overflow-hidden p-6"
              >
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${cat.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative flex flex-col gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface-2 text-foreground transition-colors group-hover:border-foreground/30 group-hover:text-[color:var(--accent)]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t(`categories.${key}.name`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {t(`categories.${key}.desc`)}
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
