const PILLARS = [
  {
    n: '01',
    title: 'Curriculum built by practitioners',
    body: 'Designed by working aesthetic professionals and delivered through hands-on sessions, real-time case studies and mentorship from industry leaders.',
  },
  {
    n: '02',
    title: 'International standards, personal teaching',
    body: 'Ten years of clinical expertise blended with small batches, so global protocol meets one-to-one correction on the treatment bed.',
  },
  {
    n: '03',
    title: 'The newest techniques, first',
    body: 'From Korean glass skin methods to anti-ageing solutions, what is current in the industry reaches our classroom while it is still current.',
  },
]

/** About Us — a dark band between two light ones, so the page breathes. */
export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="shead shead--mid">
          <span className="kicker">About the academy</span>
          <h2>Beauty is not about appearance. It is about <em>confidence, skill and transformation.</em></h2>
          <p>
            Kotil Aesthetic Academy was established to create industry-ready skincare
            professionals — offering world-class training in aesthetic sciences, skincare
            treatments and advanced cosmetology techniques. We don&apos;t just teach
            treatments. We build careers.
          </p>
        </div>

        <div className="about__pillars">
          {PILLARS.map((p) => (
            <article className="about__pillar" key={p.n}>
              <span className="about__num">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
