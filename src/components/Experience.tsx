import './Experience.css'

type Job = {
  id: string
  company: string
  role: string
  period: string
  place: string
  summary: string
  bullets: string[]
  stack: string[]
  headline?: { value: string; label: string }
}

const JOBS: Job[] = [
  {
    id: 'homeville-3',
    company: 'Homeville Group',
    role: 'Software Engineer III',
    period: 'Apr 2025 — Present',
    place: 'Mumbai · Fintech / housing finance',
    summary:
      'Own the frontend architecture of the lending platform and the component library the rest of the team builds on.',
    headline: { value: '−71%', label: 'build time' },
    bullets: [
      'Led the migration from a monolithic Angular app to standalone components, taking builds from 7 minutes to 2 and shortening the CI pipeline for everyone.',
      'Built the Video KYC module in React on the 100ms SDK and embedded it inside the Angular platform — biometric verification, SOC 2 requirements, government e-KYC rules and all.',
      'Maintain a shared UI component library aligned to our design system, now used across 8+ Angular apps and worth roughly 30% off feature delivery time.',
      'Shipped AI remarks generation and an in-app chatbot on top of LLM APIs, so case summaries write their first draft themselves.',
    ],
    stack: ['Angular', 'React', '100ms SDK', 'TypeScript', 'Design systems', 'LLM APIs'],
  },
  {
    id: 'homeville-1',
    company: 'Homeville Group',
    role: 'Software Engineer I',
    period: 'Oct 2023 — Mar 2025',
    place: 'Mumbai · Fintech / housing finance',
    summary:
      'Built the credit underwriting and collections products from an empty repo to daily use by the operations floor.',
    headline: { value: '50+', label: 'daily users' },
    bullets: [
      'Wrote the Credit Underwriting and Collections modules from scratch in Angular, replacing the Excel workflows 50+ operations staff had been maintaining by hand.',
      'Added real audit traceability to case handling, which cut workflow errors by about 40% and made review conversations a lot shorter.',
      'Implemented role-based access with auth guards and permission-driven rendering, so sensitive financial screens only exist for the people cleared to see them.',
      'Standardised REST contracts with the backend team and reduced integration defects by roughly 35%.',
      'Mentored a frontend intern through Angular, Git workflow and code review — they shipped to production.',
    ],
    stack: ['Angular', 'RxJS', 'RBAC', 'Auth guards', 'REST APIs'],
  },
  {
    id: 'kclub',
    company: 'Kclub Technologies',
    role: 'Software Engineer',
    period: 'Jan 2023 — Sep 2023',
    place: 'Mumbai · Digital payments',
    summary: 'Frontend for Yatripay — moving real money for real people, so the details mattered.',
    headline: { value: '65→82', label: 'Lighthouse' },
    bullets: [
      'Built transaction initiation, live status tracking and wallet management for a payments platform with 10K+ active users.',
      'Took 280KB off the initial bundle through code splitting and lazy loading, moving the Lighthouse score from 65 to 82 and load performance up about 20%.',
      'Wrote down the request/response schemas and error handling patterns nobody had agreed on yet, which quietly ended a lot of cross-team rework.',
    ],
    stack: ['React', 'JavaScript', 'Code splitting', 'REST APIs'],
  },
  {
    id: 'gmoney',
    company: 'GMoney Loans',
    role: 'Software Engineer — Freelance',
    period: 'Dec 2021 — Jan 2023',
    place: 'Remote · Lending',
    summary: 'My first proper taste of fintech: onboarding journeys, end to end, on my own.',
    headline: { value: '5K+', label: 'monthly users' },
    bullets: [
      'Built customer onboarding in Angular from loan application through to disbursement for 5K+ monthly users, translating genuinely complicated financial logic into screens people could finish.',
      'Made the admin and operations dashboards for tracking live loan portfolios and KPIs, cutting manual data entry roughly in half.',
      'Set up HTTP interceptors and auth guards for role-based access across several loan portals, against PCI-DSS and RBI expectations.',
    ],
    stack: ['Angular', 'HTTP interceptors', 'Dashboards', 'TypeScript'],
  },
]

export default function Experience() {
  return (
    <section id="work" className="section work">
      <div className="shell">
        <div className="section-head reveal">
          <p className="eyebrow">Work</p>
          <h2 className="section-title">Four years, mostly in lending</h2>
          <p className="section-sub">
            Every role below is a fintech product with real money and real regulators attached.
            Here's what I actually did.
          </p>
        </div>

        <ol className="work__list">
          {JOBS.map((job, i) => (
            <li key={job.id} className="work__item reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="work__rail" aria-hidden="true">
                <span className="work__dot" />
              </div>

              <article className="work__card">
                <header className="work__head">
                  <div className="work__identity">
                    <h3 className="work__role">{job.role}</h3>
                    <p className="work__company">
                      {job.company}
                      <span className="work__place">{job.place}</span>
                    </p>
                  </div>

                  <div className="work__side">
                    <span className="work__period">{job.period}</span>
                    {job.headline && (
                      <span className="work__headline">
                        <strong>{job.headline.value}</strong>
                        <em>{job.headline.label}</em>
                      </span>
                    )}
                  </div>
                </header>

                <p className="work__summary">{job.summary}</p>

                <ul className="work__bullets">
                  {job.bullets.map(b => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="work__stack">
                  {job.stack.map(s => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="work__education reveal">
          <div>
            <p className="work__education-label">Education</p>
            <h3 className="work__education-degree">BSc, Information Technology</h3>
            <p className="work__education-school">
              Tolani College of Commerce, Mumbai · 2018–2021 · CGPA 7.8
            </p>
          </div>
          <span className="work__education-mark" aria-hidden="true">
            ✳
          </span>
        </div>
      </div>
    </section>
  )
}
