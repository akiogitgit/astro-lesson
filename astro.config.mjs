import { defineConfig } from 'astro/config'

// portも変えられる
// export default defineConfig({})

import react from '@astrojs/react'
export default defineConfig({
  server: {
    port: 3000,
  },
  integrations: [react()], // react導入
})
