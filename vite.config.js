import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SLIDES } from './src/data.js'

/**
 * Preload the opening hero plate from the document head.
 *
 * The banner is rendered by React, so without this the browser cannot discover
 * the photograph until the app chunk has downloaded, parsed and mounted — and
 * that photograph is the page's largest contentful paint. The links below put
 * the request in flight with the very first bytes of HTML instead.
 *
 * Phones only, and deliberately: this is where the cost lands. The candidates
 * and sizes match the phone <source> in Hero exactly, so the tag that renders
 * later reuses the response rather than opening a second request. Desktop is
 * left alone — preloading both plates would mean any browser that ignored the
 * media query downloading two banners on a phone, which is the bill this is
 * meant to cut. Built from the manifest for the same reason <Img> is: it is
 * the only record of which widths were actually written.
 */
function heroPreload() {
  const srcSet = (name) => {
    const entry = JSON.parse(readFileSync('src/media-manifest.json', 'utf8'))[name]
    if (!entry) throw new Error(`heroPreload: "${name}" is not in media-manifest.json`)
    return entry.w.map((w) => `./media/${name}-${w}.webp ${w}w`).join(', ')
  }
  return {
    name: 'hero-preload',
    transformIndexHtml: () => [{
      tag: 'link',
      attrs: {
        rel: 'preload',
        as: 'image',
        fetchpriority: 'high',
        media: '(max-width: 719px)',
        imagesrcset: srcSet(SLIDES[0].mob),
        imagesizes: '100vw',
      },
      injectTo: 'head-prepend',
    }],
  }
}

export default defineConfig({
  plugins: [react(), heroPreload()],
  // Relative asset URLs, so the same `dist` works whether it is served from a
  // domain root (Vercel, Netlify) or a GitHub Pages project sub-path.
  base: './',
  server: { port: 5179 },
  build: {
    // Vercel and Pages both compress at the edge — measure what users download.
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // React and the motion libraries don't change between deploys, so
        // giving them their own hashed chunks lets a returning visitor pay for
        // the app chunk alone after a copy tweak.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          if (/node_modules[\\/](gsap|@gsap|lenis)[\\/]/.test(id)) return 'motion'
        },
      },
    },
  },
})
