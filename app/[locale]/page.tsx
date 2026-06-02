import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/home/Hero";
import { Stats } from "@/components/sections/home/Stats";
import { ServicesTeaser } from "@/components/sections/home/ServicesTeaser";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { TechMarquee } from "@/components/sections/home/TechMarquee";
import { CtaBanner } from "@/components/sections/home/CtaBanner";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <ServicesTeaser />
      <FeaturedProjects />
      <TechMarquee />
      <CtaBanner />
    </>
  );
}
