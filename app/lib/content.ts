/* ClearPath Automation - site content.
 *
 * Single source of truth. Every page reads from here, nothing hardcodes copy.
 * Employer is deliberately unnamed throughout: the clinical tools below are
 * deployed inside a Fortune 20 health company and describing them publicly by
 * name is not something to do on a commercial site.
 */

export const SITE = {
  name: 'ClearPath Automation',
  legal: 'ClearPath Automation LLC',
  domain: 'clearpathautomation.io',
  email: 'support@clearpathautomation.io',
  location: 'Carpentersville, IL',
  tagline: 'Where inefficiency meets its match.',
  blurb:
    'AI systems, workflow automation and purpose-built software, built and shipped to production. Agents with real evaluation behind them, machine-learning pipelines that are verified before they serve, and automation on the legacy platforms that have no API.',
  linkedin: 'https://linkedin.com/in/damianwroblewski88',
  github: 'https://github.com/DamianAI613',
}

/* -- Credentials strip ------------------------------------------------- */

export const CREDS = [
  { value: '8', label: 'AI and automation tools shipped to production inside a large enterprise' },
  { value: '20+', label: 'Releases on the flagship tool, v1 through v6.2' },
  { value: '~31k', label: 'Lines across ~93 Python programs on the ML platform, built solo' },
  { value: '10', label: 'Projects documented as case studies on this site' },
]

/* -- Services ---------------------------------------------------------- */

export type Service = {
  slug: string
  icon: string
  title: string
  tagline: string
  body: string
  bullets: string[]
  tech: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'ai-agents',
    icon: '\u{1F916}',
    title: 'Custom AI & Agent Systems',
    tagline: 'Purpose-built AI that handles a specific job, with a defined failure mode.',
    body:
      'Most AI projects fail on evaluation, not on the model. I build agents the way you would build anything else that has to be trusted: a stated requirement, a measure, a golden set, logged failure modes, and an escalation path for the cases it should not handle alone.',
    bullets: [
      'Anthropic and OpenAI API integration; agentic workflows with tool use',
      'Retrieval-grounded assistants over your own documents, with inline citations',
      'Evaluation harnesses - golden references, regression suites, graded outputs',
      'Brand-voice and policy constraints enforced, not suggested',
      'Escalation and fallback logic so the agent hands off instead of guessing',
    ],
    tech: ['Claude API', 'OpenAI API', 'Prompt engineering (certified)', 'RAG', 'Agent SDK', 'Evals'],
  },
  {
    slug: 'ml-data',
    icon: '\u{1F4C8}',
    title: 'Machine Learning & Data Platforms',
    tagline: 'Pipelines built so a wrong answer is caught before it ships, not after.',
    body:
      'I built and operate a private in-house ML platform end to end, which is where this discipline comes from: strictly time-ordered splits, a sealed test set, and a verification harness that refuses to promote a model whose live accuracy does not reproduce its test accuracy. Most ML work fails on evaluation long before it fails on modelling.',
    bullets: [
      'Gradient-boosted ensembles - XGBoost, LightGBM, HistGradientBoosting',
      'Time-ordered train/validation/sealed-test splits; purged cross-validation',
      'Data-leakage detection and feature engineering with honest attribution',
      'Verification before serving; versioned artifacts with one-step rollback',
      'Live ingestion over WebSocket with in-memory cache and REST fallback',
    ],
    tech: ['Python', 'scikit-learn', 'XGBoost', 'LightGBM', 'pandas', 'NumPy', 'WebSocket'],
  },
  {
    slug: 'workflow-automation',
    icon: '⚙️',
    title: 'Workflow & Browser Automation',
    tagline: 'Including the legacy platforms everyone else says cannot be automated.',
    body:
      'The expensive manual work is usually trapped in a system with no API. I automate those: frame-aware browser control over the Chrome DevTools Protocol, postback-safe waits on legacy ASP.NET platforms, error recovery, and a CSV audit trail so compliance can see exactly what ran.',
    bullets: [
      'Browser automation via Playwright over the Chrome DevTools Protocol',
      'Legacy enterprise web apps - iframe-aware scraping, postback handling, recovery',
      'Desktop automation, clipboard tooling and global hotkeys (tkinter, pynput)',
      'Zapier and Make pipelines where a hosted tool is genuinely the right answer',
      'Audit logging, retry logic and straight-through processing with a paper trail',
    ],
    tech: ['Playwright', 'CDP', 'Python', 'tkinter', 'pynput', 'Zapier', 'Make', 'PyInstaller'],
  },
  {
    slug: 'full-stack',
    icon: '\u{1F5A5}️',
    title: 'Full-Stack Apps & Portals',
    tagline: 'Client portals, dashboards and SaaS products, shipped to production.',
    body:
      'Role-based web apps with real-time data, built on a stack I have taken all the way to paying-customer-ready more than once: Next.js on Vercel, Postgres with row-level security, Stripe billing, and a mobile client where it earns its keep.',
    bullets: [
      'Role-based access control and multi-role dashboards',
      'Real-time updates over Postgres subscriptions',
      'Stripe billing, subscriptions and webhook handling with signature verification',
      'Admin tooling, audit logging and user management',
      'PWA and React Native mobile clients',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe', 'React Native'],
  },
  {
    slug: 'integrations',
    icon: '\u{1F517}',
    title: 'API & System Integrations',
    tagline: 'Connecting the tools you already pay for, reliably.',
    body:
      'Integration work is where most automation quietly breaks - a webhook with no signature check, a retry loop with no backoff, a rate limit nobody budgeted for. I build the unglamorous parts: idempotency, verification, backoff, structured logs.',
    bullets: [
      'Stripe payments, subscriptions and webhook pipelines',
      'Twilio SMS/MMS, Resend transactional email, OneSignal push',
      'OAuth integrations and token lifecycle handling',
      'Webhook handlers with signature verification and replay safety',
      'Rate limiting, retry with backoff, and structured error reporting',
    ],
    tech: ['Stripe', 'Twilio', 'Resend', 'OAuth', 'REST', 'Webhooks', 'Sentry'],
  },
  {
    slug: 'reliability',
    icon: '\u{1F6E1}️',
    title: 'Reliability Engineering',
    tagline: 'Automation you do not have to babysit.',
    body:
      'An automation that fails silently is worse than no automation, because you trust it. Everything I hand over is built to notice its own failures: atomic writes, heartbeats, watchdogs with restart-storm guards, and versioned artifacts you can roll back in one step.',
    bullets: [
      'Atomic state writes - serialize, temp file, fsync, re-parse, replace',
      'Watchdogs detecting process death, heartbeat stalls and stale output',
      'Restart-storm guards and single-instance locks',
      'Health checks, structured logging and scheduled-job supervision',
      'Versioned artifacts with documented one-step rollback',
    ],
    tech: ['Python', 'Windows Task Scheduler', 'cron', 'Vercel', 'Cloudflare', 'Git'],
  },
  {
    slug: 'clinical-ai',
    icon: '\u2695\ufe0f',
    title: 'Healthcare & Clinical Tooling',
    tagline: 'A domain I already have the context for, so the requirement does not need translating.',
    body:
      'Most of the production tooling on this site was built for a clinical utilization-management workflow, which means the regulated-environment constraints are familiar: PHI handling, audit trails, de-identified design, and tooling that supports a reviewer\u2019s decision rather than making one. I hold a PharmD and work in that workflow, which is how the domain access happened \u2014 the engineering is the service being offered.',
    bullets: [
      'Decision-support tooling that attaches to a live case-review workflow',
      'Criteria, step-therapy and question-set logic rendered as something a reviewer can read',
      'Retrieval-grounded clinical assistants that answer with citations, not recall',
      'Evaluation rubrics for probabilistic systems in regulated settings',
      'De-identified by design; audit trails where compliance needs them',
    ],
    tech: ['Python', 'Playwright/CDP', 'Flask', 'LLM APIs', 'Retrieval', 'PHI-aware design'],
  },
]

