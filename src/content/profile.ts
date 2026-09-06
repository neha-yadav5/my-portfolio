/* ============================================================
   Single source of truth. Every edition renders these same
   facts — only the design around them changes.
   ============================================================ */

export const PROFILE = {
  name: 'Neha Yadav',
  initials: 'NY',
  role: 'Software Engineer',
  location: 'Mumbai, India',
  timezone: 'IST · UTC+5:30',
  email: 'neha.yadav.works@gmail.com',
  linkedin: 'https://www.linkedin.com/in/neha-yadav5',
  github: 'https://github.com/neha-yadav5',
  availability: 'Open to new roles',
  since: 2021,

  headline: 'I build the parts of fintech that people actually touch.',
  headlineAccent: 'actually touch',

  standfirst:
    'Four years inside lending platforms — underwriting, collections, video KYC, the unglamorous screens that decide whether someone gets a loan today or next week. I take processes that used to live in a spreadsheet and turn them into interfaces nobody needs a manual for.',

  story: [
    'I\'m Neha. Somewhere between my third KYC form and my first production incident, I got genuinely interested in the least glamorous part of fintech — the operations teams, the audit trails, the person clicking "approve" two hundred times before lunch. That\'s where the real product lives, and it\'s usually the part nobody designs for.',
    'These days I work at Homeville Group, where I led our Angular codebase from a monolith to standalone components, built the video KYC module in React on top of the 100ms SDK, and maintain the component library the rest of the team builds on.',
    'Outside of features, I mentor, review a lot of pull requests, and argue for the small stuff — naming, loading states, what happens when the API returns nothing.',
  ],

  quote:
    'The best compliment I\'ve had at work: someone from the ops team said they stopped keeping their own Excel backup.',
} as const

export type Stat = { value: string; unit: string; label: string }

export const STATS: Stat[] = [
  { value: '7→2', unit: 'min', label: 'Angular build time, after the standalone migration' },
  { value: '50+', unit: 'people', label: 'Ops staff who stopped living in spreadsheets' },
  { value: '8+', unit: 'apps', label: 'Running on the component library I maintain' },
  { value: '4', unit: 'years', label: 'Shipping inside regulated lending platforms' },
]

export type Job = {
  id: string
  company: string
  role: string
  period: string
  years: string
  place: string
  summary: string
  bullets: string[]
  stack: string[]
  headline: { value: string; label: string }
}

export const JOBS: Job[] = [
  {
    id: 'homeville-3',
    company: 'Homeville Group',
    role: 'Software Engineer III',
    period: 'Apr 2025 — Present',
    years: '2025—',
    place: 'Mumbai · Housing finance',
    summary:
      'Own the frontend architecture of the lending platform and the component library the rest of the team builds on.',
    headline: { value: '−71%', label: 'build time' },
    bullets: [
      'Led the migration from a monolithic Angular app to standalone components, taking builds from 7 minutes to 2 and shortening the CI pipeline for everyone.',
      'Built the Video KYC module in React on the 100ms SDK and embedded it inside the Angular platform — biometric verification, SOC 2 requirements, government e-KYC rules and all.',
      'Maintain a shared UI component library aligned to our design system, now used across 8+ Angular apps and worth roughly 30% off feature delivery time.',
      'Shipped AI remarks generation and an in-app chatbot on top of LLM APIs, so case summaries write their first draft themselves.',
    ],
    stack: ['Angular', 'React', '100ms SDK', 'TypeScript', 'Design systems', 'LLM APIs'],
  },
  {
    id: 'homeville-1',
    company: 'Homeville Group',
    role: 'Software Engineer I',
    period: 'Oct 2023 — Mar 2025',
    years: '2023—25',
    place: 'Mumbai · Housing finance',
    summary:
      'Built the credit underwriting and collections products from an empty repo to daily use by the operations floor.',
    headline: { value: '50+', label: 'daily users' },
    bullets: [
      'Wrote the Credit Underwriting and Collections modules from scratch in Angular, replacing the Excel workflows 50+ operations staff had been maintaining by hand.',
      'Added real audit traceability to case handling, which cut workflow errors by about 40% and made review conversations a lot shorter.',
      'Implemented role-based access with auth guards and permission-driven rendering, so sensitive financial screens only exist for the people cleared to see them.',
      'Standardised REST contracts with the backend team and reduced integration defects by roughly 35%.',
      'Mentored a frontend intern through Angular, Git workflow and code review — they shipped to production.',
    ],
    stack: ['Angular', 'RxJS', 'RBAC', 'Auth guards', 'REST APIs'],
  },
  {
    id: 'kclub',
    company: 'Kclub Technologies',
    role: 'Software Engineer',
    period: 'Jan 2023 — Sep 2023',
    years: '2023',
    place: 'Mumbai · Digital payments',
    summary: 'Frontend for Yatripay — moving real money for real people, so the details mattered.',
    headline: { value: '65→82', label: 'Lighthouse' },
    bullets: [
      'Built transaction initiation, live status tracking and wallet management for a payments platform with 10K+ active users.',
      'Took 280KB off the initial bundle through code splitting and lazy loading, moving the Lighthouse score from 65 to 82 and load performance up about 20%.',
      'Wrote down the request/response schemas and error handling patterns nobody had agreed on yet, which quietly ended a lot of cross-team rework.',
    ],
    stack: ['React', 'JavaScript', 'Code splitting', 'REST APIs'],
  },
  {
    id: 'gmoney',
    company: 'GMoney Loans',
    role: 'Software Engineer',
    period: 'Dec 2021 — Jan 2023',
    years: '2021—23',
    place: 'Remote · Lending',
    summary: 'Onboarding journeys, end to end — application through disbursement.',
    headline: { value: '5K+', label: 'monthly users' },
    bullets: [
      'Built customer onboarding in Angular from loan application through to disbursement for 5K+ monthly users, translating genuinely complicated financial logic into screens people could finish.',
      'Made the admin and operations dashboards for tracking live loan portfolios and KPIs, cutting manual data entry roughly in half.',
      'Set up HTTP interceptors and auth guards for role-based access across several loan portals, against PCI-DSS and RBI expectations.',
    ],
    stack: ['Angular', 'HTTP interceptors', 'Dashboards', 'TypeScript'],
  },
]

