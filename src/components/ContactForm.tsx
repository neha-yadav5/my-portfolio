import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { PROFILE } from '../content/profile'
import './ContactForm.css'

/**
 * The email form, shared by every edition. Markup and behaviour are
 * identical; each edition restyles `.cf__*` under its own root class.
 *
 * Delivery goes through EmailJS. The recipient is set by the "To Email"
 * field on the EmailJS template — it cannot be set from here, by design.
 * If the keys are missing, or a send fails, the visitor is handed a
 * pre-filled mail draft so a message is never lost.
 */

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

type Status = 'idle' | 'sending' | 'sent' | 'drafted' | 'error'

export default function ContactForm({ className = '' }: { className?: string }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorDetail, setErrorDetail] = useState('')
  // Bots fill hidden fields; humans never see this one.
  const honeypot = useRef('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const openMailDraft = () => {
    const subject = `Hello from ${form.name || 'your portfolio'}`
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Quietly accept and discard anything that tripped the honeypot
    if (honeypot.current) {
      setStatus('sent')
      return
    }

    if (!IS_CONFIGURED) {
      openMailDraft()
      setStatus('drafted')
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // The visitor's details. Deliberately NOT sent as `email` or
          // `reply_to`: if the template's "To Email" referenced either of
          // those, the message would silently deliver to the sender
          // instead of to Neha. Better to fail loudly.
          from_name: form.name,
          from_email: form.email,
          name: form.name,
          message: form.message,
          // Recipient, for templates whose "To Email" is `{{to_email}}`
          // rather than a hard-coded address.
          to_name: PROFILE.name,
          to_email: PROFILE.email,
        },
        { publicKey: PUBLIC_KEY },
      )
      setStatus('sent')
      setErrorDetail('')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      // EmailJS rejects with { status, text } — `text` carries the real reason
      const detail =
        err && typeof err === 'object' && 'text' in err
          ? String((err as { text: unknown }).text)
          : String(err)
      console.error('[EmailJS] send failed:', detail, err)
      setErrorDetail(detail)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className={`cf cf__sent ${className}`}>
        <span className="cf__sent-mark" aria-hidden="true">
          ✳
        </span>
        <h3>Message sent — thank you.</h3>
        <p>It's on its way to my inbox and I'll reply within a day, usually sooner.</p>
        <button className="cf__submit cf__submit--ghost" onClick={() => setStatus('idle')}>
          Write another
        </button>
      </div>
    )
  }

  if (status === 'drafted') {
    return (
      <div className={`cf cf__sent ${className}`}>
        <span className="cf__sent-mark" aria-hidden="true">
          ✳
        </span>
        <h3>Your mail app should be open.</h3>
        <p>
          If nothing happened, write to <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>{' '}
          directly — it lands in the same inbox.
        </p>
        <button className="cf__submit cf__submit--ghost" onClick={() => setStatus('idle')}>
          Back to the form
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form className={`cf ${className}`} onSubmit={handleSubmit}>
      <label className="cf__field">
        <span className="cf__label">Your name</span>
        <input
          className="cf__input"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Neha's future colleague"
          value={form.name}
          onChange={handleChange}
          disabled={sending}
          required
        />
      </label>

      <label className="cf__field">
        <span className="cf__label">Where do I reply?</span>
        <input
          className="cf__input"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          disabled={sending}
          required
        />
      </label>

      <label className="cf__field">
        <span className="cf__label">What's on your mind?</span>
        <textarea
          className="cf__input cf__textarea"
          name="message"
          rows={5}
          placeholder="A role, a product, a problem you're stuck on…"
          value={form.message}
          onChange={handleChange}
          disabled={sending}
          required
        />
      </label>

      {/* Honeypot — hidden from people, irresistible to bots */}
      <input
        className="cf__trap"
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        onChange={e => (honeypot.current = e.target.value)}
      />

      {status === 'error' && (
        <div className="cf__error" role="alert">
          <p>
            That didn't go through — sorry. Try again, or send it straight from your own email app
            so you don't lose what you wrote.
          </p>
          <button
            type="button"
            className="cf__fallback"
            onClick={() => {
              openMailDraft()
              setStatus('drafted')
            }}
          >
            Open in my email app instead
          </button>
          {/* Raw API reason during development only — never shown to visitors */}
          {import.meta.env.DEV && errorDetail && (
            <span className="cf__error-detail">{errorDetail}</span>
          )}
        </div>
      )}

      <button type="submit" className="cf__submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send it'}
        {!sending && <span aria-hidden="true">→</span>}
      </button>
    </form>
  )
}
