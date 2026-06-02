import { useTranslations } from "next-intl";
import { Mail, MapPin, Send } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/Logo";
import { SITE, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const services = [
    { name: t("servicesCol"), href: "/services" as const, label: "Website" },
    { name: t("servicesCol"), href: "/services" as const, label: "Mobile App" },
    { name: t("servicesCol"), href: "/services" as const, label: "Web App" },
  ];

  return (
    <footer className="relative mt-24 border-t border-border bg-surface/40">
      <Container size="wide" className="py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 max-w-sm">
            <Logo />
            <p className="text-sm leading-relaxed text-foreground-muted">
              {t("tagline")}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/20"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/20"
              >
                <FaLinkedinIn className="h-3.5 w-3.5" />
              </a>
              <a
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/20"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/20"
              >
                <FaFacebookF className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("navigation")}
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("servicesCol")}
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s, i) => (
                <li key={i}>
                  <Link
                    href={s.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  {tNav("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("contactCol")}
            </h4>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-foreground-muted">
              <li className="flex items-start gap-2.5">
                <Mail
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--accent)]"
                  strokeWidth={2}
                />
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--accent)]"
                  strokeWidth={2}
                />
                <span>{t("location")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--success)] pulse-dot" />
                <span>{t("responseTime")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-foreground-subtle">
            © {new Date().getFullYear()} Navigin. {t("rights")}
          </p>
          <p className="text-xs text-foreground-subtle">
            {t("builtWith")}{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              Next.js
            </a>{" "}
            ·{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              Tailwind
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
