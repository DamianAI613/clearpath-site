'use client'

import { useState } from 'react'
import { RESEARCH, RESEARCH_NOTE } from '../lib/content'

export default function ResearchPanel() {
  const [open, setOpen] = useState(false)

  return (
    <section style={{ padding: '56px 24px' }}>
      <div className="cp-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="cp-eyebrow">The case for automation</p>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--cp-head)', margin: 0, letterSpacing: '-0.02em' }}>
              Manual work is costing you more than you think.
            </h2>
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            className="cp-pill"
            data-active={open}
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            {open ? 'Hide research ↑' : 'See the research →'}
          </button>
        </div>

        {open && (
          <div className="cp-fade" style={{ marginTop: 34 }}>
            <div className="cp-grid-3">
              {RESEARCH.map(({ stat, desc, source }) => (
                <div key={stat} className="cp-card" style={{ padding: '26px 22px' }}>
                  <div
                    style={{
                      fontSize: '2.4rem', fontWeight: 800, color: 'var(--cp-accent)',
                      fontFamily: 'var(--cp-mono)', marginBottom: 11, letterSpacing: '-0.02em',
                    }}
                  >
                    {stat}
                  </div>
                  <p style={{ fontSize: '0.89rem', color: 'var(--cp-text)', margin: '0 0 13px', lineHeight: 1.6, fontWeight: 500 }}>
                    {desc}
                  </p>
                  <p style={{ fontSize: '0.71rem', color: '#334155', margin: 0, fontFamily: 'var(--cp-mono)' }}>
                    Source: {source}
                  </p>
                </div>
              ))}
            </div>
            <p className="cp-disclaimer" style={{ marginTop: 22, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 18 }}>
              {RESEARCH_NOTE}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
