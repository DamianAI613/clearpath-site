import type { Metadata } from 'next'
import DemoPlayer from './DemoPlayer'
import { CTA } from '../components/ui'

export const metadata: Metadata = {
  title: 'Demos',
  description:
    'Walkthroughs of real software: enterprise clinical tooling, a retrieval-grounded clinical research assistant, a machine-learning platform board, and a retired scheduling SaaS.',
}

export default function DemosPage() {
  return (
    <>
      <section style={{ padding: '72px 24px 0' }}>
        <div className="cp-section">
          <p className="cp-eyebrow">Demos</p>
          <h1 className="cp-h2" style={{ fontSize: '2.6rem' }}>See it in action</h1>
          <p className="cp-lede">
            Real software, built end to end. Some of it is in daily use, some is retired, and one is
            kept private &mdash; the walkthroughs are unchanged either way, and labelled honestly.
          </p>
        </div>
      </section>

      <DemoPlayer />

      <CTA />
    </>
  )
}
