# Navigin — Freelance Web & App Developer

A professional, conversion-optimized freelancer website for a web & mobile app developer. Built with Next.js 16, Tailwind CSS v4, Framer Motion and `next-intl` (Vietnamese + English).

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Animation**: Framer Motion
- **i18n**: `next-intl` — Vietnamese (default) + English
- **Theme**: `next-themes` (Light / Dark / System)
- **Icons**: `lucide-react` + `react-icons` (brand icons)
- **Forms**: `react-hook-form` + `zod`
- **Email**: Resend API (graceful no-op fallback in dev)
- **Fonts**: Bricolage Grotesque (display), DM Sans (body), JetBrains Mono (mono)

## Pages

- `/` — Home (hero, stats, services teaser, projects, tech marquee, testimonials, CTA)
- `/services` — Detailed services + 5-step process + FAQ
- `/pricing` — Tier toggle for Website / Mobile App / Web App + payment terms + FAQ
- `/about` — Hero, story, skill bars, timeline, education, values, fun facts
- `/contact` — Contact form (RHF + Zod) + info card + Calendly booking section
- All pages support `/` (vi) and `/en` URL prefixes

## Develop

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable               | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`       | Resend API key for sending contact-form emails                |
| `RESEND_FROM_EMAIL`    | Verified "from" address (e.g. `Navigin <hello@navigin.dev>`)  |
| `CONTACT_TO_EMAIL`     | Inbox that receives contact-form submissions                  |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used by sitemap / OG tags)                |

> If `RESEND_API_KEY` is not set, the contact form will still validate and "succeed" locally, but the payload will be logged to the server console instead of emailed.

## Project structure

```
app/
  layout.tsx              ← root <html> shell + fonts
  globals.css             ← Tailwind v4 + design tokens
  sitemap.ts, robots.ts
  api/contact/route.ts    ← Resend integration
  [locale]/
    layout.tsx            ← NextIntlClientProvider + ThemeProvider + chrome
    page.tsx              ← Home
    services/page.tsx
    pricing/page.tsx
    about/page.tsx
    contact/page.tsx
    not-found.tsx
components/
  layout/                 ← Navbar, Footer, ThemeToggle, LanguageSwitcher, Logo
  motion/                 ← SectionReveal, AnimatedCounter
  providers/              ← ThemeProvider, HtmlLangUpdater
  sections/
    home/                 ← Hero, Stats, ServicesTeaser, FeaturedProjects, ...
    services/             ← ServiceBlocks, ProcessTimeline, ServicesFaq
    pricing/              ← PricingTables, WhatsIncluded, PaymentTerms, PricingFaq
    about/                ← AboutHero, AboutStory, Skills, ExperienceTimeline, ...
    contact/              ← ContactForm, ContactInfo, BookCall
  ui/                     ← Button, Badge, Container, SectionHeader, Accordion, ...
i18n/
  routing.ts              ← locales config (vi default, as-needed prefix)
  navigation.ts           ← typed Link / useRouter / usePathname
  request.ts              ← message loader
messages/
  vi.json
  en.json
proxy.ts                  ← Next.js 16 proxy (replaces middleware) — locale routing
lib/
  cn.ts                   ← clsx + tailwind-merge
  animations.ts           ← framer-motion variants
  constants.ts            ← SITE info, nav links, locale list
  schemas.ts              ← Zod schema for contact form (i18n-aware)
```

## Customization

- **Branding & colors**: edit CSS custom properties in `app/globals.css` (`:root` and `.dark`)
- **Text / translations**: edit `messages/vi.json` and `messages/en.json`
- **Site info / social**: edit `lib/constants.ts`
- **Add a locale**: add it to `routing.locales` in `i18n/routing.ts` and create the matching `messages/<locale>.json`

## Deployment

The app is ready for Vercel:

```bash
vercel
```

Don't forget to add the env vars in the Vercel dashboard.
