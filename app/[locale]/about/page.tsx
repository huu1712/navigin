import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { Skills } from "@/components/sections/about/Skills";
import { TeamRoles } from "@/components/sections/about/TeamRoles";
import { Industries } from "@/components/sections/about/Industries";
import { Values } from "@/components/sections/about/Values";
import { WhyUs } from "@/components/sections/about/WhyUs";
import { CtaBanner } from "@/components/sections/home/CtaBanner";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return {
    title: tNav("about"),
    description: t("bio"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <AboutHero />
      <AboutStory />
      <Skills />
      <TeamRoles />
      <Industries />
      <Values />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
