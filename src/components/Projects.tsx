import { PROJECTS } from '../content/profile'
import './Projects.css'

/**
 * The project cards, shared by every edition. Only the grid lives here —
 * each edition supplies its own section wrapper and heading so the
 * projects sit in that design's own typographic language, then restyles
 * `.pj__*` under its root class.
 *
 * These are substantial builds rather than weekend repos, so each one
 * gets a full-width feature card with its points in two columns —
 * stacked, not tiled into a grid that would crush them.
 */
export default function Projects({ className = '' }: { className?: string }) {
  return (
    <div className={`pj ${className}`}>
      {PROJECTS.map((p, i) => (
        <article key={p.id} className="pj__card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
          <header className="pj__head">
            <span className="pj__index">{String(i + 1).padStart(2, '0')}</span>
            <span className="pj__kind">{p.kind}</span>
          </header>

          <h3 className="pj__name">{p.name}</h3>

          {(p.org || p.year) && (
            <p className="pj__meta">
              {p.org}
              {p.org && p.year && <span aria-hidden="true"> · </span>}
              {p.year}
            </p>
          )}

          <p className="pj__blurb">{p.blurb}</p>

          <ul className="pj__points">
            {p.points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <footer className="pj__foot">
            {p.metric && (
              <span className="pj__metric">
                <strong>{p.metric.value}</strong>
                <em>{p.metric.label}</em>
              </span>
            )}

            <span className="pj__stack">
              {p.stack.map(s => (
                <span key={s}>{s}</span>
              ))}
            </span>

            {p.link && (
              <a
                className="pj__link"
                href={p.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {p.link.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </footer>
        </article>
      ))}
    </div>
  )
}
