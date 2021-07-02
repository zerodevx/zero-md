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
    if (name === 'src' && this.connected && !this.manualRender && val !== old) {
      this.render()
    }
  }

  constructor (defaults) {
    super()
    this.version = '$VERSION'
    this.config = {
      markedUrl: 'https://cdn.jsdelivr.net/gh/markedjs/marked@2/marked.min.js',
      prismUrl: [
        ['https://cdn.jsdelivr.net/gh/PrismJS/prism@1/prism.min.js', 'data-manual'],
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
    this.clicked = this.clicked.bind(this)
    if (!this.manualRender) {
      // Scroll to hash id after first render. However, `history.scrollRestoration` inteferes with this on refresh.
      // It's much better to use a `setTimeout` rather than to alter the browser's behaviour.
      this.render().then(() => setTimeout(() => this.goto(location.hash), 250))
    }
    this._stampedBody = null
    this._stampedStyles = null
    this.observeChanges()
  }

  connectedCallback () {
    this.connected = true
    this.fire('zero-md-connected', {}, { bubbles: false, composed: false })
    this.waitForReady().then(() => {
      this.fire('zero-md-ready')
    })
    if (this.shadowRoot) {
      this.shadowRoot.addEventListener('click', this.clicked)
    }
  }

  disconnectedCallback () {
    this.connected = false
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this.clicked)
    }
  }

  waitForReady () {
    const ready = this.connected || new Promise(resolve => {
      this.addEventListener('zero-md-connected', function handler () {
        this.removeEventListener('zero-md-connected', handler)
        resolve()
      })
    })
    return Promise.all([this.constructor.ready, ready])
  }

  fire (name, detail = {}, opts = { bubbles: true, composed: true }) {
    if (detail.msg) {
      console.warn(detail.msg)
    }
    this.dispatchEvent(new CustomEvent(name, {
      detail: { node: this, ...detail },
      ...opts
    }))
  }

  tick () {
    return new Promise(resolve => requestAnimationFrame(resolve))
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
  goto (id) {
    if (id) {
      const el = this.root.getElementById(id.substring(1))
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

  // Starts observing for changes in styles or inline content to auto re-render
  observeChanges () {
    const stylesObserver = new MutationObserver(() => {
      if (!this.manualRender) { this.refreshStyles() }
    })
    const inlineContentObserver = new MutationObserver(() => {
      if (!this.manualRender) { this.refreshContent() }
    })
    const observeChildren = nodes => [...nodes].forEach(node => {
      const observeConfig = { childList: true, attributes: true, characterData: true, subtree: true }
      if (node.matches('script[type="text/markdown"]')) {
        inlineContentObserver.observe(node, observeConfig)
      } else if (node.tagName === 'TEMPLATE') {
        stylesObserver.observe(node.content, observeConfig)
      }
    })
    const rootObserver = new MutationObserver((mutations) => {
      const addedNodes = []
      const removedNodes = []
      mutations.forEach(mutation => {
        mutation.removedNodes.forEach(node => {
          if (addedNodes.includes(node)) {
            addedNodes.splice(addedNodes.indexOf(node), 1)
          } else {
            removedNodes.push(node)
          }
        })
        mutation.addedNodes.forEach(node => {
          if (removedNodes.includes(node)) {
            removedNodes.splice(removedNodes.indexOf(node), 1)
          } else {
            addedNodes.push(node)
          }
        })
      })
      if (!addedNodes.length && !removedNodes.length) { return }
      let contentChanged = false
      let stylesChanged = false;
      [...addedNodes, ...removedNodes].forEach(node => {
        if (contentChanged && stylesChanged) { return }
        if (node.matches('script[type="text/markdown"]') && !this.src) {
          contentChanged = true
        } else if (node.tagName === 'TEMPLATE') {
          stylesChanged = true
        }
      })
      observeChildren(addedNodes)
      if (contentChanged && !this.manualRender) { this.refreshContent() }
      if (stylesChanged && !this.manualRender) { this.refreshStyles() }
    })
    rootObserver.observe(this, { childList: true })
    observeChildren(this.children)
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
    const element = this.root.appendChild(frag.firstElementChild)
    // Wrap all link elements with onload listener
    await Promise.all(links.map(l => this.onload(l))).catch(err => {
      this.fire('zero-md-error', { msg: '[zero-md] An external stylesheet failed to load', status: undefined, src: err.href })
    })
    return element
  }

  async render (opts = {}) {
    await this.waitForReady()
    this.clearDom()
    const css = this.buildStyles()
    const md = this.buildMd(opts)
    this._stampedStyles = await this.stampDom(css)
    await this.tick()
    this._stampedBody = await this.stampDom(await md)
    this.fire('zero-md-rendered')
  }

  async refreshContent (opts = {}) {
    const md = await this.buildMd(opts)
    if (this._stampedBody) {
      const mdElement = md.firstElementChild
      this._stampedBody.replaceWith(mdElement)
      this._stampedBody = mdElement
    } else {
      this._stampedBody = await this.stampDom(md)
    }
    this.fire('zero-md-rendered', { partial: true, part: 'body' })
  }

  async refreshStyles () {
    const css = this.buildStyles()
    if (this._stampedStyles) {
      const cssElement = css.firstElementChild
      this._stampedStyles.replaceWith(cssElement)
      this._stampedStyles = cssElement
    } else {
      this._stampedStyles = await this.stampDom(css)
    }
    await this.tick()
    this.fire('zero-md-rendered', { partial: true, part: 'styles' })
  }
}

customElements.define('zero-md', ZeroMd)
