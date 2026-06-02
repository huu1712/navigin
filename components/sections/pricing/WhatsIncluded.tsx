import {
  FileText,
  GitBranch,
  Globe2,
  LifeBuoy,
  ShieldCheck,
  TestTube2,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const ITEMS = [
  { key: "git", icon: GitBranch },
  { key: "test", icon: TestTube2 },
  { key: "docs", icon: FileText },
  { key: "support", icon: LifeBuoy },
  { key: "nda", icon: ShieldCheck },
  { key: "lang", icon: Globe2 },
] as const;

type ItemKey = (typeof ITEMS)[number]["key"];

export function WhatsIncluded() {
  const t = useTranslations("pricing.included");

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
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            const key = item.key as ItemKey;
            return (
              <SectionReveal
                key={item.key}
                delay={i * 0.06}
                direction="up"
                className="card flex items-start gap-4 p-6"
              >
                <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[color:var(--accent)]">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
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
