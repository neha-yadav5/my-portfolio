import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_EDITION,
  DEFAULT_THEME,
  EDITIONS,
  EDITION_KEY,
  SHOW_LAYOUT_PICKER,
  SHOW_PALETTE_PICKER,
  THEMES,
  THEME_KEY,
  type EditionId,
  type ThemeId,
} from './themes'

function read<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const stored = localStorage.getItem(key) as T | null
    if (stored && allowed.includes(stored)) return stored
  } catch {
    /* private mode / blocked storage — fall through to the default */
  }
  return fallback
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* not fatal — the choice just won't survive a reload */
  }
}

const THEME_IDS = THEMES.map(t => t.id)
const EDITION_IDS = EDITIONS.map(e => e.id)

/**
 * Owns both appearance axes and mirrors them onto <html> as data
 * attributes. While a picker is switched off its axis is pinned to the
 * default and any previously stored choice is ignored, so every visitor
 * sees the same thing. Turning a flag back on restores the remembered
 * choice with no other changes.
 */
export function useAppearance() {
  const [theme, setThemeState] = useState<ThemeId>(() =>
    SHOW_PALETTE_PICKER ? read(THEME_KEY, THEME_IDS, DEFAULT_THEME) : DEFAULT_THEME,
  )
  const [edition, setEditionState] = useState<EditionId>(() =>
    SHOW_LAYOUT_PICKER ? read(EDITION_KEY, EDITION_IDS, DEFAULT_EDITION) : DEFAULT_EDITION,
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.edition = edition
  }, [edition])

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next)
    persist(THEME_KEY, next)
  }, [])

  const setEdition = useCallback((next: EditionId) => {
    setEditionState(next)
    persist(EDITION_KEY, next)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return { theme, setTheme, edition, setEdition }
}