/* -- Employer phrasing ------------------------------------------------- */

export const NAME_EMPLOYER: string | null = null

/** How identifying the employer phrasing is. 'ranked' says Fortune 20, which
 *  combined with "prior authorization" and a ~60-pharmacist UM team is close to
 *  identifying; 'generic' matches the de-identified wording used before. */
const EMPLOYER_SPECIFICITY: 'ranked' | 'generic' = 'ranked'

const RANKED = EMPLOYER_SPECIFICITY === 'ranked'

export const EMPLOYER =
  NAME_EMPLOYER ?? (RANKED ? 'a Fortune 20 health company' : 'a large national health company')

/** Same thing in adjective position, e.g. "deployed inside X". */
export const EMPLOYER_ENV = NAME_EMPLOYER ?? (RANKED ? 'a Fortune 20 enterprise' : 'a large enterprise')

/* -- Projects ---------------------------------------------------------- */

export type Project = {
  slug: string
  title: string
  short: string
  category: string
  group: 'Healthcare AI' | 'ML & Data' | 'Products & SaaS' | 'Automation'
  status: 'In daily use' | 'In regular use' | 'Active' | 'Demoed' | 'Retired' | 'Private case study'
  featured: boolean
  tagline: string
  /** The one-paragraph version, used on cards and the work index. */
  summary: string
  /** The case study body - rendered as sections on /work/[slug]. */
  sections: { heading: string; body: string }[]
  /** Short factual bullets. */
  highlights: string[]
  tech: string[]
  video?: string
  image?: string
  note?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'onepa-doc-alert',
    title: 'OnePA Doc Alert',
    short: 'OnePA Doc Alert',
    category: 'Clinical decision support',
    group: 'Healthcare AI',
    status: 'In daily use',
    featured: true,
    tagline: 'An always-on review companion for live prior-authorization cases. v1 through v6.2, 20+ releases.',
    summary:
      'A decision-support companion that attaches to a live case-review platform, reads the case in front of the pharmacist, looks the governing rule up in roughly 100,000 rows of criteria workbooks in seconds, walks the question logic, and renders a color-coded verdict - while showing which signal triggered it so the reviewer can sanity-check the answer rather than trust it.',
    sections: [
      {
        heading: 'The problem',
        body:
          'A prior-authorization reviewer opens a case and has to answer one question quickly: what does policy actually require here? The answer lives in Excel criteria workbooks running to about 100,000 rows, spread across therapeutic areas, with conditional question logic layered on top. Looking it up by hand is slow, and being slow is expensive when you are measured on turnaround time against a quality standard.',
      },
      {
        heading: 'What it does',
        body:
          'The tool attaches to the running case system through Playwright over the Chrome DevTools Protocol and reads the product rule, case description and medical markers directly off the live page. It indexes the criteria workbooks, resolves the governing rule, walks the conditional question logic, and renders one of several color-coded verdicts: attestation-only, standard review, documentation required, full review with copy-to-clipboard note templates, a separate routing path for a second line of business, quantity-limit, no guidance, or a medical and program-enrollment indicator. A dedicated classifier separates a genuine documentation request from boilerplate language that only looks like one.',
      },
      {
        heading: 'The design decision that matters',
        body:
          'It shows its work. Every verdict surfaces the signal that triggered it, so the reviewer can check the reasoning instead of taking the output on faith. That is the difference between a tool clinicians adopt and one they quietly stop opening - and it is the same principle behind every AI system I build. The pharmacist remains the decision-maker; the tool removes the lookup, not the judgment.',
      },
      {
        heading: 'Shipping it, not just building it',
        body:
          'Twenty-plus releases across six major versions, packaged with PyInstaller and distributed from a team SharePoint library - pharmacists download each release, with first-run self-setup and no auto-sync dependency. I wrote the rollout email, installation guide, user guide, banner reference and SOP, and delivered the team training myself. Reviewer feedback came straight into the backlog and regressions were fixed from those reports within days. Code-quality sweeps with pyflakes and vulture; changelog kept in the file.',
      },
    ],
    highlights: [
      'v1 through v6.2, 20+ releases, in daily use by a ~60-pharmacist utilization-management team',
      '~100,000 rows of criteria workbooks, indexed and resolved in seconds',
      'Attaches to the live platform via Playwright over the Chrome DevTools Protocol',
      'Nine distinct verdict states, each showing the signal that triggered it',
      'Documentation classifier that distinguishes a real ask from boilerplate',
      'Packaged with PyInstaller; SOP, user guide and team training written and delivered by me',
    ],
    tech: ['Python', 'Playwright', 'Chrome DevTools Protocol', 'openpyxl', 'PyInstaller', 'SharePoint'],
    note:
      `Built inside ${EMPLOYER} and actively deployed, so it cannot be publicly demonstrated. De-identified throughout; no client data leaves the environment.`,
  },
  {
    slug: 'pahub-helper',
    title: 'PAHub Helper',
    short: 'PAHub Helper',
    category: 'Clinical tooling',
    group: 'Healthcare AI',
    status: 'In regular use',
    featured: true,
    tagline: 'Three tools in one desktop app: DecisionFlow, QPath and PathLogic Mapper.',
    summary:
      'A three-tab Python desktop application for prior-authorization criteria work. It turns structured Excel drug criteria and question sets into interactive, color-coded HTML decision trees with full approval and denial logic - a rules-based decision layer a reviewer can actually read, with zero installation on the end-user side.',
    sections: [
      {
        heading: 'The problem',
        body:
          'Specialty drug criteria are branching logic stored in spreadsheets. A reviewer working a complex case has to hold that branch structure in their head while reading the chart. Spreadsheets are the wrong shape for that job: they show rows, not paths.',
      },
      {
        heading: 'Three tabs, three friction points',
        body:
          'DecisionFlow Builder converts the structured Excel criteria and question sets into an interactive, color-coded HTML flowchart with approval and denial branches rendered explicitly - one click, a file you can open in any browser. QuickClip Pro (QPath) is an auto-advancing clipboard tool with global keyboard detection, for assembling a question set without leaving the case. PathLogic Mapper is a real-time conditional-logic navigator that highlights the live decision path as the reviewer moves through it.',
      },
      {
        heading: 'Why desktop and why HTML',
        body:
          'Two deliberate constraints. The app is a self-contained Python desktop tool, so it needs no server, no deployment pipeline and no IT ticket. Its output is plain interactive HTML, so the artifact outlives the tool - a reviewer can save a flowchart, share it, or open it two years later without needing anything installed. Zero external dependencies on the end-user side was a requirement, not a nice-to-have.',
      },
    ],
    highlights: [
      'DecisionFlow Builder - one-click interactive HTML decision trees from Excel criteria',
      'QuickClip Pro / QPath - auto-advancing clipboard automation with global keyboard detection, for rapid question-set assembly',
      'PathLogic Mapper - live color-coded conditional-logic path visualizer',
      'Handles complex specialty-drug criteria with explicit approval/denial logic',
      'Zero external dependencies on the end-user side',
      'Used weekly to monthly by a small group, not deployed team-wide',
    ],
    tech: ['Python', 'tkinter', 'openpyxl', 'HTML/JS', 'Excel parsing'],
    video: '/ToolsVideoFinal.mp4',
    note:
      `Actively deployed inside ${EMPLOYER_ENV} environment; the walkthrough shows the tools, not live case data.`,
  },
  {
    slug: 'clinical-evidence-navigator',
    title: 'Clinical Evidence Navigator',
    short: 'Evidence Navigator',
    category: 'Retrieval-grounded AI',
    group: 'Healthcare AI',
    status: 'Demoed',
    featured: true,
    tagline: 'A cited literature research assistant over PubMed and ClinicalTrials.gov.',
    summary:
      'A retrieval-grounded LLM assistant that queries PubMed and ClinicalTrials.gov in real time and answers with inline citations, turning a research task that takes hours into one that takes seconds - without the fabrication risk of asking a model to recall literature from memory.',
    sections: [
      {
        heading: 'Why retrieval, not recall',
        body:
          'Asking a language model what the literature says is the single most dangerous thing you can do with one in a clinical context, because a fabricated citation is indistinguishable from a real one at a glance. This tool never asks the model to remember. It retrieves live from PubMed and ClinicalTrials.gov, then asks the model to synthesize only what was retrieved, and renders the answer with inline citations pointing back at the source.',
      },
      {
        heading: 'What it is for',
        body:
          'Clinical-grade answers to therapy questions in seconds instead of hours - the kind of question that comes up mid-review and currently costs a reviewer a detour into three databases. Built as a Flask application with the retrieval layer and the synthesis layer kept deliberately separate, so the sourcing can be audited independently of the wording.',
      },
      {
        heading: 'Where it stands',
        body:
          'Built, working, and demonstrated to a senior director and upper management. Deployment was postponed - not for a technical reason - with potential future use in the appeals department, where cited literature retrieval is the daily job. It is the clearest demonstration of the approach I would bring to any clinical AI build: ground it, cite it, and let the reviewer check it.',
      },
    ],
    highlights: [
      'Live retrieval from PubMed and ClinicalTrials.gov - no recall from model memory',
      'Inline citations on every answer, auditable back to the source',
      'Flask application with retrieval and synthesis layers kept separate',
      'Demonstrated to a senior director and upper management',
      'Deployment postponed; candidate for appeals-department use',
    ],
    tech: ['Python', 'Flask', 'GPT-4', 'PubMed API', 'ClinicalTrials.gov API', 'RAG'],
    video: '/DamiansCustomGPTdemo.mp4',
  },
  {
    slug: 'bulk-workflow-automation',
    title: 'Bulk Workflow Automation',
    short: 'Bulk Automation',
    category: 'Enterprise RPA',
    group: 'Automation',
    status: 'In regular use',
    featured: false,
    tagline: 'Straight-through processing on a legacy platform with no API, and an audit trail.',
    summary:
      'Browser automation across a legacy ASP.NET platform - frame-aware handling, postback-safe waits, error recovery and CSV audit logging - converting repetitive reviewer steps into straight-through processing while leaving compliance a record of exactly what ran.',
    sections: [
      {
        heading: 'The constraint',
        body:
          'The platform has no API. It is a legacy ASP.NET application with nested frames and full-page postbacks, which breaks naive automation in a specific way: the script races ahead of a postback, acts on a stale DOM, and either fails loudly or - far worse - succeeds on the wrong record.',
      },
      {
        heading: 'How it is built',
        body:
          'Frame-aware element resolution rather than flat selectors. Postback-safe waits that key off the actual page lifecycle instead of a fixed sleep. Error recovery that returns the session to a known state rather than aborting mid-sequence. And a CSV audit log of every action taken, with its target and outcome.',
      },
      {
        heading: 'Why the audit log is the point',
        body:
          'In a regulated workflow, automation without an audit trail is not usable regardless of how well it works - you cannot answer the question "what did it do on this case" six months later. The log is the deliverable as much as the automation is. This is the pattern I bring to any legacy-platform automation: assume you will have to prove what happened.',
      },
    ],
    highlights: [
      'Frame-aware handling across a nested-frame legacy ASP.NET platform',
      'Postback-safe waits keyed to the page lifecycle, not fixed sleeps',
      'Error recovery that returns to a known state instead of aborting mid-run',
      'CSV audit logging of every action, target and outcome for compliance',
      'Straight-through processing on steps that were fully manual',
      'Run weekly to monthly against batches, not continuously',
    ],
    tech: ['Python', 'Playwright', 'Chrome DevTools Protocol', 'CSV audit logging'],
    note: 'Internal enterprise tool; not publicly demonstrable.',
  },
  {
    slug: 'ironsight-ai',
    title: 'IronSight AI',
    short: 'IronSight AI',
    category: 'ML / data platform',
    group: 'ML & Data',
    status: 'Private case study',
    featured: true,
    tagline: 'A private, in-house machine-learning analytics platform. Roughly 93 programs and 31,000 lines, built and operated solo.',
    summary:
      'An end-to-end analytics platform designed, built and operated alone: real-time data ingestion, a resumable training pipeline, a verification step that refuses to promote a model whose live accuracy does not reproduce its test accuracy, same-day grading of every prediction, and watchdog-supervised services that recover from their own failures. The platform is private and run in-house \u2014 it is not a public service, is not open for signup and has no subscribers. It appears here as an engineering case study only.',
    sections: [
      {
        heading: 'What it is, and what is deliberately not here',
        body:
          'A private in-house machine-learning analytics platform, roughly 93 Python programs and 31,000 lines, every one of them mine. What follows is the engineering: the pipeline shape, the verification discipline and the reliability work. The model design, the inputs it reads and the method behind it are proprietary and are not described on this site \u2014 the point of showing this project is how it was engineered, not what it concluded.',
      },
      {
        heading: 'Pipeline',
        body:
          'Real-time data ingestion with an in-memory cache and a fallback path for anything the primary route misses, feeding a local service layer so nothing downstream reaches a vendor directly. The training pipeline produces ensembled models with strictly time-ordered train, validation and sealed-test splits. It is resumable, so a long run survives an interruption, degrades gracefully when a dependency is unavailable rather than failing outright, handles missing values natively instead of imputing data that was never there, and versions every artifact it saves.',
      },
      {
        heading: 'Verification before serving \u2014 the part I would argue for in any ML system',
        body:
          'A separate harness re-runs live inference against held-out data and refuses to promote a model whose live accuracy does not reproduce its test accuracy. This catches the failure that quietly kills machine learning in production: a train-serve skew where the offline number is real and the online number is not. Paired with versioned artifacts and one-step rollback, it means a bad model cannot become the live model by default.',
      },
      {
        heading: 'Honest measurement',
        body:
          'Every prediction is graded the same day it resolves, and the record is kept in full rather than curated \u2014 misses included. The validation methodology was rebuilt once a single hold-out split proved over-optimistic, and a candidate input was dropped outright when leakage was found in it. Being willing to throw away a feature that flattered the numbers is the whole discipline, and it is the habit I bring to evaluating anyone else\u2019s model.',
      },
      {
        heading: 'Reliability engineering',
        body:
          'Atomic state writes \u2014 serialize, temp file, fsync, re-parse, replace \u2014 so a crash mid-write cannot corrupt state. A watchdog that detects process death, heartbeat stalls and stale output, with a restart-storm guard so a crash loop cannot become an outage. Structured logging throughout, and a safe default: the system does nothing unless explicitly enabled for the day, so the failure mode of every guard is inaction rather than a wrong action.',
      },
    ],
    highlights: [
      '~93 Python programs, ~31,000 lines, designed and operated solo',
      'Real-time ingestion with caching and a fallback path; local service layer in front of it',
      'Time-ordered train/validation/sealed-test splits; resumable, versioned artifacts',
      'Verification harness blocks promotion on train-serve skew; one-step rollback',
      'Same-day grading of every prediction, kept in full rather than curated',
      'Atomic writes, watchdog with restart-storm guard, safe-by-default gating',
      'Private and operated in-house \u2014 not a public or commercial service',
    ],
    tech: ['Python', 'scikit-learn', 'Next.js 16', 'Supabase Realtime', 'Vercel'],
    image: '/ironsight-board.png',
    note:
      'Private in-house build, shown as an engineering case study. Not a public service, not open for signup, no subscribers, and no outbound link \u2014 the platform is not publicly accessible. The model design, its inputs and its method are proprietary and are not described here. AI-generated analytics, informational only; nothing on this page is financial advice.',
  },
  {
    slug: 'bookit',
    title: 'BookIT',
    short: 'BookIT',
    category: 'Scheduling SaaS',
    group: 'Products & SaaS',
    status: 'Retired',
    featured: false,
    tagline: 'A full booking platform taken from concept to production, solo - then wound down.',
    summary:
      'An end-to-end appointment-scheduling SaaS for service businesses: three role-based dashboards, 23 API routes, real-time Postgres subscriptions, Stripe billing, Twilio SMS reminders, email verification, a React Native mobile client and PWA support. The software shipped and worked. The business concept behind it did not, and it was retired in 2026.',
    sections: [
      {
        heading: 'What was built',
        body:
          'A complete scheduling product: admin, business and client dashboards each with their own role boundary; 23 API routes spanning booking, billing and auth; real-time updates over Postgres subscriptions; Stripe subscription billing with webhook handling; automated SMS reminders over Twilio and transactional email; a companion React Native mobile app; and PWA support for installable web use.',
      },
      {
        heading: 'Why it is still here',
        body:
          'Because it is an honest engineering case study and a dishonest portfolio is worthless. BookIT reached production - auth, payments, notifications, mobile, deployment, the whole surface - and then I wound it down before public launch because the business idea was not good enough, not because the build failed. Every technical pattern I use on client work today was proven here first: the Stripe flow, the real-time layer, the role model, the webhook verification.',
      },
      {
        heading: 'What it taught',
        body:
          'Shipping the software is the easy half. The hard half is being willing to retire something you built when the evidence says to. I would rather show you a retired product described accurately than a live one described generously.',
      },
    ],
    highlights: [
      '3 role-based dashboards - admin, business, client - with enforced boundaries',
      '23 API routes across booking, billing and authentication',
      'Real-time Postgres subscriptions for live availability and notifications',
      'Stripe subscription billing with verified webhook handling',
      'Automated Twilio SMS reminders and transactional email verification',
      'React Native companion app plus PWA support',
    ],
    tech: ['Next.js', 'React 19', 'React Native', 'Expo', 'Supabase', 'PostgreSQL', 'Stripe', 'Twilio', 'Vercel'],
    note: 'Retired in 2026 before public launch. Presented as an engineering case study, not a product you can buy.',
  },
  {
    slug: 'clearpath-cards',
    title: 'ClearPath Cards',
    short: 'ClearPath Cards',
    category: 'Product / lead-gen tool',
    group: 'Products & SaaS',
    status: 'Active',
    featured: false,
    tagline: 'A free digital business card platform with a zero-backend fallback path.',
    summary:
      'A digital business card builder where a published card has two independent homes: a row in Postgres behind a clean shortlink, or the entire card LZ-compressed into the URL fragment itself. If the database is down, misconfigured or missing its environment variables, publishing silently falls back to the long link and the user still gets a working card.',
    sections: [
      {
        heading: 'The interesting constraint',
        body:
          'A business card has to work forever. That is a hard promise for anything database-backed, so the product was designed so that nothing about it hard-depends on the database. A card is a plain JSON object with two storage paths: a Supabase row behind a short link, which gives clean URLs, real Open Graph previews and a view counter - or the same JSON LZ-compressed into a URL fragment, which needs no database, no row and no server, and keeps working regardless.',
      },
      {
        heading: 'Graceful degradation as a feature',
        body:
          'If Supabase is unreachable or unconfigured, publish does not error - it falls back to the fragment path and hands the user a longer link that works permanently. Photos are downscaled to 320px and inlined as data URLs, so a card is fully self-contained with no external image dependency. This is the same instinct as the REST fallback behind the ML platform ingestion: assume the dependency will fail, and decide now what happens when it does.',
      },
      {
        heading: 'Three jobs, one codebase',
        body:
          'The landing page shows a prospect what ClearPath can build. The builder at /new is a genuinely free tool, with every free card carrying a "Built with ClearPath Cards" footer. And one card is mine - a permanent shareable link for an email signature. A demo, a lead-gen funnel and a real product in the same deployment.',
      },
    ],
    highlights: [
      'Dual storage - Postgres shortlink or the whole card LZ-compressed into the URL fragment',
      'Publishing degrades gracefully to a database-free path instead of failing',
      'Server-rendered published cards with per-card Open Graph tags',
      'Photos downscaled to 320px and inlined as data URLs - fully self-contained cards',
      'Token-based edit links; 4-step builder with a live phone preview; PWA manifest',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'LZ compression', 'PWA'],
  },
  {
    slug: 'custom-gpt-suite',
    title: 'Custom GPT Suite',
    short: 'Custom GPT Suite',
    category: 'AI agents',
    group: 'Healthcare AI',
    status: 'Active',
    featured: false,
    tagline: 'Ten-plus purpose-built assistants, each scoped to one real workflow.',
    summary:
      'A collection of 10+ production GPTs with engineered system prompts, curated knowledge bases and API actions. Each one is scoped to a single workflow rather than built as a general assistant, because a narrow agent with a defined failure mode is worth more than a broad one without.',
    sections: [
      {
        heading: 'The approach',
        body:
          'One job per agent. Each has an engineered system prompt, a curated knowledge base, and API actions where it needs to reach outside itself. Brand-voice and policy constraints are enforced in the prompt contract rather than hoped for, and every agent has explicit escalation logic for the cases it should not handle alone.',
      },
      {
        heading: 'Why narrow beats broad',
        body:
          'A general-purpose assistant has an undefined failure surface, which makes it impossible to evaluate and therefore impossible to trust with anything that matters. A narrow agent can be given a golden set, graded case by case, and improved against a measure. That is the only version of this work I will ship.',
      },
    ],
    highlights: [
      '10+ production GPTs in active use',
      'Engineered system prompts with enforced brand-voice and policy constraints',
      'Curated knowledge bases plus API actions for outside reach',
      'Explicit escalation logic for out-of-scope cases',
      'Multi-language support built in',
    ],
    tech: ['GPT-4', 'Claude API', 'Prompt engineering', 'Knowledge retrieval', 'API actions'],
  },
  {
    slug: 'automation-pipelines',
    title: 'Workflow Automation Pipelines',
    short: 'Automation Pipelines',
    category: 'Workflow automation',
    group: 'Automation',
    status: 'Active',
    featured: false,
    tagline: 'Cross-platform pipelines connecting CRMs, billing, email and comms.',
    summary:
      'End-to-end automation pipelines joining CRMs, email platforms, payment processors and communication tools - built with the error handling, retry logic and idempotency that separate an automation you can leave running from one you have to check every morning.',
    sections: [
      {
        heading: 'What gets automated',
        body:
          'Invoice and billing flows, lead pipelines and CRM workflows, cross-platform data sync, and the recurring handoffs between systems that otherwise live in somebody head. Zapier and Make where a hosted tool is genuinely the right call; Node.js, webhooks and scheduled jobs where it is not.',
      },
      {
        heading: 'Built to be left alone',
        body:
          'Error handling and retry with backoff throughout, idempotency so a replayed event does not double-charge or double-send, and structured logging so a failure is visible rather than silent. The measure of this work is not whether it runs - it is whether you stop thinking about it.',
      },
    ],
    highlights: [
      'Cross-platform data sync between systems with no native integration',
      'Invoice, billing and lead-pipeline automation',
      'Retry with backoff, idempotency and replay safety',
      'Structured logging so failures surface instead of going quiet',
      'Hosted tooling where it fits; custom code where it does not',
    ],
    tech: ['Zapier', 'Make', 'Node.js', 'Python', 'Webhooks', 'Cron'],
  },
  {
    slug: 'portals-dashboards',
    title: 'Client Portals & Dashboards',
    short: 'Portals & Dashboards',
    category: 'Full-stack apps',
    group: 'Products & SaaS',
    status: 'Active',
    featured: false,
    tagline: 'Self-service web apps with live data, RBAC and audit logging.',
    summary:
      'Custom web applications with role-based access control, real-time data subscriptions, image processing and responsive design - plus the admin side that usually gets skipped: analytics, audit logging and user management.',
    sections: [
      {
        heading: 'What these are',
        body:
          'Interfaces that let your customers or your team do for themselves what currently requires an email to somebody. Role-based access control enforced at the data layer with row-level security rather than hidden in the UI, live updates over Postgres subscriptions, image upload with crop and processing, and interactive dashboards built from real data.',
      },
      {
        heading: 'The admin half',
        body:
          'Every portal ships with the operator view: analytics, full audit logging, and user management. It is the part that determines whether you can actually run the thing a year in, and it is the part most builds leave for later and never return to.',
      },
    ],
    highlights: [
      'Role-based access control enforced at the data layer, not in the UI',
      'Real-time updates via Postgres subscriptions',
      'Image upload, crop and processing',
      'Interactive dashboards and live monitoring UIs',
      'Full audit logging and user management on the admin side',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row-level security'],
  },
]

