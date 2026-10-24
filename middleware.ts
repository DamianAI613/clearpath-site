import { NextResponse, type NextRequest } from 'next/server'

/* The canonical route is /customGPT (capital GPT), which is what the demo
 * links point at. Two things make this fiddly:
 *
 *   - next.config `redirects` match case-INsensitively, so a rule for
 *     /customgpt also matches /customGPT and the canonical URL redirects to
 *     itself until the browser gives up. Verified in testing.
 *   - A lowercase sibling directory is rejected by TypeScript, which refuses
 *     two files differing only in casing.
 *
 * Middleware is the one place the comparison can be exact. Anything that is
 * a case variant of "customgpt" but is NOT the canonical spelling gets sent
 * to the canonical spelling; the canonical spelling falls straight through.
 */

const CANONICAL = '/customGPT'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const bare = pathname.replace(/\/+$/, '')

  if (bare !== CANONICAL && bare.toLowerCase() === '/customgpt') {
    const url = req.nextUrl.clone()
    url.pathname = CANONICAL
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/customgpt', '/customGPT/', '/CustomGPT', '/CUSTOMGPT', '/Customgpt', '/customGpt'],
}
