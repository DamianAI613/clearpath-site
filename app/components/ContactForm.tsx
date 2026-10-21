'use client'

import { useEffect, useState } from 'react'
import { SITE } from '../lib/content'

/* Posts to /api/contact, which sends the message server-side. Nothing opens
 * the visitor's mail client.
 *
 * `enabled` is resolved on the server from the presence of RESEND_API_KEY. When
 * it is false the component renders the plain email button instead of a form
 * that could not deliver - the page is never broken, it just offers less. */

type State = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ enabled: initialEnabled }: { enabled: boolean }) {
  /* Build-time value is right on a normal deploy; the runtime check corrects it
   * if the env var was added without rebuilding. */
  const [enabled, setEnabled] = useState(initialEnabled)
  useEffect(() => {
    let live = true
    fetch('/api/contact')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (live && d && typeof d.enabled === 'boolean') setEnabled(d.enabled) })
      .catch(() => {})
    return () => { live = false }
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [touched, setTouched] = useState(false)
  const [state, setState] = useState<State>('idle')
  const [copied, setCopied] = useState(false)

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const ready = name.trim().length > 1 && emailOk && message.trim().length > 9

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked - the address is on screen anyway */
    }
  }

  const EmailLine = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <a
        href={`mailto:${SITE.email}?subject=ClearPath%20Automation%20%E2%80%94%20project%20inquiry`}
        style={{
          fontFamily: 'var(--cp-mono)', fontSize: '0.92rem',
          color: 'var(--cp-accent-light)', textDecoration: 'none', fontWeight: 600,
        }}
      >
        {SITE.email}
      </a>
      <button type="button" onClick={copyEmail} className="cp-pill" style={{ padding: '5px 13px', fontSize: '0.74rem' }}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )

  /* -- Fallback: no mail provider configured -------------------------- */
  if (!enabled) {
    return (
      <div className="cp-card" style={{ padding: '36px 30px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.95rem', color: 'var(--cp-muted)', margin: '0 0 24px', lineHeight: 1.8 }}>
          Include the rough shape of the problem and I will tell you honestly whether it is worth
          building.
        </p>
        <a
          href={`mailto:${SITE.email}?subject=ClearPath%20Automation%20%E2%80%94%20project%20inquiry`}
          className="cp-btn-primary"
        >
          Email ClearPath &rarr;
        </a>
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>{EmailLine}</div>
      </div>
    )
  }

  /* -- Sent ----------------------------------------------------------- */
  if (state === 'sent') {
    return (
      <div className="cp-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem', margin: '0 0 12px' }}>&#10003;</p>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--cp-head)', margin: '0 0 10px' }}>
          Message sent
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--cp-muted)', margin: '0 0 22px', lineHeight: 1.75 }}>
          It landed in my inbox and I reply within one business day. If it is urgent, email directly:
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>{EmailLine}</div>
      </div>
    )
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!ready || state === 'sending') return
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message, website }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  const err = (cond: boolean) => (touched && cond ? '#F87171' : undefined)

  return (
    <div className="cp-card" style={{ padding: '32px 30px' }}>
      <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="cp-grid-2" style={{ gap: 18 }}>
          <div className="cp-field">
            <label className="cp-label" htmlFor="cp-name">Name</label>
            <input
              id="cp-name" className="cp-input" value={name} autoComplete="name"
              onChange={e => setName(e.target.value)} placeholder="Your name"
              style={{ borderColor: err(name.trim().length <= 1) }}
            />
          </div>
          <div className="cp-field">
            <label className="cp-label" htmlFor="cp-email">Email</label>
            <input
              id="cp-email" className="cp-input" value={email} type="email" autoComplete="email"
              onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
              style={{ borderColor: err(!emailOk) }}
            />
          </div>
        </div>

        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-company">
            Company <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--cp-faint)', fontWeight: 500 }}>(optional)</span>
          </label>
          <input
            id="cp-company" className="cp-input" value={company} autoComplete="organization"
            onChange={e => setCompany(e.target.value)} placeholder="Where you work"
          />
        </div>

        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-message">What are you trying to automate or build?</label>
          <textarea
            id="cp-message" className="cp-input cp-textarea" value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="The rough shape of the problem is enough. What happens today, who does it, and how often."
            style={{ borderColor: err(message.trim().length <= 9) }}
          />
        </div>

        {/* Honeypot - hidden from people, catnip for bots */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="cp-website">Website</label>
          <input id="cp-website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
        </div>

        {touched && !ready && (
          <p className="cp-hint" style={{ color: '#F87171' }}>
            Add your name, a valid email and a sentence or two about the problem.
          </p>
        )}

        {state === 'error' && (
          <p className="cp-hint" style={{ color: '#F87171' }}>
            That did not go through. Email {SITE.email} directly and it will reach me.
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button type="submit" className="cp-btn-primary" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending...' : 'Send message →'}
          </button>
          <p className="cp-hint" style={{ flex: 1, minWidth: 200 }}>
            Goes straight to my inbox. I reply within one business day.
          </p>
        </div>
      </form>

      <div style={{ marginTop: 26, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="cp-hint" style={{ marginBottom: 8 }}>Or email directly:</p>
        {EmailLine}
      </div>
    </div>
  )
}
