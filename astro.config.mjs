import { defineConfig } from 'astro/config'

// https://astro.build/config
// portも変えられる
// export default defineConfig({})

export default defineConfig({ server: { port: 3000 } })
