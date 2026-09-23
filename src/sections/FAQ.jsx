import { FAQS } from '../data.js'

/** Frequently asked questions — native <details>, so it works before React hydrates. */
export default function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="faq__inner">
        <div className="shead shead--mid">
          <span className="kicker">Frequently asked questions</span>
          <h2>Everything students ask <em>before enrolling.</em></h2>
          <p>Still unsure? Call or WhatsApp us, a counsellor will walk you through it.</p>
        </div>

        <div className="faq__grid">
          {FAQS.map((f) => (
            <details className="faq__item" key={f.q}>
              <summary>{f.q}<span className="faq__icon" aria-hidden="true" /></summary>
              <div className="faq__ans"><p>{f.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
