import { useEffect, useState } from 'react'
import {
  EDUCATION,
  JOBS,
  MARQUEE,
  NAV,
  PRINCIPLES,
  PROFILE,
  SKILLS,
  STATS,
} from '../content/profile'
import ContactForm from '../components/ContactForm'
import './Editorial.css'

/**
 * EDITORIAL — the original design. Magazine spread with hard ink shadows,
 * an asymmetric hero, a tilted sticker, a timeline work history and the
 * only contact form of the set.
 */
export default function Editorial({
  variant = 'editorial',
}: { variant?: 'editorial' | 'zine' } = {}) {
  return (
    <div className={`edition ed${variant === 'zine' ? ' zine' : ''}`}>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

/* ─── Nav ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#about')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight whichever section is filling the viewport
  useEffect(() => {
    const sections = NAV.map(l => document.querySelector(l.href)).filter(
      (el): el is Element => !!el,
    )

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--stuck' : ''}`}>
      <div className="nav__inner shell">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true">
            {PROFILE.initials}
          </span>
          <span className="nav__brand-text">
            {PROFILE.name}
            <span className="nav__brand-role">{PROFILE.role}</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {NAV.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav__link ${active === l.href ? 'is-active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav__cta">
          Let's talk
        </a>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nav__sheet">
          {NAV.map(l => (
            <a key={l.href} href={l.href} className="nav__sheet-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="nav__sheet-cta" onClick={() => setOpen(false)}>
            Let's talk
          </a>
        </div>
      )}
    </header>
  )
}

/* ─── Hero ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="shell hero__inner">
        <div className="hero__lead">
          <p className="eyebrow">
            {PROFILE.role} · {PROFILE.location}
          </p>

          <h1 className="hero__title bloom-type">
            I build the parts of fintech that people{' '}
            <span className="underline-wobble">actually touch</span>.
          </h1>

          <p className="hero__body">{PROFILE.standfirst}</p>

          <div className="hero__actions">
            <a href="#work" className="btn btn--solid">
              See the work
              <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn btn--ghost">
              Say hello
            </a>
          </div>

          <div className="hero__meta">
            <span className="hero__available">
              <span className="hero__pulse" aria-hidden="true" />
              {PROFILE.availability}
            </span>
            <a href={`mailto:${PROFILE.email}`} className="hero__email">
              {PROFILE.email}
            </a>
          </div>
        </div>

        <aside className="hero__aside" aria-label="Quick facts">
          <div className="hero__sticker" aria-hidden="true">
            <span>Angular</span>
            <span>&amp;</span>
            <span>React</span>
          </div>

          <ul className="hero__stats">
            {STATS.slice(0, 3).map(s => (
              <li key={s.label} className="hero__stat">
                <span className="hero__stat-value">
                  {s.value}
                  <em className="hero__stat-unit">{s.unit}</em>
                </span>
                <span className="hero__stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {[0, 1].map(copy => (
            <div className="hero__marquee-group" key={copy}>
              {MARQUEE.map(item => (
                <span className="hero__marquee-item" key={`${copy}-${item}`}>
                  {item}
                  <i className="hero__marquee-sep">✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── About ───────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="section about">
      <div className="shell">
        <div className="about__grid">
          <div className="about__intro reveal">
            <p className="eyebrow">About</p>
            <h2 className="section-title bloom-type">
              Not a framework person.
              <br />A <span className="marker">product person</span> who writes frontends.
            </h2>

            {PROFILE.story.map(p => (
              <p key={p.slice(0, 24)} className="about__para">
                {p}
              </p>
            ))}

            <blockquote className="about__quote">
              <p className="serif-it">“{PROFILE.quote}”</p>
            </blockquote>
          </div>

          <ul className="about__principles">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.title}
                className="about__principle reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="about__principle-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="about__principle-title">{p.title}</h3>
                  <p className="about__principle-text">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ─── Work ────────────────────────────────────────────────── */
function Work() {
  return (
    <section id="work" className="section work">
      <div className="shell">
        <div className="section-head reveal">
          <p className="eyebrow">Work</p>
          <h2 className="section-title bloom-type">Four years, mostly in lending</h2>
          <p className="section-sub">
            Every role below is a fintech product with real money and real regulators attached.
            Here's what I actually did.
          </p>
        </div>

        <ol className="work__list">
          {JOBS.map((job, i) => (
            <li
              key={job.id}
              className="work__item reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
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
                    <span className="work__headline">
                      <strong>{job.headline.value}</strong>
                      <em>{job.headline.label}</em>
                    </span>
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
            <h3 className="work__education-degree">{EDUCATION.degree}</h3>
            <p className="work__education-school">
              {EDUCATION.school} · {EDUCATION.period} · {EDUCATION.detail}
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

/* ─── Toolkit ─────────────────────────────────────────────── */
function Toolkit() {
  return (
    <section id="toolkit" className="section toolkit">
      <div className="shell">
        <div className="section-head reveal">
          <p className="eyebrow">Toolkit</p>
          <h2 className="section-title bloom-type">What I work with</h2>
          <p className="section-sub">
            No percentage bars — nobody is 87% good at TypeScript. Just an honest list, grouped by
            how often it comes up.
          </p>
        </div>

        <div className="toolkit__grid">
          {SKILLS.map((g, i) => (
            <div
              key={g.label}
              className="toolkit__group reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="toolkit__group-head">
                <h3 className="toolkit__group-title">{g.label}</h3>
                <p className="toolkit__group-note">{g.note}</p>
              </div>
              <div className="toolkit__items">
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
  )
}

/* ─── Contact ─────────────────────────────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false)

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
    <section id="contact" className="section contact">
      <div className="shell">
        <div className="contact__grid">
          <div className="contact__intro reveal">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title bloom-type">
              Got something worth <span className="marker">building</span>?
            </h2>
            <p className="section-sub">
              I'm open to software engineering roles and the occasional freelance build. Tell me
              what you're working on — I answer everything within a day.
            </p>

            <a href={`mailto:${PROFILE.email}`} className="contact__mail">
              {PROFILE.email}
            </a>

            <div className="contact__row">
              <button className="contact__copy" onClick={copyEmail}>
                {copied ? 'Copied ✓' : 'Copy address'}
              </button>
              <span className="contact__loc">
                {PROFILE.location} · {PROFILE.timezone}
              </span>
            </div>

            <div className="contact__links">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="contact__link">
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="contact__link">
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="contact__form-wrap reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__left">
          <p className="footer__name">{PROFILE.name}</p>
          <p className="footer__role">
            {PROFILE.role} · {PROFILE.location}
          </p>
        </div>

        <nav className="footer__links" aria-label="Elsewhere">
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${PROFILE.email}`}>Email</a>
          <a href="#top">Back to top ↑</a>
        </nav>

        <p className="footer__note">
          © {new Date().getFullYear()} · Built by hand with React, TypeScript and too many colour
          experiments.
        </p>
      </div>
    </footer>
  )
}
