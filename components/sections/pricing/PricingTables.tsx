"use client";

import { useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type Category = "web" | "mobile" | "webapp";
type TierKey = "starter" | "business" | "enterprise";

const CATEGORIES: Category[] = ["web", "mobile", "webapp"];
const TIERS: { key: TierKey; popular: boolean }[] = [
  { key: "starter", popular: false },
  { key: "business", popular: true },
  { key: "enterprise", popular: false },
];

export function PricingTables() {
  const [category, setCategory] = useState<Category>("web");
  const tToggle = useTranslations("pricing.toggle");
  const tTiers = useTranslations("pricing.tiers");
  const tCommon = useTranslations("common");

  return (
    <section className="py-10 pb-20 sm:pb-28">
      <Container size="wide">
        {/* Category toggle */}
        <div className="flex items-center justify-center">
          <LayoutGroup id="pricing-toggle">
            <div className="inline-flex rounded-full border border-border bg-surface p-1.5 shadow-[var(--shadow-card)]">
              {CATEGORIES.map((cat) => {
                const active = cat === category;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "relative inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors sm:px-6",
                      active
                        ? "text-background"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="pricing-toggle-active"
                        className="absolute inset-0 rounded-full bg-foreground"
                        transition={{
                          type: "spring",
                          bounce: 0.18,
                          duration: 0.5,
                        }}
                      />
                    )}
                    <span className="relative">{tToggle(cat)}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Tier cards */}
        <div className="mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
            >
              {TIERS.map((tier, i) => (
                <PricingCard
                  key={`${category}-${tier.key}`}
                  category={category}
                  tierKey={tier.key}
                  popular={tier.popular}
                  index={i}
                  popularLabel={tTiers("popular")}
                  ctaLabel={tTiers("getStarted")}
                  perProjectLabel={tTiers("perProject")}
                  customLabel={tTiers("custom")}
                  commonGetStarted={tCommon("getStarted")}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

function PricingCard({
  category,
  tierKey,
  popular,
  index,
  popularLabel,
  ctaLabel,
  perProjectLabel,
  customLabel,
}: {
  category: Category;
  tierKey: TierKey;
  popular: boolean;
  index: number;
  popularLabel: string;
  ctaLabel: string;
  perProjectLabel: string;
  customLabel: string;
  commonGetStarted: string;
}) {
  const t = useTranslations(`pricing.${category}.${tierKey}`);
  const features = t.raw("features") as string[];
  const price = t("price");
  const isCustom = price === customLabel || price === "Custom" || price === "Liên hệ";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={cn(
        "card relative flex flex-col overflow-hidden p-6 sm:p-7",
        popular
          ? "border-[color:var(--accent)] ring-2 ring-[color:var(--accent-soft)]"
          : "",
      )}
    >
      {popular && (
        <>
          <div className="absolute -right-12 top-6 rotate-45 bg-[color:var(--accent)] px-10 py-1 text-[10px] font-medium uppercase tracking-widest text-white">
            {popularLabel}
          </div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--accent-soft)] to-transparent" />
        </>
      )}
      <div className="relative flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {popular && (
            <Sparkles
              className="h-4 w-4 text-[color:var(--accent)]"
              strokeWidth={2.5}
            />
          )}
          <h3 className="font-display text-xl font-semibold text-foreground">
            {t("name")}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-foreground-muted">
          {t("desc")}
        </p>
      </div>

      <div className="relative mt-6 flex items-baseline gap-2">
        <span
          className={cn(
            "font-display text-5xl font-bold tracking-tight",
            isCustom
              ? "text-foreground"
              : "text-foreground",
          )}
        >
          {price}
        </span>
        {!isCustom && (
          <span className="text-sm text-foreground-subtle">
            {perProjectLabel}
          </span>
        )}
      </div>

      <ul className="relative mt-7 flex flex-col gap-3 border-t border-border pt-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                popular
                  ? "bg-[color:var(--accent)] text-white"
                  : "bg-[var(--accent-soft)] text-[color:var(--accent)]",
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="leading-relaxed text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-7 pt-2">
        <Link
          href={{
            pathname: "/contact",
            query: { service: category, tier: tierKey },
          }}
          className={cn(
            "group flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-all active:scale-[0.98]",
            popular
              ? "btn-gradient text-white shadow-[0_10px_25px_-10px_var(--accent)]"
              : "border border-border-strong bg-surface text-foreground hover:border-foreground hover:bg-surface-2",
          )}
        >
          {ctaLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </motion.div>
  );
}
