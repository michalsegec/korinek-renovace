# Kořínek Renovace: portfolio website

A website for a **fictional** bathroom and flat renovation company in Brno, built as a portfolio project.
All copy is written in Czech for a real Czech audience. The company, reviews and contacts are made up.

**Live demo:** https://korinek-renovace.vercel.app

## What it does

- **Price calculator:** bathroom size, building type, standard and extras give a price range and duration. The pricing logic is a pure function in `src/lib/calculator.ts`, separate from the UI.
- **Before/after slider:** an invisible range input on top of two photos, so mouse, touch and keyboard all work without extra code.
- **Contact form with a server action:** validation runs on the server, with spam traps (honeypot field + time check) and clear Czech error messages. The calculator result fills the form in automatically. It sends email through Resend, or prints to the console in demo mode.
- **Opt-in cookie banner** following Czech rules since 2022: refusing is as easy as agreeing, the page is never blocked, and analytics load only after consent.
- **SEO:** metadata, a social share image generated with `next/og`, sitemap, robots.txt, LocalBusiness JSON-LD and a custom 404 page.

## Design decisions

- Colours come from the subject itself (glazed porcelain, dark green tile, grout, brass taps) rather than a web template.
- One type family (Archivo): normal width for text, wide for headings.
- Motion is limited to two moments: the calculator price counting up and the before/after slider. It respects `prefers-reduced-motion`.

## Quality

PageSpeed Insights on the live site (21 Nov 2026): **100 / 100 / 100 / 100** (Performance, Accessibility, Best Practices, SEO) on both mobile and desktop. Mobile LCP 0.9 s, TBT 0 ms.
Fully keyboard-accessible, WCAG AA contrast, `lang="cs"`, and tested at 375 px width.

## Tech

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, lucide-react icons.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. To make the form send real email, copy `.env.example` to `.env.local` and fill in your Resend API key.
