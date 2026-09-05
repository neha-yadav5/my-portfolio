import './Hero.css'

const STATS = [
  { value: '7→2', unit: 'min', label: 'Angular build time, after the standalone migration' },
  { value: '50+', unit: 'people', label: 'Ops staff who stopped living in spreadsheets' },
  { value: '4', unit: 'years', label: 'Shipping inside regulated lending platforms' },
]

const MARQUEE = [
  'Angular',
  'TypeScript',
  'React',
  'RxJS',
  'Design systems',
  'Standalone components',
  'REST APIs',
  'RBAC',
  'Angular Material',
  'Jest',
  'Video KYC',
  'Performance work',
]

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="shell hero__inner">
        <div className="hero__lead">
          <p className="eyebrow">Software Engineer · Mumbai, India</p>

          <h1 className="hero__title display">
            I build the parts of fintech that people{' '}
            <span className="underline-wobble">actually touch</span>.
          </h1>

          <p className="hero__body">
            Four years inside lending platforms — underwriting, collections, video KYC, the
            unglamorous screens that decide whether someone gets a loan today or next week. I take
            processes that used to live in a spreadsheet and turn them into interfaces nobody needs
            a manual for.
          </p>

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
              Open to new roles
            </span>
            <a href="mailto:neha.yadav.works@gmail.com" className="hero__email">
              neha.yadav.works@gmail.com
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
            {STATS.map(s => (
              <li key={s.label} className="hero__stat">
                <span className="hero__stat-value display">
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
