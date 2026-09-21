import { STATS } from '../data.js'
import { STAT_ICONS } from '../components/icons.jsx'

/** The four headline numbers, straight from the prospectus. */
export default function Stats() {
  return (
    <section className="stats">
      <div className="stats__grid">
        {STATS.map((s) => (
          <article className="stat" key={s.label}>
            <span className="stat__ico">{STAT_ICONS[s.icon]}</span>
            <div>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
