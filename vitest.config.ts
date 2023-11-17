import { fileURLToPath } from 'node:url'

import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'istanbul' // or 'v8'
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      server: {
        deps: {
          inline: ['vuetify']
        }
      },
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