/* -- The enterprise clinical programme -------------------------------- *
 * The flagship body of work. Eight production tools shipped in 2026 for the
 * ~60-pharmacist utilization-management team; four of them are documented as
 * case studies above. Employer phrasing comes from EMPLOYER / EMPLOYER_ENV.
 */

export const CLINICAL = {
  eyebrow: 'Flagship work',
  title: 'Eight production tools inside a large enterprise',
  lede:
    'The largest body of work on this site. Eight AI and automation tools shipped in 2026 into a clinical utilization-management workflow \u2014 built, packaged, documented and supported through 20+ releases on the flagship alone.',
  loop:
    'Each one followed the same loop: observe the workflow, define the requirement and the measure, prototype in a week, validate against live cases with the people who would use it, harden it, document it, train the users, then iterate from their feedback.',
  usage:
    'Reach differs by tool and is stated plainly rather than rounded up. OnePA Doc Alert is the only one deployed to the whole team \u2014 roughly 60 pharmacists use it daily. PAHub Helper and the bulk automation are used weekly to monthly, by me and a small group. The rest are single-operator or small-group tools.',
  pillars: [
    {
      heading: 'Built from inside the workflow',
      body:
        'Every requirement came from a case worked first-hand rather than from a requirements document, which is why the verdict states and the edge cases match what actually comes up.',
    },
    {
      heading: 'The reviewer stays the decision-maker',
      body:
        'No tool makes a determination. Each removes a lookup, a navigation step or a transcription, and surfaces the signal that drove its guidance so the reasoning can be checked rather than trusted.',
    },
    {
      heading: 'De-identified by design',
      body:
        'No client data leaves the environment. PHI handling shaped the architecture from the first prototype rather than being retrofitted.',
    },
    {
      heading: 'Packaged, documented, supported',
      body:
        'Distributed from a team library with first-run self-setup and no auto-sync dependency. Installation guide, user guide, banner reference and SOP written alongside the code; regressions fixed from user reports within days; changelog kept in the file.',
    },
  ],
  alsoBuilt: [
    'Auto-advancing clipboard automation with global keyboard detection for rapid question-set assembly',
    'Real-time conditional-logic navigation that highlights the live decision path through branching criteria',
    'Excel-to-interactive-HTML conversion for complex approval and denial logic',
    'Criteria indexing across ~100,000 workbook rows, resolved in seconds at the point of use',
  ],
  pilot: {
    heading: 'Evaluation work on an enterprise AI platform',
    paras: [
      'Separately from the tools above: since March 2025 I have been part of a small group evaluating an enterprise AI review platform, starting with a week-long working session on its first draft before it was a product.',
      'The work is evaluation engineering \u2014 grading AI-generated guidance case by case against source criteria, logging defects and failure modes back to the product team, and building the training material for launch. I am in the pilot group for the current agentic release, which moves beyond LLM processing of documents to agent-driven steps.',
      'It is the same discipline as the verification harness on the ML platform: decide what correct means, measure against it, and report the failures rather than the wins.',
    ],
    certs: ['Enterprise Prompt Engineering certification', 'Enterprise GenAI Generalist certification'],
  },
}

