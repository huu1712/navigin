import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("nav");
  return (
    <section className="flex min-h-[70svh] items-center py-32">
      <Container size="tight" className="text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-[color:var(--accent)]">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-foreground-muted sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 inline-flex">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              strokeWidth={2.5}
            />
            {t("home")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
