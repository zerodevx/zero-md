import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'es',
    file: production ? 'dist/zero-md.min.js' : 'test/build/bundle.js'
  },
  plugins: [
    json(),
    !production && serve({
      port: 5000,
      contentBase: ['test', '']
    }),
    !production && livereload({
      watch: ['test', 'docs'],
      extraExts: ['.md']
    }),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}
