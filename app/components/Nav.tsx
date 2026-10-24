'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/demos', label: 'Demos' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const path = usePathname()

  return (
    <nav className="cp-nav">
      <div className="cp-nav-inner">
        <Link href="/" className="cp-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/clearpath-mark.svg" alt="" width={30} height={30} style={{ display: 'block', borderRadius: 8, flexShrink: 0 }} />
          <span className="cp-wordmark">
            <span style={{ color: '#FAFAFA' }}>ClearPath</span>{' '}
            <span style={{ color: 'var(--cp-accent)' }}>Automation</span>
          </span>
        </Link>
        <div className="cp-nav-links">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="cp-nav-link"
              data-active={path === l.href || path.startsWith(l.href + '/')}
            >
              {l.label}
            </Link>
          ))}
          {/* The free thing, on every page. It is the cheapest possible
            * demonstration of what this shop builds: the visitor gets a
            * working product in two minutes and the footer of every card
            * they hand out says who made it. */}
          <a
            className="cp-nav-cta"
            href="https://card.clearpathautomation.io/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get My Free Card
          </a>
        </div>
      </div>
    </nav>
  )
}
