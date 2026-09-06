import { useEffect, useRef, useState } from 'react'
import { EDUCATION, JOBS, PRINCIPLES, PROFILE, SKILLS, STATS } from '../content/profile'
import ContactForm from '../components/ContactForm'
import Projects from '../components/Projects'
import './Timeline.css'

/**
 * TIMELINE — one continuous spine, told forwards from 2021. The year
 * stays pinned beside you while each chapter scrolls past.
 */
export default function Timeline() {
  const [progress, setProgress] = useState(0)
  const spineRef = useRef<HTMLDivElement>(null)

  // Chronological: the story reads forwards, unlike a CV
  const chapters = [...JOBS].reverse()

  useEffect(() => {
    const onScroll = () => {
      const el = spineRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const done = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0
      setProgress(done)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="edition tl">
      <header className="tl__bar">
        <a href="#top" className="tl__bar-name">
          {PROFILE.name}
          <span>{PROFILE.role}</span>
        </a>
        <a href="#contact" className="tl__bar-cta">
          Get in touch
        </a>
      </header>

      {/* ─── Opening ────────────────────────────────────────── */}
      <section id="top" className="tl__open shell">
        <p className="tl__eyebrow">
          {PROFILE.location} · {PROFILE.availability}
        </p>
        <h1 className="tl__headline bloom-type">
          I build the parts of fintech that people{' '}
          <span className="underline-wobble">actually touch</span>.
        </h1>
        <p className="tl__standfirst">{PROFILE.standfirst}</p>
        <p className="tl__scroll-cue">
          The story runs forwards, from {PROFILE.since} <span aria-hidden="true">↓</span>
        </p>
      </section>

      {/* ─── The spine ──────────────────────────────────────── */}
      <div className="tl__spine" ref={spineRef} id="work">
        <div className="tl__line" aria-hidden="true">
          <span className="tl__line-fill" style={{ height: `${progress * 100}%` }} />
        </div>

        {chapters.map((job, i) => (
          <section key={job.id} className="tl__chapter">
            <div className="tl__year">
              <span className="tl__year-num">{job.years}</span>
              <span className="tl__year-place">{job.place}</span>
            </div>

            <article className="tl__panel reveal">
              <p className="tl__chapter-num">Chapter {String(i + 1).padStart(2, '0')}</p>
              <h2 className="tl__company">{job.company}</h2>
              <p className="tl__role">
                {job.role} <span>{job.period}</span>
              </p>

              <p className="tl__summary">{job.summary}</p>

              <ul className="tl__points">
                {job.bullets.map(b => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <div className="tl__panel-foot">
                <span className="tl__metric">
                  <strong>{job.headline.value}</strong> {job.headline.label}
                </span>
                <span className="tl__stack">{job.stack.join(' · ')}</span>
              </div>
            </article>
          </section>
        ))}

        {/* ─── Now ──────────────────────────────────────────── */}
        <section className="tl__chapter" id="toolkit">
          <div className="tl__year">
            <span className="tl__year-num tl__year-num--now">Now</span>
            <span className="tl__year-place">What I carry with me</span>
          </div>

          <div className="tl__panel tl__panel--plain reveal">
            <p className="tl__chapter-num">Where that leaves me</p>
            <h2 className="tl__company">The toolkit</h2>
            <p className="tl__summary">
              No percentage bars — nobody is 87% good at TypeScript. Just an honest list, grouped by
              how often it comes up.
            </p>

            <dl className="tl__skills">
              {SKILLS.map(g => (
                <div key={g.label}>
                  <dt>{g.label}</dt>
                  <dd>{g.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      {/* ─── Projects ───────────────────────────────────────── */}
      <section id="projects" className="tl__projects">
        <div className="shell">
          <p className="tl__eyebrow">Projects</p>
          <h2 className="tl__about-title">Built from scratch</h2>
          <p className="tl__standfirst">
            Two full-stack products: one that lets an AI assistant run your social accounts, one
            that sells a printed card over a text message.
          </p>
          <div className="tl__projects-grid">
            <Projects />
          </div>
        </div>
      </section>

      {/* ─── About / beliefs ────────────────────────────────── */}
      <section id="about" className="tl__about">
        <div className="shell">
          <div className="tl__about-grid">
            <div className="tl__story reveal">
              <p className="tl__eyebrow">About</p>
              <h2 className="tl__about-title">
                Not a framework person. A <span className="marker">product person</span> who writes
                frontends.
              </h2>
              {PROFILE.story.map(p => (
                <p key={p.slice(0, 24)} className="tl__story-para">
                  {p}
                </p>
              ))}
              <blockquote className="tl__quote">{PROFILE.quote}</blockquote>
            </div>

            <div className="tl__side">
              <ul className="tl__stats">
                {STATS.map(s => (
                  <li key={s.label} className="reveal">
                    <strong>
                      {s.value} <em>{s.unit}</em>
                    </strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>

              <ul className="tl__creed">
                {PRINCIPLES.map(p => (
                  <li key={p.title} className="reveal">
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </li>
                ))}
              </ul>

              <p className="tl__edu">
                <strong>{EDUCATION.degree}</strong>
                <br />
                {EDUCATION.school} · {EDUCATION.period} · {EDUCATION.detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact ────────────────────────────────────────── */}
      <section id="contact" className="tl__contact">
        <div className="shell">
          <p className="tl__eyebrow">Next chapter</p>
          <h2 className="tl__contact-head">
            Got something worth <span className="marker">building</span>?
          </h2>
          <p className="tl__standfirst">
            I'm open to software engineering roles and the occasional freelance build. I answer
            everything within a day.
          </p>

          <a href={`mailto:${PROFILE.email}`} className="tl__contact-mail">
            {PROFILE.email}
          </a>

          <div className="tl__contact-links">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <span>{PROFILE.timezone}</span>
          </div>

          <div className="tl__form">
            <p className="tl__form-label">Or start it here</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="tl__footer shell">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <a href="#top">Back to the beginning ↑</a>
      </footer>
    </div>
  )
}
