/**
 * raw-assets/ -> public/media/ + src/media-manifest.json
 *
 * The source photographs come out of the academy's own prospectus PDF and its
 * Instagram creatives, so they arrive small (650–1280px). Nothing here is
 * upscaled past its source, except the hero plates, which sit behind a dark
 * scrim where a gentle lanczos enlargement is invisible and a soft 650px photo
 * stretched by the browser is not.
 *
 *   npm run assets
 *
 * Every file is named for the width it ACTUALLY is, not the width that was
 * asked for — a 754px source capped from a 900px request is written as
 * `-754.webp`. The manifest records those real widths so <Img> can build a
 * truthful srcset; it is what stops the component guessing at filenames that
 * were never written.
 *
 * Output and manifest are committed, so a plain `npm install && npm run build`
 * never needs sharp or the raw files.
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const RAW = 'raw-assets'
const OUT = 'public/media'
const MANIFEST = 'src/media-manifest.json'

/** requested widths per group; `upscale` allows enlarging past the source */
const GROUPS = {
  // hero plates come from the academy's full-resolution banner shoot, so they
  // are only ever scaled DOWN; 600 is the phone size, 2400 covers 4K at 1x
  hero: { widths: [2400, 1600, 900, 600], upscale: false },
  academy: { widths: [900, 520], upscale: false },
  // the recent batch photos and the reel poster — large enough to anchor the
  // campus collage, so they get a wider top size than the prospectus shots
  gallery: { widths: [1400, 800, 480], upscale: false },
  treatments: { widths: [900, 520], upscale: false },
  // alpha: the trainer portraits are cut-outs, so the card's tinted backdrop
  // shows through instead of a flattened white box
  team: { widths: [560, 320], upscale: false, alpha: true },
  // the co-founder's cut-out from the prospectus welcome page (transparent)
  founder: { widths: [900, 520], upscale: false, alpha: true },
  posters: { widths: [1000, 560], upscale: false },
  partners: { widths: [null], upscale: false, alpha: true },
}

const manifest = {}

for (const [group, cfg] of Object.entries(GROUPS)) {
  const dir = path.join(RAW, group)
  if (!existsSync(dir)) continue
  await mkdir(path.join(OUT, group), { recursive: true })

  for (const file of (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    const name = path.parse(file).name
    const src = path.join(dir, file)
    const meta = await sharp(src).metadata()

    // Resolve every request to a real width, then drop duplicates — two
    // requests above the source size would otherwise write the same file twice
    // and put the same width in the srcset twice.
    const real = [...new Set(
      cfg.widths.map((want) => (want == null || !cfg.upscale ? Math.min(want ?? meta.width, meta.width) : want)),
    )].sort((a, b) => a - b)

    for (const width of real) {
      let pipe = sharp(src).resize({ width, kernel: 'lanczos3', withoutEnlargement: false })
      if (cfg.sharpen && width > meta.width) pipe = pipe.sharpen({ sigma: 0.8 })
      if (!cfg.alpha) pipe = pipe.flatten({ background: '#ffffff' })
      await pipe.webp({ quality: cfg.alpha ? 90 : 82, effort: 5 }).toFile(path.join(OUT, group, `${name}-${width}.webp`))
    }

    manifest[`${group}/${name}`] = real
    console.log(`${group}/${name}  ${meta.width}x${meta.height} -> ${real.join(', ')}`)
  }
}

// ---- social share image ----------------------------------------------------
// Built from the classroom photo rather than shipped by hand, so it can never
// drift from the rest of the media set.
const ogSrc = path.join(RAW, 'hero', 'classroom.jpg')
if (existsSync(ogSrc)) {
  await sharp(ogSrc)
    .resize(1200, 630, { fit: 'cover', position: 'attention', kernel: 'lanczos3' })
    .modulate({ brightness: 0.86 })
    .jpeg({ quality: 84 })
    .toFile('public/og.jpg')
  console.log('og.jpg 1200x630')
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\n${Object.keys(manifest).length} images written to ${OUT}`)
