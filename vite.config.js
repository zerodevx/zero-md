import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

const { version } = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8'))

export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib/index.js',
      name: 'zero-md',
      formats: ['es'],
      fileName: 'dist/index'
    },
    minify: false
  },
  publicDir: false,
  define: {
    __VERSION__: JSON.stringify(version)
  }
})
