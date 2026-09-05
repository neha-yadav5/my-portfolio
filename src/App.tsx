import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemePicker from './components/ThemePicker'
import { useReveal } from './hooks/useReveal'

function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ThemePicker />
    </>
  )
}

export default App
