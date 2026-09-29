import { useCallback, useEffect, useRef, useState } from 'react'
import { useSiteAnimations } from './animations.js'
import { COURSES } from './data.js'
import { goTo, homeHref, useCourseSlug } from './courseRoute.js'
import CoursePage from './pages/CoursePage.jsx'

import Header from './components/Header.jsx'
import ApplyModal from './components/ApplyModal.jsx'
import CallbackModal from './components/CallbackModal.jsx'
import ContactBar from './components/ContactBar.jsx'

import Hero from './sections/Hero.jsx'
import Batches from './sections/Batches.jsx'
import About from './sections/About.jsx'
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
  // The callback / enquiry popup. `course` is set when it is opened from a
  // programme in the batches strip; anything else (a click event, the timer)
  // opens it without one.
  const [callback, setCallback] = useState({ open: false, course: '' })
  const openCallback = useCallback(
    (course) => setCallback({ open: true, course: typeof course === 'string' ? course : '' }),
    [],
  )
  const closeCallback = useCallback(() => setCallback((c) => ({ ...c, open: false })), [])
  const openApply = useCallback((course = '') => setApply({ open: true, course }), [])
  const closeApply = useCallback(() => setApply((a) => ({ ...a, open: false })), [])

  // ?course=<slug> shows that course's page in place of the home page
  const slug = useCourseSlug()
  const course = slug ? COURSES.find((c) => c.slug === slug && c.fee) : null

  useSiteAnimations(root, lenisRef, course ? course.slug : 'home')

  // A new page starts at the top. Not on first load, where the browser may be
  // honouring a #section in the address.
  const firstRoute = useRef(true)
  useEffect(() => {
    if (firstRoute.current) { firstRoute.current = false; return }
    window.scrollTo(0, 0)
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [slug])

  // On a course page the header's #section links point at sections that are
  // not on it, so they go home first and then down to the section.
  useEffect(() => {
    if (!course) return
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      const hash = a?.getAttribute('href')
      if (!hash || hash.length < 2) return
      e.preventDefault()
      e.stopPropagation()
      goTo(homeHref() + hash)
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ block: 'start' }), 60)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [course])

  return (
    <div ref={root}>
      <Header onApply={() => openApply()} />

      {course ? (
        <CoursePage course={course} onApply={openApply} onCallback={openCallback} />
      ) : (
      <main>
        <Hero onApply={() => openApply()} />
        <Posters onEnquire={openCallback} lenisRef={lenisRef} />
        <Batches />
        <About />
        <Team />
        <Tour lenisRef={lenisRef} />
        <Diploma onApply={openApply} onEnquire={openCallback} lenisRef={lenisRef} />
        <Why />
        <Journey />
        <Steps />
        <Reviews />
        <CTA onApply={() => openApply()} />
        <FAQ />
        <Visit />
      </main>
      )}

      <Footer />

      <ContactBar onCallback={openCallback} />
      <ApplyModal open={apply.open} course={apply.course} onClose={closeApply} lenisRef={lenisRef} />
      <CallbackModal
        open={callback.open}
        course={callback.course}
        onOpen={openCallback}
        onClose={closeCallback}
        lenisRef={lenisRef}
        suppressed={apply.open}
      />
    </div>
  )
}
