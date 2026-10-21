import { SITE } from '../../lib/content'

/* Contact endpoint.
 *
 * Sends via the Resend REST API with fetch - no SDK dependency, so the site
 * keeps its 3-package footprint. The only required env var is RESEND_API_KEY.
 *
 * The default `from` is Resend's shared onboarding sender, which on the free
 * tier may only deliver to the account owner's own address. That is exactly
 * what we do here, so no domain verification is needed and the one verified
 * domain slot stays free. Set CONTACT_FROM once a domain is verified.
 */

export const runtime = 'nodejs'

const FROM = process.env.CONTACT_FROM || 'ClearPath Contact <onboarding@resend.dev>'
const TO = process.env.CONTACT_TO || SITE.email

type Body = {
  name?: string
  email?: string
  company?: string
  message?: string
  /* Honeypot: a real person never fills this in - it is visually hidden. */
  website?: string
}

/** Lets the statically-prerendered pages confirm at runtime whether
 *  submissions are actually live, so adding the env var without a rebuild
 *  still flips the form on. */
export function GET() {
  return Response.json({ enabled: Boolean(process.env.RESEND_API_KEY) })
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    return Response.json(
      { ok: false, error: 'not_configured', message: 'The form is not accepting submissions yet.' },
      { status: 503 },
    )
  }

  let b: Body
  try {
    b = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  // Silently accept and discard bot submissions so they stop retrying.
  if (b.website) return Response.json({ ok: true })

  const name = (b.name || '').trim().slice(0, 120)
  const email = (b.email || '').trim().slice(0, 200)
  const company = (b.company || '').trim().slice(0, 160)
  const message = (b.message || '').trim().slice(0, 6000)

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (name.length < 2 || !emailOk || message.length < 10) {
    return Response.json({ ok: false, error: 'validation' }, { status: 422 })
  }

  const text = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    '',
    message,
    '',
    '-- sent from the clearpathautomation.io contact form',
  ]
    .filter((l): l is string => l !== null)
    .join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `ClearPath inquiry - ${name}${company ? ` (${company})` : ''}`,
        text,
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('[contact] resend rejected', res.status, detail.slice(0, 500))
      return Response.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (e) {
    console.error('[contact] send threw', e)
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }
}
