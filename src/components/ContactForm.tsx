import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { PROFILE } from '../content/profile'
import './ContactForm.css'

/**
 * The email form, shared by every edition. Markup and behaviour are
 * identical; each edition restyles `.cf__*` under its own root class.
 *
 * Delivery goes through EmailJS. If the keys are missing (local dev
 * before .env.local exists) it falls back to opening a mailto: draft
 * rather than silently pretending to have sent something.
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
          // Sent under several aliases so the template works whichever
          // variable names it was set up with.
          from_name: form.name,
          from_email: form.email,
          name: form.name,
          email: form.email,
          reply_to: form.email,
          message: form.message,
          // Recipient — covers templates whose "To Email" is a variable
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
        <p>It's in my inbox and I'll reply within a day, usually sooner.</p>
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
    <form className={`cf ${className}`} onSubmit={handleSubmit} noValidate={false}>
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
        <p className="cf__error" role="alert">
          That didn't go through. Try again, or email me directly at{' '}
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>.
          {/* Raw API reason during development only — never shown to visitors */}
          {import.meta.env.DEV && errorDetail && (
            <span className="cf__error-detail">{errorDetail}</span>
          )}
        </p>
      )}

      <button type="submit" className="cf__submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send it'}
        {!sending && <span aria-hidden="true">→</span>}
      </button>
    </form>
  )
}
