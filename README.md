# Kotil Aesthetic Academy

Marketing site for **Kotil Aesthetic Academy** — hands-on aesthetic and cosmetology training in
Preet Vihar, East Delhi. Single-page React site, no backend.

Sibling projects: [`kotil skin`](../kotil%20skin) (the clinic) and
[`devriz healthcare`](../devriz%20healthcare). It opens the same way both of those do — a
sliding banner hero — but runs a lighter palette: white and warm grey carry the page, gold
does the pointing, and black is kept for two contrast bands and the footer.

---

## Stack

| | |
|---|---|
| Framework | React 18 |
| Build | Vite 5 |
| Motion | GSAP 3 + ScrollTrigger, Lenis (desktop only) |
| Styling | One plain CSS file with custom properties — no framework |
| Images | sharp, at build-asset time only |
| Backend | **None.** Enquiries hand off to WhatsApp. |

**Why no MERN backend.** The only thing the site needs to *do* is collect an enquiry, and the
academy already answers every enquiry on WhatsApp. The apply form composes a prefilled
WhatsApp message instead of POSTing anywhere, which means the whole site is a static build:
nothing to host, nothing to keep running, nothing to lose an enquiry to. If a real API is
wanted later, `submit()` in `src/components/ApplyModal.jsx` is the only function that changes —
the form state is already the shape an endpoint would want.

## Running it

```bash
npm install
npm run dev      # http://localhost:5179
npm run build    # -> dist/
npm run preview  # serve the built output
npm run assets   # raw-assets/ -> public/media/ (only after changing photos)
```

Node 18+.

## Project layout

```
index.html               shell: meta, Open Graph, JSON-LD (school + the 3 courses)
vite.config.js           base './' so dist works from a domain root OR a Pages sub-path
vercel.json              caching + security headers
scripts/build-assets.mjs raw-assets/ -> public/media/ + src/media-manifest.json
raw-assets/              full-size source photos, grouped (hero, academy, team, …)
public/media/            the webp set the site actually serves — committed
src/
  config.js              ← business facts: phone, email, address, hours, socials
  data.js                ← all repeating copy: slides, courses, trainers, reviews, FAQs
  media-manifest.json    generated — which widths exist for each photo
  index.css              the whole stylesheet, mobile-first, ordered like the page
  animations.js          every scroll animation, in one place
  App.jsx                composes the sections
  components/            Header, Wordmark, Img, ApplyModal, FloatingWhatsApp, icons
  sections/              Hero, Stats, Founder, About, Courses, Diploma, Tour, Why, Team,
                         Journey, Steps, Reviews, Posters, CTA, FAQ, Visit, Footer
```

### The two files you will actually edit

**`src/config.js`** — phone number, email, address, opening hours, social links. Every
`tel:`, `mailto:`, WhatsApp deep link, map embed and "get directions" button on the site is
derived from it, so a number changes in one place.

**`src/data.js`** — hero slides, course levels and their syllabi, the diploma modules, the
campus tour, trainers, student reviews, FAQs, admission steps.

## Images

Every photograph on the site is the academy's own, pulled out of two places it already
publishes:

- **The prospectus PDF** — 32 embedded JPEGs: the clinic frontage, reception, lecture room,
  treatment rooms, live demos, batch photos, trainer portraits and treatment close-ups.
- **The Instagram campaign posters** — reproduced at their native square crop in the
  "From our feed" strip, and the diploma poster beside its course copy. The accreditation
  marks (MSME, Skill India, NSDC, Startup India, Devriz Healthcare) were lifted from the
  academy's own "Our Certification & Training Partners" lockup on those posters, so the site
  claims exactly what the printed material claims.

- **Recent batch photos and the class reel** — the two group shots and the 25s promo reel
  from WhatsApp, which anchor the campus collage (`raw-assets/gallery/`).

`npm run assets` resizes everything into `public/media/` as webp and writes
`src/media-manifest.json`. **The manifest is what `<Img>` reads to build its srcset.** That
indirection matters: the sources are small and uneven (650–1280px), so a 900px request
against a 754px original is written at 754. Without the manifest the component would guess
filenames that were never written — which is exactly how every photo 404'd the first time. Each
entry also records the source's aspect ratio, which is where the `width`/`height` on every tag
comes from, so the browser reserves a photo's box before the file lands.

