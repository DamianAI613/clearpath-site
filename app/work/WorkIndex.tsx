'use client'

import { useState } from 'react'
import { PROJECTS, GROUPS } from '../lib/content'
import { ProjectCard } from '../components/ui'

type Filter = 'All' | (typeof GROUPS)[number]

export default function WorkIndex() {
  const [filter, setFilter] = useState<Filter>('All')

  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.group === filter)
  const filters: Filter[] = ['All', ...GROUPS]

  return (
    <section style={{ padding: '30px 24px 72px' }}>
      <div className="cp-section">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {filters.map(f => {
            const n = f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.group === f).length
            return (
              <button
                key={f}
                className="cp-pill"
                data-active={filter === f}
                onClick={() => setFilter(f)}
              >
                {f} <span style={{ opacity: 0.6 }}>{n}</span>
              </button>
            )
          })}
        </div>

        <div key={filter} className="cp-grid-2 cp-fade">
          {shown.map(p => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  )
}
