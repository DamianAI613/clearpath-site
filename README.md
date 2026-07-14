# ClearPath Automation — clearpathautomation.io

Standalone marketing site. **Deliberately has no database and no shared code.**

## Why it looks like this

ClearPath used to live *inside* the BookIT app as a host-rewrite (`clearpathautomation.io` → `/clearpath`).
On 2026-07-13 the BookIT Vercel project was deleted and ClearPath died with it, for no reason of its own.
It is now fully independent: nothing else can take it down.

## Architecture

- `app/page.tsx` — the entire site. One client component, self-contained CSS (`cp-*` classes in an inline `<style>` block). No Tailwind, no design system, no shared components.
- `app/api/contact-clearpath/route.ts` — the only server code. Sends two emails via Resend (notification to Damian, confirmation to the sender).
- `public/*.mp4` — demo videos (~19 MB).

**No Supabase. No Stripe. No auth. No middleware.** The old visitor counter was dropped — Vercel Analytics covers it.

## Environment variables

| Var | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes | resend.com/api-keys. Without it the build still compiles but the contact form won't send. |
| `RESEND_FROM_EMAIL` | No | Defaults to `ClearPath Automation <noreply@clearpathautomation.io>`. **The sending domain must be verified in Resend** or delivery fails. |

## Local

```bash
npm install
npm run dev
```

## Deploy

Vercel → Import `clearpath-site` → set `RESEND_API_KEY` → attach `clearpathautomation.io` + `www`.
