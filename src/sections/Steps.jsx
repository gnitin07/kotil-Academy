import { STEPS } from '../data.js'

/** Admissions — what actually happens between an enquiry and a certificate. */
export default function Steps() {
  return (
    <section className="steps" id="admissions">
      <div className="steps__inner">
        <div className="shead shead--mid">
          <span className="kicker">Admissions</span>
          <h2>Four steps from enquiry to <em>certified.</em></h2>
        </div>

        <ol className="steps__track">
          {STEPS.map((s) => (
            <li className="step" key={s.n}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
