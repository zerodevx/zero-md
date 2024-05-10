import ZeroMdBase from './zero-md-base.js'
import ZeroMd from './zero-md.js'
import { DEFAULT_HOST_CSS, DEFAULT_STYLESHEETS, DEFAULT_LIBRARIES } from './const.js'

if (new URL(import.meta.url).searchParams.has('register')) {
  customElements.define('zero-md', ZeroMd)
}

export { ZeroMdBase, DEFAULT_HOST_CSS, DEFAULT_STYLESHEETS, DEFAULT_LIBRARIES }
export default ZeroMd
