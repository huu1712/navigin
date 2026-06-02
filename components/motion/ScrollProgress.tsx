"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Thin gradient bar pinned at the very top of the viewport that fills as
 * the user scrolls the page. Uses a scrubbed ScrollTrigger so the bar
 * follows scroll position frame-perfectly.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () =>
        Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        ),
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    const onResize = () => trigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        ref={barRef}
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent) 100%)",
          backgroundSize: "200% 100%",
          boxShadow: "0 0 12px color-mix(in oklab, var(--accent) 60%, transparent)",
        }}
      />
    </div>
  );
}
