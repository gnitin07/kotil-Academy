import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
