# ClearPath Automation - clearpathautomation.io

Standalone marketing + portfolio site. **No database, no server code, no environment variables.**

## Why it looks like this

ClearPath used to live *inside* the BookIT app as a host-rewrite (`clearpathautomation.io` -> `/clearpath`).
On 2026-07-13 the BookIT Vercel project was deleted and ClearPath died with it, for no reason of its own.
It is now fully independent - a static site with nothing to break.

On 2026-10-20 it went from a one-page brochure to a multi-route portfolio, with content driven
from the CV rather than written per-page.

## Architecture

- `app/lib/content.ts` - **the single source of truth.** Every page reads from here; no page
  hardcodes copy. Projects, services, demos, bio, stack and research stats all live in this file.
  To add or edit a project, edit this file and nothing else.
- `app/globals.css` - all `cp-*` classes and the CSS custom properties. Previously a ~200-line
  inline `<style>` block inside `page.tsx`.
- `app/components/` - `Nav`, `Footer`, `ui.tsx` (StatusBadge, SectionHead, ProjectCard, CTA),
  `ClinicalFlagship`, `ResearchPanel`.
- `public/` - demo videos + the ML platform board screenshot.
- **No API routes. No Supabase. No Stripe. No auth. No middleware. No env vars.**

### Routes

| Route | What it is |
|---|---|
| `/` | Home. Hero, credentials, positioning, the flagship clinical section (`#clinical`), services, featured work, research, contact |
| `/work` | Portfolio index with client-side group filtering |
| `/work/[slug]` | Per-project case study, statically generated from `PROJECTS` |
| `/services` | All seven service lines in detail, plus the full stack (`#stack`) |
| `/demos` | Video/screenshot walkthroughs |
| `/about` | Bio, credentials, how-I-work, career history |
| `/contact` | mailto + good-fit list |

## Two content rules that are deliberate

1. **The employer is never named.** The clinical tools described in `PROJECTS` and `CLINICAL` are
   actively deployed inside a Fortune 20 health company. The site says "a Fortune 20 health
   company" throughout. If that ever needs to change, set `NAME_EMPLOYER` in `app/lib/content.ts`
   to a string - it is read through the `EMPLOYER` export and nothing else hardcodes it.
2. **IronSight AI: private, no outbound link, method and data source obscured.** Set on
   2026-08-17 (commits `db27eda`..`f0fddc7`) and preserved deliberately. The copy says it is
   private, in-house, not a public service, not open for signup and has no subscribers. The model
   design, its inputs and its method are **not described** - no data sources, no broker, no model
   library names, and nothing about an execution layer. Its `tech` list is capped at
   `Python, scikit-learn, Next.js 16, Supabase Realtime, Vercel`, and the copy carries an
   AI-generated / informational-only / not-financial-advice line. Do not re-add a link to
   `ironsightai.net` (it returns HTTP 503), and do not reinstate method detail from the CV - the CV
   is a private document for employers and says more than this site should.
3. **Contact is `support@clearpathautomation.io`**, not a personal Gmail. Set 2026-08-17.
4. **Brand lockup is `public/clearpath-mark.svg`** plus a two-tone wordmark - white "ClearPath",
   indigo "Automation" - in both `Nav` and `Footer`.

Contact is a plain `mailto:` link. The old Resend-backed contact form was removed on 2026-07-14:
Resend's free tier allows exactly one verified sending domain, and `ironsightai.net` holds it.

## Local

```bash
npm install
npm run dev
```

## Deploy

Vercel project `clearpath-site`, auto-deploys from `main`. Domains: `clearpathautomation.io` + `www`.
Nothing to configure - the build needs no secrets.
