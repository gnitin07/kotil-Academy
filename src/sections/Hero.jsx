import { useCallback, useEffect, useRef, useState } from 'react'
import Img, { srcSetFor } from '../components/Img.jsx'
import { PARTNERS, SLIDES } from '../data.js'
import { prospectusLink } from '../config.js'
import { IconArrow, IconDoc } from '../components/icons.jsx'

const AUTOPLAY_MS = 6000

/**
 * Sliding banner hero — the same opening move as the clinic and Devriz sites.
 *
 * Each slide is a real academy photograph with its headline set in HTML over a
 * scrim, rather than a flat exported banner image. That is deliberate: a baked
 * banner has to be redrawn for every screen size and its text crops on a phone,
 * which is exactly the failure this replaces. Here the photo crops and the
 * words never do.
 *
 * Autoplay pauses on hover and while the tab is hidden, and stops for good the
 * moment someone takes control with an arrow, a dot or a swipe.
 */
export default function Hero({ onApply }) {
  const [i, setI] = useState(0)
  const [held, setHeld] = useState(false)     // user took over — stop autoplaying
  const [paused, setPaused] = useState(false) // transient: hover / hidden tab
  const touch = useRef(null)

  const go = useCallback((n) => setI((n + SLIDES.length) % SLIDES.length), [])
  const take = useCallback((n) => { setHeld(true); go(n) }, [go])

  useEffect(() => {
    if (held || paused) return
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [held, paused])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touch.current == null) return
    const dx = e.changedTouches[0].clientX - touch.current
    if (Math.abs(dx) > 45) take(i + (dx < 0 ? 1 : -1))
    touch.current = null
  }

  const slide = SLIDES[i]

  return (
    <section className="hero" id="top">
      <div
        className={`hero__stage${held ? ' is-stopped' : ''}${paused ? ' is-paused' : ''}`}
        style={{ '--autoplay': `${AUTOPLAY_MS}ms` }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="Kotil Aesthetic Academy"
      >
        {SLIDES.map((s, n) => (
          <figure
            className={`hero__slide${n === i ? ' is-on' : ''}`}
            key={s.img}
            aria-hidden={n !== i}
          >
            {/* art direction: the 9:16 cut on phones, the 16:9 banner above
                720px. One <img>, so the browser downloads exactly one of them. */}
            <picture>
              <source media="(max-width: 719px)" srcSet={srcSetFor(s.mob)?.srcSet} sizes="100vw" />
              {/* every plate is eager: they are all inside the opening screen, and a
                  lazy one shows as a black slide the first time autoplay reaches it */}
              <Img name={s.img} sizes="100vw" alt={s.alt} eager className="hero__img" />
            </picture>
          </figure>
        ))}

        <div className="hero__scrim" aria-hidden="true" />

        {/* One copy block, re-keyed per slide so the text re-animates on change.
            Keeping it outside the slide loop means only one headline is ever in
            the accessibility tree. */}
        <div className="hero__copy" key={i}>
          <p className="hero__kicker">
            <span className="hero__count">{String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</span>
            {slide.kicker}
          </p>
          <h1 className="hero__title">{slide.title} <em>{slide.accent}</em></h1>
          <p className="hero__sub">{slide.sub}</p>
          <div className="hero__btns">
            <button className="btn-primary" onClick={onApply}>
              Apply for a seat <IconArrow size={16} />
            </button>
            <a className="btn-onphoto" href={prospectusLink} target="_blank" rel="noopener noreferrer">
              <IconDoc size={16} /> Prospectus
            </a>
          </div>
        </div>

        <button className="hero__arrow hero__arrow--prev" aria-label="Previous slide" onClick={() => take(i - 1)}>‹</button>
        <button className="hero__arrow hero__arrow--next" aria-label="Next slide" onClick={() => take(i + 1)}>›</button>

        <div className="hero__dots" role="tablist" aria-label="Choose slide">
          {SLIDES.map((s, n) => (
            <button
              key={n === i ? `on-${i}-${paused}` : s.img}
              role="tab"
              aria-selected={n === i}
              aria-label={s.kicker}
              className={`hero__dot${n === i ? ' is-on' : ''}`}
              onClick={() => take(n)}
            />
          ))}
        </div>
      </div>

      {/* Accreditation bar, tucked directly under the banner where it does the
          most work: the first question a student asks is whether the paper is
          worth anything. */}
      <div className="trustbar">
        <p className="trustbar__label">Accredited &amp; certified with</p>
        <ul className="trustbar__logos">
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <Img name={`partners/${p.logo}`} alt={`${p.name}, ${p.note}`} sizes="110px" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
