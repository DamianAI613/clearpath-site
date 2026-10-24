import type { Metadata } from 'next'
import Link from 'next/link'
import Navigator from './Navigator'
import { CTA } from '../components/ui'

export const metadata: Metadata = {
  title: 'Clinical Evidence Navigator | ClearPath Automation',
  description:
    'A retrieval-first clinical research tool: it searches PubMed and ClinicalTrials.gov, then synthesises only what it actually retrieved. Built by ClearPath Automation.',
}

export default function CustomGptPage() {
  const enabled = Boolean(process.env.ANTHROPIC_API_KEY && process.env.CUSTOMGPT_ACCESS_CODE)

  return (
    <>
      <section style={{ padding: '96px 24px 48px' }}>
        <div className="cp-narrow">
          <p className="cp-eyebrow">Live demo</p>
          <h1 className="cp-h1">Clinical Evidence Navigator</h1>
          <p className="cp-lede">
            Ask a clinical question. It builds a PubMed query, runs it, pulls the abstracts, checks
            ClinicalTrials.gov, and only then writes an answer &mdash; citing nothing it did not retrieve.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 24px 56px' }}>
        <div className="cp-narrow">
          <Navigator initialEnabled={enabled} />
          <p className="cp-disclaimer" style={{ marginTop: 28, textAlign: 'center' }}>
            For educational use only. Not a substitute for clinical judgment, and not medical advice.
          </p>
        </div>
      </section>

      <hr className="cp-divider" />

      <section style={{ padding: '64px 24px' }}>
        <div className="cp-narrow">
          <p className="cp-eyebrow">How it works</p>
          <h2 className="cp-h2">Retrieval first, then the model</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--cp-muted)', lineHeight: 1.85 }}>
            The order matters more than anything else here. Ask a language model to recall a PMID and it
            will produce one &mdash; correctly formatted, plausible, and frequently pointing at a paper that
            has nothing to do with the question. The identifier looks right, so nobody checks it. That
            failure mode is the entire reason this tool is built the way it is.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '28px 0' }}>
            {[
              ['1 &middot; Plan', 'The model turns a plain-English question into a PubMed boolean using MeSH terms and field tags, plus a ClinicalTrials.gov keyword search. This is the one step where it works from its own knowledge — and the only thing it produces is a query.'],
              ['2 &middot; Retrieve', 'The server calls NCBI E-utilities and the ClinicalTrials.gov v2 API directly. Real titles, journals, years, publication types and full abstracts come back.'],
              ['3 &middot; Synthesise', 'Those records — and nothing else — go to Claude, with instructions to cite only supplied identifiers and to report conflicting findings as conflicting rather than picking a winner.'],
              ['4 &middot; Verify', 'Every PMID and NCT number in the answer is checked against what was actually retrieved. Anything that does not match is rewritten as "unverified" before it reaches the browser, and the count is shown. A prompt is a request; this is the enforcement.'],
            ].map(([h, body]) => (
              <div key={h} className="cp-card" style={{ padding: '18px 20px' }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--cp-accent-light)', margin: '0 0 8px', letterSpacing: '0.02em' }}
                    dangerouslySetInnerHTML={{ __html: h }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--cp-muted)', lineHeight: 1.8, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--cp-muted)', lineHeight: 1.85 }}>
            Step 4 is the part worth stealing. Every retrieval system eventually meets a model that cites
            something it was not given, and the fix is never a better prompt &mdash; it is a check the model
            cannot talk its way past. The same pattern applies to any tool that has to be right about
            identifiers: order numbers, claim IDs, part numbers, account references.
          </p>

          <p style={{ fontSize: '0.95rem', color: 'var(--cp-muted)', lineHeight: 1.85 }}>
            Built on Next.js with no retrieval framework and no vendor SDK &mdash; two public APIs and the
            Anthropic Messages endpoint, called directly. The whole site ships three npm packages.{' '}
            <Link href="/work" className="cp-link">See the rest of the work &rarr;</Link>
          </p>
        </div>
      </section>

      <CTA
        title="Need something that has to be right?"
        body="Most AI tooling fails quietly — it returns something plausible and nobody checks. If you have a process where being confidently wrong is expensive, that is the kind of problem worth talking about."
      />
    </>
  )
}
