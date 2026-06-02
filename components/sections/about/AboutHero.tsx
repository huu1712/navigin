"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

// Decorative team avatars (no personal info — abstract initials)
const AVATARS = [
  { letter: "D", color: "from-blue-500 via-cyan-500 to-emerald-500" },
  { letter: "M", color: "from-amber-500 via-orange-500 to-rose-500" },
  { letter: "P", color: "from-violet-500 via-fuchsia-500 to-pink-500" },
  { letter: "S", color: "from-emerald-500 via-teal-500 to-cyan-500" },
];

export function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative isolate overflow-hidden bg-noise pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 20%, var(--accent-soft) 0px, transparent 50%), radial-gradient(at 80% 30%, var(--accent-2-soft) 0px, transparent 50%)",
        }}
      />
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Team visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:col-span-5"
          >
            <div className="card relative overflow-hidden p-8 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent-soft)] blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[var(--accent-2-soft)] blur-3xl"
              />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <Users
                    className="h-4 w-4 text-[color:var(--accent)]"
                    strokeWidth={2.5}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                    {t("studio")}
                  </span>
                </div>

                {/* Avatar cluster */}
                <div className="mt-8 flex items-center justify-center">
                  <div className="flex -space-x-4">
                    {AVATARS.map((avatar, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + i * 0.1,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className={`relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-surface bg-gradient-to-br ${avatar.color} font-display text-2xl font-bold text-white shadow-[var(--shadow-card-hover)] sm:h-24 sm:w-24 sm:text-3xl`}
                        style={{ zIndex: AVATARS.length - i }}
                      >
                        {avatar.letter}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-10 grid grid-cols-3 gap-3 text-center">
                  {[
                    { value: "4", labelKey: "specialists" as const },
                    { value: "2025", labelKey: "since" as const },
                    { value: "20+", labelKey: "projects" as const },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.labelKey}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + i * 0.1,
                      }}
                      className="rounded-2xl border border-border bg-surface-2 p-4"
                    >
                      <p className="font-display text-xl font-bold text-foreground sm:text-2xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-foreground-subtle">
                        {t(`stats.${stat.labelKey}`)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating "Available" chip */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -left-4 top-12 hidden rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-[var(--shadow-card-hover)] backdrop-blur sm:block"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--success)]" />
                </span>
                <span className="text-xs font-medium text-foreground">
                  Available
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Intro */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5"
            >
              <span className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--accent)]">
                <span className="h-px w-6 bg-[color:var(--accent)]/40" />
                {t("eyebrow")}
              </span>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {t("title")}
              </h1>
              <p className="text-sm font-medium uppercase tracking-wider text-foreground-subtle sm:text-base sm:normal-case sm:tracking-normal sm:text-foreground-muted">
                {t("tagline")}
              </p>
              <p className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                {t("bio")}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="btn-gradient group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium text-white shadow-[0_10px_25px_-10px_var(--accent)] transition-all active:scale-[0.98]"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                  {t("ctaContact")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-6 text-sm font-medium text-foreground transition-all hover:border-foreground hover:bg-surface-2 active:scale-[0.98]"
                >
                  {t("ctaProjects")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
