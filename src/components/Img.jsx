import MANIFEST from '../media-manifest.json'

const BASE = import.meta.env.BASE_URL

/**
 * What `npm run assets` actually wrote for a photo: a ready srcset, plus the
 * intrinsic box to declare on the tag.
 *
 * Exported so a <picture> can build an art-directed <source> from the same
 * manifest the <img> uses — see Hero, which swaps in 9:16 versions of the
 * banner shots below 720px — and so the build can preload the opening plate
 * with exactly the candidates the browser will later choose between.
 *
 * @param {string} name  "<group>/<file>", e.g. "hero-mobile/campus"
 */
export function srcSetFor(name) {
  const entry = MANIFEST[name]
  if (!entry?.w?.length) {
    if (import.meta.env.DEV) console.warn(`srcSetFor: "${name}" is not in media-manifest.json`)
    return null
  }
  const base = `${BASE}media/${name}`
  const top = entry.w[entry.w.length - 1]
  return {
    src: `${base}-${top}.webp`,
    srcSet: entry.w.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
    // The numbers are the largest rendition's, but only their ratio matters:
    // the browser scales the reserved box to whatever width the CSS gives it.
    width: top,
    height: Math.round(top / entry.ar),
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
 * Lazy by default; `eager` opts out for anything inside the opening screen.
 * `priority` goes further and tells the browser to fetch this one ahead of the
 * scripts and stylesheets queued alongside it — reserved for the hero plate,
 * which is the largest contentful paint and the one number a phone feels.
 *
 * @param {string} name   "<group>/<file>", e.g. "academy/signage"
 * @param {string} sizes  the CSS size this renders at, for the browser's picker
 */
export default function Img({
  name,
  alt = '',
  sizes = '100vw',
  eager = false,
  priority = false,
  className = '',
  ...rest
}) {
  const set = srcSetFor(name)
  if (!set) return null

  return (
    <img
      className={className}
      src={set.src}
      srcSet={set.srcSet}
      sizes={sizes}
      width={set.width}
      height={set.height}
      alt={alt}
      loading={eager || priority ? 'eager' : 'lazy'}
      // Not decoding="sync": forcing the decode onto the critical path delays
      // the frame the image was meant to speed up.
      decoding={eager || priority ? 'auto' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      {...rest}
    />
  )
}