export type SkillGroup = { label: string; note: string; items: string[] }

export const SKILLS: SkillGroup[] = [
  {
    label: 'Every day',
    note: 'What I reach for without thinking',
    items: ['Angular (v14+)', 'TypeScript', 'RxJS', 'React', 'JavaScript ES6+', 'HTML & CSS', 'SCSS'],
  },
  {
    label: 'Architecture',
    note: 'How I keep codebases from calcifying',
    items: [
      'Micro frontends',
      'Standalone components',
      'Lazy loading',
      'Design systems',
      'Component libraries',
      'Angular Material',
      'Performance budgets',
    ],
  },
  {
    label: 'APIs & security',
    note: 'The fintech half of the job',
    items: ['REST integration', 'HTTP interceptors', 'Auth guards', 'RBAC', 'OAuth2', 'API contracts'],
  },
  {
    label: 'Workflow',
    note: 'Shipping, not just writing',
    items: ['Git & GitHub', 'CI/CD', 'Jest', 'Code review', 'Postman', 'Agile / Scrum', 'Webpack & Vite'],
  },
  {
    label: 'AI in the loop',
    note: 'Used deliberately, reviewed properly',
    items: ['Claude', 'ChatGPT', 'GitHub Copilot', 'Cursor', 'LLM API integration'],
  },
]

export const PRINCIPLES = [
  {
    title: 'Boring code, interesting products',
    text: 'The clever abstraction usually costs the next person an hour. I optimise for the teammate reading this at 6pm on a Friday.',
  },
  {
    title: 'Build times are a feature',
    text: 'Seven minutes to see a change is a tax on everyone. Cutting it to two was the highest-leverage thing I shipped last year.',
  },
  {
    title: 'Design systems beat one-off screens',
    text: 'One well-argued component library across eight apps saved more time than any individual feature I have written.',
  },
  {
    title: 'Compliance is a UX problem',
    text: 'SOC 2, e-KYC, RBI rules — the constraint is real, but users still deserve a flow that makes sense on the first try.',
  },
]

export const EDUCATION = {
  degree: 'BSc, Information Technology',
  school: 'Tolani College of Commerce, Mumbai',
  period: '2018 — 2021',
  detail: 'CGPA 7.8',
}

export const MARQUEE = [
  'Angular',
  'TypeScript',
  'React',
  'RxJS',
  'Design systems',
  'Standalone components',
  'REST APIs',
  'RBAC',
  'Angular Material',
  'Jest',
  'Video KYC',
  'Performance work',
]

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Contact', href: '#contact' },
]
