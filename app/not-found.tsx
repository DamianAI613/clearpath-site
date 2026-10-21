import Link from 'next/link'

export default function NotFound() {
  return (
    <section style={{ padding: '120px 24px 140px', textAlign: 'center' }}>
      <div className="cp-narrow">
        <p className="cp-eyebrow" style={{ textAlign: 'center' }}>404</p>
        <h1 className="cp-h2">That page does not exist.</h1>
        <p style={{ fontSize: '1rem', color: 'var(--cp-dim)', lineHeight: 1.75, margin: '0 auto 32px', maxWidth: 420 }}>
          It may have been retired. That happens here, and it gets said out loud.
        </p>
        <div className="cp-ctas" style={{ display: 'flex', gap: 13, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="cp-btn-primary">Back home &rarr;</Link>
          <Link href="/work" className="cp-btn-secondary">See the work</Link>
        </div>
      </div>
    </section>
  )
}
