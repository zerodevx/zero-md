import ZeroMdBase, { DEFAULT_HOST_CSS } from './zero-md-base.js'
import ZeroMd from './zero-md.js'

function register() {
  customElements.define('zero-md', ZeroMd)
}

if (
  document.head.querySelector(
    `script[src="${import.meta.url}"][type="module"],script[data-zero-md-register]`
  )
)
  register()

export { ZeroMdBase, DEFAULT_HOST_CSS, register }
export default ZeroMd
