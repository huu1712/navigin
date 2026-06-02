"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Site-wide ambient background.
 *
 * Three large blurred gradient orbs. Each orb has two transform layers:
 *  - outer wrapper: slow drift loop via GSAP timeline
 *  - inner orb: subtle pointer-driven parallax
 *
 * Falls back to a static (still soft-glowing) layout when the user has
 * `prefers-reduced-motion: reduce`.
 */
export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const drifters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-orb-drift]"),
    );
    const parallaxers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-orb-parallax]"),
    );

    const ctx = gsap.context(() => {
      // ---------- drift ----------
      drifters.forEach((el, i) => {
        const dx = i % 2 === 0 ? 80 : -80;
        const dy = i === 1 ? 60 : -50;
        const dur = 18 + i * 7;

        if (reduced) {
          gsap.set(el, { x: dx * 0.2, y: dy * 0.2 });
          return;
        }

        gsap.to(el, {
          x: dx,
          y: dy,
          scale: 1.08,
          duration: dur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      if (reduced) return;

      // ---------- pointer parallax ----------
      const quickXs = parallaxers.map((el) =>
        gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
      );
      const quickYs = parallaxers.map((el) =>
        gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
      );

      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        parallaxers.forEach((_, i) => {
          const depth = (i + 1) * 18;
          quickXs[i](nx * depth);
          quickYs[i](ny * depth);
        });
      };

      window.addEventListener("pointermove", onMove, { passive: true });

      return () => {
        window.removeEventListener("pointermove", onMove);
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="ambient-bg pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          data-orb-drift
          className={`absolute ${orb.position} ${orb.size}`}
        >
          <div
            data-orb-parallax
            className={`h-full w-full rounded-full ${orb.opacity} ${orb.blur}`}
            style={{ background: orb.background }}
          />
        </div>
      ))}
    </div>
  );
}

const ORBS = [
  {
    position: "-left-[20vw] top-[5vh]",
    size: "h-[60vw] w-[60vw]",
    blur: "blur-[120px]",
    opacity: "opacity-60",
    background:
      "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 60%, transparent), transparent 65%)",
  },
  {
    position: "right-[-15vw] top-[35vh]",
    size: "h-[55vw] w-[55vw]",
    blur: "blur-[140px]",
    opacity: "opacity-50",
    background:
      "radial-gradient(circle at 70% 50%, color-mix(in oklab, var(--accent-2) 60%, transparent), transparent 65%)",
  },
  {
    position: "bottom-[-20vh] left-[30vw]",
    size: "h-[45vw] w-[45vw]",
    blur: "blur-[130px]",
    opacity: "opacity-45",
    background:
      "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent) 45%, transparent), transparent 70%)",
  },
] as const;
