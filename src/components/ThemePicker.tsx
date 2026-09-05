import { useEffect, useRef, useState } from 'react'
import { LAYOUTS, THEMES, type Layout } from '../theme/themes'
import { useAppearance } from '../theme/useTheme'
import './ThemePicker.css'

/** Tiny wireframes so each layout's shape is readable before you click it. */
function Wireframe({ kind }: { kind: Layout['preview'] }) {
  const bar = 'wire__bar'
  return (
    <span className={`wire wire--${kind}`} aria-hidden="true">
      {kind === 'editorial' && (
        <>
          <i className={`${bar} wire__head`} />
          <i className={`${bar} wire__wide`} />
          <i className={`${bar} wire__wide`} />
          <span className="wire__row">
            <i className={bar} />
            <i className={bar} />
          </span>
        </>
      )}
      {kind === 'rail' && (
        <span className="wire__split">
          <i className="wire__side" />
          <span className="wire__stack">
            <i className={bar} />
            <i className={bar} />
            <i className={bar} />
          </span>
        </span>
      )}
      {kind === 'bento' && (
        <span className="wire__grid">
          <i className="wire__tile wire__tile--lg" />
          <i className="wire__tile" />
          <i className="wire__tile" />
          <i className="wire__tile wire__tile--wide" />
        </span>
      )}
      {kind === 'zine' && (
        <>
          <i className={`${bar} wire__huge`} />
          <span className="wire__row">
            <i className={bar} />
            <i className={bar} />
            <i className={bar} />
          </span>
          <i className={`${bar} wire__wide`} />
        </>
      )}
    </span>
  )
}

export default function ThemePicker() {
  const { theme, setTheme, layout, setLayout } = useAppearance()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'palette' | 'layout'>('palette')
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const activeTheme = THEMES.find(t => t.id === theme)
  const activeLayout = LAYOUTS.find(l => l.id === layout)

  return (
    <div className="picker" ref={wrapRef}>
      {open && (
        <div className="picker__panel" role="dialog" aria-label="Change how this site looks">
          <div className="picker__head">
            <div>
              <p className="picker__title">Make it yours</p>
              <p className="picker__hint">
                6 palettes × 4 layouts. Your pick is remembered on this device.
              </p>
            </div>
            <button className="picker__close" onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>

          <div className="picker__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === 'palette'}
              className={`picker__tab ${tab === 'palette' ? 'is-active' : ''}`}
              onClick={() => setTab('palette')}
            >
              Palette
            </button>
            <button
              role="tab"
              aria-selected={tab === 'layout'}
              className={`picker__tab ${tab === 'layout' ? 'is-active' : ''}`}
              onClick={() => setTab('layout')}
            >
              Layout
            </button>
          </div>

          <div className="picker__list">
            {tab === 'palette' &&
              THEMES.map(t => (
                <button
                  key={t.id}
                  className={`picker__option ${t.id === theme ? 'is-active' : ''}`}
                  onClick={() => setTheme(t.id)}
                  aria-pressed={t.id === theme}
                >
                  <span className="picker__dots" aria-hidden="true">
                    {t.swatch.map((c, i) => (
                      <span key={i} className="picker__dot" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="picker__meta">
                    <span className="picker__name">
                      {t.name}
                      <span className="picker__badge">{t.mode}</span>
                    </span>
                    <span className="picker__mood">{t.mood}</span>
                  </span>
                  {t.id === theme && <span className="picker__check" aria-hidden="true">✓</span>}
                </button>
              ))}

            {tab === 'layout' &&
              LAYOUTS.map(l => (
                <button
                  key={l.id}
                  className={`picker__option picker__option--layout ${
                    l.id === layout ? 'is-active' : ''
                  }`}
                  onClick={() => setLayout(l.id)}
                  aria-pressed={l.id === layout}
                >
                  <Wireframe kind={l.preview} />
                  <span className="picker__meta">
                    <span className="picker__name">{l.name}</span>
                    <span className="picker__mood">{l.description}</span>
                  </span>
                  {l.id === layout && <span className="picker__check" aria-hidden="true">✓</span>}
                </button>
              ))}
          </div>

          <p className="picker__current">
            Now showing <strong>{activeTheme?.name}</strong> · <strong>{activeLayout?.name}</strong>
          </p>
        </div>
      )}

      <button
        className="picker__trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`Change appearance. Currently ${activeTheme?.name} palette, ${activeLayout?.name} layout.`}
      >
        <span className="picker__trigger-dots" aria-hidden="true">
          {activeTheme?.swatch.map((c, i) => (
            <span key={i} className="picker__dot" style={{ background: c }} />
          ))}
        </span>
        <span className="picker__trigger-label">Theme</span>
      </button>
    </div>
  )
}
