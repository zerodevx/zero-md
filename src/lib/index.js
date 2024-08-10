import ZeroMdBase from './zero-md-base.js'
import ZeroMd from './zero-md.js'
import { STYLES, LOADERS } from './presets.js'

if (new URL(import.meta.url).searchParams.has('register')) {
  customElements.define('zero-md', ZeroMd)
}

export { ZeroMdBase, STYLES, LOADERS }
export default ZeroMd
