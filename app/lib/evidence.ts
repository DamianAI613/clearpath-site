/* Evidence retrieval for the Clinical Evidence Navigator.
 *
 * Everything here runs server-side and hits two public APIs:
 *   - NCBI E-utilities (PubMed)        esearch -> efetch
 *   - ClinicalTrials.gov v2            /studies
 *
 * No SDKs, no XML library. The site keeps its three-package footprint, so
 * the PubMed XML is pulled apart with scoped regexes. That is normally a bad
 * idea, but efetch returns a strict, machine-generated DTD-bound document and
 * we only read a handful of leaf elements from it.
 *
 * NCBI_API_KEY is optional. Without it NCBI allows 3 requests/sec per IP;
 * with it, 10. We make 2 calls per query, so the ceiling only matters under
 * concurrent load.
 */

const EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'
const CTGOV = 'https://clinicaltrials.gov/api/v2/studies'
const UA = 'ClearPathAutomation-EvidenceNavigator/1.0 (+https://clearpathautomation.io)'

export type Article = {
  pmid: string
  title: string
  journal: string
  year: string
  types: string[]
  abstract: string
  link: string
}

export type Trial = {
  nct: string
  title: string
  status: string
  phase: string
  link: string
}

/* -- helpers ----------------------------------------------------------- */

function withKey(params: Record<string, string>): URLSearchParams {
  const key = process.env.NCBI_API_KEY
  if (key) params.api_key = key
  return new URLSearchParams(params)
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

/* NCBI allows 3 requests/sec per IP without a key, 10 with one. Vercel
 * functions share egress IPs, so a 429 is not hypothetical - it showed up in
 * testing on the third query in a row. Two short retries clear it; beyond
 * that the caller should see the failure rather than have it hidden. */
async function getText(url: string, signal?: AbortSignal): Promise<string> {
  let lastStatus = 0
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal })
    if (res.ok) return res.text()
    lastStatus = res.status
    if (res.status !== 429 && res.status < 500) break
    await sleep(400 * (attempt + 1))
  }
  throw new Error(`${lastStatus} from ${new URL(url).host}`)
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&#39;': "'",
}

function decode(s: string): string {
  return s
    .replace(/&(?:amp|lt|gt|quot|apos|#39);/g, m => ENTITIES[m] ?? m)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
}

/** Strip inline markup (<i>, <sup>, ...) that PubMed embeds in titles. */
function plain(xml: string): string {
  return decode(xml.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
}

function first(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))
  return m ? plain(m[1]) : ''
}

/* -- PubMed ------------------------------------------------------------ */

export async function pubmedSearch(
  term: string,
  retmax: number,
  signal?: AbortSignal,
): Promise<{ pmids: string[]; total: string }> {
  const qs = withKey({ db: 'pubmed', term, retmode: 'json', retmax: String(retmax), sort: 'relevance' })
  const raw = await getText(`${EUTILS}/esearch.fcgi?${qs}`, signal)
  const j = JSON.parse(raw)
  return {
    pmids: j?.esearchresult?.idlist ?? [],
    total: String(j?.esearchresult?.count ?? '0'),
  }
}

export async function pubmedFetch(pmids: string[], signal?: AbortSignal): Promise<Article[]> {
  if (pmids.length === 0) return []
  const qs = withKey({ db: 'pubmed', id: pmids.join(','), retmode: 'xml', rettype: 'abstract' })
  const xml = await getText(`${EUTILS}/efetch.fcgi?${qs}`, signal)

  const out: Article[] = []
  for (const m of xml.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g)) {
    const b = m[1]

    const pmid = (b.match(/<PMID[^>]*>(\d+)<\/PMID>/) || [])[1] || ''
    if (!pmid) continue

    /* Abstracts arrive as one or more <AbstractText>, often with a Label
     * ("BACKGROUND", "METHODS"). Keep the labels - they help the model tell
     * a finding apart from a stated limitation. */
    const parts: string[] = []
    for (const a of b.matchAll(/<AbstractText(\s[^>]*)?>([\s\S]*?)<\/AbstractText>/g)) {
      const label = (a[1] || '').match(/Label="([^"]+)"/)?.[1]
      const text = plain(a[2])
      if (text) parts.push(label ? `${label}: ${text}` : text)
    }

    const types = [...b.matchAll(/<PublicationType[^>]*>([\s\S]*?)<\/PublicationType>/g)]
      .map(t => plain(t[1]))
      .filter(t => t && t !== 'Journal Article')

    /* PubDate is Year/Month, or a free-text MedlineDate for odd ranges. */
    const pubDate = b.match(/<PubDate>([\s\S]*?)<\/PubDate>/)?.[1] ?? ''
    const year =
      pubDate.match(/<Year>(\d{4})<\/Year>/)?.[1] ??
      pubDate.match(/(\d{4})/)?.[1] ??
      ''

    out.push({
      pmid,
      title: first(b, 'ArticleTitle') || '(untitled)',
      journal: first(b, 'Title') || first(b, 'ISOAbbreviation'),
      year,
      types: types.slice(0, 3),
      abstract: parts.join('\n'),
      link: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
    })
  }

  /* efetch does not guarantee the order esearch gave us; restore relevance. */
  const rank = new Map(pmids.map((p, i) => [p, i]))
  out.sort((a, b) => (rank.get(a.pmid) ?? 99) - (rank.get(b.pmid) ?? 99))
  return out
}

/* -- ClinicalTrials.gov ------------------------------------------------ */

const CT_FIELDS = [
  'protocolSection.identificationModule.nctId',
  'protocolSection.identificationModule.briefTitle',
  'protocolSection.statusModule.overallStatus',
  'protocolSection.designModule.phases',
].join(',')

/** CT.gov returns phases as an array; observational studies come back as
 *  ["NA"], which is not a phase and should not be shown as one. */
function normalisePhase(phases: unknown): string {
  if (!Array.isArray(phases) || phases.length === 0) return 'N/A'
  const named = phases.map(String).filter(p => p.toUpperCase() !== 'NA')
  if (named.length === 0) return 'N/A'
  return named.join(', ').replace(/_/g, ' ')
}

export async function trialSearch(term: string, pageSize: number, signal?: AbortSignal): Promise<Trial[]> {
  const qs = new URLSearchParams({
    'query.term': term,
    pageSize: String(pageSize),
    fields: CT_FIELDS,
  })
  const raw = await getText(`${CTGOV}?${qs}`, signal)
  const studies = JSON.parse(raw)?.studies ?? []

  return studies
    .map((s: Record<string, never>): Trial | null => {
      const p = (s as { protocolSection?: Record<string, Record<string, unknown>> }).protocolSection ?? {}
      const nct = String(p.identificationModule?.nctId ?? '')
      if (!nct) return null
      const phases = p.designModule?.phases
      return {
        nct,
        title: String(p.identificationModule?.briefTitle ?? '(untitled)'),
        status: String(p.statusModule?.overallStatus ?? 'UNKNOWN').replace(/_/g, ' '),
        phase: normalisePhase(phases),
        link: `https://clinicaltrials.gov/study/${nct}`,
      }
    })
    .filter((t: Trial | null): t is Trial => t !== null)
}
