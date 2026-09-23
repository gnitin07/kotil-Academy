import { useCallback, useEffect, useRef, useState } from 'react'
import Img from '../components/Img.jsx'
import { TOUR } from '../data.js'
import { ACADEMY, enquireLink } from '../config.js'
import { useLockScroll } from '../useLockScroll.js'
import { IconArrow } from '../components/icons.jsx'

const BASE = import.meta.env.BASE_URL

/**
 * "Take a look inside" — a photo collage of the campus and its batches.
 *
 * Framed prints, each knocked a degree or so off straight, laid on a dense
 * grid whose tile footprints (see TOUR in data.js) add up to whole rows at
 * both two and four columns, so it never leaves a hole.
 *
 * One tile is the class reel: a 3.6s silent loop of live footage plays in
 * place, and tapping it opens the full 25s reel with sound. The loop only runs
 * while the tile is on screen — a video decoding off-screen is battery spent on
 * nothing.
 */
export default function Tour({ lenisRef }) {
  const [reelOpen, setReelOpen] = useState(false)
  const closeReel = useCallback(() => setReelOpen(false), [])
  useLockScroll(reelOpen, lenisRef, closeReel)

  return (
    <section className="tour" id="tour">
      <div className="shead shead--mid">
        <span className="kicker">Take a look inside</span>
        <h2>A short tour of the <em>training floor</em></h2>
        <p>
          We train inside {ACADEMY.clinic.name}, a working clinic in Preet Vihar, so the
          rooms you learn in are the rooms patients walk into.
        </p>
      </div>

      <div className="collage">
        {TOUR.map((t, n) =>
          t.video ? (
            <ReelTile key="reel" cap={t.cap} shape={t.shape} onOpen={() => setReelOpen(true)} />
          ) : (
            <figure className={`ctile ctile--${t.shape || 'one'}`} key={t.img} style={{ '--tilt': `${TILTS[n % TILTS.length]}deg` }}>
              <Img
                name={t.img}
                alt={t.alt}
                sizes={t.shape === 'hero' ? '(min-width: 600px) 50vw, 100vw' : '(min-width: 600px) 25vw, 50vw'}
              />
              <figcaption>{t.cap}</figcaption>
            </figure>
          ),
        )}

        {/* the sticker — a bit of print-shop fun, and the number that matters */}
        <div className="collage__sticker" aria-hidden="true">
          <strong>500+</strong>
          <span>trained</span>
        </div>
      </div>

      <div className="tour__foot">
        <a className="btn-ghost" href={enquireLink} target="_blank" rel="noopener noreferrer">
          Book a campus visit <IconArrow size={16} />
        </a>
      </div>

      {reelOpen && (
        <div className="reelbox" role="dialog" aria-modal="true" aria-label="Class reel" onClick={closeReel}>
          <button className="reelbox__close" aria-label="Close" onClick={closeReel}>×</button>
          <video
            className="reelbox__video"
            src={`${BASE}media/video/reel.mp4`}
            poster={`${BASE}media/gallery/reel-poster-480.webp`}
            controls autoPlay playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

// Small, alternating tilts. Deterministic, so the layout never shuffles
// between renders the way Math.random() would.
const TILTS = [-1.4, 1.1, -0.6, 1.6, -1.2, 0.8, -1.7, 1.3, -0.9, 0.5, -1.1, 1.5, -0.4]

function ReelTile({ cap, shape, onOpen }) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {}) // autoplay can still be refused; the poster stands in
      else v.pause()
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <button className={`ctile ctile--${shape} ctile--reel`} style={{ '--tilt': '1.2deg' }} onClick={onOpen} aria-label="Play the class reel with sound">
      <video
        ref={ref}
        src={`${BASE}media/video/reel-loop.mp4`}
        poster={`${BASE}media/gallery/reel-poster-480.webp`}
        muted loop playsInline preload="metadata"
        aria-hidden="true"
      />
      <span className="ctile__play" aria-hidden="true">▶</span>
      <span className="ctile__cap">{cap}</span>
    </button>
  )
}