export const FEATURED = PROJECTS.filter(p => p.featured)

export const GROUPS: Project['group'][] = ['Healthcare AI', 'ML & Data', 'Products & SaaS', 'Automation']

export function projectBySlug(slug: string) {
  return PROJECTS.find(p => p.slug === slug)
}

/* -- Demos ------------------------------------------------------------- */

export const DEMOS = [
  {
    id: 'overview',
    label: 'ClearPath Overview',
    icon: '\u{1F3AC}',
    blurb:
      'What ClearPath Automation does, in short: custom automation, AI agents and purpose-built software engineered to take manual work off your team permanently.',
    video: '/CPAFinalVideoDemo.mp4',
  },
  {
    id: 'tools',
    label: 'Enterprise Clinical Tools',
    icon: '\u{1F6E0}️',
    blurb:
      'The PAHub Helper suite - DecisionFlow Builder, QPath and PathLogic Mapper - three Python desktop tools built to take manual work out of a high-volume clinical review workflow. Deployed inside a Fortune 20 health company.',
    video: '/ToolsVideoFinal.mp4',
  },
  {
    id: 'evidence',
    label: 'Clinical Evidence Navigator',
    icon: '\u{1F916}',
    blurb:
      'A retrieval-grounded research assistant that queries PubMed and ClinicalTrials.gov live, then answers with inline citations. Clinical-grade answers in seconds, with the sourcing auditable.',
    video: '/DamiansCustomGPTdemo.mp4',
  },
  {
    id: 'ironsight',
    label: 'IronSight AI board',
    icon: '\u{1F4C8}',
    blurb:
      'The board from the platform: a directional read at fixed 15, 30 and 60-minute horizons, each graded HIT or MISS against what actually happened. A static screenshot of a private in-house tool \u2014 the platform itself is not publicly accessible. Informational only, not financial advice.',
    image: '/ironsight-board.png',
  },
  {
    id: 'bookit-business',
    label: 'BookIT - business side',
    icon: '\u{1F3E2}',
    blurb:
      'Retired project. A walkthrough of the business dashboard: configuring services, managing appointments, reviewing client bookings and handling real-time notifications.',
    video: '/business-tutorial.mp4',
  },
  {
    id: 'bookit-client',
    label: 'BookIT - client side',
    icon: '\u{1F464}',
    blurb:
      'Retired project. The client experience end to end - finding a business, picking a service, booking and confirming - in under a minute, with no app install.',
    video: '/client-tutorial.mp4',
  },
]

