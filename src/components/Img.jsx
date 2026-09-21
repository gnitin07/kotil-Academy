import MANIFEST from '../media-manifest.json'

/**
 * One <img> with a responsive srcset, built from the widths that
 * `npm run assets` actually wrote for that photo.
 *
 * The widths come from the manifest rather than from the caller on purpose.
 * The source photographs are small and uneven — a 900px request against a
 * 754px original is written at 754 — so any width guessed at the call site is
 * a filename that may not exist. Reading the manifest means the srcset can
 * only ever name files that do.
 *
 * Lazy by default; `eager` opts the first hero plate out, since that one is
 * the largest contentful paint and must not wait on the loader.
 *
 * @param {string} name   "<group>/<file>", e.g. "academy/signage"
 * @param {string} sizes  the CSS size this renders at, for the browser's picker
 */
export default function Img({ name, alt = '', sizes = '100vw', eager = false, className = '', ...rest }) {
  const widths = MANIFEST[name]

  if (!widths?.length) {
    // A missing entry means the asset build has not run, or the name is a typo.
    // Fail loudly in dev rather than rendering an invisible broken image.
    if (import.meta.env.DEV) console.warn(`<Img>: "${name}" is not in media-manifest.json`)
    return null
  }

  const largest = widths[widths.length - 1]
  // Vite's base ('./'), not a leading slash: the same dist has to work from a
  // domain root AND from a GitHub Pages project sub-path, where an absolute
  // /media/… resolves above the site and 404s.
  const base = `${import.meta.env.BASE_URL}media/${name}`

  return (
    <img
      className={className}
      src={`${base}-${largest}.webp`}
      srcSet={widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      {...rest}
    />
  )
}
