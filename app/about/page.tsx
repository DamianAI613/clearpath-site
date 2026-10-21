import type { Metadata } from 'next'
import Link from 'next/link'
import { BIO, SITE } from '../lib/content'
import { CTA } from '../components/ui'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Damian Wroblewski - AI and automation engineer. Production AI tooling, machine-learning pipelines and workflow automation. Founder of ClearPath Automation LLC.',
}

export default function AboutPage() {
  return (
    <>
      <section style={{ padding: '72px 24px 0' }}>
        <div className="cp-narrow" style={{ maxWidth: 800 }}>
          <p className="cp-eyebrow">About</p>
          <h1 className="cp-h2" style={{ fontSize: '2.5rem' }}>{BIO.name}</h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--cp-faint)', fontFamily: 'var(--cp-mono)', margin: '0 0 26px' }}>
            {BIO.role}
          </p>
          <p style={{ fontSize: '1.15rem', color: 'var(--cp-accent)', fontWeight: 500, lineHeight: 1.65, margin: '0 0 32px' }}>
            {BIO.lede}
          </p>

          {BIO.paras.map((t, i) => (
            <p key={i} className="cp-body" style={{ fontSize: '1rem' }}>{t}</p>
          ))}
        </div>
      </section>

      <hr className="cp-divider" />

      {/* -- Background ------------------------------------------------ */}
      <section style={{ padding: '72px 24px' }}>
        <div className="cp-section">
          <p className="cp-eyebrow">Background</p>
          <h2 className="cp-h2">Where the work has been done</h2>

          <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column' }}>
            {BIO.history.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', gap: 24, padding: '16px 0', flexWrap: 'wrap',
                  borderBottom: i < BIO.history.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--cp-mono)', fontSize: '0.8rem', color: 'var(--cp-accent)', minWidth: 130, paddingTop: 2 }}>
                  {h.years}
                </div>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--cp-head)', margin: '0 0 3px' }}>
                    {h.role}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--cp-dim)', margin: 0 }}>{h.org}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 44 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 14 }}>
              Certifications &amp; education
            </p>
            <ul className="cp-bullets">
              {BIO.credentials.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>

          <div style={{ marginTop: 38, display: 'flex', gap: 13, flexWrap: 'wrap' }}>
            <Link href="/#clinical" className="cp-btn-secondary">See the enterprise work</Link>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="cp-btn-secondary">
              LinkedIn &nearr;
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="cp-btn-secondary">
              GitHub &nearr;
            </a>
          </div>
        </div>
      </section>

      <CTA title="Want this on your problem?" />
    </>
  )
}
