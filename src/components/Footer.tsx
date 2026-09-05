import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__left">
          <p className="footer__name display">Neha Yadav</p>
          <p className="footer__role">Software Engineer · Mumbai, India</p>
        </div>

        <nav className="footer__links" aria-label="Elsewhere">
          <a href="https://www.linkedin.com/in/neha-yadav5" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/neha-yadav5" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="mailto:neha.yadav.works@gmail.com">Email</a>
          <a href="#top">Back to top ↑</a>
        </nav>

        <p className="footer__note">
          © {year} · Built by hand with React, TypeScript and too many colour experiments.
        </p>
      </div>
    </footer>
  )
}
