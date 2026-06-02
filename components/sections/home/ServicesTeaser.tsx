import { ArrowRight, Globe, Layers, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const ITEMS = [
  {
    key: "web",
    icon: Globe,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    key: "mobile",
    icon: Smartphone,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    key: "webapp",
    icon: Layers,
    color: "from-violet-500/20 to-fuchsia-500/20",
  },
] as const;

export function ServicesTeaser() {
  const t = useTranslations("servicesTeaser");

  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <SectionReveal direction="up">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            const itemKey = item.key as "web" | "mobile" | "webapp";
            return (
              <SectionReveal
                key={item.key}
                delay={i * 0.1}
                direction="up"
                className="group"
              >
                <Link
                  href="/services"
                  className="card relative flex h-full flex-col gap-5 overflow-hidden p-7 sm:p-8 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80`}
                  />
                  <div className="relative flex flex-col gap-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-2 text-foreground transition-colors group-hover:border-foreground/30 group-hover:text-[color:var(--accent)]">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                      {t(`items.${itemKey}.title`)}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground-muted">
                      {t(`items.${itemKey}.desc`)}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--accent)]">
                      Learn more
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal direction="up" delay={0.3} className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong bg-surface px-6 text-sm font-medium text-foreground transition-all hover:border-foreground hover:bg-surface-2"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </SectionReveal>
      </Container>
    </section>
  );
}
