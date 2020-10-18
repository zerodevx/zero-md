import { version } from '../package.json'

export class ZeroMd extends HTMLElement {
  get src () { return this.getAttribute('src') }
  set src (val) { this.reflect('src', val) }
  get manualRender () { return this.hasAttribute('manual-render') }
  set manualRender (val) { this.reflect('manual-render', val) }

  reflect (name, val) {
    if (val === false) {
      this.removeAttribute(name)
    } else {
      this.setAttribute(name, val === true ? '' : val)
    }
  }

  static get observedAttributes () {
    return ['src']
  }

  attributeChangedCallback (name, old, val) {
    if (name === 'src' && old !== null && old !== val && !this.manualRender) {
      this.render()
    }
  }

  constructor (defaults) {
    super()
    this.version = version
    this.config = {
      markedUrl: 'https://cdn.jsdelivr.net/gh/markedjs/marked@1/marked.min.js',
      prismUrl: [
        ['https://cdn.jsdelivr.net/gh/PrismJS/prism@1/components/prism-core.min.js', 'data-manual'],
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js'
      ],
      cssUrls: [
        'https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css',
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css'
      ],
      hostCss: ':host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}',
      ...defaults,
      ...window.ZeroMdConfig
    }
    this.root = this.hasAttribute('no-shadow') ? this : this.attachShadow({ mode: 'open' })
    if (!this.constructor.ready) {
      this.constructor.ready = Promise.all([
        !!window.marked || this.loadScript(this.config.markedUrl),
        !!window.Prism || this.loadScript(this.config.prismUrl)
      ])
    }
    this.ready = new Promise(resolve => {
      this._resolve = resolve
    })
    this.waitForReady().then(() => {
      this.fire('zero-md-ready')
    })
    if (!this.manualRender) {
      // Scroll to hash id after first render. However, `history.scrollRestoration` inteferes with this on refresh.
      // It's much better to use a `setTimeout` rather than to alter the browser's behaviour.
      this.render().then(() => setTimeout(() => this.goto(location.hash), 250))
    }
    this.clicked = this.clicked.bind(this)
    if (this.shadowRoot) {
      this.shadowRoot.addEventListener('click', this.clicked)
    }
  }

  connectedCallback () {
    this._resolve()
    delete this._resolve
  }

  disconnectedCallback () {
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this.clicked)
    }
  }

  waitForReady () {
    return Promise.all([this.constructor.ready, this.ready])
  }

  fire (name, detail = {}, composed = true) {
    if (detail.msg) {
      console.warn(detail.msg)
    }
    this.dispatchEvent(new CustomEvent(name, {
      detail: { node: this, ...detail },
      bubbles: true,
      composed
    }))
  }

  // Coerce anything into an array
  arrify (any) {
    return any ? (Array.isArray(any) ? any : [any]) : []
  }

  // Promisify an element's onload callback
  onload (node) {
    return new Promise((resolve, reject) => {
      node.onload = resolve
      node.onerror = err => reject(err.path ? err.path[0] : err.composedPath()[0])
    })
  }

  // Load a url or load (in order) an array of urls via <script> tags
  loadScript (urls) {
    urls = this.arrify(urls)
    return Promise.all(urls.map(item => {
      const [url, ...attrs] = this.arrify(item)
      const el = document.createElement('script')
      el.src = url
      el.async = false
      attrs.forEach(attr => el.setAttribute(attr, ''))
      return this.onload(document.head.appendChild(el))
    }))
  }

  // Scroll to selected element
  goto (sel) {
    if (sel) {
      const el = this.root.querySelector(sel)
      if (el) {
        el.scrollIntoView()
      }
    }
  }

  // Hijack same-doc anchor hash links
  clicked (ev) {
    if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.shiftKey || ev.defaultPrevented) {
      return
    }
    const a = ev.target.closest('a')
    if (a && a.hash && a.host === location.host && a.pathname === location.pathname) {
      this.goto(a.hash)
    }
  }

  clearDom () {
    const nodes = this.root.querySelectorAll('[class^=markdown]')
    nodes.forEach(n => n.remove())
  }

  // Converts HTML string into document fragment
  makeFrag (html) {
    const tpl = document.createElement('template')
    tpl.innerHTML = html
    return tpl.content
  }

  dedent (str) {
    str = str.replace(/^\n/, '')
    const match = str.match(/^\s+/)
    return match ? str.replace(new RegExp(`^${match[0]}`, 'gm'), '') : str
  }

  getBaseUrl (src) {
    const a = document.createElement('a')
    a.href = src
    return a.href.substring(0, a.href.lastIndexOf('/') + 1)
  }

  highlight (container) {
    const unhinted = container.querySelectorAll('pre>code:not([class*="language-"])')
    unhinted.forEach(n => {
      // Dead simple language detection :)
      const lang = n.innerText.match(/^\s*</) ? 'markup' : n.innerText.match(/^\s*(\$|#)/) ? 'bash' : 'js'
      n.classList.add(`language-${lang}`)
    })
    window.Prism.highlightAllUnder(container)
  }

  // Construct styles dom and return document fragment
  buildStyles () {
    const get = query => {
      const node = this.querySelector(query)
      return node ? node.innerHTML || ' ' : ''
    }
    const urls = this.arrify(this.config.cssUrls)
    const html = `<div class="markdown-styles"><style>${
      this.config.hostCss}</style>${
      get('template[data-merge="prepend"]')}${
      get('template:not([data-merge])') || urls.reduce((a, c) => `${a}<link rel="stylesheet" href="${c}">`, '')}${
      get('template[data-merge="append"]')}</div>`
    return this.makeFrag(html)
  }

  // Construct md nodes and return promise that resolves to doc frag
  async buildMd (opts = {}) {
    const src = async () => {
      if (!this.src) { return '' }
      const resp = await fetch(this.src)
      if (resp.ok) {
        const md = await resp.text()
        return window.marked(md, { baseUrl: this.getBaseUrl(this.src), ...opts })
      } else {
        this.fire('zero-md-error', { msg: `[zero-md] HTTP error ${resp.status} while fetching src`, status: resp.status, src: this.src })
        return ''
      }
    }
    const script = () => {
      const el = this.querySelector('script[type="text/markdown"]')
      if (!el) { return '' }
      const md = el.hasAttribute('data-dedent') ? this.dedent(el.text) : el.text
      return window.marked(md, opts)
    }
    const html = `<div class="markdown-body${
      opts.classes ? this.arrify(opts.classes).reduce((a, c) => `${a} ${c}`, ' ') : ''}">${
      await src() || script()}</div>`
    const frag = this.makeFrag(html)
    this.highlight(frag.firstElementChild)
    return frag
  }

  // Stamps a fragment into DOM
  async stampDom (frag) {
    const links = [...frag.querySelectorAll('link[rel="stylesheet"]')]
    this.root.appendChild(frag.firstElementChild)
    // Wrap all link elements with onload listener
    await Promise.all(links.map(l => this.onload(l))).catch(err => {
      this.fire('zero-md-error', { msg: '[zero-md] An external stylesheet failed to load', status: undefined, src: err.href })
    })
  }

  async render (opts = {}) {
    await this.waitForReady()
    this.clearDom()
    const css = this.buildStyles()
    const md = this.buildMd(opts)
    await this.stampDom(css)
    await this.stampDom(await md)
    this.fire('zero-md-rendered')
  }
}

customElements.define('zero-md', ZeroMd)
