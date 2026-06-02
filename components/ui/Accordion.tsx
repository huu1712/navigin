"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

type Props = {
  items: AccordionItem[];
  className?: string;
  defaultOpenId?: string;
};

export function Accordion({ items, className, defaultOpenId }: Props) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "card overflow-hidden transition-all duration-300",
              open && "border-foreground/20",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
            >
              <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-all duration-300",
                  open
                    ? "rotate-45 border-[color:var(--accent)] bg-[var(--accent-soft)] text-[color:var(--accent)]"
                    : "",
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-foreground-muted sm:px-6 sm:pb-6 sm:text-base">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
