import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClearPath Automation — Custom automation. AI-powered tools. Purpose-built software.',
  description:
    'ClearPath Automation builds workflow automation, AI agents, and custom software that eliminate manual bottlenecks — permanently.',
  metadataBase: new URL('https://clearpathautomation.io'),
  openGraph: {
    title: 'ClearPath Automation',
    description:
      'Custom automation. AI-powered tools. Purpose-built software. ClearPath engineers systems that eliminate your manual bottlenecks — and keep them gone.',
    url: 'https://clearpathautomation.io',
    siteName: 'ClearPath Automation',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