/* -- About ------------------------------------------------------------- */

export const BIO = {
  name: 'Damian Wroblewski',
  role: 'AI & automation engineer \u00b7 Founder, ClearPath Automation LLC',
  lede:
    'I build AI systems, machine-learning pipelines and automation, and I ship them to production.',
  paras: [
    'In 2026 I designed, built, packaged and supported eight AI and automation tools inside a large enterprise, carrying the flagship through 20+ releases across six major versions \u2014 browser automation over the Chrome DevTools Protocol against a platform with no API, a criteria index resolving ~100,000 workbook rows in seconds, and desktop tooling that compiles branching logic into interactive HTML.',
    'Independently I built and operate a private in-house machine-learning analytics platform: roughly 93 Python programs and 31,000 lines, solo. Resumable training pipelines, time-ordered splits with a sealed test set, a verification harness that blocks promotion on train-serve skew, atomic state writes, and watchdog-supervised services with restart-storm guards.',
    'Before that I shipped a full scheduling SaaS end to end \u2014 auth, role-based dashboards, Stripe billing, Twilio notifications, a React Native client \u2014 and retired it when the business case did not hold.',
    'My route into this was unusual: I am a licensed pharmacist and the enterprise tooling above was built for the workflow I work in, which is how I got the domain access and the regulated-environment constraints. The engineering is what I do now and what I am offering. Building with LLMs since 2024; everything in production shipped in 2026.',
  ],
  credentials: [
    'Enterprise Prompt Engineering certification \u00b7 Enterprise GenAI Generalist certification',
    'Doctor of Pharmacy (PharmD) and M.S. Health Administration (MHA) \u2014 Rosalind Franklin University, 2016',
    'B.S. Chemistry, biochemistry emphasis \u2014 Northern Illinois University, 2012',
    'Illinois Pharmacist License, active',
  ],
  history: [
    { years: '2026 - present', role: 'Founder, sole engineer - private in-house ML analytics platform', org: 'IronSight AI LLC' },
    { years: '2025 - present', role: 'Founder - custom software, automation and AI agents', org: 'ClearPath Automation LLC' },
    { years: '2025 - 2026', role: 'Founder, sole engineer - scheduling SaaS (retired)', org: 'BookIT' },
    { years: '2021 - present', role: 'Clinical pharmacist, prior authorization and clinical review - and builder of the team\u2019s internal AI tooling', org: `${EMPLOYER} (remote)` },
    { years: '2017 - 2021', role: 'Pharmacist - specialty, home infusion, mail order and retail', org: 'CVS Specialty, a national specialty pharmacy, GenRx, Jewel-Osco' },
  ],
}

