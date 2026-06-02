import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/ui/PageHero";
import { PricingTables } from "@/components/sections/pricing/PricingTables";
import { WhatsIncluded } from "@/components/sections/pricing/WhatsIncluded";
import { PaymentTerms } from "@/components/sections/pricing/PaymentTerms";
import { PricingFaq } from "@/components/sections/pricing/PricingFaq";
import { CtaBanner } from "@/components/sections/home/CtaBanner";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing.hero" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricing.hero" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("pricing") },
        ]}
      />
      <PricingTables />
      <WhatsIncluded />
      <PaymentTerms />
      <PricingFaq />
      <CtaBanner />
    </>
  );
}
