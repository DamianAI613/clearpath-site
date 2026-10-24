/* Clinical Evidence Navigator endpoint.
 *
 * Retrieval-augmented, in that order: the model never answers from memory.
 *
 *   1. Claude turns the question into a PubMed boolean and a CT.gov term.
 *   2. We actually call PubMed and ClinicalTrials.gov.
 *   3. Claude synthesises using ONLY the records we retrieved.
 *   4. We verify every citation in the answer against the retrieved set.
 *
 * Step 4 exists because step 3 is a prompt, and a prompt is a request, not a
 * guarantee. Any PMID or NCT the model emits that we did not hand it is
 * replaced with "(unverified)" before the text leaves the server. In a
 * clinical context a confidently wrong identifier is worse than no
 * identifier, and a plausible-looking PMID links to a real but unrelated
 * paper, which is the hardest kind of wrong to notice.
 *
 * Env:
 *   ANTHROPIC_API_KEY        required
 *   CUSTOMGPT_ACCESS_CODE    required - no code, no endpoint
 *   CUSTOMGPT_MODEL          optional - defaults to Haiku
 *   NCBI_API_KEY             optional - raises the PubMed rate ceiling
 */

import { pubmedSearch, pubmedFetch, trialSearch, type Article, type Trial } from '../../lib/evidence'

export const runtime = 'nodejs'
export const maxDuration = 120

const MODEL = process.env.CUSTOMGPT_MODEL || 'claude-haiku-5-5'
const ANTHROPIC = 'https://api.anthropic.com/v1/messages'
const MAX_ARTICLES = 8
const MAX_TRIALS = 5

/* -- Anthropic --------------------------------------------------------- */

