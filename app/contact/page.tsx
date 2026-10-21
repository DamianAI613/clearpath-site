import type { Metadata } from 'next'
import { SITE } from '../lib/content'
import ContactForm from '../components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell ClearPath Automation what you are trying to automate or build.',
}

const FITS = [
  'A manual workflow your team runs every day that should not need a person',
  'A legacy platform with no API that everyone has told you cannot be automated',
  'A clinical or regulated process where the tooling has to be auditable',
  'An AI feature that demos well but nobody can tell you whether it is right',
  'A machine-learning pipeline that needs honest evaluation before it ships',
  'An internal tool, portal or dashboard that keeps getting deferred',
]

export default function ContactPage() {
  return (
    <>
      <section style={{ position: 'relative', padding: '80px 24px 0', overflow: 'hidden' }}>
        <div className="cp-glow" />
        <div className="cp-narrow" style={{ position: 'relative', maxWidth: 740 }}>
          <p className="cp-eyebrow">Contact</p>
          <h1 className="cp-h2" style={{ fontSize: '2.6rem' }}>Tell me about your project</h1>
          <p className="cp-lede">
            Describe what you are trying to automate or build &mdash; the rough shape of the problem is
            enough to start. I reply within one business day, and if it is not worth building I will
            say so rather than quote it.
          </p>

          <ContactForm />

          <p className="cp-hint" style={{ marginTop: 16, textAlign: 'center' }}>
            {SITE.legal} &middot; {SITE.location} &middot; remote across the US
          </p>
        </div>
      </section>

      <section style={{ padding: '56px 24px 80px' }}>
        <div className="cp-narrow" style={{ maxWidth: 740 }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 16 }}>
            Good fits
          </p>
          <ul className="cp-bullets">
            {FITS.map(f => <li key={f} style={{ fontSize: '0.92rem' }}>{f}</li>)}
          </ul>

          <p className="cp-note" style={{ marginTop: 34 }}>
            Worth knowing up front: I am a practicing clinical pharmacist, not a licensed financial
            or legal adviser. The clinical tooling I build supports a clinician&apos;s decision &mdash; it
            never makes one.
          </p>
        </div>
      </section>
    </>
  )
}
