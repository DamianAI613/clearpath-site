# ClearPath Automation — clearpathautomation.io

Standalone marketing site. **No database, no server code, no environment variables.**

## Why it looks like this

ClearPath used to live *inside* the BookIT app as a host-rewrite (`clearpathautomation.io` → `/clearpath`).
On 2026-07-13 the BookIT Vercel project was deleted and ClearPath died with it, for no reason of its own.
It is now fully independent — a static site with nothing to break.

## Architecture

- `app/page.tsx` — the entire site. One client component, self-contained CSS (`cp-*` classes in an inline `<style>` block). No Tailwind, no design system, no shared components.
- `public/` — demo videos + the IronSight AI board screenshot.
- **No API routes. No Supabase. No Stripe. No auth. No middleware. No env vars.**

Contact is a plain `mailto:` link. The old Resend-backed contact form was removed on 2026-07-14:
Resend's free tier allows exactly one verified sending domain, and `ironsightai.net` holds it.
Reviving the form means either upgrading Resend or sending from the IronSight domain — see git history for the removed route.

## Local

```bash
npm install
npm run dev
```

## Deploy

Vercel project `clearpath-site`, auto-deploys from `main`. Domains: `clearpathautomation.io` + `www`.
Nothing to configure — the build needs no secrets.
