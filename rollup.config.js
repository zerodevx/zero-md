import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import pkg from './package.json'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'es',
    file: production ? 'dist/index.min.js' : 'test/build/bundle.js'
  },
  plugins: [
    replace({
      $VERSION: pkg.version,
      delimiters: ['', '']
    }),
    resolve(),
    commonjs(),
    !production && serve({
      port: 5000,
      contentBase: ['test', 'node_modules']
    }),
    !production && livereload('test'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}