/* -- Stack ------------------------------------------------------------- */

export const STACK_GROUPS = [
  {
    title: 'AI & machine learning',
    items: [
      'Anthropic / Claude API', 'OpenAI API', 'Prompt engineering (certified)', 'Agentic workflows',
      'Retrieval-grounded assistants', 'Evaluation harnesses', 'XGBoost', 'LightGBM',
      'HistGradientBoosting', 'scikit-learn', 'Purged cross-validation', 'Leakage detection',
      'Claude Code', 'Agent SDK',
    ],
  },
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS', 'Bash', 'AutoHotKey', 'Regex'],
  },
  {
    title: 'Frameworks & libraries',
    items: [
      'Next.js', 'React', 'React Native', 'Expo', 'Node.js', 'Flask', 'tkinter',
      'pandas', 'NumPy', 'openpyxl', 'Tailwind CSS',
    ],
  },
  {
    title: 'Automation',
    items: [
      'Playwright', 'Chrome DevTools Protocol', 'Legacy ASP.NET automation', 'iframe-aware scraping',
      'pynput', 'PyInstaller', 'Zapier', 'Make', 'Windows Task Scheduler', 'cron',
    ],
  },
  {
    title: 'Data & infrastructure',
    items: [
      'PostgreSQL', 'Supabase', 'Row-level security', 'Vercel', 'Cloudflare (DNS, R2)',
      'WebSocket streaming', 'REST', 'OAuth', 'Atomic file I/O', 'Git / GitHub auto-deploy',
    ],
  },
  {
    title: 'Integrations & services',
    items: ['Stripe', 'Twilio', 'Resend', 'OneSignal', 'Sentry', 'Discord', 'ElevenLabs'],
  },
]

/* -- Research-backed case for automation ------------------------------- */

export const RESEARCH = [
  { stat: '77%', desc: 'Less time spent on routine, repetitive tasks', source: 'PS Global Consulting / Workona, 2024' },
  { stat: '70%', desc: 'Reduction in human errors across automated workflows', source: 'Capgemini via Gitnux' },
  { stat: '30%', desc: 'Cut in operational costs through hyper-automation', source: 'Gartner, 2024' },
  { stat: '40%', desc: 'Workforce productivity boost when AI is incorporated', source: 'PS Global Consulting, 2024' },
  { stat: '52%', desc: 'ROI reported by IT departments automating key workflows', source: 'Salesforce Survey, Oct 2024' },
  { stat: '500+', desc: 'Hours freed annually in finance teams alone', source: 'American Express Business' },
]

export const RESEARCH_NOTE =
  'Sources: Gartner Hyper-Automation Report (2024), Salesforce State of Automation Survey (Oct 2024), Capgemini Intelligent Automation Study via Gitnux, PS Global Consulting Workflow Automation Report (2024), Workona Workflow Automation Statistics and Trends (2024), American Express Business Payments Study. Statistics reflect industry-wide research across multiple sectors. Individual results vary with process complexity, implementation quality and organizational readiness.'
