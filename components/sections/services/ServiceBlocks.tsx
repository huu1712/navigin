"use client";

import {
  ArrowRight,
  Check,
  Clock,
  Globe,
  Layers,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/motion/SectionReveal";

const SERVICES = [
  {
    key: "web",
    icon: Globe,
    accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
    iconBg: "bg-blue-500/10 text-blue-500",
    serviceParam: "web",
  },
  {
    key: "mobile",
    icon: Smartphone,
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconBg: "bg-amber-500/10 text-amber-600",
    serviceParam: "mobile",
  },
  {
    key: "webapp",
    icon: Layers,
    accent: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    iconBg: "bg-violet-500/10 text-violet-500",
    serviceParam: "webapp",
  },
] as const;

type ServiceKey = (typeof SERVICES)[number]["key"];

export function ServiceBlocks() {
  const t = useTranslations("services.items");
  const tCommon = useTranslations("common");

  return (
    <section className="py-16 sm:py-24">
      <Container size="wide">
        <div className="flex flex-col gap-20 sm:gap-28">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            const key = service.key as ServiceKey;
            const includes = t.raw(`${key}.includes`) as string[];
            const techList = t.raw(`${key}.techList`) as string[];
            const isEven = idx % 2 === 1;
            return (
              <SectionReveal
                key={service.key}
                direction="up"
                className={`grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 ${
                  isEven ? "" : ""
                }`}
              >
                {/* Left: Visual */}
                <div
                  className={`relative lg:col-span-5 ${
                    isEven ? "lg:order-2" : ""
                  }`}
                >
                  <div className="card relative overflow-hidden p-8 sm:p-10">
                    <div
                      className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${service.accent} blur-3xl`}
                    />
                    <div className="relative flex flex-col gap-6">
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                        className={`inline-flex h-20 w-20 items-center justify-center rounded-3xl ${service.iconBg} shadow-[var(--shadow-card)]`}
                      >
                        <Icon className="h-10 w-10" strokeWidth={1.8} />
                      </motion.div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                          0{idx + 1} / Service
                        </p>
                        <p className="mt-3 font-display text-lg text-foreground">
                          {t(`${key}.tagline`)}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <div className="rounded-2xl border border-border bg-surface-2 p-4">
                          <div className="flex items-center gap-2 text-xs text-foreground-subtle">
                            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                            <span className="uppercase tracking-wider">
                              {tCommon("timeline")}
                            </span>
                          </div>
                          <p className="mt-2 font-display text-base font-semibold text-foreground">
                            {t(`${key}.timeline`)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-surface-2 p-4">
                          <div className="flex items-center gap-2 text-xs text-foreground-subtle">
                            <Wallet className="h-3.5 w-3.5" strokeWidth={2} />
                            <span className="uppercase tracking-wider">
                              {tCommon("from")}
                            </span>
                          </div>
                          <p className="mt-2 font-display text-base font-semibold text-foreground">
                            {t(`${key}.priceFrom`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div
                  className={`lg:col-span-7 ${isEven ? "lg:order-1" : ""}`}
                >
                  <div className="flex flex-col gap-5">
                    <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                      {t(`${key}.name`)}
                    </h2>
                    <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                      {t(`${key}.description`)}
                    </p>

                    <div className="mt-2">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                        {tCommon("includes")}
                      </h4>
                      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {includes.map((line, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[color:var(--accent)]">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            <span className="text-sm leading-relaxed text-foreground">
                              {line}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                        {tCommon("techStack")}
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {techList.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <Link
                        href={{
                          pathname: "/contact",
                          query: { service: service.serviceParam },
                        }}
                        className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
                      >
                        {t(`${key}.cta`)}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          strokeWidth={2.5}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
