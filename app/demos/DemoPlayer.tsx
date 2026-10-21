'use client'

import { useState } from 'react'
import { DEMOS } from '../lib/content'

export default function DemoPlayer() {
  const [active, setActive] = useState(0)
  const d = DEMOS[active]

  return (
    <section style={{ padding: '26px 24px 72px' }}>
      <div className="cp-section">
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {DEMOS.map((t, i) => (
            <button key={t.id} className="cp-pill" data-active={active === i} onClick={() => setActive(i)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div key={d.id} className="cp-fade">
          <p style={{ fontSize: '0.93rem', color: 'var(--cp-muted)', marginBottom: 20, lineHeight: 1.8, maxWidth: 660 }}>
            {d.blurb}
          </p>

          <div className="cp-media">
            {d.video ? (
              <video controls playsInline preload="metadata" style={{ maxHeight: 520 }}>
                <source src={d.video} type="video/mp4" />
              </video>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={d.image} alt={d.label} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
