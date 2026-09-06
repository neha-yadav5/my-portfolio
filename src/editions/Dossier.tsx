import { useState } from 'react'
import { EDUCATION, JOBS, NAV, PRINCIPLES, PROFILE, SKILLS, STATS } from '../content/profile'
import ContactForm from '../components/ContactForm'
import Projects from '../components/Projects'
import './Dossier.css'

/**
 * DOSSIER — quiet and senior. A fixed identity rail, then work as a
 * numbered index you open row by row. Thin rules, mono numerals.
 */
export default function Dossier() {
  const [open, setOpen] = useState<string | null>(JOBS[0].id)

  return (
    <div className="edition df">
      {/* ─── Fixed rail ─────────────────────────────────────── */}
      <aside className="df__rail">
        <div className="df__rail-top">
          <a href="#top" className="df__identity">
            <span className="df__mark">{PROFILE.initials}</span>
            <span>
              <span className="df__name">{PROFILE.name}</span>
              <span className="df__role">{PROFILE.role}</span>
            </span>
          </a>

          <p className="df__blurb">
            Four years building lending and credit products. Angular and React, mostly.
          </p>

          <p className="df__status">
            <i className="df__dot" aria-hidden="true" />
            {PROFILE.availability}
          </p>
        </div>

        <nav className="df__nav" aria-label="Sections">
          {NAV.map((l, i) => (
            <a key={l.href} href={l.href}>
              <span className="df__nav-num">{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="df__rail-foot">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <div className="df__rail-links">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <p className="df__meta">
            {PROFILE.location} · {PROFILE.timezone}
          </p>
        </div>
      </aside>

      {/* ─── Content ────────────────────────────────────────── */}
      <main className="df__main">
        <section id="top" className="df__intro">
          <h1 className="df__headline bloom-type">
            I build the parts of fintech that people actually touch.
          </h1>
          <p className="df__standfirst">{PROFILE.standfirst}</p>

          <dl className="df__stats">
            {STATS.map(s => (
              <div key={s.label} className="df__stat">
                <dt>
                  {s.value} <span>{s.unit}</span>
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ─── About ────────────────────────────────────────── */}
        <section id="about" className="df__section">
          <header className="df__section-head">
            <span className="df__section-num">01</span>
            <h2>About</h2>
          </header>

          <div className="df__about">
            <div className="df__prose">
              {PROFILE.story.map(p => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <blockquote className="df__quote">{PROFILE.quote}</blockquote>
            </div>

            <ul className="df__principles">
              {PRINCIPLES.map(p => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── Work index ───────────────────────────────────── */}
        <section id="work" className="df__section">
          <header className="df__section-head">
            <span className="df__section-num">02</span>
            <h2>Work</h2>
          </header>

          <ol className="df__index">
            {JOBS.map((job, i) => {
              const isOpen = open === job.id
              return (
                <li key={job.id} className={`df__row ${isOpen ? 'is-open' : ''}`}>
                  <button
                    className="df__row-head"
                    onClick={() => setOpen(isOpen ? null : job.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="df__row-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="df__row-title">
                      <span className="df__row-company">{job.company}</span>
                      <span className="df__row-role">{job.role}</span>
                    </span>
                    <span className="df__row-years">{job.years}</span>
                    <span className="df__row-toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="df__row-body">
                      <div className="df__row-meta">
                        <span>{job.period}</span>
                        <span>{job.place}</span>
                        <span className="df__row-metric">
                          {job.headline.value} {job.headline.label}
                        </span>
                      </div>

                      <p className="df__row-summary">{job.summary}</p>

                      <ul className="df__row-bullets">
                        {job.bullets.map(b => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>

                      <div className="df__row-stack">
                        {job.stack.map(s => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>

          <div className="df__education">
            <span className="df__row-num">—</span>
            <div>
              <h3>{EDUCATION.degree}</h3>
              <p>
                {EDUCATION.school} · {EDUCATION.period} · {EDUCATION.detail}
              </p>
            </div>
          </div>
        </section>

        {/* ─── Projects ─────────────────────────────────────── */}
        <section id="projects" className="df__section">
          <header className="df__section-head">
            <span className="df__section-num">03</span>
            <h2>Projects</h2>
          </header>

          <Projects />
        </section>

        {/* ─── Toolkit ──────────────────────────────────────── */}
        <section id="toolkit" className="df__section">
          <header className="df__section-head">
            <span className="df__section-num">04</span>
            <h2>Toolkit</h2>
          </header>

          <dl className="df__skills">
            {SKILLS.map(g => (
              <div key={g.label} className="df__skill">
                <dt>
                  {g.label}
                  <span>{g.note}</span>
                </dt>
                <dd>
                  {g.items.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ─── Contact ──────────────────────────────────────── */}
        <section id="contact" className="df__section df__contact">
          <header className="df__section-head">
            <span className="df__section-num">05</span>
            <h2>Contact</h2>
          </header>

          <p className="df__contact-lead">
            Open to software engineering roles and the occasional freelance build. I answer
            everything within a day.
          </p>

          <a href={`mailto:${PROFILE.email}`} className="df__contact-mail bloom-type">
            {PROFILE.email}
          </a>

          <div className="df__contact-links">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>

          <div className="df__form">
            <p className="df__form-label">06 — Or send it from here</p>
            <ContactForm />
          </div>

          <footer className="df__footer">
            © {new Date().getFullYear()} {PROFILE.name} · Built with React and TypeScript
          </footer>
        </section>
      </main>
    </div>
  )
}
