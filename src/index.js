export class ZeroMd extends HTMLElement {
  get src() {
    return this.getAttribute('src')
  }

  set src(val) {
    this.reflect('src', val)
  }

  get manualRender() {
    return this.hasAttribute('manual-render')
  }

  set manualRender(val) {
    this.reflect('manual-render', val)
  }

  reflect(name, val) {
    if (val === false) {
      this.removeAttribute(name)
    } else {
      this.setAttribute(name, val === true ? '' : val)
    }
  }

  static get observedAttributes() {
    return ['src']
  }

  attributeChangedCallback(name, old, val) {
    if (name === 'src' && this.connected && !this.manualRender && val !== old) {
      this.render()
    }
  }

  constructor(defaults) {
    super()
    this.version = '$VERSION'
    this.config = {
      markedUrl: 'https://cdn.jsdelivr.net/gh/markedjs/marked@4/marked.min.js',
      prismUrl: [
        ['https://cdn.jsdelivr.net/gh/PrismJS/prism@1/prism.min.js', 'data-manual'],
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js'
      ],
      cssUrls: [
        'https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css',
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css'
      ],
      hostCss:
        ':host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}',
      ...defaults,
      ...window.ZeroMdConfig
    }
    this.root = this.hasAttribute('no-shadow') ? this : this.attachShadow({ mode: 'open' })
    this.root.prepend(
      ...this.makeNodes(`<div class="markdown-styles"></div><div class="markdown-body"></div>`)
    )
    if (!this.constructor.ready) {
      this.constructor.ready = Promise.all([
        !!window.marked || this.loadScript(this.config.markedUrl),
        !!window.Prism || this.loadScript(this.config.prismUrl)
      ])
    }
    this.clicked = this.clicked.bind(this)
    if (!this.manualRender) {
      // Scroll to hash id after first render. However, `history.scrollRestoration` inteferes with this
      // on refresh. It's much better to use a `setTimeout` rather than to alter the browser's behaviour.
      this.render().then(() => setTimeout(() => this.goto(location.hash), 250))
    }
    this.observer = new MutationObserver(() => {
      this.observeChanges()
      if (!this.manualRender) this.render()
    })
    this.observer.observe(this, { childList: true })
    this.observeChanges()
  }

  /**
   * Start observing changes, if not already so, in `template` and `script`.
   */
  observeChanges() {
    this.querySelectorAll('template,script[type="text/markdown"]').forEach((n) => {
      this.observer.observe(n.content || n, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      })
    })
  }

  connectedCallback() {
    this.connected = true
    this.fire('zero-md-connected', {}, { bubbles: false, composed: false })
    this.waitForReady().then(() => {
      this.fire('zero-md-ready')
    })
    if (this.shadowRoot) {
      this.shadowRoot.addEventListener('click', this.clicked)
    }
  }

  disconnectedCallback() {
    this.connected = false
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this.clicked)
    }
  }

  waitForReady() {
    const ready =
      this.connected ||
      new Promise((resolve) => {
        this.addEventListener('zero-md-connected', function handler() {
          this.removeEventListener('zero-md-connected', handler)
          resolve()
        })
      })
    return Promise.all([this.constructor.ready, ready])
  }

  fire(name, detail = {}, opts = { bubbles: true, composed: true }) {
    if (detail.msg) {
      console.warn(detail.msg)
    }
    this.dispatchEvent(
      new CustomEvent(name, {
        detail: { node: this, ...detail },
        ...opts
      })
    )
  }

  tick() {
    return new Promise((resolve) => requestAnimationFrame(resolve))
  }

  // Coerce anything into an array
  arrify(any) {
    return any ? (Array.isArray(any) ? any : [any]) : []
  }

  // Promisify an element's onload callback
  onload(node) {
    return new Promise((resolve, reject) => {
      node.onload = resolve
      node.onerror = (err) => reject(err.path ? err.path[0] : err.composedPath()[0])
    })
  }

  // Load a url or load (in order) an array of urls via <script> tags
  loadScript(urls) {
    return Promise.all(
      this.arrify(urls).map((item) => {
        const [url, ...attrs] = this.arrify(item)
        const el = document.createElement('script')
        el.src = url
        el.async = false
        attrs.forEach((attr) => el.setAttribute(attr, ''))
        return this.onload(document.head.appendChild(el))
      })
    )
  }

  // Scroll to selected element
  goto(sel) {
    let el
    try {
      el = this.root.querySelector(sel)
    } catch {}
    if (el) el.scrollIntoView()
  }

  // Hijack same-doc anchor hash links
  clicked(ev) {
    if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.shiftKey || ev.defaultPrevented) {
      return
    }
    const a = ev.target.closest('a')
    if (a && a.hash && a.host === location.host && a.pathname === location.pathname) {
      this.goto(a.hash)
    }
  }

  dedent(str) {
    str = str.replace(/^\n/, '')
    const match = str.match(/^\s+/)
    return match ? str.replace(new RegExp(`^${match[0]}`, 'gm'), '') : str
  }

  getBaseUrl(src) {
    const a = document.createElement('a')
    a.href = src
    return a.href.substring(0, a.href.lastIndexOf('/') + 1)
  }

  // Runs Prism highlight async; falls back to sync if Web Workers throw
  highlight(container) {
    return new Promise((resolve) => {
      const unhinted = container.querySelectorAll('pre>code:not([class*="language-"])')
      unhinted.forEach((n) => {
        // Dead simple language detection :)
        const lang = n.innerText.match(/^\s*</)
          ? 'markup'
          : n.innerText.match(/^\s*(\$|#)/)
            ? 'bash'
            : 'js'
        n.classList.add(`language-${lang}`)
      })
      try {
        window.Prism.highlightAllUnder(container, true, resolve())
      } catch {
        window.Prism.highlightAllUnder(container)
        resolve()
      }
    })
  }

  /**
   * Converts HTML string into HTMLCollection of nodes
   * @param {string} html
   * @returns {HTMLCollection}
   */
  makeNodes(html) {
    const tpl = document.createElement('template')
    tpl.innerHTML = html
    return tpl.content.children
  }

  /**
   * Constructs the styles dom and returns HTML string
   * @returns {string} `markdown-styles` string
   */
  buildStyles() {
    const get = (query) => {
      const node = this.querySelector(query)
      return node ? node.innerHTML || ' ' : ''
    }
    const urls = this.arrify(this.config.cssUrls)
    const html = `<style>${this.config.hostCss}</style>${get('template[data-merge="prepend"]')}${
      get('template:not([data-merge])') ||
      urls.reduce((a, c) => `${a}<link rel="stylesheet" href="${c}">`, '')
    }${get('template[data-merge="append"]')}`
    return html
  }

  /**
   * Constructs the markdown body nodes and returns HTML string
   * @param {*} opts Markedjs options
   * @returns {Promise<string>} `markdown-body` string
   */
  async buildMd(opts = {}) {
    const src = async () => {
      if (!this.src) return ''
      const resp = await fetch(this.src)
      if (resp.ok) {
        const md = await resp.text()
        return window.marked.parse(md, {
          baseUrl: this.getBaseUrl(this.src),
          ...opts
        })
      } else {
        this.fire('zero-md-error', {
          msg: `[zero-md] HTTP error ${resp.status} while fetching src`,
          status: resp.status,
          src: this.src
        })
        return ''
      }
    }
    const script = () => {
      const el = this.querySelector('script[type="text/markdown"]')
      if (!el) return ''
      const md = el.hasAttribute('data-dedent') ? this.dedent(el.text) : el.text
      return window.marked.parse(md, opts)
    }
    return (await src()) || script()
  }

  /**
   * Returns 32-bit DJB2a hash in base36
   * @param {string} str
   * @returns {string}
   */
  getHash(str) {
    let hash = 5381
    for (let index = 0; index < str.length; index++) {
      hash = ((hash << 5) + hash) ^ str.charCodeAt(index)
    }
    return (hash >>> 0).toString(36)
  }

  /**
   * Insert or replace styles node in root from a HTML string. If there are external stylesheet
   * links, wait for them to load.
   * @param {string} html styles string
   * @returns {Promise<boolean|undefined>} returns true if stamped
   */
  async stampStyles(html) {
    const hash = this.getHash(html)
    const target = this.root.querySelector('.markdown-styles')
    if (target.getAttribute('data-hash') !== hash) {
      target.setAttribute('data-hash', hash)
      const nodes = this.makeNodes(html)
      const links = [...nodes].filter(
        (i) => i.tagName === 'LINK' && i.getAttribute('rel') === 'stylesheet'
      )
      target.innerHTML = ''
      target.append(...nodes)
      await Promise.all(links.map((l) => this.onload(l))).catch((err) => {
        this.fire('zero-md-error', {
          msg: '[zero-md] An external stylesheet failed to load',
          status: undefined,
          src: err.href
        })
      })
      return true
    }
  }

  /**
   * Insert or replace HTML body string into DOM
   * @param {string} html markdown-body string
   * @param {string[]} [classes] list of classes to apply to `.markdown-body` wrapper
   * @returns {Promise<boolean|undefined>} returns true if stamped
   */
  async stampBody(html, classes) {
    const names = this.arrify(classes)
    const hash = this.getHash(html + JSON.stringify(names))
    const target = this.root.querySelector('.markdown-body')
    if (target.getAttribute('data-hash') !== hash) {
      target.setAttribute('data-hash', hash)
      names.unshift('markdown-body')
      target.setAttribute('class', names.join(' '))
      const nodes = this.makeNodes(html)
      target.innerHTML = ''
      target.append(...nodes)
      await this.highlight(target)
      return true
    }
  }

  async render(opts = {}) {
    await this.waitForReady()
    const pending = this.buildMd(opts)
    const styles = await this.stampStyles(this.buildStyles())
    await this.tick()
    const body = await this.stampBody(await pending, opts.classes)
    this.fire('zero-md-rendered', { node: this, stamped: { styles, body } })
  }
}

customElements.define('zero-md', ZeroMd)
