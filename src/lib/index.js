import ZeroMdBase, { DEFAULT_HOST_CSS } from './zero-md-base.js'
import ZeroMd, { DEFAULT_STYLESHEETS, DEFAULT_LIBRARIES } from './zero-md.js'

if (new URL(import.meta.url).searchParams.has('register')) customElements.define('zero-md', ZeroMd)

export { ZeroMdBase, DEFAULT_HOST_CSS, DEFAULT_STYLESHEETS, DEFAULT_LIBRARIES }
export default ZeroMd
