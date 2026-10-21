import Link from 'next/link'
import { CLINICAL, PROJECTS, EMPLOYER_ENV } from '../lib/content'
import { StatusBadge } from './ui'

const CLINICAL_SLUGS = ['onepa-doc-alert', 'pahub-helper', 'clinical-evidence-navigator', 'bulk-workflow-automation']

export default function ClinicalFlagship() {
  const tools = CLINICAL_SLUGS
    .map(s => PROJECTS.find(p => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <section
      id="clinical"
      style={{
        padding: '76px 24px',
        background: 'linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%)',
        borderTop: '1px solid rgba(99,102,241,0.12)',
      }}
    >
      <div className="cp-section">
        <p className="cp-eyebrow">{CLINICAL.eyebrow}</p>
        <h2 className="cp-h2" style={{ maxWidth: 820 }}>{CLINICAL.title}</h2>
        <p className="cp-body" style={{ maxWidth: 700, fontSize: '1.02rem' }}>{CLINICAL.lede}</p>
        <p className="cp-body" style={{ maxWidth: 700 }}>{CLINICAL.loop}</p>
        <p className="cp-note" style={{ maxWidth: 700, marginTop: 4 }}>{CLINICAL.usage}</p>

        {/* Pillars */}
        <div className="cp-grid-2" style={{ marginTop: 34 }}>
          {CLINICAL.pillars.map(p => (
            <div key={p.heading} className="cp-card">
              <h3 style={{ fontSize: '0.97rem', fontWeight: 700, color: 'var(--cp-head)', margin: '0 0 9px' }}>
                {p.heading}
              </h3>
              <p style={{ fontSize: '0.87rem', color: 'var(--cp-muted)', margin: 0, lineHeight: 1.75 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* The documented tools */}
        <p style={{ fontSize: '0.78rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, margin: '46px 0 16px' }}>
          Four of the eight, documented
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {tools.map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="cp-card-link">
              <div
                className="cp-card"
                style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}
              >
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                    <h3 style={{ fontSize: '1.03rem', fontWeight: 700, color: 'var(--cp-head)', margin: 0 }}>
                      {p.title}
                    </h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p style={{ fontSize: '0.855rem', color: 'var(--cp-muted)', margin: 0, lineHeight: 1.65 }}>
                    {p.tagline}
                  </p>
                </div>
                <span className="cp-link" style={{ whiteSpace: 'nowrap' }}>Case study &rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Also built */}
        <div style={{ marginTop: 30 }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 13 }}>
            Also built across the suite
          </p>
          <ul className="cp-bullets">
            {CLINICAL.alsoBuilt.map(b => <li key={b}>{b}</li>)}
          </ul>
        </div>

        {/* Pilot group */}
        <div className="cp-card" style={{ marginTop: 44, padding: '30px 28px' }}>
          <h3 className="cp-h3" style={{ fontSize: '1.15rem' }}>{CLINICAL.pilot.heading}</h3>
          {CLINICAL.pilot.paras.map((t, i) => (
            <p key={i} style={{ fontSize: '0.9rem', color: 'var(--cp-muted)', lineHeight: 1.8, margin: '0 0 14px' }}>
              {t}
            </p>
          ))}
          <div style={{ marginTop: 6 }}>
            {CLINICAL.pilot.certs.map(c => <span key={c} className="cp-tech">{c}</span>)}
          </div>
        </div>

        <p className="cp-note" style={{ marginTop: 26 }}>
          These tools are actively deployed inside {EMPLOYER_ENV} environment, so they cannot be
          fully demonstrated in public and the employer is not named here. De-identified
          throughout; no client data leaves the environment.
        </p>
      </div>
    </section>
  )
}
