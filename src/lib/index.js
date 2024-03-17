import ZeroMdBase, { DEFAULT_HOST_CSS } from './zero-md-base.js'
import ZeroMd from './zero-md.js'

if (
  document?.head?.querySelector(
    `script[src="${import.meta.url}"][type="module"],script[data-zero-md-register]`
  )
)
  customElements.define('zero-md', ZeroMd)

export { ZeroMdBase, DEFAULT_HOST_CSS }
export default ZeroMd
