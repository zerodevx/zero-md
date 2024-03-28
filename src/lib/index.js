import ZeroMdBase, { DEFAULT_HOST_CSS } from './zero-md-base.js'
import ZeroMd, { DEFAULT_CDN_URLS } from './zero-md.js'

/**
 * Synthetic sugar for `customElements.define('zero-md', Class)`
 * @param {CustomElementConstructor} Class
 */
function register(Class) {
  customElements.define('zero-md', Class)
}

if (new URL(import.meta.url).searchParams.has('register')) register(ZeroMd)

export { register, ZeroMdBase, DEFAULT_HOST_CSS, DEFAULT_CDN_URLS }
export default ZeroMd
