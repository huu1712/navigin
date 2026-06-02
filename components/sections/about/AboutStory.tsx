import { Calendar, Globe2, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const HIGHLIGHTS = [
  { key: "since", icon: Calendar },
  { key: "countries", icon: Globe2 },
  { key: "projects", icon: Trophy },
] as const;

type HighlightKey = (typeof HIGHLIGHTS)[number]["key"];

export function AboutStory() {
  const t = useTranslations("about.story");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="py-20 sm:py-28">
      <Container size="tight">
        <SectionReveal direction="up">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="left"
          />
        </SectionReveal>

        <SectionReveal direction="up" delay={0.1} className="mt-10">
          <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal direction="up" delay={0.2} className="mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              const key = h.key as HighlightKey;
              return (
                <div
                  key={h.key}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[color:var(--accent)]">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {t(`highlights.${key}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
