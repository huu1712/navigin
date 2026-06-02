import { z } from "zod";

export type ContactValidation = {
  nameRequired: string;
  nameMin: string;
  emailRequired: string;
  emailInvalid: string;
  serviceRequired: string;
  budgetRequired: string;
  descriptionRequired: string;
  descriptionMin: string;
  timelineRequired: string;
  sourceRequired: string;
};

export const SERVICE_OPTIONS = ["web", "mobile", "webapp", "other"] as const;
export const BUDGET_OPTIONS = [
  "small",
  "medium",
  "large",
  "xlarge",
  "discuss",
] as const;
export const TIMELINE_OPTIONS = [
  "asap",
  "month",
  "quarter",
  "flexible",
] as const;
export const SOURCE_OPTIONS = [
  "google",
  "referral",
  "social",
  "other",
] as const;

export function buildContactSchema(v: ContactValidation) {
  return z.object({
    name: z
      .string({ message: v.nameRequired })
      .trim()
      .min(2, v.nameMin),
    email: z
      .string({ message: v.emailRequired })
      .trim()
      .min(1, v.emailRequired)
      .email(v.emailInvalid),
    phone: z.string().optional(),
    service: z.enum(SERVICE_OPTIONS, { message: v.serviceRequired }),
    budget: z.enum(BUDGET_OPTIONS, { message: v.budgetRequired }),
    description: z
      .string({ message: v.descriptionRequired })
      .trim()
      .min(50, v.descriptionMin),
    timeline: z.enum(TIMELINE_OPTIONS, { message: v.timelineRequired }),
    source: z.enum(SOURCE_OPTIONS, { message: v.sourceRequired }),
    // honeypot
    website: z.string().optional(),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;
