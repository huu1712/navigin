"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. */
  max?: number;
  /** Glow spotlight that follows the cursor. */
  spotlight?: boolean;
};

/**
 * Wraps content in a div that tilts in 3D toward the cursor on hover
 * and (optionally) shows a soft spotlight glow tracking the pointer.
 *
 * Used to add tactile depth to card grids without changing their markup.
 */
export function Tilt({
  children,
  className,
  max = 8,
  spotlight = true,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduced || isTouch) return;

    const quickRotX = gsap.quickTo(inner, "rotateX", {
      duration: 0.5,
      ease: "power3.out",
    });
    const quickRotY = gsap.quickTo(inner, "rotateY", {
      duration: 0.5,
      ease: "power3.out",
    });

    const onMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      // Map 0..1 → -max..+max degrees, flipped on Y so the card leans
      // toward the cursor (not away from it).
      quickRotY((px - 0.5) * max * 2);
      quickRotX(-(py - 0.5) * max * 2);

      const glow = glowRef.current;
      if (glow) {
        glow.style.setProperty("--spot-x", `${px * 100}%`);
        glow.style.setProperty("--spot-y", `${py * 100}%`);
        glow.style.opacity = "1";
      }
    };

    const onLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    wrapper.addEventListener("pointermove", onMove);
    wrapper.addEventListener("pointerleave", onLeave);

    return () => {
      wrapper.removeEventListener("pointermove", onMove);
      wrapper.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(inner);
    };
  }, [max]);

  return (
    <div
      ref={wrapperRef}
      className={cn("group/tilt relative h-full", className)}
      style={{ perspective: "900px" }}
    >
      <div
        ref={innerRef}
        className="relative h-full transition-transform [transform-style:preserve-3d]"
      >
        {children}
        {spotlight && (
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--accent) 22%, transparent), transparent 55%)",
              mixBlendMode: "soft-light",
            }}
          />
        )}
      </div>
    </div>
  );
}
