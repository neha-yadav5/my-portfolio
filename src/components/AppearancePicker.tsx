import { useEffect, useRef, useState } from 'react'
import {
  EDITIONS,
  SHOW_LAYOUT_PICKER,
  SHOW_PALETTE_PICKER,
  THEMES,
  type EditionId,
  type ThemeId,
} from '../theme/themes'
import './AppearancePicker.css'

/** Tiny wireframes so each design's shape is readable before you click it. */
function Wireframe({ kind }: { kind: EditionId }) {
  return (
    <span className={`wire wire--${kind}`} aria-hidden="true">
      {kind === 'editorial' && (
        <>
          <i className="wire__bar wire__masthead wire__masthead--left" />
          <i className="wire__bar" />
          <i className="wire__bar" />
          <span className="wire__row">
            <i className="wire__bar" />
            <i className="wire__bar" />
          </span>
        </>
      )}
      {kind === 'zine' && (
        <>
          <i className="wire__bar wire__slab wire__slab--tilt" />
          <span className="wire__row">
            <i className="wire__bar" />
            <i className="wire__bar" />
          </span>
          <i className="wire__bar" />
        </>
      )}
      {kind === 'bento' && (
        <span className="wire__grid">
          <i className="wire__tile wire__tile--lead" />
          <i className="wire__tile" />
          <i className="wire__tile" />
          <i className="wire__tile wire__tile--wide" />
        </span>
      )}
      {kind === 'dossier' && (
        <span className="wire__split">
          <i className="wire__side" />
          <span className="wire__stack">
            <i className="wire__bar" />
            <i className="wire__bar" />
            <i className="wire__bar" />
            <i className="wire__bar" />
          </span>
        </span>
      )}
      {kind === 'broadsheet' && (
        <>
          <i className="wire__bar wire__masthead" />
          <span className="wire__cols">
            <span className="wire__col">
              <i />
              <i />
              <i />
            </span>
            <span className="wire__col">
              <i />
              <i />
              <i />
            </span>
          </span>
        </>
      )}
      {kind === 'poster' && (
        <>
          <i className="wire__bar wire__slab" />
          <i className="wire__bar wire__band" />
          <span className="wire__row">
            <i className="wire__bar" />
            <i className="wire__bar" />
          </span>
        </>
      )}
      {kind === 'timeline' && (
        <span className="wire__spine">
          <i className="wire__rail" />
          <span className="wire__stack">
            <i className="wire__bar" />
            <i className="wire__bar" />
            <i className="wire__bar" />
          </span>
        </span>
      )}
    </span>
  )
}

type Props = {
  theme: ThemeId
  setTheme: (id: ThemeId) => void
  edition: EditionId
  setEdition: (id: EditionId) => void
}

export default function AppearancePicker({ theme, setTheme, edition, setEdition }: Props) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'design' | 'palette'>(
    SHOW_LAYOUT_PICKER ? 'design' : 'palette',
  )
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

  // Both switches off — the picker stays out of the page entirely
  if (!SHOW_LAYOUT_PICKER && !SHOW_PALETTE_PICKER) return null

  const activeTheme = THEMES.find(t => t.id === theme)
  const activeEdition = EDITIONS.find(e => e.id === edition)
  const bothTabs = SHOW_LAYOUT_PICKER && SHOW_PALETTE_PICKER
  const showDesigns = SHOW_LAYOUT_PICKER && (tab === 'design' || !bothTabs)
  const showPalettes = SHOW_PALETTE_PICKER && (tab === 'palette' || !bothTabs)

  return (
    <div className="picker" ref={wrapRef}>
      {open && (
        <div className="picker__panel" role="dialog" aria-label="Change how this site looks">
          <div className="picker__head">
            <div>
              <p className="picker__title">
                {bothTabs ? 'Try them on' : SHOW_LAYOUT_PICKER ? 'Try a different layout' : 'Pick a palette'}
              </p>
              <p className="picker__hint">
                {bothTabs
                  ? '7 layouts × 7 palettes. Your pick is remembered on this device.'
                  : SHOW_LAYOUT_PICKER
                    ? 'Seven of them. Your pick is remembered on this device.'
                    : 'Seven of them. Your pick is remembered on this device.'}
              </p>
            </div>
            <button className="picker__close" onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>

          {bothTabs && (
            <div className="picker__tabs" role="tablist">
              <button
                role="tab"
                aria-selected={tab === 'design'}
                className={`picker__tab ${tab === 'design' ? 'is-active' : ''}`}
                onClick={() => setTab('design')}
              >
                Layout
              </button>
              <button
                role="tab"
                aria-selected={tab === 'palette'}
                className={`picker__tab ${tab === 'palette' ? 'is-active' : ''}`}
                onClick={() => setTab('palette')}
              >
                Palette
              </button>
            </div>
          )}

          <div className={`picker__list ${bothTabs ? '' : 'picker__list--flush'}`}>
            {showDesigns &&
              EDITIONS.map(e => (
                <button
                  key={e.id}
                  className={`picker__option picker__option--design ${
                    e.id === edition ? 'is-active' : ''
                  }`}
                  onClick={() => setEdition(e.id)}
                  aria-pressed={e.id === edition}
                >
                  <Wireframe kind={e.id} />
                  <span className="picker__meta">
                    <span className="picker__name">
                      {e.name}
                      <span className="picker__badge">{e.tagline}</span>
                    </span>
                    <span className="picker__mood">{e.description}</span>
                  </span>
                  {e.id === edition && (
                    <span className="picker__check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              ))}

            {showPalettes &&
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
                  {t.id === theme && (
                    <span className="picker__check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              ))}
          </div>

          {bothTabs && (
            <p className="picker__current">
              Now showing <strong>{activeEdition?.name}</strong> in{' '}
              <strong>{activeTheme?.name}</strong>
            </p>
          )}
        </div>
      )}

      <button
        className="picker__trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={
          SHOW_LAYOUT_PICKER
            ? `Change layout. Currently the ${activeEdition?.name} design.`
            : `Change palette. Currently ${activeTheme?.name}.`
        }
      >
        {SHOW_PALETTE_PICKER ? (
          <span className="picker__trigger-dots" aria-hidden="true">
            {activeTheme?.swatch.map((c, i) => (
              <span key={i} className="picker__dot" style={{ background: c }} />
            ))}
          </span>
        ) : (
          <span className="picker__glyph" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
        <span className="picker__trigger-label">
          {SHOW_LAYOUT_PICKER ? activeEdition?.name : activeTheme?.name}
        </span>
      </button>
    </div>
  )
}
