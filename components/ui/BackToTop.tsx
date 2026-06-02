"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const SHOW_AFTER_PX = 480;

export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label={t("backToTop")}
          title={t("backToTop")}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          className="group fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground shadow-[var(--shadow-card-hover)] backdrop-blur transition-colors hover:border-foreground hover:text-[color:var(--accent)] sm:bottom-8 sm:right-8 sm:h-13 sm:w-13"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, var(--accent-soft) 0%, transparent 70%)",
            }}
          />
          <ArrowUp
            className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            strokeWidth={2.25}
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
