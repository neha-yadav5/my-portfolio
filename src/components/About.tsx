import './About.css'

const PRINCIPLES = [
  {
    title: 'Boring code, interesting products',
    text: 'The clever abstraction usually costs the next person an hour. I optimise for the teammate reading this at 6pm on a Friday.',
  },
  {
    title: 'Build times are a feature',
    text: 'Seven minutes to see a change is a tax on everyone. Cutting it to two was the highest-leverage thing I shipped last year.',
  },
  {
    title: 'Design systems beat one-off screens',
    text: 'One well-argued component library across eight apps saved more time than any individual feature I have written.',
  },
  {
    title: 'Compliance is a UX problem',
    text: 'SOC 2, e-KYC, RBI rules — the constraint is real, but users still deserve a flow that makes sense on the first try.',
  },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="shell">
        <div className="about__grid">
          <div className="about__intro reveal">
            <p className="eyebrow">About</p>
            <h2 className="section-title">
              Not a framework person.
              <br />A <span className="marker">product person</span> who writes frontends.
            </h2>

            <p className="about__para">
              I'm Neha. Somewhere between my third KYC form and my first production incident, I got
              genuinely interested in the least glamorous part of fintech — the operations teams,
              the audit trails, the person clicking "approve" two hundred times before lunch. That's
              where the real product lives, and it's usually the part nobody designs for.
            </p>
            <p className="about__para">
              These days I work at <strong>Homeville Group</strong>, where I led our Angular
              codebase from a monolith to standalone components, built the video KYC module in React
              on top of the 100ms SDK, and maintain the component library the rest of the team
              builds on.
            </p>
            <p className="about__para">
              Outside of features, I mentor, review a lot of pull requests, and argue for the small
              stuff — naming, loading states, what happens when the API returns nothing.
            </p>

            <blockquote className="about__quote">
              <p className="serif-it">
                “The best compliment I've had at work: someone from the ops team said they stopped
                keeping their own Excel backup.”
              </p>
            </blockquote>
          </div>

          <ul className="about__principles">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="about__principle reveal" style={{ transitionDelay: `${i * 70}ms` }}>
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
