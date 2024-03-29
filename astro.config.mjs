import { defineConfig } from 'astro/config'

// portも変えられる
// export default defineConfig({})

import react from '@astrojs/react'
import vue from '@astrojs/vue'
import svelte from '@astrojs/svelte'
export default defineConfig({
  server: {
    port: 3000,
  },
  integrations: [react(), vue(), svelte()],
})
