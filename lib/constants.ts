import type { Locale } from "@/i18n/routing";

export const SITE = {
  name: "Navigin",
  url: "https://navigin.dev",
  email: "hello@navigin.dev",
  whatsapp: "+84909123456",
  telegram: "https://t.me/navigin",
  github: "https://github.com/navigin",
  linkedin: "https://linkedin.com/in/navigin",
  facebook: "https://facebook.com/navigin",
  calendly: "https://calendly.com/navigin/discovery",
};

export const NAV_LINKS: ReadonlyArray<{
  href: "/" | "/services" | "/pricing" | "/about" | "/contact";
  labelKey: "home" | "services" | "pricing" | "about" | "contact";
}> = [
  { href: "/", labelKey: "home" },
  { href: "/services", labelKey: "services" },
  { href: "/pricing", labelKey: "pricing" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
];

export const LOCALES: ReadonlyArray<{
  code: Locale;
  label: string;
  flag: string;
}> = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
];
