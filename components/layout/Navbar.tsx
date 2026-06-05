"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const scrollAfterMobileNavRef = useRef(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Close mobile menu when the route changes (derived-state pattern).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!scrollAfterMobileNavRef.current || mobileOpen) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = prefersReduced ? "auto" : "smooth";

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior });
    };

    // Wait until body overflow is restored, then scroll (same page + after navigation).
    scrollToTop();
    const frame = window.requestAnimationFrame(() => {
      scrollToTop();
      scrollAfterMobileNavRef.current = false;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, mobileOpen]);

  const handleMobileNavClick =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      const isSamePage =
        href === "/"
          ? pathname === "/"
          : pathname.startsWith(href);

      scrollAfterMobileNavRef.current = true;
      setMobileOpen(false);

      if (isSamePage) {
        event.preventDefault();
      }
    };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-md backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container
        size="wide"
        className="flex h-16 items-center justify-between gap-4 sm:h-18"
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative inline-flex items-center px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {t(link.labelKey)}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-[color:var(--accent)]"
                    transition={{
                      type: "spring",
                      bounce: 0.18,
                      duration: 0.55,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link
            href="/contact"
            className="hidden h-10 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)] transition-all hover:opacity-90 active:scale-[0.98] sm:inline-flex"
          >
            {t("hireMe")}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-2 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </div>
      </Container>

      <motion.div
        aria-hidden
        style={{
          scaleX: progress,
          backgroundImage:
            "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent) 100%)",
        }}
        className="absolute top-0 left-0 z-10 h-1 w-full origin-left rounded-full shadow-[0_0_12px_var(--accent)]"
      />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
          >
            <Container size="wide" className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      scroll
                      onClick={handleMobileNavClick(link.href)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-surface-2 text-foreground"
                          : "text-foreground-muted hover:bg-surface-2 hover:text-foreground",
                      )}
                    >
                      {t(link.labelKey)}
                      <ArrowRight
                        className="h-4 w-4 opacity-60"
                        strokeWidth={2}
                      />
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-4">
                <LanguageSwitcher variant="inline" />
                <ThemeToggle />
              </div>
              <Link
                href="/contact"
                scroll
                onClick={handleMobileNavClick("/contact")}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background"
              >
                {t("hireMe")}
                <ArrowRight className="ml-1.5 h-4 w-4" strokeWidth={2} />
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
