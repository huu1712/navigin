import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Accordion } from "@/components/ui/Accordion";

const KEYS = ["one", "two", "three", "four", "five"] as const;
type ItemKey = (typeof KEYS)[number];

export function ServicesFaq() {
  const t = useTranslations("services.faq");
  const items = KEYS.map((k: ItemKey) => ({
    id: k,
    question: t(`items.${k}.q`),
    answer: t(`items.${k}.a`),
  }));

  return (
    <section className="py-20 sm:py-28">
      <Container size="tight">
        <SectionReveal direction="up">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </SectionReveal>
        <SectionReveal direction="up" delay={0.1} className="mt-12">
          <Accordion items={items} defaultOpenId="one" />
        </SectionReveal>
      </Container>
    </section>
  );
}