async function claude(
  key: string,
  system: string,
  user: string,
  maxTokens: number,
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch(ANTHROPIC, {
    method: 'POST',
    signal,
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      temperature: 0.2,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('[customgpt] anthropic', res.status, detail.slice(0, 500))
    throw new Error(`anthropic_${res.status}`)
  }

  const j = await res.json()
  return (j?.content ?? [])
    .filter((c: { type?: string }) => c?.type === 'text')
    .map((c: { text?: string }) => c.text ?? '')
    .join('')
    .trim()
}

/* -- Step 1: question -> search strategy ------------------------------- */

const PLANNER = `You translate a clinical question into database search strategies.

Return ONLY a JSON object, no prose and no code fence:
{"pubmed": "<PubMed boolean query>", "ctgov": "<ClinicalTrials.gov search term>", "topic": "<5-8 word restatement>"}

PubMed rules:
- Combine MeSH terms and free text with AND / OR and parentheses.
- Use [mh] for MeSH and [tiab] for title/abstract where it sharpens the search.
- Favour recall over precision: a query returning nothing is a failed query.
- Do NOT add date or language filters unless the question asks for them.

ClinicalTrials.gov rules:
- Plain keywords only. No field tags, no boolean operators. Two to five words.`

type Plan = { pubmed: string; ctgov: string; topic: string }

function parsePlan(raw: string, fallback: string): Plan {
  const m = raw.match(/\{[\s\S]*\}/)
  if (m) {
    try {
      const p = JSON.parse(m[0])
      if (typeof p.pubmed === 'string' && p.pubmed.trim()) {
        return {
          pubmed: p.pubmed.trim(),
          ctgov: typeof p.ctgov === 'string' && p.ctgov.trim() ? p.ctgov.trim() : fallback,
          topic: typeof p.topic === 'string' ? p.topic.trim() : fallback,
        }
      }
    } catch {
      /* fall through to the raw question */
    }
  }
  return { pubmed: fallback, ctgov: fallback, topic: fallback }
}

/* -- Step 3: retrieved records -> synthesis ---------------------------- */

const SYNTH = `You are a clinical evidence analyst. You will be given a question and a numbered set of records retrieved from PubMed and ClinicalTrials.gov.

Absolute rules:
- Use ONLY the supplied records. If they do not answer the question, say so plainly.
- Cite ONLY identifiers that appear in the supplied records, written as [PMID 12345678] or [NCT12345678]. Never invent, guess or reconstruct an identifier.
- If the records conflict, say they conflict and give both sides. Do not resolve a genuine disagreement in the literature by picking a side.
- Distinguish what a study showed from what it could not show. Note sample size, design and population when the abstract gives them.

Structure the answer as:
**Bottom line** - two or three sentences.
**What the evidence shows** - the findings, each with its citation.
**Limitations** - design weaknesses, gaps, what is missing from this retrieval.

Be concise and specific. No preamble, no restating the question.`

function renderRecords(arts: Article[], trials: Trial[]): string {
  const a = arts.map((x, i) => {
    const types = x.types.length ? ` [${x.types.join('; ')}]` : ''
    return `--- Record ${i + 1} | PMID ${x.pmid}${types}
Title: ${x.title}
Journal: ${x.journal}${x.year ? ` (${x.year})` : ''}
Abstract: ${x.abstract || '(no abstract available)'}`
  })

  const t = trials.map(
    x => `--- ${x.nct}
Title: ${x.title}
Status: ${x.status} | Phase: ${x.phase}`,
  )

  return [
    a.length ? `PUBMED RECORDS (${a.length})\n\n${a.join('\n\n')}` : 'PUBMED RECORDS: none found.',
    t.length ? `\n\nCLINICALTRIALS.GOV RECORDS (${t.length})\n\n${t.join('\n\n')}` : '',
  ].join('')
}

/* -- Step 4: citation verification ------------------------------------- */

function verifyCitations(text: string, arts: Article[], trials: Trial[]) {
  const known = new Set<string>([...arts.map(a => a.pmid), ...trials.map(t => t.nct.toUpperCase())])
  let stripped = 0

  const checked = text
    .replace(/PMID[:\s]*(\d{6,9})/gi, (full, id) => {
      if (known.has(id)) return full
      stripped++
      return 'PMID (unverified)'
    })
    .replace(/\b(NCT\d{8})\b/gi, (full, id) => {
      if (known.has(String(id).toUpperCase())) return full
      stripped++
      return 'NCT (unverified)'
    })

  return { text: checked, stripped }
}

/* -- Gate -------------------------------------------------------------- */

/** Length-independent compare so the response time does not leak the code. */
function codeMatches(given: string, expected: string): boolean {
  if (!expected) return false
  const a = Buffer.from(given.trim())
  const b = Buffer.from(expected.trim())
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

/* -- Handlers ---------------------------------------------------------- */

export function GET() {
  return Response.json({
    enabled: Boolean(process.env.ANTHROPIC_API_KEY && process.env.CUSTOMGPT_ACCESS_CODE),
    model: MODEL,
  })
}

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY
  const expected = process.env.CUSTOMGPT_ACCESS_CODE

  if (!key || !expected) {
    return Response.json(
      { ok: false, error: 'not_configured', message: 'The navigator is not switched on yet.' },
      { status: 503 },
    )
  }

  let body: { question?: string; code?: string }
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  if (!codeMatches(body.code || '', expected)) {
    return Response.json({ ok: false, error: 'bad_code', message: 'That access code is not valid.' }, { status: 401 })
  }

  const question = (body.question || '').trim().slice(0, 600)
  if (question.length < 8) {
    return Response.json({ ok: false, error: 'validation', message: 'Ask a fuller question.' }, { status: 422 })
  }

  try {
    const plan = parsePlan(await claude(key, PLANNER, question, 400), question)

    const [search, trials] = await Promise.all([
      pubmedSearch(plan.pubmed, MAX_ARTICLES),
      trialSearch(plan.ctgov, MAX_TRIALS).catch(e => {
        console.error('[customgpt] ctgov failed', e)
        return [] as Trial[]
      }),
    ])

    const articles = await pubmedFetch(search.pmids)

    if (articles.length === 0 && trials.length === 0) {
      return Response.json({
        ok: true,
        synthesis:
          '**Bottom line** - nothing was retrieved for this question.\n\nPubMed and ClinicalTrials.gov both returned no records for the generated search. Try naming the drug, population or outcome more specifically.',
        articles: [],
        trials: [],
        queries: { pubmed: plan.pubmed, ctgov: plan.ctgov, totalHits: search.total },
        stripped: 0,
      })
    }

    const raw = await claude(key, SYNTH, `QUESTION: ${question}\n\n${renderRecords(articles, trials)}`, 1600)
    const { text, stripped } = verifyCitations(raw, articles, trials)

    if (stripped > 0) console.warn('[customgpt] stripped', stripped, 'unverifiable citations')

    return Response.json({
      ok: true,
      synthesis: text,
      articles,
      trials,
      queries: { pubmed: plan.pubmed, ctgov: plan.ctgov, totalHits: search.total },
      stripped,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown'
    console.error('[customgpt] failed', msg)
    const upstream = msg.startsWith('anthropic_')
    return Response.json(
      {
        ok: false,
        error: upstream ? 'llm_failed' : 'retrieval_failed',
        message: upstream
          ? 'The model call failed. Check the API key and its credit balance.'
          : 'PubMed or ClinicalTrials.gov did not respond. Try again in a moment.',
      },
      { status: 502 },
    )
  }
}
