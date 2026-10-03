import { useRef } from 'react'
import Img from '../components/Img.jsx'
import { BATCH_PHOTOS } from '../data.js'

/**
 * Our batches: group photographs of people who have trained here, then the
 * batches at work on the training floor, labelled by city and, where it is
 * known, the year or what is happening in the frame.
 *
 * This is the proof section, so every photo in it is real. A swipeable strip
 * everywhere; on a desktop the arrows step it one card at a time.
 */
export default function Batches() {
  const row = useRef(null)

  const step = (dir) => {
    const el = row.current
    const card = el?.querySelector('.batch')
    if (!card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' })
  }

  return (
    <section className="batches">
      <div className="shead shead--mid">
        <span className="kicker">Our batches</span>
        <h2>The people who have <em>trained here.</em></h2>
      </div>

      <div className="batches__wrap">
        <div className="batches__row" ref={row} data-lenis-prevent>
          {BATCH_PHOTOS.map((b) => (
            <figure className="batch" key={b.img}>
              <Img name={b.img} alt={b.alt} sizes="(min-width: 980px) 30vw, 84vw" />
              <figcaption>
                <span className="batch__city">{b.city}</span>
                {b.year && <span className="batch__year">Batch of {b.year}</span>}
                {b.cap && <span className="batch__year">{b.cap}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
        <button className="batches__arrow batches__arrow--prev" aria-label="Previous photos" onClick={() => step(-1)}>‹</button>
        <button className="batches__arrow batches__arrow--next" aria-label="Next photos" onClick={() => step(1)}>›</button>
      </div>
    </section>
  )
}
