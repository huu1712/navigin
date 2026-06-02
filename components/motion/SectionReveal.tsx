"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Direction = "up" | "down" | "left" | "right" | "none";

type Tag = "div" | "section" | "article" | "header" | "footer" | "li" | "ul";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
  className?: string;
  as?: Tag;
};

const OFFSET = 36;

export function SectionReveal({
  children,
  delay = 0,
  duration = 0.85,
  direction = "up",
  once = true,
  className,
  as = "div",
}: Props) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const fromState: gsap.TweenVars = { opacity: 0 };
    // Reduced-motion users get a gentle fade without translation, so they
    // still get a scroll-driven reveal cue instead of an inert page.
    if (!reduced) {
      if (direction === "up") fromState.y = OFFSET;
      if (direction === "down") fromState.y = -OFFSET;
      if (direction === "left") fromState.x = -OFFSET;
      if (direction === "right") fromState.x = OFFSET;
    }

    // Take control of inline styles: this also overrides the .gsap-init-hidden
    // CSS class that prevents FOUC before JS hydrates.
    gsap.set(el, fromState);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: reduced ? 0.35 : duration,
          delay: reduced ? 0 : delay,
          ease: reduced ? "power1.out" : "power3.out",
          overwrite: "auto",
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.to(el, {
              ...fromState,
              duration: 0.45,
              ease: "power2.in",
              overwrite: "auto",
            });
          },
    });

    // ScrollTrigger calculates positions from current layout — if fonts /
    // images settle later it may miss the initial in-view check, so refresh
    // once after layout has stabilized.
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshTimer);
      trigger.kill();
    };
  }, [delay, duration, direction, once]);

  const combinedClassName = cn("gsap-init-hidden", className);
  // The element-specific Ref types (HTMLDivElement, HTMLLIElement, ...) are
  // mutually incompatible, but at runtime our ref always points to some
  // HTMLElement subtype, so an unknown cast is the safe escape hatch.
  const refProp = elementRef as unknown as React.Ref<HTMLDivElement>;

  switch (as) {
    case "section":
      return (
        <section ref={refProp as unknown as React.Ref<HTMLElement>} className={combinedClassName}>
          {children}
        </section>
      );
    case "article":
      return (
        <article ref={refProp as unknown as React.Ref<HTMLElement>} className={combinedClassName}>
          {children}
        </article>
      );
    case "header":
      return (
        <header ref={refProp as unknown as React.Ref<HTMLElement>} className={combinedClassName}>
          {children}
        </header>
      );
    case "footer":
      return (
        <footer ref={refProp as unknown as React.Ref<HTMLElement>} className={combinedClassName}>
          {children}
        </footer>
      );
    case "li":
      return (
        <li ref={refProp as unknown as React.Ref<HTMLLIElement>} className={combinedClassName}>
          {children}
        </li>
      );
    case "ul":
      return (
        <ul ref={refProp as unknown as React.Ref<HTMLUListElement>} className={combinedClassName}>
          {children}
        </ul>
      );
    case "div":
    default:
      return (
        <div ref={refProp} className={combinedClassName}>
          {children}
        </div>
      );
  }
}
