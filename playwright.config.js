import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src',
  webServer: {
    command: 'npm run dev',
    url: `http://localhost:5173`,
    reuseExistingServer: true
  },
  use: {
    baseURL: 'http://localhost:5173'
  }
})
