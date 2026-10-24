import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS, projectBySlug } from '../../lib/content'
import { StatusBadge, CTA } from '../../components/ui'

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const p = projectBySlug(slug)
  if (!p) return { title: 'Not found' }
  return {
    title: p.title,
    description: p.summary.slice(0, 180),
    openGraph: { title: `${p.title} — ClearPath Automation`, description: p.summary.slice(0, 180) },
  }
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = projectBySlug(slug)
  if (!p) notFound()

  const idx = PROJECTS.findIndex(x => x.slug === p.slug)
  const next = PROJECTS[(idx + 1) % PROJECTS.length]

  return (
    <>
      <article style={{ padding: '56px 24px 0' }}>
        <div className="cp-narrow" style={{ maxWidth: 800 }}>
          <Link href="/work" className="cp-link" style={{ marginBottom: 26 }}>
            &larr; All work
          </Link>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '22px 0 16px' }}>
            <span className="cp-category">{p.category}</span>
            <StatusBadge status={p.status} />
            <span className="cp-status" data-tone="private" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--cp-faint)' }}>
              {p.group}
            </span>
          </div>

          <h1 className="cp-h2" style={{ fontSize: '2.5rem' }}>{p.title}</h1>
          <p style={{ fontSize: '1.08rem', color: 'var(--cp-accent)', fontWeight: 500, lineHeight: 1.6, margin: '0 0 28px' }}>
            {p.tagline}
          </p>

          <p style={{ fontSize: '1.02rem', color: 'var(--cp-text)', lineHeight: 1.85, margin: '0 0 30px' }}>
            {p.summary}
          </p>

          {/* Almost everything here is behind a client's firewall. When a
            * project can actually be opened, say so loudly. */}
          {p.link && (
            <a
              className="cp-btn-primary"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginBottom: 34 }}
            >
              {p.linkLabel ?? 'View live'} ↗
            </a>
          )}

          {p.note && <p className="cp-note" style={{ marginBottom: 34 }}>{p.note}</p>}

          {/* Media */}
          {p.video && (
            <div className="cp-media" style={{ marginBottom: 38 }}>
              <video controls playsInline preload="metadata" style={{ maxHeight: 500 }}>
                <source src={p.video} type="video/mp4" />
              </video>
            </div>
          )}
          {!p.video && p.image && (
            <div className="cp-media" style={{ marginBottom: 38 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={`${p.title} interface`} />
            </div>
          )}

          {/* Highlights */}
          <div className="cp-card" style={{ marginBottom: 40 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, margin: '0 0 15px' }}>
              At a glance
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {p.highlights.map((h, i) => <div key={i} className="cp-metric">{h}</div>)}
            </div>
          </div>

          {/* Sections */}
          {p.sections.map(s => (
            <section key={s.heading} style={{ marginBottom: 34 }}>
              <h2 className="cp-h3">{s.heading}</h2>
              <p className="cp-body" style={{ margin: 0 }}>{s.body}</p>
            </section>
          ))}

          {/* Stack */}
          <section style={{ marginTop: 44, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, margin: '0 0 13px' }}>
              Built with
            </p>
            <div>{p.tech.map(t => <span key={t} className="cp-tech">{t}</span>)}</div>
          </section>

          {/* Next */}
          <Link href={`/work/${next.slug}`} className="cp-card-link" style={{ display: 'block', marginTop: 44 }}>
            <div className="cp-card" style={{ padding: '20px 24px' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, margin: '0 0 6px' }}>
                Next case study
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--cp-head)', margin: '0 0 4px' }}>
                {next.title} &rarr;
              </p>
              <p style={{ fontSize: '0.84rem', color: 'var(--cp-muted)', margin: 0, lineHeight: 1.6 }}>
                {next.tagline}
              </p>
            </div>
          </Link>
        </div>
      </article>

      <div style={{ marginTop: 56 }}>
        <CTA />
      </div>
    </>
  )
}
