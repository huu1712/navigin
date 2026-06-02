"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const t = useTranslations("hero");
  const prefersReduced = useReducedMotion();

  const title = t("title");
  const accent = t("titleAccent");
  const parts = title.split(accent);

  const wordsBefore = parts[0]?.trim().split(" ") ?? [];
  const wordsAfter = parts[1]?.trim().split(" ") ?? [];

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-noise pt-24">
      {/* Animated mesh background — oversized so rotation/translation never reveals edges */}
      <div
        aria-hidden
        className="hero-mesh pointer-events-none absolute -inset-[15%] -z-10"
      />
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--foreground) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container size="wide" className="relative z-10 py-16">
        <div className="flex flex-col items-start gap-8 sm:items-center sm:text-center">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-foreground-muted shadow-[var(--shadow-card)] backdrop-blur"
          >
            <span className="relative inline-flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--success)]" />
            </span>
            <span className="text-foreground">{t("available")}</span>
          </motion.div>

          {/* Headline with word-by-word reveal */}
          <h1 className="max-w-4xl font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5rem]">
            <span className="flex flex-wrap justify-start gap-x-[0.3em] gap-y-1 sm:justify-center">
              {wordsBefore.map((word, i) => (
                <motion.span
                  key={`b-${i}`}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: prefersReduced ? 0 : 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + wordsBefore.length * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative inline-block"
              >
                <span className="gradient-text">{accent}</span>
                <motion.svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2 w-full text-[color:var(--accent-2)]"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.9 + wordsBefore.length * 0.06,
                    ease: "easeOut",
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                >
                  <motion.path d="M3 8 C 50 2, 150 2, 197 8" />
                </motion.svg>
              </motion.span>
              {wordsAfter.map((word, i) => (
                <motion.span
                  key={`a-${i}`}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + (wordsBefore.length + 1 + i) * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg md:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/services"
              className="btn-gradient group inline-flex h-13 min-h-[3.25rem] items-center justify-center gap-2 rounded-full px-7 text-base font-medium text-white shadow-[0_12px_30px_-10px_var(--accent)] transition-all hover:shadow-[0_18px_36px_-10px_var(--accent)] active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
              {t("ctaPrimary")}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-13 min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/80 px-7 text-base font-medium text-foreground backdrop-blur transition-all hover:border-foreground hover:bg-surface active:scale-[0.98]"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground-subtle"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4" strokeWidth={2} />
        </motion.div>
      </motion.div>
    </section>
  );
}
