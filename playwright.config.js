import { defineConfig } from '@playwright/test'

const dev = process.env.NODE_ENV === 'development'

export default defineConfig({
  testDir: './src',
  webServer: {
    command: 'npm run preview',
    url: `http://localhost:${dev ? '5' : '4'}137`,
    reuseExistingServer: dev
  }
})
