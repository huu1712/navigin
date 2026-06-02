import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";

export function CtaBanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <SectionReveal direction="up">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-foreground p-8 text-background sm:p-14 lg:p-20">
            {/* Background mesh (parallax) */}
            <Parallax speed={110} className="absolute inset-0">
              <div
                aria-hidden
                className="absolute -inset-[10%] opacity-80"
                style={{
                  backgroundImage:
                    "radial-gradient(at 20% 30%, rgba(37,99,235,0.55) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(245,158,11,0.45) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(99,102,241,0.45) 0px, transparent 60%)",
                }}
              />
            </Parallax>
            <div className="absolute inset-0 bg-noise opacity-50" />

            <div className="relative flex flex-col items-start gap-6 sm:items-center sm:text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Limited slots for Q4</span>
              </span>
              <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-background sm:text-5xl md:text-6xl">
                {t("title")}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
                {t("subtitle")}
              </p>
              <Magnetic strength={24} radius={170}>
                <Link
                  href="/contact"
                  className="group inline-flex h-13 min-h-[3.25rem] items-center gap-2 rounded-full bg-background px-7 text-base font-medium text-foreground transition-all hover:gap-3 hover:bg-background/95 active:scale-[0.98]"
                >
                  {t("button")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </Link>
              </Magnetic>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
