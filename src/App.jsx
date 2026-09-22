import { useCallback, useRef, useState } from 'react'
import { useSiteAnimations } from './animations.js'

import Header from './components/Header.jsx'
import ApplyModal from './components/ApplyModal.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'

import Hero from './sections/Hero.jsx'
import Stats from './sections/Stats.jsx'
import Founder from './sections/Founder.jsx'
import About from './sections/About.jsx'
import Courses from './sections/Courses.jsx'
import Diploma from './sections/Diploma.jsx'
import Tour from './sections/Tour.jsx'
import Why from './sections/Why.jsx'
import Team from './sections/Team.jsx'
import Journey from './sections/Journey.jsx'
import Steps from './sections/Steps.jsx'
import Reviews from './sections/Reviews.jsx'
import Posters from './sections/Posters.jsx'
import CTA from './sections/CTA.jsx'
import FAQ from './sections/FAQ.jsx'
import Visit from './sections/Visit.jsx'
import Footer from './sections/Footer.jsx'

import './index.css'

export default function App() {
  const root = useRef(null)
  // Lenis owns wheel/touch scrolling globally. Any dialog must stop() it, or
  // the page keeps scrolling behind it and the dialog itself won't scroll.
  const lenisRef = useRef(null)

  // One dialog, opened from several places. `course` is whatever the card that
  // opened it was selling, so the form lands prefilled.
  const [apply, setApply] = useState({ open: false, course: '' })
  const openApply = useCallback((course = '') => setApply({ open: true, course }), [])
  const closeApply = useCallback(() => setApply((a) => ({ ...a, open: false })), [])

  useSiteAnimations(root, lenisRef)

  return (
    <div ref={root}>
      <Header onApply={() => openApply()} />

      <main>
        <Hero onApply={() => openApply()} />
        <Stats />
        <Founder />
        <About />
        <Courses onApply={openApply} />
        <Diploma onApply={openApply} />
        <Tour lenisRef={lenisRef} />
        <Why />
        <Team />
        <Journey />
        <Steps />
        <Reviews />
        <Posters />
        <CTA onApply={() => openApply()} />
        <FAQ />
        <Visit />
      </main>

      <Footer />

      <FloatingWhatsApp />
      <ApplyModal open={apply.open} course={apply.course} onClose={closeApply} lenisRef={lenisRef} />
    </div>
  )
}
