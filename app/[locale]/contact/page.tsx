import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { BookCall } from "@/components/sections/contact/BookCall";
import { SectionReveal } from "@/components/motion/SectionReveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact.hero" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("contact") },
        ]}
      />

      {/* Availability badge under hero */}
      <Container size="wide" className="-mt-6 flex justify-center pb-4 sm:pb-8">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)]">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--success)]" />
          </span>
          {t("availableNow")}
        </div>
      </Container>

      <section className="pb-16 sm:pb-24">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            <SectionReveal direction="left" className="lg:col-span-2">
              <ContactInfo />
            </SectionReveal>
            <SectionReveal direction="right" className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="card flex h-[600px] items-center justify-center p-8 text-foreground-subtle">
                    Loading…
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </SectionReveal>
          </div>
        </Container>
      </section>

      <BookCall />
    </>
  );
}
