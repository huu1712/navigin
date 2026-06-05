"use client";

import { useId, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Particles,
  ParticlesProvider,
  type ParticlesPluginRegistrar,
} from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// Must be a stable reference across the whole app lifecycle (tsParticles v4 requirement).
const initEngine: ParticlesPluginRegistrar = async (engine) => {
  await loadSlim(engine);
};

type ParticlesBackgroundProps = {
  /** Extra classes for the absolutely-positioned wrapper. */
  className?: string;
  /** Particle count. Defaults to a subtle 50. */
  quantity?: number;
  /** Flip the color logic — use on inverted backgrounds (e.g. dark CTA banner). */
  invert?: boolean;
};

export function ParticlesBackground({
  className = "",
  quantity = 50,
  invert = false,
}: ParticlesBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const isDark = invert
    ? resolvedTheme !== "dark"
    : resolvedTheme === "dark";

  // Unique per instance — multiple particle fields can coexist on one page.
  const instanceId = `tsparticles-${useId().replace(/:/g, "")}`;

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      background: { color: { value: "transparent" } },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.4 } },
        },
      },
      particles: {
        color: { value: isDark ? "#60a5fa" : "#2563eb" },
        links: {
          color: isDark ? "#60a5fa" : "#2563eb",
          distance: 150,
          enable: true,
          opacity: isDark ? 0.6 : 0.5,
          width: 1.2,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          outModes: { default: "out" },
          random: false,
          straight: false,
        },
        number: {
          value: quantity,
          density: { enable: true, width: 1200, height: 800 },
        },
        opacity: { value: isDark ? 0.95 : 0.8 },
        shape: { type: "circle" },
        size: { value: { min: 1.5, max: 4 } },
      },
    }),
    [isDark, quantity],
  );

  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id={instanceId}
        options={options}
        className={`pointer-events-none absolute inset-0 ${className}`}
      />
    </ParticlesProvider>
  );
}
