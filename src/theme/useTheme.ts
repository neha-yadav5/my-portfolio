import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_LAYOUT,
  DEFAULT_THEME,
  LAYOUTS,
  LAYOUT_KEY,
  THEMES,
  THEME_KEY,
  type LayoutId,
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
const LAYOUT_IDS = LAYOUTS.map(l => l.id)

/**
 * Owns both appearance axes. Values are written to <html> as data attributes
 * so components stay prop-free and read everything through CSS.
 */
export function useAppearance() {
  const [theme, setThemeState] = useState<ThemeId>(() => read(THEME_KEY, THEME_IDS, DEFAULT_THEME))
  const [layout, setLayoutState] = useState<LayoutId>(() =>
    read(LAYOUT_KEY, LAYOUT_IDS, DEFAULT_LAYOUT),
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.layout = layout
  }, [layout])

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next)
    persist(THEME_KEY, next)
  }, [])

  const setLayout = useCallback((next: LayoutId) => {
    setLayoutState(next)
    persist(LAYOUT_KEY, next)
  }, [])

  return { theme, setTheme, layout, setLayout }
}
