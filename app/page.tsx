'use client'

import { useState, useEffect, useRef } from 'react'

/* ── Data ────────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '6+', label: 'Production Apps Shipped' },
  { value: '20+', label: 'Automations Built' },
  { value: '10+', label: 'Custom AI Agents' },
  { value: '60–80%', label: 'Manual Work Eliminated' },
]

const SERVICES = [
  {
    icon: '⚙️',
    title: 'Workflow Automation',
    tagline: 'Eliminate the manual, repetitive work slowing your team down.',
    bullets: [
      'Zapier & Make pipeline design',
      'Cross-platform data sync',
      'Invoice & billing automation',
      'Lead pipeline & CRM workflows',
      'Error handling & retry logic',
    ],
    tech: ['Zapier', 'Make', 'Node.js', 'Webhooks', 'Cron Jobs'],
  },
  {
    icon: '🤖',
    title: 'Custom AI & GPT Agents',
    tagline: "Purpose-built AI tools that handle complex tasks so you don't have to.",
    bullets: [
      'GPT-4 & Claude API integration',
      'Agents with tool use & reasoning',
      'Custom knowledge bases',
      'Brand-voice consistent outputs',
      'Escalation & fallback logic',
    ],
    tech: ['GPT-4', 'Claude API', 'Prompt Engineering', 'API Actions', 'RAG'],
  },
  {
    icon: '🖥️',
    title: 'Full-Stack App Development',
    tagline: 'Web apps and SaaS platforms built for reliability at any scale.',
    bullets: [
      'Role-based client portals',
      'Real-time dashboards & analytics',
      'Stripe billing & subscriptions',
      'Admin tools & user management',
      'Mobile-ready PWA support',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL'],
  },
  {
    icon: '🔗',
    title: 'API & System Integrations',
    tagline: 'Connect your tools, payment systems, and communication platforms.',
    bullets: [
      'Stripe payment flows',
      'Twilio SMS & MMS',
      'Transactional email (Resend)',
      'Webhook handlers with signature verification',
      'Rate limiting & retry logic',
    ],
    tech: ['Stripe', 'Twilio', 'Resend', 'REST APIs', 'Edge Functions'],
  },
]

const PROJECTS = [
  {
    title: 'IronSight AI — Market Analytics Platform',
    category: 'ML / Data Platform',
    tagline: 'An informational software tool — machine-learning research with a live subscriber dashboard.',
    description: 'An end-to-end analytics platform built solo. A Python engine ingests real-time market data, runs gradient-boosted models trained on years of historical sessions, and publishes directional model output at fixed time horizons to a Next.js dashboard that updates live for subscribers. Every prediction is graded automatically against the outcome once the session closes, and the results are published in full — hits and misses. It is a software product, not an advisory service: it reports what the model sees. It does not give financial advice, does not recommend trades, and does not manage anyone’s money.',
    tech: ['Python', 'scikit-learn', 'Next.js 16', 'Supabase Realtime', 'Stripe', 'Vercel'],
    metrics: [
      'Real-time market data ingestion + feature pipeline',
      'Model output streamed to the browser via Postgres realtime',
      'Automated accuracy grading at fixed horizons, published un-cherry-picked',
      'Tiered Stripe subscriptions with a gated dashboard',
      'Shipped as an informational tool — no advice, no recommendations, no managed money',
    ],
    link: 'https://ironsightai.net',
    featured: true,
  },
  {
    title: 'BookIT — Scheduling SaaS',
    category: 'Full-Stack App · Retired',
    tagline: 'A full booking platform, built solo from concept to production — then retired.',
    description: 'End-to-end appointment scheduling SaaS for service businesses: real-time notifications, Stripe billing, Twilio SMS reminders, email verification, admin tools, and PWA support. Retired in 2026 — the software shipped and worked; the business concept behind it did not, and it was wound down before public launch. It stays here as an engineering case study, not a product you can buy.',
    tech: ['Next.js 16', 'React 19', 'Supabase', 'Stripe', 'Twilio', 'Vercel'],
    metrics: [
      '3 role-based dashboards (admin, business, client)',
      '23 API routes across booking, billing & auth',
      'Real-time Postgres subscriptions',
      'Automated SMS + email reminders',
    ],
    featured: true,
  },
  {
    title: 'Custom GPT Suite',
    category: 'AI Agents',
    tagline: 'AI assistants engineered for specific business workflows.',
    description: 'Collection of 10+ purpose-built GPTs with carefully engineered system prompts, knowledge bases, and API actions. Each one designed to replace hours of manual work for specific business operations.',
    tech: ['GPT-4', 'Claude API', 'Prompt Engineering', 'Knowledge Retrieval', 'API Actions'],
    metrics: [
      '10+ production GPTs in active use',
      'Multi-language support built in',
      'Brand voice consistency enforced',
      'Escalation logic for edge cases',
    ],
    featured: false,
  },
  {
    title: 'Workflow Automation Pipelines',
    category: 'Workflow Automation',
    tagline: 'Connecting systems and eliminating manual work across business ops.',
    description: 'End-to-end automation pipelines connecting CRMs, email platforms, payment processors, and communication tools. Built for reliability with full error handling and retry logic throughout.',
    tech: ['Zapier', 'Make', 'Webhooks', 'Node.js', 'Cron Jobs'],
    metrics: [
      '60–80% reduction in manual work',
      'Cross-platform data sync',
      'Invoice & billing automation',
      'Lead pipeline automation',
    ],
    featured: false,
  },
  {
    title: 'Client Portals & Dashboards',
    category: 'Full-Stack App',
    tagline: 'Self-service web apps with real-time data and RBAC.',
    description: 'Custom web applications with role-based access control, live data subscriptions, image processing, and responsive design. Admin dashboards with analytics, audit logging, and user management.',
    tech: ['React', 'Next.js', 'Supabase', 'PostgreSQL', 'Chart.js'],
    metrics: [
      'Role-based access control (RBAC)',
      'Real-time updates via Postgres subscriptions',
      'Image upload, crop & processing',
      'Full audit logging',
    ],
    featured: false,
  },
  {
    title: 'API & Payment Integrations',
    category: 'API Integrations',
    tagline: 'Stripe, Twilio, Resend, and custom REST pipelines in production.',
    description: 'Production-grade integrations covering payment processing, SMS/MMS communication, transactional email, and webhook handlers — all with signature verification and rate limiting.',
    tech: ['Stripe API', 'Twilio API', 'Resend', 'Webhooks', 'Edge Functions'],
    metrics: [
      'Full Stripe payment + subscription flows',
      'Toll-free SMS via Twilio',
      'Dynamic email templates',
      'Webhook signature verification',
    ],
    featured: false,
  },
  {
    title: 'Enterprise Workflow Suite',
    category: 'Enterprise Automation',
    tagline: 'Custom desktop tools that remove manual work from a high-volume enterprise workflow.',
    description: 'A suite of purpose-built Python desktop tools engineered to eliminate manual, repetitive work from a high-volume operational workflow at a large enterprise. Each tool targets a specific friction point — clipboard automation, decision-path mapping, and interactive flowchart generation. Details and live demos are withheld: these tools run inside a private enterprise environment.',
    tech: ['Python', 'tkinter', 'openpyxl', 'pynput', 'HTML/JS', 'Excel Parsing'],
    metrics: [
      'Auto-advancing clipboard automation with global keyboard detection',
      'Live, color-coded decision-path visualizer',
      'One-click interactive flowchart generator',
      'Zero external dependencies on the end-user side',
    ],
    featured: false,
  },
]

const STACK = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'Supabase', 'PostgreSQL',
  'OpenAI API', 'Claude API', 'scikit-learn', 'Stripe', 'Twilio', 'Vercel', 'Zapier',
  'Make', 'REST APIs', 'Webhooks', 'Tailwind CSS', 'PWA', 'Git',
]

/* ── Component ───────────────────────────────────────────────────────────── */

