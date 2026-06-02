import { useTranslations } from "next-intl";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiDocker,
  SiFirebase,
  SiFigma,
  SiExpo,
  SiPrisma,
  SiVercel,
  SiGraphql,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbBrandReactNative } from "react-icons/tb";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";

const ROW_1 = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Prisma", Icon: SiPrisma },
  { name: "Vercel", Icon: SiVercel },
];

const ROW_2 = [
  { name: "React Native", Icon: TbBrandReactNative },
  { name: "Expo", Icon: SiExpo },
  { name: "Firebase", Icon: SiFirebase },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
  { name: "GraphQL", Icon: SiGraphql },
  { name: "Figma", Icon: SiFigma },
];

type TechItem = { name: string; Icon: React.ComponentType<{ className?: string }> };

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: TechItem[];
  direction?: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex w-max gap-3 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((item, i) => {
          const Icon = item.Icon;
          return (
            <div
              key={`${item.name}-${i}`}
              className="flex h-14 items-center gap-3 rounded-2xl border border-border bg-surface px-5 text-foreground transition-colors hover:border-foreground/20"
            >
              <Icon className="h-5 w-5 text-foreground-muted" />
              <span className="whitespace-nowrap font-mono text-sm font-medium">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TechMarquee() {
  const t = useTranslations("tech");

  return (
    <section className="relative py-20 sm:py-28">
      <Container size="wide">
        <SectionReveal direction="up">
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </SectionReveal>
      </Container>

      <div className="relative mt-14 flex flex-col gap-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />
        <MarqueeRow items={ROW_1} direction="left" />
        <MarqueeRow items={ROW_2} direction="right" />
      </div>
    </section>
  );
}
