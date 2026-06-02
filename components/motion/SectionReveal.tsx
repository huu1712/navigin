"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "ul";
};

const offset = 36;

function buildVariants(
  direction: Direction,
  duration: number,
  delay: number,
): Variants {
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = offset;
  if (direction === "down") initial.y = -offset;
  if (direction === "left") initial.x = -offset;
  if (direction === "right") initial.x = offset;

  return {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

export function SectionReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  once = true,
  className,
  as = "div",
}: Props) {
  const prefersReduced = useReducedMotion();
  const variants = buildVariants(
    prefersReduced ? "none" : direction,
    prefersReduced ? 0 : duration,
    prefersReduced ? 0 : delay,
  );

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
