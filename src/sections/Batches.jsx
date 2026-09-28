import Img from '../components/Img.jsx'
import { BATCH_PHOTOS } from '../data.js'

/**
 * Our batches: group photographs of people who have trained here, labelled by
 * city and, where it is known, the year.
 *
 * This is the proof section, so every photo in it is a real batch. A swipeable
 * strip on a phone, three across on a desktop.
 */
export default function Batches() {
  return (
    <section className="batches">
      <div className="shead shead--mid">
        <span className="kicker">Our batches</span>
        <h2>The people who have <em>trained here.</em></h2>
      </div>

      <div className="batches__row" data-lenis-prevent>
        {BATCH_PHOTOS.map((b) => (
          <figure className="batch" key={b.img}>
            <Img name={b.img} alt={b.alt} sizes="(min-width: 980px) 33vw, 84vw" />
            <figcaption>
              <span className="batch__city">{b.city}</span>
              {b.year && <span className="batch__year">Batch of {b.year}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
