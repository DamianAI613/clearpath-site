import type { Metadata } from 'next'
import { PROJECTS } from '../lib/content'
import WorkIndex from './WorkIndex'
import { CTA } from '../components/ui'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work',
  description: `Case studies on ${PROJECTS.length} projects: enterprise clinical AI tools, a solo-built machine-learning platform, SaaS products and automation pipelines.`,
}

export default function WorkPage() {
  return (
    <>
      <section style={{ padding: '72px 24px 0' }}>
        <div className="cp-section">
          <p className="cp-eyebrow">Work</p>
          <h1 className="cp-h2" style={{ fontSize: '2.6rem' }}>Portfolio</h1>
          <p className="cp-lede">
            {PROJECTS.length} projects, each with a case study behind it. Described accurately,
            including the ones that are retired or cannot be shown publicly &mdash; a portfolio that
            only shows wins tells you nothing about judgment.
          </p>

          <Link href="/#clinical" className="cp-card-link" style={{ display: 'block', margin: '4px 0 8px' }}>
            <div className="cp-card" style={{ padding: '20px 24px', borderColor: 'rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.05)' }}>
              <p className="cp-eyebrow" style={{ margin: '0 0 6px' }}>Flagship work</p>
              <p style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--cp-head)', margin: '0 0 5px' }}>
                Eight production tools inside a Fortune 20 health company &rarr;
              </p>
              <p style={{ fontSize: '0.86rem', color: 'var(--cp-muted)', margin: 0, lineHeight: 1.65 }}>
                The largest body of work here: AI and automation tooling shipped in 2026 for the
                ~60-pharmacist utilization-management team I work on, plus the clinician side of an
                enterprise AI review platform.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <WorkIndex />

      <CTA />
    </>
  )
}