export default function ClearPathConsulting() {
  const [activeProject, setActiveProject] = useState(0)
  const [activeDemo, setActiveDemo] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const project = PROJECTS[activeProject]

  function scrollToContact() {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: '#E2E8F0', background: '#09090B', minHeight: '100vh', overflowX: 'hidden' }}>

      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes glow { 0%,100% { opacity: 0.35; } 50% { opacity: 0.65; } }
@keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
.cp-fade { animation: fadeIn 0.4s ease-out; }
.cp-section { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.cp-glow {
  position: absolute; top: -220px; left: 50%; transform: translateX(-50%);
  width: 700px; height: 500px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%);
  pointer-events: none; animation: glow 5s ease-in-out infinite;
}
.cp-stat {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px; padding: 28px 20px; text-align: center;
  transition: border-color 0.25s, background 0.25s;
}
.cp-stat:hover { border-color: rgba(99,102,241,0.35); background: rgba(99,102,241,0.05); }
.cp-service {
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 28px; transition: border-color 0.25s, background 0.25s, transform 0.25s;
}
.cp-service:hover { border-color: rgba(99,102,241,0.3); background: rgba(99,102,241,0.04); transform: translateY(-2px); }
.cp-project-tab {
  background: none; border: none; text-align: left; padding: 16px 20px;
  cursor: pointer; font-family: inherit; width: 100%;
  border-left: 2px solid transparent; transition: all 0.2s; border-radius: 0 8px 8px 0;
}
.cp-project-tab:hover { background: rgba(255,255,255,0.03); }
.cp-project-tab[data-active="true"] { border-left-color: #6366F1; background: rgba(99,102,241,0.07); }
.cp-tech {
  display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 0.75rem;
  font-weight: 500; background: rgba(99,102,241,0.1); color: #A5B4FC;
  border: 1px solid rgba(99,102,241,0.15); margin: 3px 4px 3px 0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.cp-metric { position: relative; padding-left: 18px; color: #94A3B8; font-size: 0.875rem; line-height: 1.7; }
.cp-metric::before { content: ''; position: absolute; left: 0; top: 10px; width: 6px; height: 6px; border-radius: 50%; background: #6366F1; }
.cp-stack-tag {
  display: inline-block; padding: 6px 16px; border-radius: 100px; font-size: 0.8rem;
  font-weight: 500; color: #94A3B8; border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02); transition: all 0.2s;
}
.cp-stack-tag:hover { color: #E2E8F0; border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.06); }
.cp-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); margin: 0; border: none; }
.cp-link { color: #6366F1; text-decoration: none; font-weight: 600; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s; }
.cp-link:hover { color: #818CF8; }
.cp-btn-primary {
  display: inline-block; background: #6366F1; color: white; padding: 14px 32px;
  border-radius: 10px; font-weight: 700; font-size: 0.95rem; cursor: pointer;
  border: none; font-family: inherit; transition: background 0.2s, transform 0.15s;
  text-decoration: none;
}
.cp-btn-primary:hover { background: #4F46E5; transform: translateY(-1px); }
.cp-btn-secondary {
  display: inline-block; background: transparent; color: #94A3B8; padding: 14px 32px;
  border-radius: 10px; font-weight: 600; font-size: 0.95rem; cursor: pointer;
  border: 1px solid rgba(255,255,255,0.1); font-family: inherit;
  transition: border-color 0.2s, color 0.2s; text-decoration: none;
}
.cp-btn-secondary:hover { border-color: rgba(99,102,241,0.5); color: #E2E8F0; }
.cp-input {
  width: 100%; background: #ffffff; border: 1px solid #CBD5E1;
  border-radius: 10px; padding: 13px 16px; color: #0F172A; font-size: 0.9rem;
  font-family: inherit; outline: none; box-sizing: border-box; transition: border-color 0.2s;
}
.cp-input:focus { border-color: #6366F1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
.cp-input::placeholder { color: #94A3B8; }
.cp-input:-webkit-autofill,
.cp-input:-webkit-autofill:hover,
.cp-input:-webkit-autofill:focus,
.cp-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 40px #ffffff inset !important;
  -webkit-text-fill-color: #0F172A !important;
  transition: background-color 5000s ease-in-out 0s;
}
.cp-textarea { resize: vertical; min-height: 130px; }
.cp-label { display: block; font-size: 0.82rem; font-weight: 600; color: #64748B; margin-bottom: 8px; letter-spacing: 0.03em; text-transform: uppercase; }
.cp-category { font-size: 0.72rem; font-weight: 700; color: #6366F1; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.2); padding: 2px 10px; border-radius: 100px; letter-spacing: 0.04em; }
.cp-flagship {
  position: relative; border: 1px solid rgba(99,102,241,0.35);
  background: linear-gradient(180deg, rgba(30,27,54,0.6), rgba(14,14,18,0.6));
  border-radius: 22px; padding: 44px; overflow: hidden;
}
.cp-flag-fact-n { font-size: 1.35rem; font-weight: 800; color: #FAFAFA; }
.cp-flag-fact-l { font-size: 0.8rem; color: #64748B; }
@media (max-width: 768px) {
  .cp-hero-title { font-size: 2.4rem !important; }
  .cp-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
  .cp-case-grid { grid-template-columns: repeat(2,1fr) !important; }
  .cp-services-grid { grid-template-columns: 1fr !important; }
  .cp-project-layout { flex-direction: column !important; }
  .cp-project-tabs { flex-direction: row !important; overflow-x: auto; border-left: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
  .cp-project-tab { border-left: none !important; border-bottom: 2px solid transparent !important; border-radius: 0 !important; white-space: nowrap; }
  .cp-project-tab[data-active="true"] { border-left-color: transparent !important; border-bottom-color: #6366F1 !important; }
  .cp-form-row { flex-direction: column !important; }
  .cp-hero-ctas { flex-direction: column !important; align-items: stretch !important; }
  .cp-hero-ctas button, .cp-hero-ctas a { text-align: center; }
  .cp-nav-links { gap: 16px !important; }
  .cp-nav-link { font-size: 0.78rem !important; }
  .cp-section { padding: 0 16px !important; }
  .cp-project-detail { padding-left: 0 !important; padding-top: 24px !important; }
  .cp-flagship { padding: 28px !important; }
  .cp-flag-facts { gap: 20px !important; }
}
@media (max-width: 480px) {
  .cp-hero-title { font-size: 2rem !important; }
  .cp-case-grid { grid-template-columns: 1fr !important; }
  .cp-services-grid { grid-template-columns: 1fr !important; }
  .cp-nav-links { display: none !important; }
}
`}</style>

      {/* ── Nav ───────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <img src="/clearpath-mark.svg" alt="ClearPath Automation" width={30} height={30} style={{ display: 'block', borderRadius: 8 }} />
            <span style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span style={{ color: '#FAFAFA' }}>ClearPath</span> <span style={{ color: '#6366F1' }}>Automation</span>
            </span>
          </span>
          <div className="cp-nav-links" style={{ display: 'flex', gap: 28 }}>
            {['#services', '#work', '#demo', '#contact'].map((href, i) => (
              <a key={href} href={href} className="cp-nav-link" style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#E2E8F0')}
                onMouseOut={e => (e.currentTarget.style.color = '#64748B')}>
                {['Services', 'Work', 'Demo', 'Contact'][i]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', padding: '110px 24px 90px', textAlign: 'center', overflow: 'hidden' }}>
        <div className="cp-glow" />
        <div className="cp-section" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366F1', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#A5B4FC', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Available for new projects</span>
          </div>
          <h1 className="cp-hero-title" style={{ fontSize: '4rem', fontWeight: 800, color: '#FAFAFA', margin: '0 0 24px', lineHeight: 1.08, letterSpacing: '-0.04em' }}>
            Where inefficiency<br />
            <span style={{ color: '#6366F1' }}>meets its match.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#64748B', maxWidth: '580px', margin: '0 auto 40px', lineHeight: 1.75 }}>
            Custom automation. AI-powered tools. Purpose-built software. ClearPath engineers systems that eliminate your manual bottlenecks — and keep them gone.
          </p>
          <div className="cp-hero-ctas" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cp-btn-primary" onClick={scrollToContact}>
              Start a project →
            </button>
            <a href="#work" className="cp-btn-secondary">
              See our work
            </a>
          </div>

          {/* Hero Video */}
          <div style={{ marginTop: 56, maxWidth: 820, margin: '56px auto 0' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.3)', background: '#000', boxShadow: '0 0 80px rgba(99,102,241,0.15)' }}>
              <video controls playsInline preload="metadata" style={{ width: '100%', display: 'block', maxHeight: 460 }}>
                <source src="/CPAFinalVideo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* ── Flagship: IronSight AI ─────────────────────────────────── */}
      <div id="flagship" style={{ padding: '24px 24px 40px' }}>
        <div className="cp-section">
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#6366F1', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14, fontWeight: 600 }}>
            Flagship Build
          </p>
          <div className="cp-flagship">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', position: 'relative' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '1.5rem', fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.01em' }}>
                <span style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#6366F1,#A78BFA)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>◎</span>
                IronSight AI
              </span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.18em', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.35)', padding: '4px 10px', borderRadius: 100 }}>
                LOCKED ON TARGET
              </span>
            </div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#FAFAFA', letterSpacing: '-0.025em', margin: '20px 0 0', position: 'relative' }}>
              The market&apos;s open bell, <span style={{ color: '#6366F1' }}>read by an AI.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.8, margin: '14px 0 0', maxWidth: 660, position: 'relative' }}>
              IronSight AI is ClearPath&apos;s flagship product — an end-to-end market-analytics platform built entirely in-house. A Python machine-learning engine ingests real-time market data, recognizes setups against years of historical sessions, and publishes a directional read at fixed time horizons to a live Next.js dashboard. Every call is graded automatically once the session closes and published in full — hits and misses, un-cherry-picked. It is a software product, not an advisory service: it reports what the model sees.
            </p>
            <div style={{ margin: '22px 0 0', position: 'relative' }}>
              {['Python', 'scikit-learn', 'Next.js 16', 'Supabase Realtime', 'Stripe', 'Vercel'].map(t => (
                <span key={t} className="cp-tech">{t}</span>
              ))}
            </div>
            <div className="cp-flag-facts" style={{ display: 'flex', flexWrap: 'wrap', gap: 30, margin: '26px 0 0', position: 'relative' }}>
              <div><div className="cp-flag-fact-n">Live</div><div className="cp-flag-fact-l">real-time subscriber dashboard</div></div>
              <div><div className="cp-flag-fact-n">Graded</div><div className="cp-flag-fact-l">every call, hits & misses public</div></div>
              <div><div className="cp-flag-fact-n">Months</div><div className="cp-flag-fact-l">of historical training data</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', margin: '30px 0 0', position: 'relative' }}>
              <a href="https://ironsightai.net" target="_blank" rel="noopener noreferrer" className="cp-btn-primary" style={{ textDecoration: 'none' }}>
                Visit ironsightai.net →
              </a>
              <a href="#work" className="cp-btn-secondary">
                How it was built
              </a>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#475569', margin: '20px 0 0', position: 'relative', lineHeight: 1.6, maxWidth: 620 }}>
              An informational software tool. Not financial advice, and not a recommendation to buy or sell anything.
            </p>
          </div>
        </div>
      </div>

      {/* ── Services ──────────────────────────────────────────────── */}
      <div id="services" style={{ padding: '72px 24px' }}>
        <div className="cp-section">
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#6366F1', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
            Services
          </p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FAFAFA', margin: '0 0 12px', letterSpacing: '-0.025em' }}>
            What we build
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748B', margin: '0 0 48px', maxWidth: 520, lineHeight: 1.7 }}>
            Every engagement is scoped to solve a specific problem — not to sell hours. Here&apos;s what we do best.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SERVICES.map((s, i) => {
              const isOpen = expandedService === i
              return (
                <div key={s.title} style={{
                  background: isOpen ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isOpen ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s',
                }}>
                  {/* Header row — always visible */}
                  <button
                    onClick={() => setExpandedService(isOpen ? null : i)}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '18px 24px', fontFamily: 'inherit', textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FAFAFA' }}>{s.title}</span>
                    </div>
                    <span style={{ color: '#6366F1', fontSize: '1.1rem', fontWeight: 700, transition: 'transform 0.2s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ↓
                    </span>
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="cp-fade" style={{ padding: '0 24px 24px' }}>
                      <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '0 0 18px', lineHeight: 1.65 }}>{s.tagline}</p>
                      <ul style={{ margin: '0 0 20px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {s.bullets.map(b => (
                          <li key={b} style={{ fontSize: '0.85rem', color: '#94A3B8', paddingLeft: 16, position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: '#6366F1' }}>›</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div>{s.tech.map(t => <span key={t} className="cp-tech">{t}</span>)}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <hr className="cp-divider" />

      {/* ── Case for Automation ───────────────────────────────────── */}
      <div style={{ padding: '56px 24px' }}>
        <div className="cp-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#6366F1', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
                The Case for Automation
              </p>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FAFAFA', margin: 0, letterSpacing: '-0.02em' }}>
                The numbers don&apos;t lie. Manual work is costing you.
              </h2>
            </div>
            <button
              onClick={() => setStatsOpen(o => !o)}
              style={{
                background: statsOpen ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.04)',
                border: statsOpen ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '10px 20px', color: statsOpen ? '#A5B4FC' : '#64748B',
                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
            >
              {statsOpen ? 'Hide stats ↑' : 'See the research →'}
            </button>
          </div>

          {statsOpen && (
            <div className="cp-fade" style={{ marginTop: 36 }}>
              <div className="cp-case-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { stat: '77%', desc: 'Less time spent on routine, repetitive tasks', source: 'PS Global Consulting / Workona, 2024' },
                  { stat: '70%', desc: 'Reduction in human errors across automated workflows', source: 'Capgemini via Gitnux' },
                  { stat: '30%', desc: 'Cut in operational costs through hyper-automation', source: 'Gartner, 2024' },
                  { stat: '40%', desc: 'Workforce productivity boost when AI is incorporated', source: 'PS Global Consulting, 2024' },
                  { stat: '52%', desc: 'ROI reported by IT departments automating key workflows', source: 'Salesforce Survey, Oct 2024' },
                  { stat: '500+', desc: 'Hours freed annually in finance teams alone', source: 'American Express Business' },
                ].map(({ stat, desc, source }) => (
                  <div key={stat} style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16, padding: '28px 24px',
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                    onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.3)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(99,102,241,0.04)'; }}
                    onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)'; }}
                  >
                    <div style={{ fontSize: '2.6rem', fontWeight: 800, color: '#6366F1', fontFamily: "'JetBrains Mono',monospace", marginBottom: 12, letterSpacing: '-0.02em' }}>{stat}</div>
                    <p style={{ fontSize: '0.9rem', color: '#E2E8F0', margin: '0 0 14px', lineHeight: 1.6, fontWeight: 500 }}>{desc}</p>
                    <p style={{ fontSize: '0.72rem', color: '#334155', margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>Source: {source}</p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 24, fontSize: '0.72rem', color: '#334155', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                <span style={{ fontWeight: 600, color: '#475569' }}>Sources:</span> Gartner Hyper-Automation Report (2024) · Salesforce State of Automation Survey (Oct 2024) · Capgemini Intelligent Automation Study via Gitnux · PS Global Consulting Workflow Automation Report (2024) · Workona Workflow Automation Statistics &amp; Trends (2024) · American Express Business Payments Study. Statistics reflect industry-wide research across multiple sectors. Individual results vary based on process complexity, implementation quality, and organizational readiness.
              </p>
            </div>
          )}
        </div>
      </div>

      <hr className="cp-divider" />

      {/* ── Work Samples ──────────────────────────────────────────── */}
      <div id="work" style={{ padding: '72px 24px' }}>
        <div className="cp-section">
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#6366F1', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
            Work
          </p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FAFAFA', margin: '0 0 12px', letterSpacing: '-0.025em' }}>
            Project samples
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748B', margin: '0 0 48px', maxWidth: 520, lineHeight: 1.7 }}>
            A selection of real projects shipped to production — each one built to replace manual work with reliable software.
          </p>

          <div className="cp-project-layout" style={{ display: 'flex', gap: 0, minHeight: 440 }}>
            {/* Tabs */}
            <div className="cp-project-tabs" style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, width: 240, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              {PROJECTS.map((p, i) => (
                <button
                  key={i}
                  className="cp-project-tab"
                  data-active={activeProject === i}
                  onClick={() => setActiveProject(i)}
                >
                  <div style={{ fontSize: '0.88rem', fontWeight: activeProject === i ? 700 : 500, color: activeProject === i ? '#FAFAFA' : '#64748B', transition: 'color 0.2s', marginBottom: 2 }}>
                    {p.title.split(' — ')[0]}
                  </div>
                  {activeProject === i && (
                    <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: 3 }}>{p.category}</div>
                  )}
                </button>
              ))}
            </div>

            {/* Detail */}
            <div key={activeProject} className={`cp-project-detail${mounted ? ' cp-fade' : ''}`} style={{ flex: 1, padding: '4px 0 4px 40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                <span className="cp-category">{project.category}</span>
                {project.featured && (
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#F59E0B', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '2px 10px', borderRadius: 100, letterSpacing: '0.04em' }}>
                    FEATURED
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#FAFAFA', margin: '0 0 8px' }}>{project.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6366F1', margin: '0 0 16px', fontWeight: 500 }}>{project.tagline}</p>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.8, margin: '0 0 22px', maxWidth: 580 }}>
                {project.description}
              </p>
              <div style={{ marginBottom: 22 }}>
                {project.tech.map(t => <span key={t} className="cp-tech">{t}</span>)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 24 }}>
                {project.metrics.map((m, j) => <div key={j} className="cp-metric">{m}</div>)}
              </div>
              {'link' in project && project.link && (
                <a href={project.link as string} target="_blank" rel="noopener noreferrer" className="cp-link">
                  View live ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr className="cp-divider" />

      {/* ── Demo Videos ────────────────────────────────────────────── */}
      <div id="demo" style={{ padding: '72px 24px' }}>
        <div className="cp-section">
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#6366F1', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
            Live Demos
          </p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FAFAFA', margin: '0 0 12px', letterSpacing: '-0.025em' }}>
            See it in action
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748B', margin: '0 0 40px', maxWidth: 520, lineHeight: 1.7 }}>
            Real software, built end to end. Some of it is live, some of it was retired — the walkthroughs are unchanged either way.
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {[
              { id: 5, label: '📈 IronSight AI' },
              { id: 0, label: '🤖 AI Research Agent' },
              { id: 1, label: '🏢 BookIT — Business (retired)' },
              { id: 2, label: '👤 BookIT — Client (retired)' },
              { id: 4, label: '🎬 ClearPath Overview' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id)}
                style={{
                  background: activeDemo === tab.id ? '#6366F1' : 'rgba(255,255,255,0.04)',
                  color: activeDemo === tab.id ? '#fff' : '#64748B',
                  border: activeDemo === tab.id ? '1px solid #6366F1' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10, padding: '10px 20px', fontSize: '0.875rem',
                  fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Video panel */}
          {activeDemo === 5 && (
            <div className="cp-fade">
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: 20, lineHeight: 1.7, maxWidth: 620 }}>
                The IronSight AI board: the model&apos;s directional read on each ticker at fixed 15/30/60-minute horizons, then graded HIT or MISS against what actually happened. Built end to end — Python engine, real-time pipeline, live subscriber dashboard.
              </p>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.25)', background: '#000', boxShadow: '0 0 60px rgba(99,102,241,0.1)' }}>
                <img
                  src="/ironsight-board.png"
                  alt="IronSight AI board — directional model output at fixed horizons, graded HIT or MISS"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
                <a href="https://ironsightai.net" target="_blank" rel="noopener noreferrer" className="cp-btn-primary" style={{ textDecoration: 'none' }}>
                  See IronSight AI &rarr;
                </a>
                <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, maxWidth: 420, lineHeight: 1.6 }}>
                  An informational software tool. Not financial advice, not a recommendation to buy or sell anything.
                </p>
              </div>
            </div>
          )}
          {activeDemo === 0 && (
            <div className="cp-fade">
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: 20, lineHeight: 1.7, maxWidth: 620 }}>
                A custom-built AI research agent that queries PubMed &amp; ClinicalTrials.gov in real time, then synthesizes the results using GPT-4 — delivering clinical-grade answers in seconds instead of hours.
              </p>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.25)', background: '#000', boxShadow: '0 0 60px rgba(99,102,241,0.1)' }}>
                <video controls playsInline preload="metadata" style={{ width: '100%', display: 'block', maxHeight: 500 }}>
                  <source src="/DamiansCustomGPTdemo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          )}
          {activeDemo === 1 && (
            <div className="cp-fade">
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: 20, lineHeight: 1.7, maxWidth: 620 }}>
                <strong style={{ color: '#94A3B8' }}>Retired project.</strong> BookIT was wound down in 2026 — the build is finished, the business idea was abandoned. A walkthrough of the business dashboard: setting up services, managing appointments, viewing client bookings, and handling real-time notifications.
              </p>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.25)', background: '#000', boxShadow: '0 0 60px rgba(99,102,241,0.1)' }}>
                <video controls playsInline preload="metadata" style={{ width: '100%', display: 'block', maxHeight: 500 }}>
                  <source src="/business-tutorial.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          )}
          {activeDemo === 2 && (
            <div className="cp-fade">
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: 20, lineHeight: 1.7, maxWidth: 620 }}>
                <strong style={{ color: '#94A3B8' }}>Retired project.</strong> The client-side experience — discovering a business, selecting a service, booking an appointment, and receiving confirmation — all in under a minute, no app needed.
              </p>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.25)', background: '#000', boxShadow: '0 0 60px rgba(99,102,241,0.1)' }}>
                <video controls playsInline preload="metadata" style={{ width: '100%', display: 'block', maxHeight: 500 }}>
                  <source src="/client-tutorial.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          )}
          {activeDemo === 4 && (
            <div className="cp-fade">
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: 20, lineHeight: 1.7, maxWidth: 620 }}>
                A quick overview of what ClearPath Automation does — custom automation, AI-powered tools, and purpose-built software engineered to eliminate your manual bottlenecks.
              </p>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.25)', background: '#000', boxShadow: '0 0 60px rgba(99,102,241,0.1)' }}>
                <video controls playsInline preload="metadata" style={{ width: '100%', display: 'block', maxHeight: 500 }}>
                  <source src="/CPAFinalVideoDemo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: 32 }}>
            <button className="cp-btn-primary" onClick={scrollToContact}>
              Build something like this →
            </button>
          </div>
        </div>
      </div>

      <hr className="cp-divider" />

      {/* ── Stack ──────────────────────────────────────────────────── */}
      <div style={{ padding: '64px 24px' }}>
        <div className="cp-section">
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#6366F1', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
            Stack
          </p>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FAFAFA', margin: '0 0 32px', letterSpacing: '-0.02em' }}>
            Tools we work with
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {STACK.map(t => <span key={t} className="cp-stack-tag">{t}</span>)}
          </div>
        </div>
      </div>

      <hr className="cp-divider" />

      {/* ── Contact ────────────────────────────────────────────────── */}
      <div id="contact" ref={contactRef} style={{ padding: '80px 24px' }}>
        <div className="cp-section">
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.75rem', color: '#6366F1', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600, textAlign: 'center' }}>
              Contact
            </p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FAFAFA', margin: '0 0 12px', letterSpacing: '-0.025em', textAlign: 'center' }}>
              Tell us about your project
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748B', margin: '0 auto 48px', maxWidth: 480, lineHeight: 1.7, textAlign: 'center' }}>
              Describe what you&apos;re trying to automate or build. I&apos;ll get back to you within 1 business day.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '44px 32px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.8 }}>
                Email me directly with what you&apos;re trying to automate or build.
                <br />
                Include the rough shape of the problem and I&apos;ll tell you honestly whether it&apos;s worth building.
              </p>
              <a
                href="mailto:Support@ClearPathAutomation.IO?subject=ClearPath%20Automation%20%E2%80%94%20project%20inquiry"
                className="cp-btn-primary"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                Email ClearPath &rarr;
              </a>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.8rem', color: '#475569', margin: '24px 0 0' }}>
                Support@ClearPathAutomation.IO
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="cp-divider" />

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div style={{ padding: '40px 24px 56px', textAlign: 'center' }}>
        <div className="cp-section">
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: 9, margin: '0 0 8px' }}>
            <img src="/clearpath-mark.svg" alt="" width={26} height={26} style={{ display: 'block', borderRadius: 7 }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <span style={{ color: '#FAFAFA' }}>ClearPath</span> <span style={{ color: '#6366F1' }}>Automation</span>
            </span>
          </p>
          <p style={{ fontSize: '0.75rem', color: '#1E293B', margin: 0 }}>
            © {new Date().getFullYear()} ClearPath Automation · Chicago, IL
          </p>
        </div>
      </div>

    </div>
  )
}
