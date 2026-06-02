import { Banknote, Bitcoin, CreditCard, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaPaypal } from "react-icons/fa6";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const METHODS = [
  { key: "bank", icon: Banknote },
  { key: "paypal", icon: FaPaypal },
  { key: "wise", icon: Wallet },
  { key: "crypto", icon: Bitcoin },
] as const;

type MethodKey = (typeof METHODS)[number]["key"];

export function PaymentTerms() {
  const t = useTranslations("pricing.payment");

  return (
    <section className="py-20 sm:py-24">
      <Container size="wide">
        <SectionReveal direction="up">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Terms */}
          <SectionReveal
            direction="left"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {(["upfront", "delivery"] as const).map((termKey, i) => (
              <div
                key={termKey}
                className="card relative overflow-hidden p-6 sm:p-7"
              >
                <div className="absolute right-4 top-4 font-display text-5xl font-bold text-foreground/5">
                  {i + 1}
                </div>
                <div className="relative flex flex-col gap-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[color:var(--accent)]">
                    <CreditCard className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                    {t(`terms.${termKey}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {t(`terms.${termKey}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </SectionReveal>

          {/* Methods */}
          <SectionReveal direction="right" className="card p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {t("methods.title")}
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {METHODS.map((method) => {
                const Icon = method.icon;
                const key = method.key as MethodKey;
                return (
                  <div
                    key={method.key}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2 p-4"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-foreground-muted">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {t(`methods.${key}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
