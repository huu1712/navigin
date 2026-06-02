"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const ITEMS = [
  { key: "one", color: "from-blue-400 to-cyan-400", initials: "TH" },
  { key: "two", color: "from-amber-400 to-orange-400", initials: "JC" },
  { key: "three", color: "from-violet-400 to-fuchsia-400", initials: "QB" },
] as const;

type TestimonialKey = (typeof ITEMS)[number]["key"];

function TestimonialCard({
  itemKey,
  color,
  initials,
}: {
  itemKey: TestimonialKey;
  color: string;
  initials: string;
}) {
  const t = useTranslations("testimonials");
  return (
    <article className="card relative flex h-full flex-col gap-5 p-6 sm:p-7">
      <Quote
        className="absolute right-5 top-5 h-7 w-7 text-[var(--accent-soft)]"
        strokeWidth={1.5}
      />
      <div className="flex items-center gap-1 text-[color:var(--accent-2)]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
        ))}
      </div>
      <p className="text-base leading-relaxed text-foreground">
        “{t(`items.${itemKey}.quote`)}”
      </p>
      <div className="mt-auto flex items-center gap-3 border-t border-border pt-5">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${color} font-display text-sm font-bold text-white`}
        >
          {initials}
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-foreground">
            {t(`items.${itemKey}.name`)}
          </p>
          <p className="text-xs text-foreground-muted">
            {t(`items.${itemKey}.role`)}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % ITEMS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

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

        {/* Desktop grid */}
        <div className="mt-14 hidden grid-cols-1 gap-5 md:grid md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <SectionReveal key={item.key} delay={i * 0.1} direction="up">
              <TestimonialCard
                itemKey={item.key}
                color={item.color}
                initials={item.initials}
              />
            </SectionReveal>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-14 md:hidden">
          <div className="relative h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <TestimonialCard
                  itemKey={ITEMS[active].key}
                  color={ITEMS[active].color}
                  initials={ITEMS[active].initials}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-8 bg-[color:var(--accent)]"
                    : "w-1.5 bg-border-strong"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
