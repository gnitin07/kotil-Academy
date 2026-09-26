/**
 * raw-assets/brand/academy-logo.png -> public/favicon.png, public/apple-touch-icon.png
 *
 *   npm run assets:favicon
 *
 * The academy's "KA" monogram, in the same hand as the clinic's mark
 * (kotilskinscience.com runs the serif K on its own). Both letters are cut
 * straight out of the official lockup so they match the logo exactly: the black
 * display K from "KOTIL" and the gold A from "Aesthetic".
 *
 * Three things a favicon needs that a logo does not:
 *
 *  - It has to fill its tile. A square icon holding two letters side by side
 *    gives each of them barely half the height the clinic's single K gets, so
 *    every pixel of margin is one the letters cannot use. The A is nested into
 *    the K's open lower right rather than set beside it, which buys back width.
 *  - The A has to carry weight. The lockup sets it at text size, where it is
 *    almost all hairline, and a hairline is gone by 16px. `fatten` below
 *    thickens it to sit beside the K without redrawing it.
 *  - It gets looked at around 16 and 32 pixels, not at 192. Check any change to
 *    the numbers below at that size, not on the file itself.
 */
import sharp from 'sharp'

const SRC = 'raw-assets/brand/academy-logo.png'
// Both measured off the artwork by scanning for gaps between glyphs, rather
// than eyeballed: the A sits in a run of text, and a box guessed a little wide
// catches the rule before it and the "e" after.
const K_BOX = { left: 360, top: 660, width: 1280, height: 1500 } // "K" of KOTIL
const A_BOX = { left: 3080, top: 2334, width: 214, height: 230 } // "A" of Aesthetic

const CAP = 170        // working height of the K, in icon pixels
const A_SHARE = 0.82   // A height as a share of the K's
const NEST = 0.50      // how far the A tucks under the K, as a share of its width
const FATTEN = 1.5     // blur radius used to thicken the A's hairlines
const TILE = 192       // covers tabs, bookmarks and Android home screens
const PAD = 5

const GOLD = { r: 227, g: 181, b: 69 } // --gold-bright
const WHITE = '#ffffff'
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 }

// sharp runs trim() before extract() in one pipeline, so cut first, then trim.
const glyph = async (box) => sharp(await sharp(SRC).extract(box).png().toBuffer()).trim().png().toBuffer()

/**
 * Thicken a glyph by blurring its alpha and cutting it at a low threshold: the
 * blur bleeds the shape outwards, the threshold makes the bleed solid again.
 * Re-colours as it goes, since only the silhouette survives.
 */
async function fatten(buf, radius, colour) {
  const { width, height } = await sharp(buf).metadata()
  const pad = Math.ceil(radius * 2)
  const padded = await sharp(buf)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: CLEAR })
    .png().toBuffer()
  const alpha = await sharp(padded).ensureAlpha().extractChannel('alpha').blur(radius).threshold(100).toBuffer()
  return sharp({ create: { width: width + pad * 2, height: height + pad * 2, channels: 3, background: colour } })
    .joinChannel(alpha).png().toBuffer()
}

const k = await sharp(await glyph(K_BOX)).resize({ height: CAP, kernel: 'lanczos3' }).png().toBuffer()
const kMeta = await sharp(k).metadata()

const a = await sharp(
  await fatten(
    await sharp(await glyph(A_BOX)).resize({ height: Math.round(CAP * A_SHARE), kernel: 'lanczos3' }).png().toBuffer(),
    FATTEN,
    GOLD,
  ),
).trim().png().toBuffer()
const aMeta = await sharp(a).metadata()

// The K goes on top: where the two overlap, its swash should read as the one in
// front, the way the letters sit in the lockup.
const nest = Math.round(aMeta.width * NEST)
const mark = await sharp({
  create: { width: kMeta.width + aMeta.width - nest, height: CAP, channels: 4, background: CLEAR },
})
  .composite([
    { input: a, left: kMeta.width - nest, top: CAP - aMeta.height },
    { input: k, left: 0, top: 0 },
  ])
  .png()
  .toBuffer()

const fitted = await sharp(await sharp(mark).trim().png().toBuffer())
  .resize(TILE - PAD * 2, TILE - PAD * 2, { fit: 'contain', background: CLEAR })
  .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: CLEAR })
  .png()
  .toBuffer()

// Transparent, so the mark sits on whatever colour the tab happens to be.
const out = await sharp(fitted).png({ compressionLevel: 9 }).toFile('public/favicon.png')
console.log(`public/favicon.png          ${out.width}x${out.height}  ${(out.size / 1024).toFixed(1)}KB  (transparent)`)

// iOS ignores transparency on home-screen icons and composites onto black,
// which would hide the black K — so this one gets an opaque white plate.
const apple = await sharp(fitted)
  .resize(150, 150, { fit: 'contain', background: CLEAR })
  .extend({ top: 15, bottom: 15, left: 15, right: 15, background: WHITE })
  .flatten({ background: WHITE })
  .png({ compressionLevel: 9 })
  .toFile('public/apple-touch-icon.png')
console.log(`public/apple-touch-icon.png ${apple.width}x${apple.height}  ${(apple.size / 1024).toFixed(1)}KB  (white plate)`)
