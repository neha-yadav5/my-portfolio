import { useEffect, useState } from 'react'
import './Navbar.css'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#about')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently filling the viewport
  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href)).filter(
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
          <span className="nav__mark" aria-hidden="true">NY</span>
          <span className="nav__brand-text">
            Neha Yadav
            <span className="nav__brand-role">Software Engineer</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map(l => (
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
          {LINKS.map(l => (
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
