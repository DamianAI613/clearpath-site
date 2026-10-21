import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES, STACK_GROUPS } from '../lib/content'
import { CTA } from '../components/ui'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Healthcare and clinical AI, custom AI agents, workflow and browser automation, machine-learning platforms, full-stack apps, API integrations and reliability engineering.',
}

export default function ServicesPage() {
  return (
    <>
      <section style={{ padding: '72px 24px 0' }}>
        <div className="cp-section">
          <p className="cp-eyebrow">Services</p>
          <h1 className="cp-h2" style={{ fontSize: '2.6rem' }}>What I build</h1>
          <p className="cp-lede">
            Seven service lines, scoped to solve a specific problem rather than to sell hours. The
            first one is the reason the others are worth hiring for together.
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            {SERVICES.map(s => (
              <a key={s.slug} href={`#${s.slug}`} className="cp-stack-tag" style={{ textDecoration: 'none' }}>
                {s.icon} {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 24px 72px' }}>
        <div className="cp-section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {SERVICES.map(s => (
              <div
                key={s.slug}
                id={s.slug}
                className="cp-card"
                style={{ padding: '32px 30px', scrollMarginTop: 84 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 12 }}>
                  <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--cp-head)', margin: 0, letterSpacing: '-0.015em' }}>
                    {s.title}
                  </h2>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--cp-accent)', fontWeight: 500, margin: '0 0 16px', lineHeight: 1.6 }}>
                  {s.tagline}
                </p>
                <p style={{ fontSize: '0.94rem', color: 'var(--cp-muted)', lineHeight: 1.85, margin: '0 0 22px', maxWidth: 680 }}>
                  {s.body}
                </p>

                <ul className="cp-bullets" style={{ marginBottom: 20 }}>
                  {s.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>

                <div>{s.tech.map(t => <span key={t} className="cp-tech">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="cp-divider" />

      {/* -- Stack ----------------------------------------------------- */}
      <section id="stack" style={{ padding: '72px 24px' }}>
        <div className="cp-section">
          <p className="cp-eyebrow">Stack</p>
          <h2 className="cp-h2">Tools I actually work in</h2>
          <p className="cp-lede">
            Everything below was designed, built and debugged by me, with AI coding tools as a daily
            engineering multiplier rather than a substitute.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            {STACK_GROUPS.map(g => (
              <div key={g.title}>
                <p style={{ fontSize: '0.78rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 13 }}>
                  {g.title}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                  {g.items.map(i => <span key={i} className="cp-stack-tag">{i}</span>)}
                </div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 32 }}>
            <Link href="/work" className="cp-link">See where it has been used &rarr;</Link>
          </p>
        </div>
      </section>

      <CTA />
    </>
  )
}
