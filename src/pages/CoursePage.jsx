import { useEffect } from 'react'
import Img from '../components/Img.jsx'
import CompareTable from '../components/CompareTable.jsx'
import { COURSES, FAQS, PARTNERS, STEPS, TEAM, TOPIC_DETAILS, TOPIC_NOTES } from '../data.js'
import { ACADEMY, directionsLink, hoursLine, prospectusLink, telLink, waLink } from '../config.js'
import { courseHref, follow, formatFee, homeHref } from '../courseRoute.js'
import { IconArrow, IconCheck, IconDoc, IconPhone, IconPin, WhatsAppGlyph } from '../components/icons.jsx'

// The callback popup offers the three skin-therapy levels as a single choice.
const LADDER = 'Skin Therapy & Aesthetics (Basic / Advanced / Advanced Plus)'

// General questions from the site FAQ that hold for every level, picked by
// their wording so a reordered FAQS list does not change which appear here.
const SHARED_FAQS = ['certified', 'hands-on', 'placement', 'prior experience']
  .map((word) => FAQS.find((f) => f.q.toLowerCase().includes(word)))
  .filter(Boolean)

/**
 * One course, in full, on a light page.
 *
 * Top to bottom: the facts a visitor decides on (fee, length, schedule), the
 * course at a glance, an overview beside its diagram, every module with a line
 * on what it covers, who it is for and what is included, EMI, where it leads,
 * how enrolment works, the trainers, certification, where the training happens,
 * the questions people ask about this level, and the next level up. The
 * sidebar keeps a callback button and the other courses in reach.
 *
 * Everything is read from data.js: the course's own entry, the shared topic
 * notes, and the site-wide trainers, steps, partners and FAQs. Nothing on the
 * page is written for one course only, so the three pages can never drift.
 *
 * No EMI figures are printed: the plan depends on the student, so a counsellor
 * sets it up.
 *
 * @param {object} course                        an entry from COURSES
 * @param {(course: string) => void} onApply     opens the application, prefilled
 * @param {(course: string) => void} onCallback  opens the callback form, prefilled
 */
