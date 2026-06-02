"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
  /** Maximum translation, px. */
  strength?: number;
  /** Only react when cursor is within this distance of the element, px. */
  radius?: number;
  className?: string;
};

/**
 * Wraps content in a span that gently pulls toward the cursor when the
 * pointer is nearby. Pure GSAP — no React state.
 *
 * Skips entirely on touch devices and for users with `prefers-reduced-motion`.
 */
export function Magnetic({
  children,
  strength = 18,
  radius = 140,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduced || isTouch) return;

    const quickX = gsap.quickTo(el, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    const quickY = gsap.quickTo(el, "y", {
      duration: 0.55,
      ease: "power3.out",
    });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        quickX(0);
        quickY(0);
        return;
      }
      const falloff = 1 - dist / radius;
      quickX((dx / radius) * strength * falloff);
      quickY((dy / radius) * strength * falloff);
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={className ?? "inline-flex"}>
      {children}
    </span>
  );
}
