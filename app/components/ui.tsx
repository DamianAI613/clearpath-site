import Link from 'next/link'
import type { Project } from '../lib/content'

/* -- Status badge ------------------------------------------------------- */

const TONE: Record<Project['status'], string> = {
  'In daily use': 'live',
  'In regular use': 'active',
  'Active': 'active',
  'Demoed': 'demo',
  'Private case study': 'private',
  'Retired': 'retired',
}

export function StatusBadge({ status }: { status: Project['status'] }) {
  return (
    <span className="cp-status" data-tone={TONE[status]}>
      {status}
    </span>
  )
}

/* -- Section heading --------------------------------------------------- */

export function SectionHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede?: string
}) {
  return (
    <>
      <p className="cp-eyebrow">{eyebrow}</p>
      <h2 className="cp-h2">{title}</h2>
      {lede && <p className="cp-lede">{lede}</p>}
    </>
  )
}

/* -- Project card ------------------------------------------------------ */

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/work/${p.slug}`} className="cp-card-link">
      <article className="cp-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 13 }}>
          <span className="cp-category">{p.category}</span>
          <StatusBadge status={p.status} />
        </div>

        <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: 'var(--cp-head)', margin: '0 0 7px' }}>
          {p.title}
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--cp-accent)', margin: '0 0 13px', fontWeight: 500, lineHeight: 1.5 }}>
          {p.tagline}
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--cp-muted)', lineHeight: 1.75, margin: '0 0 18px', flex: 1 }}>
          {p.summary}
        </p>

        <div style={{ marginBottom: 16 }}>
          {p.tech.slice(0, 5).map(t => (
            <span key={t} className="cp-tech">{t}</span>
          ))}
          {p.tech.length > 5 && (
            <span className="cp-tech" style={{ opacity: 0.6 }}>+{p.tech.length - 5}</span>
          )}
        </div>

        <span className="cp-link">Read the case study &rarr;</span>
      </article>
    </Link>
  )
}

/* -- Closing CTA ------------------------------------------------------- */

export function CTA({
  title = 'Have something that should be automated?',
  body = 'Tell me the rough shape of the problem. I will tell you honestly whether it is worth building — and if it is not, I will say so.',
}: {
  title?: string
  body?: string
}) {
  return (
    <>
      <hr className="cp-divider" />
      <section style={{ padding: '72px 24px' }}>
        <div className="cp-narrow" style={{ textAlign: 'center' }}>
          <h2 className="cp-h2">{title}</h2>
          <p style={{ fontSize: '1rem', color: 'var(--cp-dim)', lineHeight: 1.75, margin: '0 auto 32px', maxWidth: 520 }}>
            {body}
          </p>
          <div className="cp-ctas" style={{ display: 'flex', gap: 13, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="cp-btn-primary">
              Start a project &rarr;
            </Link>
            <Link href="/work" className="cp-btn-secondary">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
