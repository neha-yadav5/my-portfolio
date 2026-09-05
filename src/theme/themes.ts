/* ============================================================
   Two independent axes drive the whole site:
     <html data-theme="…">   → colour palette
     <html data-layout="…">  → structure, shape language, density
   ============================================================ */

export type ThemeId =
  | 'citrus'
  | 'blossom'
  | 'lagoon'
  | 'sorbet'
  | 'moss'
  | 'grape'
  | 'blueprint'

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
    mood: 'Pastel apricot paper, headings in rose, lilac and marigold',
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

/* ─── Layouts ──────────────────────────────────────────────── */

export type LayoutId = 'editorial' | 'rail' | 'bento' | 'zine'

export type Layout = {
  id: LayoutId
  name: string
  description: string
  /** Tiny wireframe drawn in the picker so the shape is obvious before clicking */
  preview: 'editorial' | 'rail' | 'bento' | 'zine'
}

export const LAYOUTS: Layout[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Magazine spread. Big left-aligned type, asymmetric columns, hard ink shadows.',
    preview: 'editorial',
  },
  {
    id: 'rail',
    name: 'Side Rail',
    description: 'Fixed sidebar with your name and nav; content scrolls beside it. Quiet and precise.',
    preview: 'rail',
  },
  {
    id: 'bento',
    name: 'Bento',
    description: 'Everything in soft rounded tiles on a grid. Centred, airy, product-y.',
    preview: 'bento',
  },
  {
    id: 'zine',
    name: 'Zine',
    description: 'Poster energy. Square corners, thick rules, tilted stickers, tight and loud.',
    preview: 'zine',
  },
]

export const DEFAULT_THEME: ThemeId = 'citrus'
export const DEFAULT_LAYOUT: LayoutId = 'editorial'
export const THEME_KEY = 'ny-theme'
export const LAYOUT_KEY = 'ny-layout'
