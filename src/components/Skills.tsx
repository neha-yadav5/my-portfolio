import './Skills.css'

const GROUPS = [
  {
    label: 'Every day',
    note: 'What I reach for without thinking',
    items: ['Angular (v12–17)', 'TypeScript', 'RxJS', 'React', 'JavaScript ES6+', 'HTML & CSS', 'SCSS'],
  },
  {
    label: 'Architecture',
    note: 'How I keep codebases from calcifying',
    items: [
      'Standalone components',
      'Lazy loading',
      'Design systems',
      'Component libraries',
      'Angular Material',
      'Performance budgets',
    ],
  },
  {
    label: 'APIs & security',
    note: 'The fintech half of the job',
    items: ['REST integration', 'HTTP interceptors', 'Auth guards', 'RBAC', 'OAuth2', 'API contracts'],
  },
  {
    label: 'Workflow',
    note: 'Shipping, not just writing',
    items: ['Git & GitHub', 'CI/CD', 'Jest', 'Code review', 'Postman', 'Agile / Scrum', 'Webpack & Vite'],
  },
  {
    label: 'AI in the loop',
    note: 'Used deliberately, reviewed properly',
    items: ['Claude', 'ChatGPT', 'GitHub Copilot', 'Cursor', 'LLM API integration'],
  },
]

export default function Skills() {
  return (
    <section id="toolkit" className="section toolkit">
      <div className="shell">
        <div className="section-head reveal">
          <p className="eyebrow">Toolkit</p>
          <h2 className="section-title">What I work with</h2>
          <p className="section-sub">
            No percentage bars — nobody is 87% good at TypeScript. Just an honest list, grouped by
            how often it comes up.
          </p>
        </div>

        <div className="toolkit__grid">
          {GROUPS.map((g, i) => (
            <div key={g.label} className="toolkit__group reveal" style={{ transitionDelay: `${i * 60}ms` }}>
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
