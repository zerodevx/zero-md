import IDfy from './utils/IDfy'

export class ZeroMd extends HTMLElement {
  get src() {
    return this.getAttribute('src')
  }

  get path() {
    return this.getAttribute('path')
  }

  get lang() {
    return (
      new URLSearchParams(window.location.search).get('lang') ||
      this.getAttribute('lang') ||
      this.config.lang
    )
  }

  get code() {
    return (
      new URLSearchParams(window.location.search).get('code') ||
      this.getAttribute('code') ||
      this.config.code
    )
  }

  set src(val) {
    this.reflect('src', val)
  }

  set path(val) {
    this.reflect('path', val)
  }

  set lang(val) {
    this.reflect('lang', val)
  }

  set code(val) {
    this.reflect('code', val)
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
    return ['src', 'path', 'lang', 'code']
  }

  attributeChangedCallback(name, old, val) {
    if (
      (name === 'src' || name === 'path' || name === 'lang' || name === 'code') &&
      this.connected &&
      !this.manualRender &&
      val !== old
    ) {
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
        ':host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}' +
        `
        .wrapper {
          width: auto;
          margin: auto;
          background-color: rgba(27,31,35,.05);
          border-radius: 10px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, .1);
        }
        
        button {
          letter-spacing: 0.75px;
          border: none;
          padding: 10px;
          # background-color: #bccbe9;
          background-color: rgba(27,31,35,.05);
          # color: #8e9ead;
          color: #778796;
          font-size: 12px;
          font-weight: 200;
          cursor: pointer;
          transition: 0.5s;
        }
        
        button:hover {
          #background-color: #d5e3ff;
          background-color: rgba(0,183,206,0.1);
        }
        
        button.active {
          background-color: rgba(27,31,35,.05);
          border-bottom: rgb(0,183,206) 1px solid;
        }
        
        .active {
          background-color: white;
        }
        
        .content,.inline-content {
          display: none;
        }
        
        .content.active {
          display: block;
        }
        
        .inline-content.active {
          display: inline;
        }
        `,
      baseUrl: '',
      gitlab: {
        token: null,
        projectId: null,
        path: null,
        branch: 'master',
        ...window.ZeroMdConfig.gitlab
      },
      disableCodeHighlightingFor: [],
      shortBreaksNumber: 2,
      longBreaksNumber: 20,
      anchorIdsToLowerCase: true,
      indentInsideTocByPixels: 40,
      imgBaseOld: './resources',
      imgBaseNew: 'https://github.com/yashaka/taotaspy-resources/raw/master',
      lang: null,
      code: null,
      groupCodeGroups: true,
      pTagLang: undefined, // expect string with something like "en-us", "ru", etc...
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
      if (!this.src && !this.path) {
        return ''
      }

      let absoluteUrl = ''
      let isReadingFromGitlabConfigured = this.config.gitlab !== {}
      const resp =
        isReadingFromGitlabConfigured && this.path
          ? await (async () => {
              const id = this.config.gitlab.projectId
              const branch = this.config.gitlab.branch
              const absolutePath = encodeURIComponent(this.path.trim())
              absoluteUrl = `https://gitlab.com/api/v4/projects/${id}/repository/files/${absolutePath}/raw?ref=${branch}`

              return fetch(absoluteUrl, {
                headers: {
                  'PRIVATE-TOKEN': this.config.gitlab.token
                }
              })
            })()
          : await (async () => {
              const url = this.src.trim()
              absoluteUrl = url.startsWith('http') ? url : this.config.baseUrl + url

              return fetch(absoluteUrl)
            })()

      if (resp.ok) {
        let md = await resp.text()

        /* PROCESS MD */
        const renderer = new window.marked.Renderer()

        const codalizedMatch = [...md.matchAll(/<codalized( main="(js|ts|py|java|cs)")?\/>/gim)]
        const [[shouldBeCodalized, __, defaultCode]] = codalizedMatch.length ? codalizedMatch : [[]]
        if (shouldBeCodalized) {
          const codalized = /<((js|ts|py|java|cs)(-js|-ts|-py|-java|-cs)*)>([\s\S]*?)<\/\1>/gim
          md = md.replace(codalized, (match, $1, __, ___, $4) => {
            const candidates = $1.split('-')
            return `<span class="inline-content${
              candidates.includes(this.code || defaultCode) ? ' active' : ''
            }" id="${$1}">${$4}</span>`
          })
        }

        const localizedMatch = [...md.matchAll(/<localized( main="(uk|ru|en)")?\/>/gim)]
        const [[shouldBeLocalized, _, defaultLang]] = localizedMatch.length ? localizedMatch : [[]]
        if (shouldBeLocalized) {
          const localized = /<(uk|ru|en)>([\s\S]*?)<\/\1>/gim
          md = md.replace(localized, (match, $1, $2) => {
            return $1 === (this.lang || defaultLang) ? $2 : ''
          })
        }

        const poetryBoldOption = /<!--(.+)poetryBold(.+)-->/i
        const [, poetryBoldStart, poetryBoldEnd] = md.match(poetryBoldOption) || [null, '__', '__']
        const boldRegExpRule = [
          new RegExp(`${poetryBoldStart}(.*?)${poetryBoldEnd}`, 'gmi'),
          '<b>$1</b>'
        ]

        let tocLinks = []
        const tocStartLevelOption = /<!--TOC>(\d)-->/i
        const [, tocStartLevel] = md.match(tocStartLevelOption) || [null, 0]
        renderer.heading = (text, level) => {
          const [, pure, userId] = text.match(/^(.*)?\s*{#(.*)}$/im) || [null, text]
          const pureWithoutTags = pure.replace(/<\/?\w+>/g, '')
          const anchorIdsToLowerCase = this.config.anchorIdsToLowerCase
          const id =
            userId ||
            (anchorIdsToLowerCase
              ? IDfy(pureWithoutTags)
              : IDfy(pureWithoutTags, { lowerCase: false }))
          const pixelsNumber = this.config.indentInsideTocByPixels

          if (level > tocStartLevel) {
            const indentInsideToc = `style="margin-left: ${
              pixelsNumber * (level - 1 - tocStartLevel)
            }px"`
            tocLinks.push(`<div ${indentInsideToc}><a href="#${id}">${pureWithoutTags}</a></div>`)
          }

          return `<h${level}>${encodeURI(id) === id ? '' : `<span id="${encodeURI(id)}"></span>`}
          <a id="${id}" class="anchor" aria-hidden="true" href="#${id}"></a>${pure}</h${level}>`
        }

        const imgBase = /]\(\.\.?\/resources/gim // todo: move ../resources to config
        md = md.replace(imgBase, '](' + this.config.imgBaseNew)

        const shortBreaks = /^,,,,+/gim
        md = md.replace(shortBreaks, '<br/>'.repeat(this.config.shortBreaksNumber))

        const longBreaks = /^====+/gim
        md = md.replace(longBreaks, '<br/>'.repeat(this.config.longBreaksNumber))

        const pageBreaks = /^===/gim
        md = md.replace(pageBreaks, '<div style="page-break-after: always;"></div>')

        this.config.disableCodeHighlightingFor.forEach((lang) => {
          md = md.replace(new RegExp(`\`\`\`${lang}`, 'gim'), '```')
        })

        const articleTypeExtension = /\.(\w+)\.md(\)|#)/gim
        md = md.replace(articleTypeExtension, `-$1.md$2`)

        // todo: fix to skip links that start with http
        const mdExtensions = /\.md\)/gim
        md = md.replace(mdExtensions, `-md${window.location.search})`)

        const mdExtensionsWithId = /\.md#/gim
        md = md.replace(mdExtensionsWithId, `-md${window.location.search}#`)

        // todo: change to ```poetry ... ``` style
        const poetries = /---[a-z]*\n([\s\S]*?)\n---/gim
        // const backTickPoetries = /```poetry[a-z]*\n([\s\S]*?)\n```/gim
        const backTickPoetries = /```poetry(:?( [a-z]+)+)?\n([\s\S]*?)\n```/gim
        const poetryRules = [
          [/(___)(.*?)\1/gim, '<em>$2</em>'], //emphasis

          boldRegExpRule, //bold1
          [/(\*\*)(.*?)\1/gim, '<b>$2</b>'], //bold2

          // [/^(?!.*\/\*.*$).*(\*)(.*?)\1/gmi,      '<em>$2</em>'], //emphasis
          // TODO: fix: does not work for lines: ... * ... * ... /* ... */ ...
          // read for more info:
          //    https://stackoverflow.com/questions/7376238/javascript-regex-look-behind-alternative

          [/(____)(.*?)\1/gim, '<span style="text-decoration:underline">$2</span>'] //underlined
        ]
        const isOriginalUnderscoredBoldDisabled = poetryBoldStart !== '__'
        const processPoetry = (rules) => (match, $1, __, code) => {
          console.log('\npoetry match\n', match, '\n-----------')
          const [_, langsString] = ($1 && $1.split(':')) || []
          const langs = langsString && langsString.trim().split(' ')
          let res = code

          for (const rule of rules) {
            res = res.replace(rule[0], rule[1])
          }

          if (isOriginalUnderscoredBoldDisabled) {
            res.replace(/(__)(.*?)\1/gim, '‡‡‡$2‡‡‡') // to encode original __
          }

          // return `<pre><code>${res}</code></pre>`;
          return langs
            ? langs
                .map((lang) => `<pre><code class="language-${lang}" poetry>${res}</code></pre>`)
                .join('\n')
            : `<pre>${res}</pre>`
        }

        md = md.replace(poetries, processPoetry(poetryRules))
        md = md.replace(backTickPoetries, processPoetry(poetryRules))

        const multiCodeBlocks = /```(([a-z]+)( [a-z]+)+)\n([\s\S]*?)\n```/gim
        md = md.replace(multiCodeBlocks, (match, $1, __, ___, $4) => {
          const langs = $1.split(' ')
          const code = $4
          return langs.map((lang) => `\`\`\`${lang}\n${code}\n\`\`\``).join('\n')
        })

        /* GET HTML */

        let html = window.marked(md, {
          baseUrl: this.getBaseUrl(window.location.href),
          renderer,
          ...opts
        })

        /* PROCESS HTML */

        console.log('html', html)

        if (isOriginalUnderscoredBoldDisabled) {
          html = html.replace(/‡‡‡/gim, '__')
        }

        const tocMarker = /\[toc\]/i
        const toc = `<div class="toc">${tocLinks.join('')}</div>`
        html = html.replace(tocMarker, toc)

        const codeGroups = /(<p>:::+<\/p>)([\s\S]*?)\1/gim
        const processCodeGroup = (match, $1, $2) => {
          const items = $2

          const itemMarker =
            /<pre><code class="language-(\w+)"( poetry)?.*?>([\s\S]*?)<\/code><\/pre>/gim
          const [itemsContent, itemsTitles] = [...items.matchAll(itemMarker)].reduce(
            ([content, titles], [match, title, poetry, inner]) => [
              [...content, poetry ? `<pre>${inner}</pre>` : match],
              [...titles, title]
            ],
            [[], []]
          )
          console.dir(itemsContent)

          const code = this.code
          return `
          <div class="wrapper">
            <div class="buttonWrapper">
              ${itemsTitles
                .map(
                  (title, index) =>
                    `<button class="tab-button${
                      (code ? code === IDfy(title) : index === 0) ? ' active' : ''
                    }" data-id="${IDfy(title)}">${title}</button>`
                )
                .join('\n')}
            </div>
            <div class="contentWrapper">
              ${itemsContent
                .map(
                  (item, index) =>
                    `<div class="content${
                      (code ? code === IDfy(itemsTitles[index]) : index === 0) ? ' active' : ''
                    }" id="${IDfy(itemsTitles[index])}">${item}</div>`
                )
                .join('\n')}
            </div>
          </div>
          `.trim()
        }

        html = html.replace(codeGroups, processCodeGroup)

        const languageJsMarker = /<pre><code class="language-(js|javascript)"/gim
        html = html.replace(languageJsMarker, '<pre><code class="language-typescript"')

        return html
      } else {
        this.fire('zero-md-error', {
          msg: `[zero-md] HTTP error ${resp.status} while fetching src`,
          status: resp.status,
          src: this.src,
          path: this.path,
          lang: this.lang,
          code: this.code
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

      /* PROCESS CODE GROUP - START */
      const tabsWrappers = node.querySelectorAll('.wrapper')
      tabsWrappers.forEach(
        (tabsWrapper) =>
          (tabsWrapper.onclick = (e) => {
            const element = e.target
            const newActiveContentId = element.dataset.id
            const isElementANonActiveTabButton =
              !!newActiveContentId && !element.classList.contains('active')

            if (isElementANonActiveTabButton) {
              if (this.config.groupCodeGroups) {
                node.querySelectorAll('.wrapper .tab-button').forEach((tabButton) => {
                  if (tabButton.dataset.id === newActiveContentId) {
                    tabButton.classList.add('active')
                  } else {
                    tabButton.classList.remove('active')
                  }
                })

                node.querySelectorAll(`.content,.inline-content`).forEach((content) => {
                  if (content.id.split('-').includes(newActiveContentId)) {
                    content.classList.add('active')
                  } else {
                    content.classList.remove('active')
                  }
                })
              } else {
                const buttonsWrapper = element.parentElement
                buttonsWrapper.querySelector('.tab-button.active').classList.remove('active')
                element.classList.add('active')

                const wrapper = buttonsWrapper.parentElement
                const contents = wrapper.querySelectorAll('.content')
                contents.forEach((content) => {
                  content.classList.remove('active')
                })
                wrapper.querySelector(`#${newActiveContentId}`).classList.add('active')
              }
            }
          })
      )
      /* PROCESS CODE GROUP - END */

      stamped.body = true
      await this.highlight(node)
    }

    this.fire('zero-md-rendered', { stamped })
  }
}

customElements.define('zero-md', ZeroMd)
