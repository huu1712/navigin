import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

type Project = {
  key: string;
  index: string;
  name: string;
  year: string;
  tags: readonly string[];
  demo: string;
  hue: string;
};

const PROJECTS: readonly Project[] = [
  {
    key: "mit",
    index: "001",
    name: "MIT — Mijuit",
    year: "2023 — 2025",
    tags: ["Angular", "TypeScript", "Bootstrap"],
    demo: "https://mit.mijuit.co.kr/main_renewal",
    hue: "#aeff00",
  },
  {
    key: "order",
    index: "002",
    name: "Mijuit Order System",
    year: "2023 — 2025",
    tags: ["Angular", "TypeScript", "Bootstrap", "Chart.js"],
    demo: "https://sorder.mijuit.co.kr/loginERP",
    hue: "#f59e0b",
  },
  {
    key: "mood",
    index: "003",
    name: "Trân Châu Tươi Mood",
    year: "2024 — 2025",
    tags: ["Angular", "TypeScript", "PrimeNG", "Bootstrap"],
    demo: "https://tranchaumood.com/",
    hue: "#ec4899",
  },
  {
    key: "chamwoodon",
    index: "004",
    name: "Chamwoodon",
    year: "2024 — 2025",
    tags: ["Angular", "Bootstrap", "REST API"],
    demo: "https://chamwoodon.mijuit.co.kr/main",
    hue: "#22d3ee",
  },
  {
    key: "datsan",
    index: "005",
    name: "Đặt sân thể thao",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    demo: "https://datsanthethao.vn/",
    hue: "#6366f1",
  },
  {
    key: "hanroyal",
    index: "006",
    name: "HAN Royal Meat",
    year: "2025",
    tags: ["Angular", "TypeScript", "Bootstrap"],
    demo: "https://hanroyalmeat.com/",
    hue: "#ef4444",
  },
] as const;

function getInitials(name: string) {
  const cleaned = name.replace(/—|-/g, " ").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function FeaturedProjects() {
  const t = useTranslations("projects");

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

        <div className="mt-16 flex flex-col gap-12 sm:gap-20">
          {PROJECTS.map((project, i) => {
            const isEven = i % 2 === 1;
            const initials = getInitials(project.name);
            return (
              <SectionReveal
                key={project.key}
                delay={0.05}
                direction="up"
                className="group/project grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} – Open live site`}
                  className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-border transition-transform duration-500 hover:-translate-y-1 ${
                    isEven ? "md:order-2" : ""
                  }`}
                  style={{
                    backgroundColor: project.hue,
                    backgroundImage: `radial-gradient(120% 100% at 0% 0%, color-mix(in oklab, ${project.hue} 75%, white) 0%, ${project.hue} 45%, color-mix(in oklab, ${project.hue} 70%, black) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 bg-noise opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

                  <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white backdrop-blur">
                    {project.index}
                  </div>

                  <div className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" />
                    Live
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[6rem] font-bold leading-none text-white/95 drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:text-[7rem]">
                      {initials}
                    </span>
                  </div>

                  <div className="absolute right-6 bottom-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform duration-300 group-hover/project:rotate-45">
                    <ArrowUpRight
                      className="h-4 w-4 text-white"
                      strokeWidth={2.25}
                    />
                  </div>
                </a>

                <div
                  className={`flex flex-col gap-5 ${isEven ? "md:order-1" : ""}`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                      {project.index} / Featured
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                    {project.name}
                  </h3>

                  <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                    {t(`items.${project.key}.desc`)}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                    >
                      <span>{t("viewLive")}</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5"
                        strokeWidth={2.25}
                      />
                    </a>
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
