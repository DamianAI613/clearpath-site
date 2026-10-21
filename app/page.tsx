import Link from 'next/link'
import { SITE, CREDS, SERVICES, FEATURED, PROJECTS } from './lib/content'
import { SectionHead, ProjectCard, StatusBadge } from './components/ui'
import ResearchPanel from './components/ResearchPanel'
import ClinicalFlagship from './components/ClinicalFlagship'
import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <>
      {/* -- Hero ------------------------------------------------------- */}
      <section style={{ position: 'relative', padding: '96px 24px 76px', textAlign: 'center', overflow: 'hidden' }}>
        <div className="cp-glow" />
        <div className="cp-section" style={{ position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--cp-accent-soft)', border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 26,
            }}
          >
            <span className="cp-dot" />
            <span
              style={{
                fontFamily: 'var(--cp-mono)', fontSize: '0.75rem', color: 'var(--cp-accent-light)',
                fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
            >
              Available for new projects
            </span>
          </div>

          <h1 className="cp-h1">
            Where inefficiency<br />
            <span style={{ color: 'var(--cp-accent)' }}>meets its match.</span>
          </h1>

          <p style={{ fontSize: '1.12rem', color: 'var(--cp-dim)', maxWidth: 620, margin: '0 auto 16px', lineHeight: 1.75 }}>
            AI systems, machine-learning pipelines and workflow automation &mdash; built, verified and
            shipped to production.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--cp-faint)', maxWidth: 580, margin: '0 auto 38px', lineHeight: 1.75 }}>
            Agents with real evaluation behind them. Pipelines that are verified before they serve.
            Automation on the legacy platforms that have no API.
          </p>

          <div className="cp-ctas" style={{ display: 'flex', gap: 13, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="cp-btn-primary">Start a project &rarr;</Link>
            <Link href="/work" className="cp-btn-secondary">See the work</Link>
          </div>

          <div style={{ marginTop: 52, maxWidth: 820, marginInline: 'auto' }}>
            <div className="cp-media" style={{ borderRadius: 20, boxShadow: '0 0 80px rgba(99,102,241,0.15)' }}>
              <video controls playsInline preload="metadata" style={{ maxHeight: 460 }}>
                <source src="/CPAFinalVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* -- Credentials ----------------------------------------------- */}
      <section style={{ padding: '8px 24px 64px' }}>
        <div className="cp-section">
          <div className="cp-grid-4">
            {CREDS.map(c => (
              <div key={c.value} className="cp-cred">
                <div className="cp-cred-value">{c.value}</div>
                <p className="cp-cred-label">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="cp-divider" />

      {/* -- Flagship clinical programme ------------------------------- */}
      <ClinicalFlagship />

      <hr className="cp-divider" />

      {/* -- Services -------------------------------------------------- */}
      <section style={{ padding: '72px 24px' }}>
        <div className="cp-section">
          <SectionHead
            eyebrow="Services"
            title="What I build"
            lede="Every engagement is scoped to solve a specific problem, not to sell hours."
          />
          <div className="cp-grid-2">
            {SERVICES.map(s => (
              <Link key={s.slug} href={`/services#${s.slug}`} className="cp-card-link">
                <div className="cp-card" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 11 }}>
                    <span style={{ fontSize: '1.35rem' }}>{s.icon}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cp-head)', margin: 0 }}>
                      {s.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--cp-muted)', margin: 0, lineHeight: 1.7 }}>
                    {s.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 26 }}>
            <Link href="/services" className="cp-link">All services in detail &rarr;</Link>
          </div>
        </div>
      </section>

      <hr className="cp-divider" />

      {/* -- Featured work --------------------------------------------- */}
      <section style={{ padding: '72px 24px' }}>
        <div className="cp-section">
          <SectionHead
            eyebrow="Featured work"
            title="Four builds worth reading about"
            lede="Each of these shipped, is described accurately, and has a case study behind it."
          />
          <div className="cp-grid-2">
            {FEATURED.map(p => <ProjectCard key={p.slug} p={p} />)}
          </div>

          <div style={{ marginTop: 40 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 14 }}>
              Also in the portfolio
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
              {PROJECTS.filter(p => !p.featured).map(p => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="cp-stack-tag" style={{ textDecoration: 'none' }}>
                  {p.title}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <Link href="/work" className="cp-btn-primary">Browse all {PROJECTS.length} projects &rarr;</Link>
          </div>
        </div>
      </section>

      <hr className="cp-divider" />

      {/* -- Research -------------------------------------------------- */}
      <ResearchPanel />

      <hr className="cp-divider" />

      {/* -- Contact --------------------------------------------------- */}
      <section style={{ padding: '76px 24px' }}>
        <div className="cp-narrow" style={{ textAlign: 'center' }}>
          <p className="cp-eyebrow">Contact</p>
          <h2 className="cp-h2">Tell me about your project</h2>
          <p style={{ fontSize: '1rem', color: 'var(--cp-dim)', lineHeight: 1.75, margin: '0 auto 32px', maxWidth: 500 }}>
            Describe what you are trying to automate or build. I reply within one business day.
          </p>
          <ContactForm enabled={Boolean(process.env.RESEND_API_KEY)} />
        </div>
      </section>
    </>
  )
}
