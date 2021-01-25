import replace from '@rollup/plugin-replace'
import pkg from './package.json'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const production = !process.env.ROLLUP_WATCH

const build = {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'es',
    file: 'dist/zero-md.min.js'
  },
  plugins: [
    replace({ $VERSION: pkg.version, delimiters: ['', ''] }),
    resolve(),
    terser()
  ]
}

const buildLegacy = {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'ZeroMd',
    file: 'dist/zero-md.legacy.min.js'
  },
  plugins: [
    replace({ $VERSION: pkg.version, delimiters: ['', ''] }),
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    terser()
  ]
}

const dev = {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'es',
    file: 'test/build/bundle.js'
  },
  plugins: [
    resolve(),
    !production && serve({
      port: 5000,
      contentBase: ['test', '']
    }),
    !production && livereload({
      watch: ['test', 'docs', 'dist'],
      extraExts: ['.md']
    })
  ],
  watch: {
    clearScreen: false
  }
}

export default production ? [build, buildLegacy] : dev
