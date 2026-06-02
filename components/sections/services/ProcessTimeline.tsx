import {
  MessageCircle,
  FileText,
  Palette,
  Code,
  Rocket,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const STEPS = [
  { key: "one", icon: MessageCircle },
  { key: "two", icon: FileText },
  { key: "three", icon: Palette },
  { key: "four", icon: Code },
  { key: "five", icon: Rocket },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

export function ProcessTimeline() {
  const t = useTranslations("services.process");

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

        {/* Desktop horizontal timeline */}
        <div className="mt-16 hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-7 h-px bg-border" />
            <div
              className="absolute left-0 top-7 h-px bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)]"
              style={{ width: "80%" }}
            />

            <div className="relative grid grid-cols-5 gap-5">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const key = step.key as StepKey;
                return (
                  <SectionReveal
                    key={step.key}
                    delay={i * 0.1}
                    direction="up"
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-background text-foreground transition-all duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="mt-4 flex flex-col gap-1.5">
                      <span className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                        Step 0{i + 1}
                      </span>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {t(`steps.${key}.title`)}
                      </h3>
                      <p className="text-xs leading-relaxed text-foreground-muted">
                        {t(`steps.${key}.desc`)}
                      </p>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="mt-12 flex flex-col md:hidden">
          <div className="relative pl-12">
            <div className="absolute left-5 top-7 bottom-7 w-px bg-border" />
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const key = step.key as StepKey;
              return (
                <SectionReveal
                  key={step.key}
                  delay={i * 0.08}
                  direction="up"
                  className="relative mb-10 last:mb-0"
                >
                  <div className="absolute -left-12 top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-background text-foreground">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                      Step 0{i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground-muted">
                      {t(`steps.${key}.desc`)}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
