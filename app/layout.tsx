import type { Metadata } from 'next'
import './globals.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { SITE } from './lib/content'

export const metadata: Metadata = {
  title: {
    default: 'ClearPath Automation — Custom automation, AI agents and purpose-built software',
    template: '%s — ClearPath Automation',
  },
  description: SITE.blurb,
  metadataBase: new URL(`https://${SITE.domain}`),
  openGraph: {
    title: 'ClearPath Automation',
    description: SITE.blurb,
    url: `https://${SITE.domain}`,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'ClearPath Automation', description: SITE.blurb },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
