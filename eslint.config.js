import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        __VERSION__: true
      }
    },
    rules: {
      'no-tabs': 'error',
      'no-unexpected-multiline': 'error'
    }
  },
  { ignores: ['dist/', 'docs/', 'test-results/', 'temp/'] }
])
