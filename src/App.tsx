import AppearancePicker from './components/AppearancePicker'
import Bento from './editions/Bento'
import Broadsheet from './editions/Broadsheet'
import Dossier from './editions/Dossier'
import Editorial from './editions/Editorial'
import Poster from './editions/Poster'
import Timeline from './editions/Timeline'
import { useReveal } from './hooks/useReveal'
import { useAppearance } from './theme/useTheme'
import type { EditionId } from './theme/themes'

const EDITION_COMPONENTS: Record<EditionId, () => React.JSX.Element> = {
  editorial: Editorial,
  bento: Bento,
  dossier: Dossier,
  broadsheet: Broadsheet,
  poster: Poster,
  timeline: Timeline,
}

export default function App() {
  const { theme, setTheme, edition, setEdition } = useAppearance()
  useReveal(edition)

  const Edition = EDITION_COMPONENTS[edition]

  return (
    <>
      <Edition key={edition} />
      <AppearancePicker
        theme={theme}
        setTheme={setTheme}
        edition={edition}
        setEdition={setEdition}
      />
    </>
  )
}
