"use client";

import gsap from "gsap";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement | null>(null);

  const title = t("title");
  const accent = t("titleAccent");
  const parts = title.split(accent);

  const wordsBefore = parts[0]?.trim().split(" ") ?? [];
  const wordsAfter = parts[1]?.trim().split(" ") ?? [];

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // Reduced-motion users still see a gentle fade-in (no translation),
      // so the hero doesn't appear inert.
      const moveY = (px: number) => (reduced ? 0 : px);

      gsap.set("[data-hero-badge]", { opacity: 0, y: moveY(-12) });
      gsap.set("[data-hero-word]", { opacity: 0, y: moveY(32) });
      gsap.set("[data-hero-underline]", {
        opacity: 0,
        scaleX: reduced ? 1 : 0,
        transformOrigin: "left center",
      });
      gsap.set("[data-hero-subtitle]", { opacity: 0, y: moveY(20) });
      gsap.set("[data-hero-cta]", { opacity: 0, y: moveY(20) });
      gsap.set("[data-hero-scroll]", { opacity: 0, y: moveY(8) });

      const tl = gsap.timeline({
        defaults: {
          ease: reduced ? "power1.out" : "power3.out",
          duration: reduced ? 0.5 : 0.9,
        },
        delay: 0.15,
      });

      tl.to("[data-hero-badge]", { opacity: 1, y: 0, duration: 0.6 }, 0)
        .to(
          "[data-hero-word]",
          {
            opacity: 1,
            y: 0,
            stagger: 0.055,
            duration: 0.85,
            ease: "expo.out",
          },
          "-=0.35",
        )
        .to(
          "[data-hero-underline]",
          { scaleX: 1, opacity: 0.85, duration: 1, ease: "power2.out" },
          "-=0.4",
        )
        .to(
          "[data-hero-subtitle]",
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.7",
        )
        .to(
          "[data-hero-cta]",
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 },
          "-=0.55",
        )
        .to(
          "[data-hero-scroll]",
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-noise pt-24"
    >
      <Parallax speed={120} className="pointer-events-none absolute inset-0 -z-10">
        <div
          aria-hidden
          className="hero-mesh pointer-events-none absolute -inset-[15%]"
        />
      </Parallax>
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
          <div
            data-hero-badge
            className="gsap-init-hidden inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-foreground-muted shadow-[var(--shadow-card)] backdrop-blur"
          >
            <span className="relative inline-flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--success)]" />
            </span>
            <span className="text-foreground">{t("available")}</span>
          </div>

          <h1 className="max-w-4xl font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5rem]">
            <span className="flex flex-wrap justify-start gap-x-[0.3em] gap-y-1 sm:justify-center">
              {wordsBefore.map((word, i) => (
                <span
                  key={`b-${i}`}
                  data-hero-word
                  className="gsap-init-hidden inline-block"
                >
                  {word}
                </span>
              ))}
              <span
                data-hero-word
                className="gsap-init-hidden relative inline-block"
              >
                <span className="gradient-text">{accent}</span>
                <svg
                  data-hero-underline
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="gsap-init-hidden absolute -bottom-1 left-0 h-2 w-full text-[color:var(--accent-2)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                >
                  <path d="M3 8 C 50 2, 150 2, 197 8" />
                </svg>
              </span>
              {wordsAfter.map((word, i) => (
                <span
                  key={`a-${i}`}
                  data-hero-word
                  className="gsap-init-hidden inline-block"
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p
            data-hero-subtitle
            className="gsap-init-hidden max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg md:text-xl"
          >
            {t("subtitle")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic strength={22} radius={160}>
              <Link
                data-hero-cta
                href="/services"
                className="gsap-init-hidden btn-gradient group inline-flex h-13 min-h-[3.25rem] items-center justify-center gap-2 rounded-full px-7 text-base font-medium text-white shadow-[0_12px_30px_-10px_var(--accent)] transition-all hover:shadow-[0_18px_36px_-10px_var(--accent)] active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                {t("ctaPrimary")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
            </Magnetic>
            <Magnetic strength={16} radius={140}>
              <Link
                data-hero-cta
                href="/contact"
                className="gsap-init-hidden inline-flex h-13 min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/80 px-7 text-base font-medium text-foreground backdrop-blur transition-all hover:border-foreground hover:bg-surface active:scale-[0.98]"
              >
                {t("ctaSecondary")}
              </Link>
            </Magnetic>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground-subtle">
        <div data-hero-scroll className="gsap-init-hidden">
          <div className="hero-scroll-nudge flex flex-col items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Scroll
            </span>
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
