import Link from 'next/link'
import { SITE } from '../lib/content'

export default function Footer() {
  return (
    <>
      <hr className="cp-divider" />
      <footer style={{ padding: '44px 24px 56px' }}>
        <div
          className="cp-section"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'space-between' }}
        >
          <div style={{ maxWidth: 340 }}>
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 9, margin: '0 0 12px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/clearpath-mark.svg" alt="" width={26} height={26} style={{ display: 'block', borderRadius: 7, flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--cp-mono)', fontSize: '0.8rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}
              >
                <span style={{ color: '#FAFAFA' }}>ClearPath</span>{' '}
                <span style={{ color: 'var(--cp-accent)' }}>Automation</span>
              </span>
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--cp-faint)', lineHeight: 1.7, margin: 0 }}>
              AI systems, machine-learning pipelines and workflow automation, built and shipped
              to production.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 44, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '0.72rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontWeight: 600 }}>
                Site
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  ['/work', 'Work'],
                  ['/services', 'Services'],
                  ['/demos', 'Demos'],
                  ['/about', 'About'],
                  ['/contact', 'Contact'],
                ].map(([href, label]) => (
                  <Link key={href} href={href} style={{ fontSize: '0.82rem', color: 'var(--cp-dim)', textDecoration: 'none' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.72rem', color: 'var(--cp-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontWeight: 600 }}>
                Elsewhere
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: 'var(--cp-dim)', textDecoration: 'none' }}>
                  LinkedIn
                </a>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: 'var(--cp-dim)', textDecoration: 'none' }}>
                  GitHub
                </a>
                <a href={`mailto:${SITE.email}`} style={{ fontSize: '0.82rem', color: 'var(--cp-dim)', textDecoration: 'none' }}>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="cp-section" style={{ marginTop: 36, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '0.78rem', color: '#6B7A90', margin: 0 }}>
            &copy; {new Date().getFullYear()} {SITE.legal} &middot; {SITE.location}
          </p>
        </div>
      </footer>
    </>
  )
}
