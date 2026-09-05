/* ============================================================
   Two independent axes:
     <html data-theme="…">    → colour palette (7 of them)
     <html data-edition="…">  → which portfolio design renders
   Any palette works with any edition.
   ============================================================ */

export type ThemeId =
  | 'citrus'
  | 'blossom'
  | 'sorbet'
  | 'moss'
  | 'blueprint'
  | 'lagoon'
  | 'grape'

export type Theme = {
  id: ThemeId
  name: string
  mood: string
  mode: 'light' | 'dark'
  /** Dots shown in the picker: accent, secondary accent, background */
  swatch: [string, string, string]
}

export const THEMES: Theme[] = [
  {
    id: 'citrus',
    name: 'Citrus Punch',
    mood: 'Warm paper, tangerine, a shot of cobalt',
    mode: 'light',
    swatch: ['#F0500A', '#2354E6', '#FFF7EE'],
  },
  {
    id: 'blossom',
    name: 'Peach Blossom',
    mood: 'Pastel apricot, headings in rose, lilac and marigold',
    mode: 'light',
    swatch: ['#D6407A', '#8B5CF6', '#FFE7D2'],
  },
  {
    id: 'sorbet',
    name: 'Sorbet',
    mood: 'Soft pink light, magenta and violet',
    mode: 'light',
    swatch: ['#D6146B', '#6D28D9', '#FFF3F6'],
  },
  {
    id: 'moss',
    name: 'Moss & Rust',
    mood: 'Recycled paper, deep green, burnt orange',
    mode: 'light',
    swatch: ['#0F6E4C', '#C2410C', '#F4F3E9'],
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    mood: 'Cool drafting paper, cobalt, hot pink',
    mode: 'light',
    swatch: ['#1D4ED8', '#DB2777', '#EEF3F9'],
  },
  {
    id: 'lagoon',
    name: 'Lagoon',
    mood: 'Deep teal night, aqua and coral',
    mode: 'dark',
    swatch: ['#2DD4BF', '#FF7A5C', '#06232B'],
  },
  {
    id: 'grape',
    name: 'Midnight Grape',
    mood: 'Plum dark, lilac with a lime edge',
    mode: 'dark',
    swatch: ['#C084FC', '#A3E635', '#16101F'],
  },
]

/* ─── Editions: five separate portfolios ───────────────────── */

export type EditionId =
  | 'editorial'
  | 'bento'
  | 'dossier'
  | 'broadsheet'
  | 'poster'
  | 'timeline'

export type Edition = {
  id: EditionId
  name: string
  tagline: string
  description: string
}

export const EDITIONS: Edition[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    tagline: 'The original',
    description:
      'Magazine spread with hard ink shadows — asymmetric hero, a tilted sticker, timeline work history and a real contact form.',
  },
  {
    id: 'bento',
    name: 'Bento',
    tagline: 'Modern product site',
    description:
      'Centred hero, then a grid of soft tiles — stats, quote, currently-at, skills. Friendly and immediately readable.',
  },
  {
    id: 'dossier',
    name: 'Dossier',
    tagline: 'Quiet and senior',
    description:
      'Fixed sidebar with your details; work is a numbered index that expands in place. Restrained, precise, very hire-ready.',
  },
  {
    id: 'broadsheet',
    name: 'Broadsheet',
    tagline: 'Newspaper feature',
    description:
      'A masthead, a drop cap and multi-column text. Reads like a profile written about you rather than a CV.',
  },
  {
    id: 'poster',
    name: 'Poster',
    tagline: 'Loud and graphic',
    description:
      'Full-screen type, scrolling marquees, numbered slabs and tilted stickers. The one people remember.',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    tagline: 'Scrolling story',
    description:
      'One continuous spine from 2021 to now, with the year pinned beside you as you scroll through each chapter.',
  },
]

export const DEFAULT_THEME: ThemeId = 'citrus'
export const DEFAULT_EDITION: EditionId = 'bento'
export const THEME_KEY = 'ny-theme'
export const EDITION_KEY = 'ny-edition'
