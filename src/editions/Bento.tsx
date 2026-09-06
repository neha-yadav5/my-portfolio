import { useState } from 'react'
import {
  EDUCATION,
  JOBS,
  NAV,
  PRINCIPLES,
  PROFILE,
  SKILLS,
  STATS,
} from '../content/profile'
import ContactForm from '../components/ContactForm'
import Projects from '../components/Projects'
import './Bento.css'

/**
 * BENTO — modern product-site feel. Centred hero, then a grid of soft
 * tiles that mixes stats, a quote and current role before the work list.
 */
export default function Bento() {
  const [copied, setCopied] = useState(false)
  const current = JOBS[0]

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the mailto link beside it still works */
    }
  }

  return (
    <div className="edition bn">
      <header className="bn__nav">
        <a href="#top" className="bn__brand">
          <span className="bn__mark">{PROFILE.initials}</span>
          {PROFILE.name}
        </a>
        <nav className="bn__nav-links" aria-label="Sections">
          {NAV.map(l => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href={`mailto:${PROFILE.email}`} className="bn__nav-cta">
          Let's talk
        </a>
      </header>

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section id="top" className="bn__hero shell">
        <span className="bn__badge">
          <i className="bn__pulse" aria-hidden="true" />
          {PROFILE.availability}
        </span>

        <h1 className="bn__title bloom-type">
          I build the parts of fintech that people{' '}
          <span className="underline-wobble">actually touch</span>.
        </h1>

        <p className="bn__standfirst">{PROFILE.standfirst}</p>

        <div className="bn__cta-row">
          <a href="#work" className="bn__btn bn__btn--solid">
            See the work <span aria-hidden="true">→</span>
          </a>
          <a href="#contact" className="bn__btn">
            Say hello
          </a>
        </div>
      </section>

      {/* ─── Bento grid ─────────────────────────────────────── */}
      <section className="bn__grid shell" aria-label="At a glance">
        <article className="bn__tile bn__tile--current reveal">
          <p className="bn__tile-label">Currently</p>
          <h2 className="bn__tile-role">{current.role}</h2>
          <p className="bn__tile-company">{current.company}</p>
          <p className="bn__tile-text">{current.summary}</p>
          <div className="bn__tile-chips">
            {current.stack.slice(0, 4).map(s => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </article>

        {STATS.slice(0, 3).map((s, i) => (
          <article
            key={s.label}
            className="bn__tile bn__tile--stat reveal"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <p className="bn__stat-value">
              {s.value} <em>{s.unit}</em>
            </p>
            <p className="bn__stat-label">{s.label}</p>
          </article>
        ))}

        <article className="bn__tile bn__tile--quote reveal">
          <span className="bn__quote-mark" aria-hidden="true">
            ”
          </span>
          <p>{PROFILE.quote}</p>
        </article>

        <article className="bn__tile bn__tile--place reveal">
          <p className="bn__tile-label">Based in</p>
          <p className="bn__place">{PROFILE.location}</p>
          <p className="bn__tile-text">{PROFILE.timezone}</p>
        </article>
      </section>

      {/* ─── About ──────────────────────────────────────────── */}
      <section id="about" className="bn__section shell">
        <div className="bn__head reveal">
          <p className="bn__eyebrow">About</p>
          <h2 className="bn__section-title bloom-type">
            Not a framework person. A <span className="marker">product person</span> who writes
            frontends.
          </h2>
        </div>

        <div className="bn__about">
          <div className="bn__story reveal">
            {PROFILE.story.map(p => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <ul className="bn__principles">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.title}
                className="bn__tile bn__principle reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="bn__principle-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Work ───────────────────────────────────────────── */}
      <section id="work" className="bn__section shell">
        <div className="bn__head reveal">
          <p className="bn__eyebrow">Work</p>
          <h2 className="bn__section-title bloom-type">Four years, mostly in lending</h2>
          <p className="bn__section-sub">
            Every role below is a fintech product with real money and real regulators attached.
          </p>
        </div>

        <div className="bn__work">
          {JOBS.map((job, i) => (
            <article
              key={job.id}
              className="bn__tile bn__job reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <header className="bn__job-head">
                <div>
                  <h3 className="bn__job-role">{job.role}</h3>
                  <p className="bn__job-company">
                    {job.company} <span>{job.place}</span>
                  </p>
                </div>
                <span className="bn__job-metric">
                  <strong>{job.headline.value}</strong>
                  <em>{job.headline.label}</em>
                </span>
              </header>

              <p className="bn__job-period">{job.period}</p>
              <p className="bn__job-summary">{job.summary}</p>

              <ul className="bn__job-bullets">
                {job.bullets.map(b => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <div className="bn__tile-chips">
                {job.stack.map(s => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="bn__tile bn__education reveal">
          <div>
            <p className="bn__tile-label">Education</p>
            <h3>{EDUCATION.degree}</h3>
            <p className="bn__tile-text">
              {EDUCATION.school} · {EDUCATION.period} · {EDUCATION.detail}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Projects ───────────────────────────────────────── */}
      <section id="projects" className="bn__section shell">
        <div className="bn__head reveal">
          <p className="bn__eyebrow">Projects</p>
          <h2 className="bn__section-title bloom-type">Built from scratch</h2>
          <p className="bn__section-sub">
            Two full-stack products: one that lets an AI assistant run your social accounts, one
            that sells a printed card over a text message.
          </p>
        </div>

        <Projects />
      </section>

      {/* ─── Toolkit ────────────────────────────────────────── */}
      <section id="toolkit" className="bn__section bn__section--tinted">
        <div className="shell">
          <div className="bn__head reveal">
            <p className="bn__eyebrow">Toolkit</p>
            <h2 className="bn__section-title bloom-type">What I work with</h2>
            <p className="bn__section-sub">
              No percentage bars — nobody is 87% good at TypeScript. Just an honest list.
            </p>
          </div>

          <div className="bn__toolkit">
            {SKILLS.map((g, i) => (
              <div
                key={g.label}
                className="bn__tile bn__skill reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h3>{g.label}</h3>
                <p className="bn__tile-text">{g.note}</p>
                <div className="bn__tile-chips">
                  {g.items.map(item => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ────────────────────────────────────────── */}
      <section id="contact" className="bn__section shell">
        <div className="bn__tile bn__contact reveal">
          <p className="bn__eyebrow">Contact</p>
          <h2 className="bn__section-title bloom-type">
            Got something worth <span className="marker">building</span>?
          </h2>
          <p className="bn__section-sub">
            I'm open to software engineering roles and the occasional freelance build. I answer
            everything within a day.
          </p>

          <a href={`mailto:${PROFILE.email}`} className="bn__email">
            {PROFILE.email}
          </a>

          <div className="bn__contact-actions">
            <button className="bn__btn bn__btn--solid" onClick={copyEmail}>
              {copied ? 'Copied ✓' : 'Copy address'}
            </button>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="bn__btn">
              LinkedIn ↗
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="bn__btn">
              GitHub ↗
            </a>
          </div>

          <div className="bn__form">
            <p className="bn__form-label">Or write to me here</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bn__footer shell">
        <p>
          © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.role}
        </p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}
