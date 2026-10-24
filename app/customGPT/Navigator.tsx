'use client'

import { useEffect, useRef, useState } from 'react'

/* Client shell for the Clinical Evidence Navigator.
 *
 * The access code is held in component state and posted with each query. It
 * is never checked here - the server decides - so there is nothing to bypass
 * by editing the DOM. localStorage keeps it across reloads only as a
 * convenience; losing it costs the user one retype. */

type Article = {
  pmid: string
  title: string
  journal: string
  year: string
  types: string[]
  abstract: string
  link: string
}

type Trial = { nct: string; title: string; status: string; phase: string; link: string }

type Result = {
  synthesis: string
  articles: Article[]
  trials: Trial[]
  queries: { pubmed: string; ctgov: string; totalHits: string }
  stripped: number
}

const EXAMPLES: { label: string; q: string }[] = [
  {
    label: 'Cabenuva in HIV',
    q: 'Summarize Cabenuva dosing evidence in treatment-experienced HIV patients based on RNA viral load',
  },
  {
    label: 'Sildenafil in IVF',
    q: 'Summarize evidence for off-label sildenafil use in IVF and endometrial receptivity',
  },
  {
    label: 'Symbicort SMART therapy',
    q: 'What is the evidence for Symbicort SMART therapy in asthma and COPD?',
  },
  {
    label: 'Ivermectin for COVID-19',
    q: 'Summarize the clinical trial evidence for and against ivermectin for treatment of COVID-19',
  },
]

/* Renders the model's light markdown: **bold**, **headings** on their own
 * line, and [PMID 123] / [NCT123] turned into real links. Deliberately not a
 * markdown library - this is a known, narrow output shape. */
function Synthesis({ text }: { text: string }) {
  return (
    <div style={{ fontSize: '0.94rem', lineHeight: 1.8, color: 'var(--cp-text)' }}>
      {text.split('\n').map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={i} style={{ height: 12 }} />

        const heading = trimmed.match(/^\*\*(.+?)\*\*\s*-?\s*(.*)$/)
        const isHeadingOnly = heading && !heading[2]

        if (isHeadingOnly) {
          return (
            <p key={i} className="cp-eyebrow" style={{ margin: '22px 0 8px' }}>
              {heading[1]}
            </p>
          )
        }

        return (
          <p key={i} style={{ margin: '0 0 8px' }}>
            {inline(line)}
          </p>
        )
      })}
    </div>
  )
}

function inline(line: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  const pattern = /\*\*(.+?)\*\*|\[?(PMID)[:\s]*(\d{6,9})\]?|\[?(NCT\d{8})\]?/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0

  while ((m = pattern.exec(line)) !== null) {
    if (m.index > last) out.push(line.slice(last, m.index))

    if (m[1]) {
      out.push(<strong key={k++} style={{ color: 'var(--cp-head)' }}>{m[1]}</strong>)
    } else if (m[3]) {
      out.push(
        <a key={k++} href={`https://pubmed.ncbi.nlm.nih.gov/${m[3]}/`} target="_blank" rel="noopener noreferrer" className="cp-pill">
          PMID {m[3]}
        </a>,
      )
    } else if (m[4]) {
      out.push(
        <a key={k++} href={`https://clinicaltrials.gov/study/${m[4]}`} target="_blank" rel="noopener noreferrer" className="cp-pill">
          {m[4]}
        </a>,
      )
    }
    last = pattern.lastIndex
  }

  if (last < line.length) out.push(line.slice(last))
  return out
}

