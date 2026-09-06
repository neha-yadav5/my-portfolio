import { EDUCATION, JOBS, MARQUEE, NAV, PRINCIPLES, PROFILE, SKILLS, STATS } from '../content/profile'
import ContactForm from '../components/ContactForm'
import Projects from '../components/Projects'
import './Poster.css'

function Marquee({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  return (
    <div className="ps__marquee" aria-hidden="true">
      <div className={`ps__marquee-track ${reverse ? 'is-reverse' : ''}`}>
        {[0, 1].map(copy => (
          <div className="ps__marquee-group" key={copy}>
            {items.map(item => (
              <span key={`${copy}-${item}`}>
                {item}
                <i>✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * POSTER — full-bleed type, scrolling bands, numbered slabs and
 * tilted stickers. Square corners, thick rules, maximum volume.
 */
export default function Poster() {
  return (
    <div className="edition ps">
      <header className="ps__bar">
        <a href="#top" className="ps__bar-name">
          {PROFILE.name}
        </a>
        <nav aria-label="Sections">
          {NAV.map(l => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section id="top" className="ps__hero">
        <div className="ps__hero-inner shell">
          <p className="ps__hero-role">
            {PROFILE.role} <span>·</span> {PROFILE.location} <span>·</span> Est. {PROFILE.since}
          </p>

          <h1 className="ps__hero-name bloom-type">
            <span>NEHA</span>
            <span>YADAV</span>
          </h1>

          <p className="ps__hero-line">{PROFILE.headline}</p>

          <div className="ps__sticker" aria-hidden="true">
            <span>{PROFILE.availability}</span>
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE} />

      {/* ─── Statement ──────────────────────────────────────── */}
      <section id="about" className="ps__statement">
        <div className="shell">
          <p className="ps__kicker">01 — What I do</p>
          <p className="ps__big-text">{PROFILE.standfirst}</p>

          <div className="ps__creed">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="ps__creed-item reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Numbers ────────────────────────────────────────── */}
      <section className="ps__numbers">
        <div className="shell ps__numbers-grid">
          {STATS.map(s => (
            <div key={s.label} className="ps__number reveal">
              <strong>{s.value}</strong>
              <em>{s.unit}</em>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Work slabs ─────────────────────────────────────── */}
      <section id="work" className="ps__work">
        <div className="shell">
          <p className="ps__kicker">02 — Where I've done it</p>
        </div>

        {JOBS.map((job, i) => (
          <article key={job.id} className="ps__slab reveal">
            <div className="shell ps__slab-inner">
              <span className="ps__slab-num">{String(i + 1).padStart(2, '0')}</span>

              <div className="ps__slab-main">
                <h2 className="ps__slab-company">{job.company}</h2>
                <p className="ps__slab-role">
                  {job.role} <span>{job.period}</span>
                </p>
                <p className="ps__slab-summary">{job.summary}</p>

                <ul className="ps__slab-points">
                  {job.bullets.map(b => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className="ps__slab-stack">
                  {job.stack.map(s => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="ps__slab-metric">
                <strong>{job.headline.value}</strong>
                <em>{job.headline.label}</em>
              </div>
            </div>
          </article>
        ))}

        <div className="shell">
          <p className="ps__edu">
            <strong>{EDUCATION.degree}</strong> — {EDUCATION.school}, {EDUCATION.period},{' '}
            {EDUCATION.detail}
          </p>
        </div>
      </section>

      <Marquee items={['Open to new roles', 'Mumbai, India', 'Angular & React', 'Say hello']} reverse />

      {/* ─── Projects ───────────────────────────────────────── */}
      <section id="projects" className="ps__projects">
        <div className="shell">
          <p className="ps__kicker">03 — What I built</p>
          <Projects />
        </div>
      </section>

      {/* ─── Toolkit ────────────────────────────────────────── */}
      <section id="toolkit" className="ps__toolkit">
        <div className="shell">
          <p className="ps__kicker">04 — The toolkit</p>

          {SKILLS.map(g => (
            <div key={g.label} className="ps__tool-row reveal">
              <h3>
                {g.label}
                <em>{g.note}</em>
              </h3>
              <div className="ps__tool-words">
                {g.items.map(item => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact ────────────────────────────────────────── */}
      <section id="contact" className="ps__contact">
        <div className="shell">
          <p className="ps__kicker ps__kicker--invert">05 — Say hello</p>
          <h2 className="ps__contact-head">
            Got something
            <br />
            worth building?
          </h2>
          <a href={`mailto:${PROFILE.email}`} className="ps__contact-mail">
            {PROFILE.email}
          </a>
          <div className="ps__contact-links">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <span>
              {PROFILE.location} · {PROFILE.timezone}
            </span>
          </div>

          <div className="ps__form">
            <p className="ps__form-label">Or fire one off right here</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="ps__footer shell">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <a href="#top">Top ↑</a>
      </footer>
    </div>
  )
}
