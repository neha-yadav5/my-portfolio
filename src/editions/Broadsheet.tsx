import { EDUCATION, JOBS, NAV, PRINCIPLES, PROFILE, SKILLS, STATS } from '../content/profile'
import ContactForm from '../components/ContactForm'
import Projects from '../components/Projects'
import './Broadsheet.css'

/**
 * BROADSHEET — a newspaper feature. Masthead, drop cap, multi-column
 * text and rules. Reads like a profile written about her, not a CV.
 */
export default function Broadsheet() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const [firstLetter, ...restOfStory] = PROFILE.story[0]

  return (
    <div className="edition bs">
      {/* ─── Masthead ───────────────────────────────────────── */}
      <header id="top" className="bs__masthead shell">
        <div className="bs__dateline">
          <span>{PROFILE.location}</span>
          <span>{today}</span>
          <span>Vol. IV · No. 1</span>
        </div>

        <h1 className="bs__title bloom-type">{PROFILE.name}</h1>

        <div className="bs__kicker">
          <span>{PROFILE.role}</span>
          <span className="bs__kicker-dot" aria-hidden="true">
            ✳
          </span>
          <span>Angular · React · TypeScript</span>
          <span className="bs__kicker-dot" aria-hidden="true">
            ✳
          </span>
          <span>{PROFILE.availability}</span>
        </div>

        <nav className="bs__nav" aria-label="Sections">
          {NAV.map(l => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href={`mailto:${PROFILE.email}`}>Write in</a>
        </nav>
      </header>

      {/* ─── Lead story ─────────────────────────────────────── */}
      <section id="about" className="bs__lead shell">
        <div className="bs__lead-main">
          <p className="bs__slug">The front page</p>
          <h2 className="bs__headline">
            I build the parts of fintech that people{' '}
            <span className="bs__em">actually touch</span>
          </h2>
          <p className="bs__standfirst">{PROFILE.standfirst}</p>

          <div className="bs__columns">
            <p className="bs__dropcap-para">
              <span className="bs__dropcap">{firstLetter}</span>
              {restOfStory.join('')}
            </p>
            {PROFILE.story.slice(1).map(p => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="bs__pullquote">{PROFILE.quote}</p>
          </div>
        </div>

        <aside className="bs__facts">
          <h3 className="bs__facts-title">By the numbers</h3>
          <dl>
            {STATS.map(s => (
              <div key={s.label}>
                <dt>
                  {s.value} <span>{s.unit}</span>
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>

          <h3 className="bs__facts-title bs__facts-title--spaced">In her own words</h3>
          <ul className="bs__creed">
            {PRINCIPLES.map(p => (
              <li key={p.title}>
                <strong>{p.title}.</strong> {p.text}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* ─── Dispatches ─────────────────────────────────────── */}
      <section id="work" className="bs__section shell">
        <h2 className="bs__section-title">
          <span>Dispatches</span>
        </h2>

        {JOBS.map(job => (
          <article key={job.id} className="bs__dispatch reveal">
            <div className="bs__dispatch-year">
              <span>{job.years}</span>
            </div>

            <div className="bs__dispatch-body">
              <h3 className="bs__dispatch-title">{job.company}</h3>
              <p className="bs__dispatch-byline">
                {job.role} <span>·</span> {job.period} <span>·</span> {job.place}
              </p>
              <p className="bs__dispatch-lede">{job.summary}</p>

              <ul className="bs__dispatch-points">
                {job.bullets.map(b => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <p className="bs__dispatch-foot">
                <strong>{job.headline.value}</strong> {job.headline.label}
                <span className="bs__dispatch-stack">{job.stack.join(' · ')}</span>
              </p>
            </div>
          </article>
        ))}

        <article className="bs__dispatch bs__dispatch--edu reveal">
          <div className="bs__dispatch-year">
            <span>{EDUCATION.period}</span>
          </div>
          <div className="bs__dispatch-body">
            <h3 className="bs__dispatch-title">{EDUCATION.degree}</h3>
            <p className="bs__dispatch-byline">
              {EDUCATION.school} <span>·</span> {EDUCATION.detail}
            </p>
          </div>
        </article>
      </section>

      {/* ─── Projects ───────────────────────────────────────── */}
      <section id="projects" className="bs__section shell">
        <h2 className="bs__section-title">
          <span>Built from scratch</span>
        </h2>

        <Projects />
      </section>

      {/* ─── Toolkit index ──────────────────────────────────── */}
      <section id="toolkit" className="bs__section shell">
        <h2 className="bs__section-title">
          <span>The index</span>
        </h2>

        <div className="bs__index">
          {SKILLS.map(g => (
            <div key={g.label} className="bs__index-group reveal">
              <h3>
                {g.label}
                <em>{g.note}</em>
              </h3>
              <ul>
                {g.items.map(item => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Classified ─────────────────────────────────────── */}
      <section id="contact" className="bs__section shell">
        <h2 className="bs__section-title">
          <span>Classified</span>
        </h2>

        <div className="bs__classified reveal">
          <p className="bs__classified-head">Software engineer seeks interesting problem</p>
          <p className="bs__classified-body">
            Four years in regulated lending. Fluent in Angular and React, fond of build times and
            loading states. Open to full-time roles and the occasional freelance build. Replies
            within one day, guaranteed.
          </p>
          <a href={`mailto:${PROFILE.email}`} className="bs__classified-mail">
            {PROFILE.email}
          </a>
          <p className="bs__classified-links">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <span>
              {PROFILE.location}, {PROFILE.timezone}
            </span>
          </p>

          <div className="bs__form">
            <p className="bs__form-label">Reply by post</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bs__footer shell">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span>Set in Instrument Serif &amp; DM Sans</span>
        <a href="#top">Return to masthead ↑</a>
      </footer>
    </div>
  )
}
