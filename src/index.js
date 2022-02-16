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
      markedUrl: 'https://cdn.jsdelivr.net/gh/markedjs/marked@2/marked.min.js',
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
    this.cache = {}
    this.root = this.hasAttribute('no-shadow') ? this : this.attachShadow({ mode: 'open' })
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
    this.observer = new MutationObserver(async () => {
      this.observeChanges()
      if (!this.manualRender) {
        await this.render()
      }
    })
    this.observeChanges()
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
  goto(id) {
    if (id) {
      const el = this.root.getElementById(id.substring(1))
      if (el) {
        el.scrollIntoView()
      }
    }
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

  // Converts HTML string into node
  makeNode(html) {
    const tpl = document.createElement('template')
    tpl.innerHTML = html
    return tpl.content.firstElementChild
  }

  // Construct styles dom and return HTML string
  buildStyles() {
    const get = (query) => {
      const node = this.querySelector(query)
      return node ? node.innerHTML || ' ' : ''
    }
    const urls = this.arrify(this.config.cssUrls)
    const html = `<div class="markdown-styles"><style>${this.config.hostCss}</style>${get(
      'template[data-merge="prepend"]'
    )}${
      get('template:not([data-merge])') ||
      urls.reduce((a, c) => `${a}<link rel="stylesheet" href="${c}">`, '')
    }${get('template[data-merge="append"]')}</div>`
    return html
  }

  // Construct md nodes and return HTML string
  async buildMd(opts = {}) {
    const src = async () => {
      if (!this.src) {
        return ''
      }
      const resp = await fetch(this.src)
      if (resp.ok) {
        const md = await resp.text()
        return window.marked(md, {
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
      if (!el) {
        return ''
      }
      const md = el.hasAttribute('data-dedent') ? this.dedent(el.text) : el.text
      return window.marked(md, opts)
    }
    const html = `<div class="markdown-body${
      opts.classes ? this.arrify(opts.classes).reduce((a, c) => `${a} ${c}`, ' ') : ''
    }">${(await src()) || script()}</div>`
    return html
  }

  // Insert or replace HTML styles string into DOM and wait for links to load
  async stampStyles(html) {
    const node = this.makeNode(html)
    const links = [...node.querySelectorAll('link[rel="stylesheet"]')]
    const target = [...this.root.children].find((n) => n.classList.contains('markdown-styles'))
    if (target) {
      target.replaceWith(node)
    } else {
      this.root.prepend(node)
    }
    await Promise.all(links.map((l) => this.onload(l))).catch((err) => {
      this.fire('zero-md-error', {
        msg: '[zero-md] An external stylesheet failed to load',
        status: undefined,
        src: err.href
      })
    })
  }

  // Insert or replace HTML body string into DOM and returns the node
  stampBody(html) {
    const node = this.makeNode(html)
    const target = [...this.root.children].find((n) => n.classList.contains('markdown-body'))
    if (target) {
      target.replaceWith(node)
    } else {
      this.root.append(node)
    }
    return node
  }

  // Start observing for changes in root, templates and scripts
  observeChanges() {
    this.observer.observe(this, { childList: true })
    this.querySelectorAll('template,script[type="text/markdown"]').forEach((n) => {
      this.observer.observe(n.content || n, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      })
    })
  }

  async render(opts = {}) {
    await this.waitForReady()
    const stamped = {}
    const pending = this.buildMd(opts)
    const css = this.buildStyles()
    if (css !== this.cache.styles) {
      this.cache.styles = css
      await this.stampStyles(css)
      stamped.styles = true
      await this.tick()
    }
    const md = await pending
    if (md !== this.cache.body) {
      this.cache.body = md
      const node = this.stampBody(md)
      stamped.body = true
      await this.highlight(node)
    }
    this.fire('zero-md-rendered', { stamped })
  }
}

customElements.define('zero-md', ZeroMd)
