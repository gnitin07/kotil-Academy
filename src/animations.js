import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Every scroll animation on the site: Lenis smooth scroll, the navbar
 * solidify, and the section reveals.
 *
 * Animations are kept OUT of the markup on purpose: GSAP targets global class
 * selectors (.course, .why__card, …), so the section components stay pure JSX
 * and all timing lives in one auditable place. Same arrangement as the sibling
 * clinic site.
 *
 * The hero is the exception — its copy animates in CSS, keyed on the slide
 * index, because it has to re-run on every slide change rather than once on
 * load.
 *
 * @param {React.RefObject} root      scope element (everything renders inside it)
 * @param {React.RefObject} lenisRef  filled with the Lenis instance so modals can stop()/start() it
 */
export function useSiteAnimations(root, lenisRef) {
  useGSAP(() => {
    // ---- smooth scroll ----
    // Desktop-only enhancement. On touch devices Lenis fights the OS's own
    // momentum scrolling and makes the page feel heavy, so phones scroll
    // natively.
    const useSmoothScroll = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let lenis = null
    let raf = null

    if (useSmoothScroll) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
      lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)
      raf = (time) => { lenis.raf(time * 1000) }
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    // ---- navbar solidify ----
    ScrollTrigger.create({
      start: 'top -80', end: 99999,
      onUpdate: (self) => {
        document.querySelector('.nav')?.classList.toggle('scrolled', self.scroll() > 80)
      },
    })

    // ---- section reveals ----
    // Skips silently when nothing matches: handing GSAP a selector that hits
    // nothing costs a console warning per tween while animating zero elements.
    const revealBatch = (selector, trigger, vars = {}) => {
      if (!document.querySelector(selector)) return
      gsap.from(selector, {
        y: 34, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        // Hand the transform back to CSS when done. A finished from() otherwise
        // leaves an inline translate(0,0) that outranks every :hover transform,
        // so cards silently stop lifting — and the collage prints lose their tilt.
        clearProps: 'transform',
        scrollTrigger: { trigger: trigger || selector, start: 'top 86%' },
        ...vars,
      })
    }

    // Every section head shares one shape, so one call covers all of them.
    // `once per section` is what the trigger argument buys — batching them into
    // a single tween would start them all on whichever section scrolled in first.
    document.querySelectorAll('.shead').forEach((head) => {
      gsap.from(head.children, {
        y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: head, start: 'top 88%' },
      })
    })

    revealBatch('.trustbar__logos li', '.trustbar', { y: 16, duration: 0.6, stagger: 0.06 })
    revealBatch('.stat', '.stats__grid', { y: 20, duration: 0.6 })
    revealBatch('.about__pillar', '.about__pillars')
    revealBatch('.course', '.courses__grid', { y: 44 })
    revealBatch('.diploma__copy > *', '.diploma')
    revealBatch('.diploma__poster', '.diploma', { y: 44, duration: 0.9 })
    // collage prints drop onto the board one after another
    revealBatch('.ctile', '.collage', { y: 30, scale: 0.9, duration: 0.7, stagger: 0.05, ease: 'back.out(1.4)' })
    revealBatch('.collage__sticker', '.collage', { scale: 0, rotation: -40, y: 0, duration: 0.8, delay: 0.5, ease: 'back.out(2)' })
    revealBatch('.why__card', '.why__grid')

    // ---- trainers: fanned deck that rises from below (as on the Devriz site) ----
    // Rotation and offset are set here, not in CSS, so the scroll rise and the
    // fan live in one transform and never fight. Scrubbed, so the deck moves
    // with the scroll rather than playing once and forgetting it.
    const trainers = gsap.utils.toArray('.trainer')
    if (trainers.length) {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const rot = [-7, 0, 7]
        const yoff = [26, -14, 26]
        trainers.forEach((c, i) => gsap.set(c, { rotation: rot[i] ?? 0, y: yoff[i] ?? 0, transformOrigin: 'bottom center' }))
        gsap.from(trainers, {
          yPercent: 110, opacity: 0, stagger: 0.16, ease: 'power2.out',
          scrollTrigger: { trigger: '.team__deck', start: 'top 92%', end: 'top 40%', scrub: 1 },
        })
      })
      // phone: stacked, each eases up a short way as it enters, so nothing
      // travels far enough to be clipped
      mm.add('(max-width: 767px)', () => {
        const rot = [-2, 2, -2]
        trainers.forEach((c, i) => {
          gsap.set(c, { rotation: rot[i] ?? 0, y: 0, transformOrigin: 'bottom center' })
          gsap.from(c, {
            yPercent: 22, opacity: 0, ease: 'power2.out',
            scrollTrigger: { trigger: c, start: 'top 94%', end: 'top 64%', scrub: 1 },
          })
        })
      })
    }
    revealBatch('.journey__milestone', '.journey__list', { x: 26, y: 0, duration: 0.6 })
    revealBatch('.journey__photo', '.journey', { y: 40, duration: 0.9 })
    revealBatch('.step', '.steps__track')
    revealBatch('.review', '.reviews__track')
    revealBatch('.poster', '.posters__row', { y: 34 })
    revealBatch('.cta__inner > *', '.cta', { y: 28 })
    revealBatch('.faq__item', '.faq__grid', { y: 20, duration: 0.6, stagger: 0.05 })
    revealBatch('.visit__copy > *', '.visit')
    revealBatch('.visit__map', '.visit', { y: 40, duration: 0.9 })

    // ---- in-page anchors through Lenis ----
    // Native "#courses" jumps teleport the scroller, which reads as a broken
    // gap when smooth scrolling is on. Route every in-page link through Lenis.
    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      // Offset by the fixed header, or the jump parks the section's heading
      // underneath it. Measured rather than hard-coded: the nav shrinks once
      // `.scrolled` is on, and the utility strip is shorter on phones.
      // (Native scrollIntoView reads `scroll-margin-top` from the CSS instead.)
      const header = document.querySelector('.header')
      const offset = header ? -header.getBoundingClientRect().height - 8 : -1
      if (lenis) lenis.scrollTo(target, { offset, duration: 1.1 })
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', onAnchorClick)

    // Photographs and the webfont both land AFTER this effect runs and both
    // reflow the page, which leaves every trigger holding stale numbers.
    //
    // Do NOT wait on document.images as a whole: nearly every photo here is
    // loading="lazy", so it does not even start downloading until it nears the
    // viewport. Awaiting all of them means the promise settles somewhere near
    // the footer — or never — and the refresh that the sections above depend on
    // silently never runs.
    //
    // Instead: refresh once the fonts have swapped, then again on each image
    // that actually lands, debounced so a burst of them costs one reflow.
    const refresh = () => ScrollTrigger.refresh()
    let debounce = null
    const refreshSoon = () => { clearTimeout(debounce); debounce = setTimeout(refresh, 120) }

    // `load` does not bubble, so this listens in the capture phase.
    document.addEventListener('load', refreshSoon, true)

    // NB: refresh directly rather than deferring via requestAnimationFrame —
    // rAF never fires in a backgrounded tab, so the refresh would be lost.
    if (document.fonts) document.fonts.ready.then(() => { refresh(); setTimeout(refresh, 250) })
    if (document.readyState === 'complete') refresh()
    else window.addEventListener('load', refresh)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      document.removeEventListener('load', refreshSoon, true)
      window.removeEventListener('load', refresh)
      clearTimeout(debounce)
      if (raf) gsap.ticker.remove(raf)
      lenis?.destroy()
    }
  }, { scope: root })
}
