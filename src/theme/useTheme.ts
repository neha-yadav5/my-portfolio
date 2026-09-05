import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_EDITION,
  DEFAULT_THEME,
  EDITIONS,
  EDITION_KEY,
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

/** Owns both axes and mirrors them onto <html> as data attributes. */
export function useAppearance() {
  const [theme, setThemeState] = useState<ThemeId>(() => read(THEME_KEY, THEME_IDS, DEFAULT_THEME))
  const [edition, setEditionState] = useState<EditionId>(() =>
    read(EDITION_KEY, EDITION_IDS, DEFAULT_EDITION),
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
