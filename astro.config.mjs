import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

// portも変えられる
// export default defineConfig({ server: { port: 3000 } })

// pnpm astro add nodeすると、SSRの設定が追加される
export default defineConfig({
  server: {
    port: 3000,
  },
  output: 'server',
  adapter: node({
    mode: 'standalone', // standalone, middleware
  }),
})
