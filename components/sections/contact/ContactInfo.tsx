"use client";

import { useState } from "react";
import { Check, Copy, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

import { SITE } from "@/lib/constants";

export function ContactInfo() {
  const t = useTranslations("contact.info");
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="card p-6 sm:p-7">
        <header className="flex flex-col gap-1.5">
          <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
            {t("title")}
          </h2>
          <p className="text-sm text-foreground-muted">{t("subtitle")}</p>
        </header>

        <ul className="mt-6 flex flex-col gap-3">
          <li>
            <div className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-2 p-4 transition-colors hover:border-foreground/20">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[color:var(--accent)]">
                <Mail className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-wider text-foreground-subtle">
                  {t("email")}
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="block truncate text-sm font-medium text-foreground transition-colors hover:text-[color:var(--accent)]"
                >
                  {SITE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={t("copy")}
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      className="text-[color:var(--success)]"
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                    >
                      <Copy className="h-4 w-4" strokeWidth={2} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </li>

          <li>
            <a
              href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-2 p-4 transition-colors hover:border-foreground/20"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(22,163,74,0.10)] text-[color:var(--success)]">
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-wider text-foreground-subtle">
                  {t("whatsapp")}
                </p>
                <p className="text-sm font-medium text-foreground transition-colors group-hover:text-[color:var(--accent)]">
                  {t("whatsappValue")}
                </p>
              </div>
            </a>
          </li>

          <li>
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-2 p-4 transition-colors hover:border-foreground/20"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Send className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-wider text-foreground-subtle">
                  {t("telegram")}
                </p>
                <p className="text-sm font-medium text-foreground transition-colors group-hover:text-[color:var(--accent)]">
                  {t("telegramValue")}
                </p>
              </div>
            </a>
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-2-soft)] text-[color:var(--accent-2)]">
              <MapPin className="h-4 w-4" strokeWidth={2} />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-foreground-subtle">
                {t("locationTitle")}
              </p>
              <p className="text-sm font-medium text-foreground">
                {t("locationValue")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(22,163,74,0.10)] text-[color:var(--success)]">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--success)]" />
              </span>
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-foreground-subtle">
                {t("responseTitle")}
              </p>
              <p className="text-sm font-medium text-foreground">
                {t("responseValue")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="text-[11px] uppercase tracking-wider text-foreground-subtle">
            {t("social")}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/20"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/20"
            >
              <FaLinkedinIn className="h-3.5 w-3.5" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/20"
            >
              <FaFacebookF className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Map illustration */}
      <div className="card relative overflow-hidden aspect-[16/9] sm:aspect-[16/10]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-fuchsia-500/20" />
        <div className="absolute inset-0 bg-noise opacity-40" />
        {/* Grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-12 w-12 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent)] opacity-30" />
            <span className="absolute inline-flex h-8 w-8 rounded-full bg-[color:var(--accent)]/30" />
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--accent)] text-white shadow-lg">
              <MapPin className="h-3 w-3" strokeWidth={2.5} />
            </span>
          </span>
        </div>
        <div className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
          {t("locationValue")}
        </div>
      </div>
    </div>
  );
}
