"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  /** Vertical distance the layer drifts (px) over the scrub range. */
  speed?: number;
  className?: string;
};

/**
 * Scroll-driven vertical parallax for background layers. Wrap a
 * positioned (absolute / fixed) decorative element and it'll slowly
 * translate as the user scrolls past its parent section.
 */
export function Parallax({ children, speed = 80, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const parent = el.parentElement;
    if (!parent) return;

    const tween = gsap.fromTo(
      el,
      { y: -speed / 2 },
      {
        y: speed / 2,
        ease: "none",
        scrollTrigger: {
          trigger: parent,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
