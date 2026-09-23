import Img from '../components/Img.jsx'

const MILESTONES = [
  'Trained 500+ professionals across India',
  'Conducted 100+ hands-on workshops',
  'Helped many launch their own aesthetic practices',
  'Built a community of confident, competent, ethical skin experts',
]

/**
 * Our Journey — the prospectus's closing story, and the section that earns the
 * numbers in the stats bar by explaining where they came from.
 *
 * The photograph beside it is deliberately faded back into the dark band: it
 * sets the room without competing with the milestones sitting over it.
 */
export default function Journey() {
  return (
    <section className="journey">
      <div className="journey__inner">
        <div className="journey__copy">
          <span className="kicker">Our journey</span>
          <h2>From vision to <em>transformation.</em></h2>
          <p>
            Our journey began with a single belief: that learning should be practical,
            precise and purpose-driven. Founded by experienced aesthetic professionals, we
            saw a gap in hands-on training in clinical aesthetics: growing demand, and too
            few genuinely skilled practitioners.
          </p>
          <p>
            So we took a bold step: to build an academy where learning is real, training is
            guided, and confidence is built through action.
          </p>

          <ul className="journey__list">
            {MILESTONES.map((m) => (
              <li className="journey__milestone" key={m}>
                <span className="journey__dot" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>

          <p className="journey__close">
            What started as a classroom is now a movement. From learners to leaders. This is
            the Kotil Aesthetic Academy journey, and you are now part of it.
          </p>
        </div>

        <figure className="journey__photo">
          <Img
            name="gallery/students"
            alt="Kotil Aesthetic Academy students with their trainer"
            sizes="(min-width: 960px) 42vw, 100vw"
          />
          <figcaption className="journey__stat">
            <strong>500+</strong>
            <span>professionals trained since day one</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
