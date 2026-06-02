import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"] as const,
  defaultLocale: "vi",
  localePrefix: "as-needed",
  localeCookie: {
    name: "NAVIGIN_LOCALE",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type Locale = (typeof routing.locales)[number];
