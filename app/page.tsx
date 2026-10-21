import Link from 'next/link'
import { SITE, CREDS, SERVICES, FEATURED, PROJECTS } from './lib/content'
import { SectionHead, ProjectCard, StatusBadge } from './components/ui'
import ResearchPanel from './components/ResearchPanel'
import ClinicalFlagship from './components/ClinicalFlagship'

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
            Custom automation, AI agents and purpose-built software that take manual work off your
            team permanently.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--cp-faint)', maxWidth: 560, margin: '0 auto 38px', lineHeight: 1.75 }}>
            Built by a licensed clinical pharmacist who writes the code &mdash; so there is no
            handoff between the person who understands the requirement and the person who ships it.
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

      {/* -- The differentiator ---------------------------------------- */}
      <section style={{ padding: '72px 24px' }}>
        <div className="cp-section">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 0 }}>
            <p className="cp-eyebrow">Why ClearPath</p>
            <h2 className="cp-h2" style={{ maxWidth: 760 }}>
              Most automation shops cannot staff the hard part.
            </h2>
            <p className="cp-body" style={{ maxWidth: 680, fontSize: '1.02rem' }}>
              Automation projects rarely fail on the code. They fail in the gap between the person
              who understands what the work actually requires and the person implementing it &mdash;
              a gap that gets wider the more specialized the domain.
            </p>
            <p className="cp-body" style={{ maxWidth: 680, fontSize: '1.02rem' }}>
              I close that gap by being both. I am a practicing clinical pharmacist with nine years
              in the field, five of them doing prior-authorization and utilization-management review
              at a Fortune 20 health company. I also built the eight AI and automation tools my own
              clinical team uses every day, and I have sat in the hand-picked clinician group behind
              that company&apos;s AI-enhanced review platform since its first draft &mdash; evaluating
              AI-generated clinical guidance case by case against source criteria and logging the
              failure modes back to the product team.
            </p>
            <p className="cp-body" style={{ maxWidth: 680, fontSize: '1.02rem' }}>
              That is the discipline I bring to any build, clinical or not: state the requirement,
              define the measure, grade the output honestly, and make the system notice its own
              failures.
            </p>
            <div style={{ marginTop: 10 }}>
              <Link href="/about" className="cp-link">More about the background &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

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
          <div className="cp-card" style={{ padding: '38px 28px' }}>
            <p style={{ fontSize: '0.94rem', color: 'var(--cp-muted)', margin: '0 0 26px', lineHeight: 1.8 }}>
              Include the rough shape of the problem and I will tell you honestly whether it is
              worth building.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=ClearPath%20Automation%20%E2%80%94%20project%20inquiry`}
              className="cp-btn-primary"
            >
              Email ClearPath &rarr;
            </a>
            <p style={{ fontFamily: 'var(--cp-mono)', fontSize: '0.8rem', color: 'var(--cp-faint)', margin: '22px 0 0' }}>
              {SITE.email}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