export default function CoursePage({ course: c, onApply, onCallback }) {
  const name = `${c.tier}: ${c.title}`
  const fee = formatFee(c.fee)
  const hours = parseInt(c.duration, 10) * parseInt(c.daily, 10)
  const others = COURSES.filter((o) => o.fee && o.slug && o.slug !== c.slug)
  const next = c.next && COURSES.find((o) => o.slug === c.next)

  const faqs = [
    { q: `What is the fee for ${c.tier}?`, a: `${fee} for the full course. You can pay it in monthly EMIs; a counsellor will set up the plan with you.` },
    { q: 'How long does it run?', a: `${c.duration} at ${c.daily}: about ${hours.toLocaleString('en-IN')} hours of training in all.` },
    { q: 'Who can join?', a: `It is open to ${c.eligibility.replace(/ \/ /g, ', ')}.` },
    ...SHARED_FAQS,
  ]

  useEffect(() => {
    const before = document.title
    document.title = `${name} | ${ACADEMY.name}`
    return () => { document.title = before }
  }, [name])

  return (
    <main className="cpage">
      <header className="cpage__banner">
        <nav className="cpage__crumbs" aria-label="Breadcrumb">
          <a href={homeHref()} onClick={follow}>Home</a>
          <span aria-hidden="true">/</span>
          <a href={`${homeHref()}#courses`}>Courses</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{c.tier}</span>
        </nav>
        <h1>{name}</h1>
      </header>

      <div className="cpage__wrap">
        <article className="cpage__main">
          <div className="cpage__photo">
            <Img name={c.img} alt={c.imgAlt} eager sizes="(min-width: 980px) 760px, 100vw" />
            <span className="cpage__badge">{c.category}</span>
          </div>

          <dl className="cpage__facts">
            <div><dt>Category</dt><dd>{c.category}</dd></div>
            <div><dt>Duration</dt><dd>{c.duration}</dd></div>
            <div><dt>Schedule</dt><dd>{c.daily}</dd></div>
            <div><dt>Fee</dt><dd className="cpage__fee">{fee}</dd></div>
          </dl>

          <div className="cpage__actions">
            <button className="btn-primary" onClick={() => onApply(name)}>
              Enroll now <IconArrow size={16} />
            </button>
            <a className="btn-ghost" href={prospectusLink} target="_blank" rel="noopener noreferrer">
              <IconDoc size={16} /> Get the brochure
            </a>
          </div>

          <ul className="cpage__glance">
            <li><strong>{hours.toLocaleString('en-IN')} hours</strong><span>of training</span></li>
            {c.handsOn && <li><strong>{c.handsOn}</strong><span>supervised hands-on</span></li>}
            <li><strong>{c.awardShort || c.award}</strong><span>{c.awardNote || 'on completion'}</span></li>
            <li><strong>Small batches</strong><span>time on the bed for everyone</span></li>
          </ul>

          <section className={`cpage__block cpage__overview${c.diagram ? ' has-diagram' : ''}`}>
            <div>
              <h2>Overview</h2>
              <p>{c.summary}</p>
              {c.overview?.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            {c.diagram && (
              <figure className="cpage__diagram">
                <Img name={c.diagram} alt="Illustration of the visible signs of ageing on a face, labelled by zone" sizes="(min-width: 980px) 300px, 90vw" />
                {c.diagramCaption && <figcaption>{c.diagramCaption}</figcaption>}
              </figure>
            )}
          </section>

          <section className="cpage__block">
            <h2>Module by module</h2>
            <p className="cpage__hint">Tap a module to see what it covers in full.</p>
            <ol className="cpage__modules">
              {c.topics.map((t, i) => {
                const num = <span className="cpage__modnum">{String(i + 1).padStart(2, '0')}</span>
                const head = (
                  <div className="cpage__modhead">
                    <strong>{t}</strong>
                    {TOPIC_NOTES[t] && <p>{TOPIC_NOTES[t]}</p>}
                  </div>
                )
                const d = TOPIC_DETAILS[t]
                if (!d) return <li key={t} className="cpage__mod cpage__mod--plain">{num}{head}</li>
                // a native disclosure: keyboard, screen readers and find-in-page all work
                return (
                  <li key={t} className="cpage__mod">
                    <details>
                      <summary>{num}{head}<span className="cpage__modsign" aria-hidden="true" /></summary>
                      <div className="cpage__moddetail">
                        <h4>What you learn</h4>
                        <ul>{d.learn.map((x) => <li key={x}>{x}</li>)}</ul>
                        <p className="cpage__modpractice"><span>In the clinic</span>{d.practice}</p>
                      </div>
                    </details>
                  </li>
                )
              })}
            </ol>
          </section>

          <section className="cpage__block">
            <h2>Compare the levels</h2>
            <div className="cpage__tablewrap" data-lenis-prevent>
              <CompareTable current={c.slug} />
            </div>
          </section>

          <section className="cpage__duo">
            <div>
              <h3>Who it&apos;s for</h3>
              {c.idealFor && (
                <ul className="cpage__ticks">
                  {c.idealFor.map((x) => <li key={x}><span className="cpage__tick"><IconCheck size={12} /></span>{x}</li>)}
                </ul>
              )}
              <p className="cpage__elig"><span>Eligibility</span>{c.eligibility}</p>
            </div>
            <div>
              <h3>What&apos;s included</h3>
              <ul className="cpage__ticks">
                {(c.included || [c.award]).map((x) => <li key={x}><span className="cpage__tick"><IconCheck size={12} /></span>{x}</li>)}
              </ul>
            </div>
          </section>

          <section className="cpage__emi">
            <div>
              <h2>Pay in easy EMIs</h2>
              <p>Spread the {fee} fee over monthly instalments. A counsellor will set up the plan that suits you.</p>
            </div>
            <button className="btn-dark" onClick={() => onCallback(LADDER)}>Ask about EMI</button>
          </section>

          {c.careers && (
            <section className="cpage__block">
              <h2>Where this takes you</h2>
              <ul className="cpage__careers">
                {c.careers.map(([title, text]) => (
                  <li key={title}><strong>{title}</strong><span>{text}</span></li>
                ))}
              </ul>
            </section>
          )}

          <section className="cpage__block">
            <h2>How enrolment works</h2>
            <ol className="cpage__steps">
              {STEPS.map((s) => (
                <li key={s.n}><span>{s.n}</span><strong>{s.title}</strong><p>{s.body}</p></li>
              ))}
            </ol>
          </section>

          <section className="cpage__block">
            <h2>Your trainers</h2>
            <ul className="cpage__team">
              {TEAM.map((t) => (
                <li key={t.name}>
                  <Img name={t.img} alt={t.name} sizes="120px" />
                  <strong>{t.name}</strong>
                  <span>{t.tag} · {t.years} years</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="cpage__block cpage__cert">
            <h2>Certified and recognised</h2>
            <p>You graduate with the <strong>{c.award}</strong>, from an academy accredited and certified with:</p>
            <ul className="cpage__logos">
              {PARTNERS.map((p) => (
                <li key={p.name}><Img name={`partners/${p.logo}`} alt={`${p.name}, ${p.note}`} sizes="110px" /></li>
              ))}
            </ul>
          </section>

          <section className="cpage__where">
            <div>
              <h2>Where you train</h2>
              <p>
                Inside {ACADEMY.clinic.name}, a working skin clinic in {ACADEMY.address.area}: the rooms you learn in are
                the rooms patients walk into.
              </p>
              <p className="cpage__addr"><IconPin size={16} /> {ACADEMY.address.line1}, {ACADEMY.address.line2}</p>
              <p className="cpage__hours">{hoursLine}</p>
            </div>
            <a className="btn-ghost" href={directionsLink} target="_blank" rel="noopener noreferrer">
              Get directions <IconArrow size={16} />
            </a>
          </section>

          <section className="cpage__block">
            <h2>Questions about {c.tier}</h2>
            <div className="cpage__faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {next && (
            <a className="cpage__next" href={courseHref(next.slug)} onClick={follow}>
              <Img name={next.img} alt="" sizes="160px" />
              <span>
                <small>Step up next</small>
                <strong>{next.tier}: {next.title}</strong>
                <em>{next.duration} · {formatFee(next.fee)}</em>
              </span>
              <IconArrow size={18} />
            </a>
          )}

          <section className="cpage__close">
            <h2>Ready to start?</h2>
            <p>Seats are limited in every batch.</p>
            <button className="btn-primary" onClick={() => onApply(name)}>
              Enroll in {c.tier} <IconArrow size={16} />
            </button>
          </section>
        </article>

        <aside className="cpage__side">
          <div className="cpage__card">
            <h3>Request a callback</h3>
            <p>Talk to a counsellor about the fee, EMI and the next batch.</p>
            <button className="btn-primary" onClick={() => onCallback(LADDER)}>
              <IconPhone size={16} /> Request a callback
            </button>
            <div className="cpage__reach">
              <a href={telLink}><IconPhone size={15} /> {ACADEMY.phoneDisplay}</a>
              <a href={waLink(`Hi ${ACADEMY.name}, I'd like to know more about ${name}.`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppGlyph size={16} /> WhatsApp us
              </a>
            </div>
          </div>

          {others.length > 0 && (
            <div className="cpage__card">
              <h3>Other courses</h3>
              <ul className="cpage__others">
                {others.map((o) => (
                  <li key={o.id}>
                    <a href={courseHref(o.slug)} onClick={follow}>
                      <Img name={o.img} alt="" sizes="72px" />
                      <span>
                        <strong>{o.tier}: {o.title}</strong>
                        <small>{o.duration} · {formatFee(o.fee)}</small>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