export default function Navigator({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [code, setCode] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [question, setQuestion] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  /* Re-check at runtime so adding the env vars in Vercel flips the page on
   * without needing a rebuild. Mirrors how the contact form does it. */
  useEffect(() => {
    let live = true
    fetch('/api/customgpt')
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (live && d && typeof d.enabled === 'boolean') setEnabled(d.enabled)
      })
      .catch(() => {})
    return () => {
      live = false
    }
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cen_code')
      if (saved) {
        setCode(saved)
        setUnlocked(true)
      }
      setHistory(JSON.parse(localStorage.getItem('cen_history') || '[]'))
    } catch {
      /* private mode, blocked storage - the page still works */
    }
  }, [])

  function remember(q: string) {
    const next = [q, ...history.filter(h => h !== q)].slice(0, 12)
    setHistory(next)
    try {
      localStorage.setItem('cen_history', JSON.stringify(next))
    } catch {}
  }

  async function ask(q: string) {
    const text = q.trim()
    if (!text || busy) return

    setBusy(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/customgpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, code }),
      })
      const data = await res.json()

      if (!res.ok || !data.ok) {
        if (data.error === 'bad_code') {
          setUnlocked(false)
          try {
            localStorage.removeItem('cen_code')
          } catch {}
        }
        setError(data.message || 'Something went wrong.')
        return
      }

      setResult(data)
      remember(text)
      try {
        localStorage.setItem('cen_code', code)
      } catch {}
    } catch {
      setError('Could not reach the server. Try again.')
    } finally {
      setBusy(false)
    }
  }

  if (!enabled) {
    return (
      <div className="cp-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <p style={{ color: 'var(--cp-muted)', margin: 0, lineHeight: 1.8 }}>
          The navigator is temporarily offline. The write-up below explains what it does and how it is built.
        </p>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div className="cp-card" style={{ maxWidth: 440, margin: '0 auto' }}>
        <p className="cp-eyebrow" style={{ marginTop: 0 }}>Access code</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--cp-muted)', lineHeight: 1.75, margin: '0 0 18px' }}>
          This tool makes live calls to a paid model, so it runs behind a code. If you were sent here for a
          demo, you have one.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (code.trim()) setUnlocked(true)
          }}
          className="cp-field"
        >
          <input
            className="cp-input"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Enter code"
            autoComplete="off"
            aria-label="Access code"
          />
          <button type="submit" className="cp-btn-primary" style={{ marginTop: 10 }} disabled={!code.trim()}>
            Unlock
          </button>
        </form>
        {error && (
          <p style={{ color: '#FCA5A5', fontSize: '0.85rem', margin: '14px 0 0' }} role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          ask(question)
        }}
        style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}
      >
        <input
          ref={inputRef}
          className="cp-input"
          style={{ flex: '1 1 320px' }}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="e.g. Summarize RCTs of semaglutide in NASH"
          aria-label="Clinical question"
          disabled={busy}
        />
        <button type="submit" className="cp-btn-primary" disabled={busy || !question.trim()}>
          {busy ? 'Searching…' : 'Search evidence'}
        </button>
      </form>

      {!result && !busy && (
        <div style={{ marginBottom: 24 }}>
          <p className="cp-hint" style={{ marginBottom: 10 }}>Try one of these:</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map(ex => (
              <button
                key={ex.label}
                type="button"
                className="cp-pill"
                style={{ cursor: 'pointer', border: '1px solid var(--cp-accent-line)', background: 'var(--cp-accent-soft)' }}
                onClick={() => {
                  setQuestion(ex.q)
                  ask(ex.q)
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
          <p className="cp-hint" style={{ marginTop: 14, fontStyle: 'italic' }}>
            These weren&rsquo;t picked at random &mdash; there&rsquo;s a story behind all of them.
          </p>
        </div>
      )}

      {history.length > 0 && !busy && (
        <div style={{ marginBottom: 24 }}>
          <p className="cp-hint" style={{ marginBottom: 8 }}>Recent searches</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {history.slice(0, 6).map(h => (
              <button
                key={h}
                type="button"
                className="cp-pill"
                style={{ cursor: 'pointer', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                title={h}
                onClick={() => {
                  setQuestion(h)
                  ask(h)
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}

      {busy && (
        <div className="cp-card" style={{ textAlign: 'center', padding: '32px 20px' }}>
          <p style={{ color: 'var(--cp-muted)', margin: 0 }}>
            Querying PubMed and ClinicalTrials.gov, then synthesising&hellip;
          </p>
          <p className="cp-hint" style={{ marginTop: 8 }}>Usually 10&ndash;25 seconds.</p>
        </div>
      )}

      {error && !busy && (
        <div className="cp-card" style={{ borderColor: 'rgba(252,165,165,0.3)' }} role="alert">
          <p style={{ color: '#FCA5A5', margin: 0 }}>{error}</p>
        </div>
      )}

      {result && (
        <div>
          <div className="cp-card" style={{ marginBottom: 24 }}>
            <Synthesis text={result.synthesis} />
            {result.stripped > 0 && (
              <p className="cp-hint" style={{ marginTop: 18, color: '#FCD34D' }}>
                {result.stripped} citation{result.stripped === 1 ? '' : 's'} in this answer did not match a
                retrieved record and {result.stripped === 1 ? 'was' : 'were'} marked unverified.
              </p>
            )}
          </div>

          <details style={{ marginBottom: 24 }}>
            <summary style={{ cursor: 'pointer', color: 'var(--cp-muted)', fontSize: '0.85rem' }}>
              Queries that were actually run
            </summary>
            <div className="cp-note" style={{ marginTop: 10, fontFamily: 'var(--cp-mono)', fontSize: '0.78rem', lineHeight: 1.8 }}>
              <div><strong>PubMed:</strong> {result.queries.pubmed}</div>
              <div><strong>Hits:</strong> {result.queries.totalHits} (top {result.articles.length} retrieved)</div>
              <div><strong>ClinicalTrials.gov:</strong> {result.queries.ctgov}</div>
            </div>
          </details>

          {result.articles.length > 0 && (
            <section style={{ marginBottom: 28 }}>
              <p className="cp-eyebrow">Sources retrieved &mdash; PubMed</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.articles.map(a => (
                  <a key={a.pmid} href={a.link} target="_blank" rel="noopener noreferrer" className="cp-card-link">
                    <article className="cp-card" style={{ padding: '14px 16px' }}>
                      <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--cp-head)', margin: '0 0 6px', lineHeight: 1.5 }}>
                        {a.title}
                      </h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span className="cp-pill">PMID {a.pmid}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--cp-faint)' }}>
                          {a.journal}{a.year ? ` · ${a.year}` : ''}
                        </span>
                        {a.types.map(t => (
                          <span key={t} className="cp-tech">{t}</span>
                        ))}
                      </div>
                    </article>
                  </a>
                ))}
              </div>
            </section>
          )}

          {result.trials.length > 0 && (
            <section>
              <p className="cp-eyebrow">Sources retrieved &mdash; ClinicalTrials.gov</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.trials.map(t => (
                  <a key={t.nct} href={t.link} target="_blank" rel="noopener noreferrer" className="cp-card-link">
                    <article className="cp-card" style={{ padding: '14px 16px' }}>
                      <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--cp-head)', margin: '0 0 6px', lineHeight: 1.5 }}>
                        {t.title}
                      </h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span className="cp-pill">{t.nct}</span>
                        <span className="cp-tech">{t.status}</span>
                        {t.phase !== 'N/A' && <span className="cp-tech">{t.phase}</span>}
                      </div>
                    </article>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
