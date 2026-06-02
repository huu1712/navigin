import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { ServiceBlocks } from "@/components/sections/services/ServiceBlocks";
import { ProcessTimeline } from "@/components/sections/services/ProcessTimeline";
import { ServicesFaq } from "@/components/sections/services/ServicesFaq";
import { CtaBanner } from "@/components/sections/home/CtaBanner";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.hero" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services.hero" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: t("breadcrumbHome"), href: "/" },
          { label: t("breadcrumbCurrent") },
        ]}
      />
      <ServiceBlocks />
      <ProcessTimeline />
      <ServicesFaq />
      <CtaBanner />
    </>
  );
}
