"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import {
  FieldWrapper,
  Input,
  Select,
  Textarea,
} from "@/components/ui/FormField";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  SOURCE_OPTIONS,
  TIMELINE_OPTIONS,
  buildContactSchema,
  type ContactFormValues,
} from "@/lib/schemas";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tVal = useTranslations("contact.validation");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const initialService = useMemo(() => {
    const s = searchParams.get("service");
    return SERVICE_OPTIONS.includes(s as (typeof SERVICE_OPTIONS)[number])
      ? (s as (typeof SERVICE_OPTIONS)[number])
      : undefined;
  }, [searchParams]);

  const schema = useMemo(
    () =>
      buildContactSchema({
        nameRequired: tVal("nameRequired"),
        nameMin: tVal("nameMin"),
        emailRequired: tVal("emailRequired"),
        emailInvalid: tVal("emailInvalid"),
        serviceRequired: tVal("serviceRequired"),
        budgetRequired: tVal("budgetRequired"),
        descriptionRequired: tVal("descriptionRequired"),
        descriptionMin: tVal("descriptionMin"),
        timelineRequired: tVal("timelineRequired"),
        sourceRequired: tVal("sourceRequired"),
      }),
    [tVal],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      service: initialService,
    },
  });

  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (data: ContactFormValues) => {
    if (data.website && data.website.length > 0) {
      setStatus("success");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="card relative overflow-hidden p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="flex min-h-[480px] flex-col items-center justify-center gap-4 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(22,163,74,0.12)] text-[color:var(--success)]"
            >
              <CheckCircle2 className="h-10 w-10" strokeWidth={1.8} />
            </motion.div>
            <h3 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {t("successTitle")}
            </h3>
            <p className="max-w-md text-base text-foreground-muted">
              {t("successMessage")}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 inline-flex h-11 items-center gap-1.5 rounded-full border border-border-strong bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
            >
              ← Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            <header className="flex flex-col gap-1.5">
              <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {t("title")}
              </h3>
              <p className="text-sm text-foreground-muted">{t("subtitle")}</p>
            </header>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FieldWrapper
                label={t("name")}
                required
                error={errors.name?.message}
              >
                <Input
                  type="text"
                  autoComplete="name"
                  placeholder={t("namePlaceholder")}
                  hasError={!!errors.name}
                  {...register("name")}
                />
              </FieldWrapper>
              <FieldWrapper
                label={t("email")}
                required
                error={errors.email?.message}
              >
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  hasError={!!errors.email}
                  {...register("email")}
                />
              </FieldWrapper>
            </div>

            <FieldWrapper
              label={t("phone")}
              error={errors.phone?.message}
            >
              <Input
                type="tel"
                autoComplete="tel"
                placeholder={t("phonePlaceholder")}
                hasError={!!errors.phone}
                {...register("phone")}
              />
            </FieldWrapper>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FieldWrapper
                label={t("service")}
                required
                error={errors.service?.message}
              >
                <Select
                  defaultValue=""
                  hasError={!!errors.service}
                  {...register("service")}
                >
                  <option value="" disabled>
                    {t("servicePlaceholder")}
                  </option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`serviceOptions.${opt}`)}
                    </option>
                  ))}
                </Select>
              </FieldWrapper>
              <FieldWrapper
                label={t("budget")}
                required
                error={errors.budget?.message}
              >
                <Select
                  defaultValue=""
                  hasError={!!errors.budget}
                  {...register("budget")}
                >
                  <option value="" disabled>
                    {t("budgetPlaceholder")}
                  </option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`budgetOptions.${opt}`)}
                    </option>
                  ))}
                </Select>
              </FieldWrapper>
            </div>

            <FieldWrapper
              label={t("description")}
              required
              error={errors.description?.message}
            >
              <Textarea
                placeholder={t("descriptionPlaceholder")}
                hasError={!!errors.description}
                {...register("description")}
              />
            </FieldWrapper>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FieldWrapper
                label={t("timeline")}
                required
                error={errors.timeline?.message}
              >
                <Select
                  defaultValue=""
                  hasError={!!errors.timeline}
                  {...register("timeline")}
                >
                  <option value="" disabled>
                    {t("timelinePlaceholder")}
                  </option>
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`timelineOptions.${opt}`)}
                    </option>
                  ))}
                </Select>
              </FieldWrapper>
              <FieldWrapper
                label={t("source")}
                required
                error={errors.source?.message}
              >
                <Select
                  defaultValue=""
                  hasError={!!errors.source}
                  {...register("source")}
                >
                  <option value="" disabled>
                    {t("sourcePlaceholder")}
                  </option>
                  {SOURCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(`sourceOptions.${opt}`)}
                    </option>
                  ))}
                </Select>
              </FieldWrapper>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("website")}
            />

            {status === "error" && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-[color:var(--danger)]/30 bg-[color:var(--danger)]/5 p-4 text-sm text-[color:var(--danger)]">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="font-semibold">{t("errorTitle")}</p>
                  <p className="mt-0.5 opacity-90">{t("errorMessage")}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || status === "submitting"}
              className="btn-gradient group inline-flex h-13 min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full px-7 text-base font-medium text-white shadow-[0_12px_30px_-10px_var(--accent)] transition-all disabled:opacity-60 disabled:pointer-events-none"
            >
              {isSubmitting || status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                  {t("submitting")}
                </>
              ) : (
                <>
                  {t("submit")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
