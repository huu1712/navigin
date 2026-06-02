import { Award, Handshake, MessagesSquare, ReceiptText } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const ITEMS = [
  {
    key: "senior",
    icon: Award,
    number: "01",
    accent: "from-blue-500 via-cyan-500 to-emerald-500",
  },
  {
    key: "direct",
    icon: MessagesSquare,
    number: "02",
    accent: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    key: "transparent",
    icon: ReceiptText,
    number: "03",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
  },
  {
    key: "partnership",
    icon: Handshake,
    number: "04",
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
  },
] as const;

type ItemKey = (typeof ITEMS)[number]["key"];

export function WhyUs() {
  const t = useTranslations("about.whyUs");

  return (
    <section className="pb-20 sm:pb-28">
      <Container size="wide">
        <SectionReveal direction="up">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            const key = item.key as ItemKey;
            return (
              <SectionReveal
                key={item.key}
                delay={i * 0.08}
                direction="up"
                className="card group relative h-full overflow-hidden p-7 sm:p-8"
              >
                {/* Big background number */}
                <span className="pointer-events-none absolute right-4 top-2 font-display text-7xl font-bold leading-none text-foreground/5 sm:right-6 sm:top-4 sm:text-8xl">
                  {item.number}
                </span>
                <div
                  className={`absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-gradient-to-br ${item.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}
                />

                <div className="relative flex flex-col gap-4">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-[var(--shadow-card)]`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-base leading-relaxed text-foreground-muted">
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
