/**
 * raw-assets/brand/academy-logo.png -> public/media/brand/
 *
 *   npm run assets:logo
 *
 * Writes two variants of the official lockup, trimmed of its empty margin:
 *   logo-dark  — as supplied (black KOTIL, gold "Aesthetic Academy"), for the
 *                white nav
 *   logo-light — the black lettering turned white, gold left alone, for the
 *                black footer
 *
 * The recolour keys on saturation, not brightness: the black strokes and the
 * ® mark are near-grey, the gold rule and wordmark are strongly saturated, so
 * "low saturation -> white" separates them cleanly without touching the gold.
 */
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const SRC = 'raw-assets/brand/academy-logo.png'
const OUT = 'public/media/brand'
const WIDTHS = [480, 960] // nav/footer draw it ~140–260px wide; 960 covers 3x screens

await mkdir(OUT, { recursive: true })

const trimmed = await sharp(SRC).trim().png().toBuffer()
const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

const light = Buffer.from(data)
for (let i = 0; i < light.length; i += 4) {
  const r = light[i], g = light[i + 1], b = light[i + 2]
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const sat = max === 0 ? 0 : (max - min) / max
  if (sat < 0.35) { light[i] = 255; light[i + 1] = 255; light[i + 2] = 255 } // keep alpha: edges stay smooth
}
const lightPng = await sharp(light, { raw: info }).png().toBuffer()

for (const [name, buf] of [['logo-dark', trimmed], ['logo-light', lightPng]]) {
  for (const w of WIDTHS) {
    await sharp(buf).resize({ width: w, kernel: 'lanczos3' }).webp({ quality: 92, alphaQuality: 100 }).toFile(`${OUT}/${name}-${w}.webp`)
  }
  // PNG fallback at the small size, for the rare browser without webp
  await sharp(buf).resize({ width: WIDTHS[0] }).png({ compressionLevel: 9 }).toFile(`${OUT}/${name}-${WIDTHS[0]}.png`)
}

console.log(`logo ${info.width}x${info.height} (trimmed) -> ${OUT}`)