**High-resolution banner shoot.** The four hero slides (classroom, hands-on practical,
students, campus frontage) use the academy's own full-resolution photos (6000px originals, stored
at 2400px in `raw-assets/hero/`), served at 600 / 900 / 1600 / 2400px so phones download the
small one. The same shots replace their low-resolution prospectus twins elsewhere: the collage's
"The entrance" and "Practical round", the "hands-on" Why card, and the Journey photo (the five
students). Each slide also names a 9:16 cut of the same scene in `raw-assets/hero-mobile/`, which
a `<picture>` swaps in below 720px so a phone gets a portrait frame rather than a landscape one
cropped down the middle.

**What the banner costs on a phone.** Only the opening plate loads with the page: it is preloaded
from the document head (see `heroPreload` in `vite.config.js`, built from the manifest) and
fetched at high priority, so it is on its way before React has mounted and can discover it. The
other three mount once the page has finished loading, and autoplay waits for them. Loading all
four at once was close to a megabyte of images competing for one connection, which by itself cost
several seconds of largest-contentful-paint — 68 on PageSpeed mobile against 98 on desktop.
Google's font stylesheet is loaded the same way it always was but without blocking the first
paint (`media="print"`, promoted on load), since the page is legible in the fallback.

### Video

The reel lives in `public/media/video/` as two files, cut once with ffmpeg rather than by
`npm run assets`:

- `reel-loop.mp4` — 3.6s of live classroom footage (1.0–4.6s of the original), silent, played
  in place in the collage only while it is on screen.
- `reel.mp4` — the full 25s reel with sound, opened when the collage tile is tapped.

To re-cut from a new source (ffmpeg ships in the sibling `kotil skin` project as
`ffmpeg-static`):

```bash
ffmpeg -ss 1.0 -t 3.6 -i source.mp4 -an -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart public/media/video/reel-loop.mp4
ffmpeg -i source.mp4 -c:v libx264 -crf 25 -pix_fmt yuv420p -c:a aac -b:a 64k -movflags +faststart public/media/video/reel.mp4
```

### Hero banners are composed, not baked

Each hero slide is a photograph with its headline set in **HTML over a scrim**, not a flat
exported banner. A baked banner has to be redrawn per screen size and its text crops on a
phone. Here the photo crops and the words never do — which is the whole point.

## Deploying

**Vercel** — import the repo, framework preset *Vite*. `vercel.json` covers the rest.

**GitHub Pages** — enable Pages with source *GitHub Actions*; the workflow in
`.github/workflows/deploy-pages.yml` builds and publishes on every push to `main`.

`dist/` is ~6 MB (most of it responsive image sizes a visitor never downloads all of): ~3.3 MB of lazy-loaded webp photography, ~1.4 MB for the two reel cuts
(the 1 MB full reel only loads when someone taps to watch it), and the code
is ~105 KB gzipped, with React and GSAP in separately hashed chunks so a copy change doesn't
re-send them to returning visitors.

## Notes on content

- **Trainers (confirmed by the academy):** Cosmetologist → Reena ma'am, Head Trainer → Dev sir
  (Dev Singh, from the clinic signboard), Doctor → Ruby ma'am. Dev's and Ruby's photos are
  transparent cut-outs in `raw-assets/team/`. Still to confirm: Ruby ma'am's surname, and each
  card's years / students-trained figures, which were carried over from the prospectus's team
  page role-by-role. Reena ma'am's photo is only 265px (the prospectus copy) — a higher-resolution
  one would look sharper beside the other two.
- **Co-founder section:** Amy Aliya, Co-Founder, with the letter from the prospectus welcome
  page (tightened for the web) and that page's own cut-out portrait (`raw-assets/founder/`).
  On phones the letter collapses behind "Read the full letter"; on desktop it is always open.
- **Opening hours are a placeholder** — 10 AM–7 PM, closed Sundays, set in `config.js`. The
  prospectus doesn't state them.
- **Eligibility spelling.** The prospectus prints `MBBS/BDS/BMDS/BAMS/BUMP`; its own FAQ page
  spells the same list as `MBBS, BDS, BHMS, BAMS`. The site uses the corrected spelling
  (`MBBS / BDS / BHMS / BAMS / BUMS`) — worth confirming with the academy.
- **Accreditation logos are low-resolution**, because their only available source is the
  academy's own poster artwork. They are displayed small enough to hold up. If the original
  vector or PNG marks turn up, drop them into `raw-assets/partners/` and re-run
  `npm run assets`.
- Fees are not published anywhere on the site — they are shared on enquiry, which matches how
  the academy sells today.
