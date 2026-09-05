import { useState } from 'react'
import './Contact.css'

const EMAIL = 'neha.yadav.works@gmail.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Hello from ${form.name || 'your portfolio'}`
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the mailto link right beside it still works */
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="shell">
        <div className="contact__grid">
          <div className="contact__intro reveal">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title">
              Got something worth <span className="marker marker--alt">building</span>?
            </h2>
            <p className="section-sub">
              I'm open to software engineering roles and the occasional freelance build. Tell me
              what you're working on — I answer everything within a day.
            </p>

            <a href={`mailto:${EMAIL}`} className="contact__mail display">
              {EMAIL}
            </a>

            <div className="contact__row">
              <button className="contact__copy" onClick={copyEmail}>
                {copied ? 'Copied ✓' : 'Copy address'}
              </button>
              <span className="contact__loc">Mumbai, India · IST (UTC+5:30)</span>
            </div>

            <div className="contact__links">
              <a
                href="https://www.linkedin.com/in/neha-yadav5"
                target="_blank"
                rel="noreferrer"
                className="contact__link"
              >
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://github.com/neha-yadav5"
                target="_blank"
                rel="noreferrer"
                className="contact__link"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="contact__form-wrap reveal">
            {sent ? (
              <div className="contact__sent">
                <span className="contact__sent-mark" aria-hidden="true">
                  ✳
                </span>
                <h3>Your mail app should be open.</h3>
                <p>
                  If it didn't open, write to{' '}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a> directly — it lands in the same inbox.
                </p>
                <button className="btn btn--ghost" onClick={() => setSent(false)}>
                  Write another
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <label className="contact__field">
                  <span className="contact__label">Your name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Neha's future colleague"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="contact__field">
                  <span className="contact__label">Where do I reply?</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="contact__field">
                  <span className="contact__label">What's on your mind?</span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="A role, a product, a problem you're stuck on…"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </label>

                <button type="submit" className="btn btn--solid contact__submit">
                  Send it
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
