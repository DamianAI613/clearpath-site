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
          ClearPath Automation
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
        </div>
      </div>
    </nav>
  )
}
