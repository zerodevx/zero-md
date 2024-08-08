import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist/**', 'docs/**', 'temp/**', 'test-results/**'] },
  js.configs.recommended,
  prettier,
  {
    rules: {
      'no-tabs': 'error',
      'no-unexpected-multiline': 'error'
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        __VERSION__: true
      }
    }
  }
]
