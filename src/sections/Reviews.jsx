import { REVIEWS } from '../data.js'
import { IconQuote } from '../components/icons.jsx'

/**
 * Student voices.
 *
 * A horizontally scrollable track rather than a grid: four long testimonials
 * stacked in a grid push everything below them off the first screen, and on a
 * phone the swipe is the natural gesture anyway. Arrows page it for mouse users.
 */
export default function Reviews() {
  const nudge = (dir) =>
    document.querySelector('.reviews__track')?.scrollBy({ left: dir * 380, behavior: 'smooth' })

  return (
    <section className="reviews" id="reviews">
      <div className="shead shead--mid">
        <span className="kicker">Real practice. Real skills.</span>
        <h2>Practice makes perfect — and our students <em>prove it daily.</em></h2>
        <p>What graduates say about training at Kotil Aesthetic Academy.</p>
      </div>

      <div className="reviews__wrap">
        <button className="reviews__arrow reviews__arrow--prev" aria-label="Previous reviews" onClick={() => nudge(-1)}>‹</button>

        {/* data-lenis-prevent: let the browser own horizontal wheel/trackpad
            scrolling here instead of Lenis swallowing the event */}
        <div className="reviews__track" data-lenis-prevent>
          {REVIEWS.map((r) => (
            <article className="review" key={r.name}>
              <span className="review__quoteico" aria-hidden="true"><IconQuote size={20} /></span>
              <div className="review__stars" aria-label={`${r.stars} out of 5`}>{'★'.repeat(r.stars)}</div>
              <p className="review__text">{r.text}</p>
              <footer className="review__foot">
                <span className="review__avatar" aria-hidden="true">{r.name[0]}</span>
                <div>
                  <p className="review__name">{r.name}</p>
                  <p className="review__place">{r.place}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <button className="reviews__arrow reviews__arrow--next" aria-label="Next reviews" onClick={() => nudge(1)}>›</button>
      </div>
    </section>
  )
}
