import MANIFEST from '../media-manifest.json'

const BASE = import.meta.env.BASE_URL

/**
 * The widths `npm run assets` actually wrote for a photo, as a ready srcset.
 *
 * Exported so a <picture> can build an art-directed <source> from the same
 * manifest the <img> uses — see Hero, which swaps in 9:16 versions of the
 * banner shots below 720px.
 *
 * @param {string} name  "<group>/<file>", e.g. "hero-mobile/campus"
 */
export function srcSetFor(name) {
  const widths = MANIFEST[name]
  if (!widths?.length) {
    if (import.meta.env.DEV) console.warn(`srcSetFor: "${name}" is not in media-manifest.json`)
    return null
  }
  const base = `${BASE}media/${name}`
  return {
    src: `${base}-${widths[widths.length - 1]}.webp`,
    srcSet: widths.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
  }
}

/**
 * One <img> with a responsive srcset, built from the widths that
 * `npm run assets` actually wrote for that photo.
 *
 * The widths come from the manifest rather than from the caller on purpose.
 * The source photographs are uneven — a 900px request against a 754px original
 * is written at 754 — so any width guessed at the call site is a filename that
 * may not exist. Reading the manifest means the srcset can only ever name
 * files that do.
 *
 * Lazy by default; `eager` opts the first hero plate out, since that one is
 * the largest contentful paint and must not wait on the loader.
 *
 * @param {string} name   "<group>/<file>", e.g. "academy/signage"
 * @param {string} sizes  the CSS size this renders at, for the browser's picker
 */
export default function Img({ name, alt = '', sizes = '100vw', eager = false, className = '', ...rest }) {
  const set = srcSetFor(name)
  if (!set) return null

  return (
    <img
      className={className}
      src={set.src}
      srcSet={set.srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      {...rest}
    />
  )
}
