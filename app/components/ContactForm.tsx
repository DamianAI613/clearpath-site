'use client'

import { useState } from 'react'
import { SITE } from '../lib/content'

/* The site has no backend by design - no API routes, no env vars, nothing to
 * break. So the form composes a structured message and hands it to the
 * visitor's mail client, which works everywhere and cannot silently drop a
 * submission the way a misconfigured endpoint can. Swapping this for a real
 * POST later means changing only the submit handler. */

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const ready = name.trim().length > 1 && emailOk && message.trim().length > 9

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!ready) return

    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      company.trim() ? `Company: ${company.trim()}` : null,
      '',
      message.trim(),
    ]
      .filter(l => l !== null)
      .join('\n')

    const subject = `ClearPath Automation — project inquiry from ${name.trim()}`
    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked - the address is on screen anyway */
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

        {touched && !ready && (
          <p className="cp-hint" style={{ color: '#F87171' }}>
            Add your name, a valid email and a sentence or two about the problem.
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button type="submit" className="cp-btn-primary">Send message &rarr;</button>
          <p className="cp-hint" style={{ flex: 1, minWidth: 220 }}>
            {sent
              ? 'Your mail app should have opened with the message ready to send.'
              : 'Opens your mail app with this filled in, so nothing gets lost in a form that silently fails.'}
          </p>
        </div>
      </form>

      <div style={{ marginTop: 26, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="cp-hint" style={{ marginBottom: 8 }}>Or email directly:</p>
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
          <button
            type="button" onClick={copyEmail} className="cp-pill"
            style={{ padding: '5px 13px', fontSize: '0.74rem' }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
