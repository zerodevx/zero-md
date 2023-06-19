import IDfy from './utils/IDfy'

const htmlTemplate = {
  /**
   * @param {{
   *   code: string | undefined,
   *   customName: string | undefined,
   *   content: string,
   *   isPoetry: boolean | undefined,
   * }} details
   * @returns {string}
   */
  codeBlock: ({ code, customName, content, isPoetry }) =>
    `<pre><code${isPoetry ? ' poetry' : ''}${
      code ? ` class="${isPoetry ? 'code' : 'language'}-${code}"` : ''
    }${customName ? ` data-customName="${customName}"` : ''}>${content}</code></pre>`,
}

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

  get debug() {
    return (
      new URLSearchParams(window.location.search).get('debug') ||
      this.getAttribute('debug') ||
      this.config?.debug
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
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js',
      ],
      cssUrls: [
        'https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css',
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css',
        'https://cdn.jsdelivr.net/gh/automician/buttons-menu-custom-element@98902f0ad3f21fa6a2f3e0d1aa75b6f478557936/build/static/css/main.e5d0f3d9.css',
      ],
      hostCss:
        ':host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}' +
        `
        .codeGroup {
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
        
        .tab-content,.inline-content {
          display: none;
        }
        
        .tab-content.active {
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
        ...window.ZeroMdConfig.gitlab,
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
      ...window.ZeroMdConfig,
    }
    this.cache = {}
    this.root = this.hasAttribute('no-shadow') ? this : this.attachShadow({ mode: 'open' })
    if (!this.constructor.ready) {
      this.constructor.ready = Promise.all([
        !!window.marked || this.loadScript(this.config.markedUrl),
        !!window.Prism || this.loadScript(this.config.prismUrl),
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
      new Promise(resolve => {
        this.addEventListener('zero-md-connected', function handler() {
          this.removeEventListener('zero-md-connected', handler)
          resolve()
        })
      })
    return Promise.all([this.constructor.ready, ready])
  }

  // TODO: ensure this implementation is valid
  waitForRendered() {
    const rendered = new Promise(resolve => {
      this.addEventListener('zero-md-rendered', function handler() {
        this.removeEventListener('zero-md-rendered', handler)
        resolve()
      })
    })
    return Promise.all([this.constructor.ready, rendered])
  }

  fire(name, detail = {}, opts = { bubbles: true, composed: true }) {
    if (detail.msg) {
      console.warn(detail.msg)
    }
    this.dispatchEvent(
      new CustomEvent(name, {
        detail: { node: this, ...detail },
        ...opts,
      }),
    )
  }

  tick() {
    return new Promise(resolve => requestAnimationFrame(resolve))
  }

  // Coerce anything into an array
  arrify(any) {
    return any ? (Array.isArray(any) ? any : [any]) : []
  }

  // Promisify an element's onload callback
  onload(node) {
    return new Promise((resolve, reject) => {
      node.onload = resolve
      node.onerror = err => reject(err.path ? err.path[0] : err.composedPath()[0])
    })
  }

  // Load a url or load (in order) an array of urls via <script> tags
  loadScript(urls) {
    return Promise.all(
      this.arrify(urls).map(item => {
        const [url, ...attrs] = this.arrify(item)
        const el = document.createElement('script')
        el.src = url
        el.async = false
        attrs.forEach(attr => el.setAttribute(attr, ''))
        return this.onload(document.head.appendChild(el))
      }),
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
    return new Promise(resolve => {
      /** commented as temporal workaround of "prisma breaks poetry html highlighting in all browsers except FF" */
      // const unhinted = container.querySelectorAll('pre>code:not([class*="language-"])')
      /*
       * Prism doesn't auto-detect languages, and original zero-md version was doing this by itself
       * but actually we don't need this magic, it nevertheless was not smart enough:)
       * and it conflicted with current poetry implementation
       * that lefts intentationally poetry without .language-xxxx hint
      unhinted.forEach((n) => {
        // Dead simple language detection :)
        const lang = n.innerText.match(/^\s*</)
          ? 'markup'
          : n.innerText.match(/^\s*(\$|#)/)
          ? 'bash'
          : 'js'
        n.classList.add(`language-${lang}`)
      })
      * yet in have consistent css for all code blocks let's add language-text to all of not-hinted ones 
      * also currently we need to add it here, not in place of poetry definition
      * because there the parsing logic depends on "not having langauge-xxxx hint for poetries"...
      */
      // unhinted.forEach(block => block.classList.add('language-text'))

      this.debug &&
        console.log(
          '\n===highlighting...\n' +
            document.querySelector('zero-md').shadowRoot.querySelector('.markdown-body').innerHTML,
        )

      try {
        window.Prism.highlightAllUnder(container, true, resolve())

        this.debug &&
          console.log(
            '\n===highlighted:\n' +
              document.querySelector('zero-md').shadowRoot.querySelector('.markdown-body')
                .innerHTML,
          )
      } catch {
        window.Prism.highlightAllUnder(container)
        resolve()

        this.debug &&
          console.log(
            '\n===highlighted:\n' +
              document.querySelector('zero-md').shadowRoot.querySelector('.markdown-body')
                .innerHTML,
          )
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
    const get = query => {
      const node = this.querySelector(query)
      return node ? node.innerHTML || ' ' : ''
    }
    const urls = this.arrify(this.config.cssUrls)
    const html = `<div class="markdown-styles"><style>${this.config.hostCss}</style>${get(
      'template[data-merge="prepend"]',
    )}${
      get('template:not([data-merge])') ||
      urls.reduce((a, c) => `${a}<link rel="stylesheet" href="${c}">`, '')
    }${get('template[data-merge="append"]')}</div>`
    return html
  }

  // Construct md nodes and return HTML string
  async buildMd(opts = {}) {
    const renderer = new window.marked.Renderer()
    let isOriginalUnderscoredBoldDisabledByNonDefaultPoetryBoldOption = undefined
    let tocLinks = []

    /* DEFINE HOW TO GET MD */

    let isReadingFromGitlabConfigured = this.config.gitlab !== {}
    let gitlabAbsoluteUrl = ''
    const src = async () => {
      if (!this.src && !this.path) {
        return ''
      }
      const resp =
        isReadingFromGitlabConfigured && this.path
          ? await (async () => {
              const id = this.config.gitlab.projectId
              const branch = this.config.gitlab.branch
              const absolutePath = encodeURIComponent(this.path.trim())
              gitlabAbsoluteUrl = `https://gitlab.com/api/v4/projects/${id}/repository/files/${absolutePath}/raw?ref=${branch}`

              return fetch(gitlabAbsoluteUrl, {
                headers: {
                  'PRIVATE-TOKEN': this.config.gitlab.token,
                },
              })
            })()
          : await (async () => {
              const url = this.src.trim()
              gitlabAbsoluteUrl = url.startsWith('http') ? url : this.config.baseUrl + url

              return fetch(gitlabAbsoluteUrl)
            })()

      if (resp.ok) {
        return await resp.text()
      } else {
        this.fire('zero-md-error', {
          msg: `[zero-md] HTTP error ${resp.status} while fetching src`,
          status: resp.status,
          src: this.src,
          path: this.path,
          lang: this.lang,
          code: this.code,
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
      return md
    }

    let md = (await src()) || script()

    /* PROCESS MD */

    const importsMatch = [...md.matchAll(/<!--import\(([\s\S]*?)\)-->/gim)]
    if (importsMatch.length) {
      await Promise.all(
        importsMatch.map(async ([match, importURL]) => {
          const currentZeroMdPath =
            isReadingFromGitlabConfigured && this.path ? this.path : this.src
          const currentZeroMdFileNestingDepth = currentZeroMdPath.split('/').length - 1

          let response
          const isUrlRelative = !importURL.startsWith('http')
          if (isUrlRelative) {
            const importedFileNestingMatch = importURL.match(/\.{1,2}(?=[^/]*\/)/gim)

            if (
              (importedFileNestingMatch &&
                importedFileNestingMatch.length === 1 &&
                importedFileNestingMatch[0] === '.') ||
              importedFileNestingMatch === null
            ) {
              const thisPathLastElement = this.path.split('/').pop()
              const filePathtoReplace = importedFileNestingMatch
                ? importURL.split('./')[1]
                : importURL.split('./')[0]

              importURL = this.path.replace(thisPathLastElement, filePathtoReplace)
            }

            if (
              importedFileNestingMatch &&
              !(importedFileNestingMatch.length === 1 && importedFileNestingMatch[0] === '.')
            ) {
              const importedFileNestingDepth = importedFileNestingMatch.filter(
                item => item === '..',
              ).length

              if (importedFileNestingDepth <= currentZeroMdFileNestingDepth) {
                const importURLPurePath = importURL.replace(/^(\.\/|\.\.\/)*/, '')
                const importedFileFolderIndex =
                  currentZeroMdFileNestingDepth - importedFileNestingDepth
                importURL = currentZeroMdPath
                  .split('/')
                  .slice(0, importedFileFolderIndex)
                  .concat(importURLPurePath)
                  .join('/')
              } else {
                console.error('Provided relative path to the file does not exist')
                return
              }
            }

            // TODO: refactor for DRY (remove duplicated absolute url building logic)
            const id = this.config.gitlab.projectId
            const branch = this.config.gitlab.branch
            const absolutePath = encodeURIComponent(importURL.trim())
            gitlabAbsoluteUrl = `https://gitlab.com/api/v4/projects/${id}/repository/files/${absolutePath}/raw?ref=${branch}`

            response = await fetch(gitlabAbsoluteUrl, {
              headers: {
                'PRIVATE-TOKEN': this.config.gitlab.token,
              },
            })
          } else {
            response = await fetch(importURL)
          }

          if (response.ok) {
            const importedContent = await response.text()
            md = md.replace(match, importedContent)
          }
        }),
      )
    }

    const codalizedMatch = [
      ...md.matchAll(
        /<codalized( main="(js|ts|py|java|cs|kt|rb|kt|shell|sh|bash|bat|pwsh|text|md|yaml|json|html|xml)")?\/>/gim,
      ),
    ]
    const [[shouldBeCodalized, __, defaultCodeFromMd]] = codalizedMatch.length
      ? codalizedMatch
      : [[]]

    const localizedMatch = [...md.matchAll(/<localized( main="(uk|ru|en)")?\/>/gim)]
    const [[shouldBeLocalized, _, defaultLangFromMd]] = localizedMatch.length
      ? localizedMatch
      : [[]]

    const translation = /<!--((?![-\s])\W)(.*?)\1([\s\S]*?)\1-->/gim
    this.debug && console.log('===translation===\n')
    ;[...md.matchAll(translation)].forEach(([_match, _delimiter, from, to]) => {
      try {
        md = md.replace(new RegExp(from, 'gmi'), to)
      } catch (e) {
        this.debug && console.log('===match\n' + _match)
        this.debug && console.log('===delimiter\n' + _delimiter)
        this.debug && console.log('===from\n' + from)
        this.debug && console.log('===to\n' + to)
        console.error(e)
      }
    })
    this.debug && console.log('=================\n')

    const translationPerCodeOption =
      /<!--((?:js|ts|java|py|cs|kt|rb|kt|shell|sh|bash|bat|pwsh|text|md|yaml|json|html|xml)(?:-(?:js|ts|java|py|cs|kt|rb|kt|shell|sh|bash|bat|pwsh|text|md|yaml|json|html|xml))*)((?![-])\W)(.*?)\2([\s\S]*?)\2-->/gim
    ;[...md.matchAll(translationPerCodeOption)].forEach(([_, perCode, __, from, to]) => {
      if (perCode.split('-').length > 1) {
        perCode = perCode.split('-')
      }

      if (
        perCode instanceof Array
          ? perCode.includes(this.code || defaultCodeFromMd)
          : (this.code || defaultCodeFromMd) === perCode
      ) {
        md = md.replace(new RegExp(from, 'gmi'), to)
      }
    })
    const translationPerLangOption =
      /<!--((?:uk|ru|en)(?:-(?:uk|ru|en))*)((?![-])\W)(.*?)\2([\s\S]*?)\2-->/gim
    ;[...md.matchAll(translationPerLangOption)].forEach(([_, perLang, __, from, to]) => {
      if (perLang.split('-').length > 1) {
        perLang = perLang.split('-')
      }

      if (
        perLang instanceof Array
          ? perLang.includes(this.lang || defaultLangFromMd)
          : (this.lang || defaultLangFromMd) === perLang
      ) {
        md = md.replace(new RegExp(from, 'gmi'), to)
      }
    })

    this.debug && console.log('===md\n' + md)

    if (shouldBeCodalized) {
      const codalizable =
        /<((not-)?(?:js|ts|py|java|cs|kt|rb|kt|shell|sh|bash|bat|pwsh|text|md|yaml|json|html|xml)(?:-js|-ts|-py|-java|-cs|-kt|-rb|-kt|-shell|-sh|-bash|-bat|-pwsh|-text|-md|-yaml|-json|-html|-xml)*)>([\s\S]*?)<\/\1>/gim
      const codalize = (match, tag, inverted, content) => {
        const candidates = inverted ? tag.split('-').slice(1) : tag.split('-')
        return `<span class="inline-content${
          inverted
            ? candidates.includes(this.code || defaultCodeFromMd)
              ? ''
              : ' active'
            : candidates.includes(this.code || defaultCodeFromMd)
            ? ' active'
            : ''
        }" id="${tag}">${content}</span>` // TODO: should we make here id value dependent on inverted?
      }
      while (md.match(codalizable)) {
        md = md.replace(codalizable, codalize)
      }
    }
    this.debug && console.log('===md after codalized\n' + md)

    if (shouldBeLocalized) {
      const localizable = /<((?:uk|ru|en)(?:-uk|-ru|-en)*)>([\s\S]*?)<\/\1>/gim
      const localize = (match, candidates, content) => {
        return candidates.split('-').includes(this.lang || defaultLangFromMd) ? content : ''
      }
      while (md.match(localizable)) {
        md = md.replace(localizable, localize)
      }
    }
    this.debug && console.log('===md after localized\n' + md)

    const tocStartLevelOption = /<!--TOC>(\d)-->/i
    const [, tocStartLevel] = md.match(tocStartLevelOption) || [null, 0]
    renderer.heading = (text, level) => {
      const [, pure, userId] = text.match(/^(.*)?\s*{#(.*)}$/im) || [null, text]
      const pureWithoutTags = pure.replace(/<\/?\w+>/g, '')
      const anchorIdsToLowerCase = this.config.anchorIdsToLowerCase
      const id =
        userId ||
        (anchorIdsToLowerCase ? IDfy(pureWithoutTags) : IDfy(pureWithoutTags, { lowerCase: false }))
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

    this.config.disableCodeHighlightingFor.forEach(lang => {
      md = md.replace(new RegExp(`\`\`\`${lang}`, 'gim'), '```')
    })

    const articleTypeExtension = /\.(\w+)\.md(\)|#)/gim
    md = md.replace(articleTypeExtension, `-$1.md$2`)

    // todo: fix to skip links that start with http
    const mdExtensions = /\.md\)/gim
    md = md.replace(mdExtensions, `-md${window.location.search})`)

    const mdExtensionsWithId = /\.md#/gim
    md = md.replace(mdExtensionsWithId, `-md${window.location.search}#`)

    const poetryBoldOption = /<!--(.+?)poetryBold(.+?)-->/gi
    const [, poetryBoldStart, poetryBoldEnd] = [...md.matchAll(poetryBoldOption)].at(-1) || [
      null,
      '__',
      '__',
    ]

    const tabNameOption = /<!--(.+)tabNameBrackets(.+)-->/i
    const [, tabNameStart, tabNameEnd] = md.match(tabNameOption) || [null, '"', '"']

    const poetryBoldOptionRule = [
      new RegExp(
        `${poetryBoldStart}(?!${poetryBoldStart})(.*?)${poetryBoldEnd}(?!${poetryBoldEnd})`,
        'gmi',
      ),
      '<b>$1</b>',
    ]
    // todo: change to ```poetry ... ``` style
    const poetries =
      /---[a-z]*\n([\s\S]*?)\n---/gim /* TODO: should have same abount of groups as backTickPoetries
      or should be replaced with backTickPoetries completely, i.e. removed
    */
    const poetryRulesExceptBold = [
      [/(_)___(?!\1)(.*?)____(?!\1)/gim, '<span style="text-decoration:underline">$2</span>'], //underlined
      [/(_)__(?!\1)(.*?)___(?!\1)/gim, '<em>$2</em>'], //emphasis (aka "italic")

      // [/^(?!.*\/\*.*$).*(\*)(.*?)\1/gmi,      '<em>$2</em>'], //emphasis
      // TODO: fix: does not work for lines: ... * ... * ... /* ... */ ...
      // read for more info:
      //    https://stackoverflow.com/questions/7376238/javascript-regex-look-behind-alternative
    ]
    isOriginalUnderscoredBoldDisabledByNonDefaultPoetryBoldOption = poetryBoldStart !== '__'
    const backTickPoetries = /```poetry(?::( .+))?\n([\s\S]*?)\n```/gim
    const processPoetry = rules => (match, info, content) => {
      // const titles = info.split(/\s+/)
      // const maybeCodeOrCustomNameOrBoth =
      // /(?:^|\s+)(js|ts|java|py|cs|kt|rb|kt|shell|sh|bash|bat|pwsh|text|md|yaml|json|html|xml)?(?:"(.+?)")?"/g
      const maybeCodeOrCustomNameOrBoth = new RegExp(
        '(?:^|\\s+)' +
          '(js|ts|java|py|cs|kt|rb|kt|shell|sh|bash|bat|pwsh|text|md|yaml|json|html|xml)?' +
          `(?:${tabNameStart}(.+?)${tabNameEnd})?`,
        'g',
      )
      const maybeCodeOrCustomNameOrBothPairs = [
        ...(info?.trim().matchAll(maybeCodeOrCustomNameOrBoth) ?? []),
      ].map(matched => ({ maybeCode: matched[1], maybeCustomName: matched[2] }))

      let res = content

      // TODO: encode all html elements definition tokens in poetry content with &lt;, &gt;, and &quot;
      res = res.replace(/</gim, '&lt;')
      res = res.replace(/>/gim, '&gt;')
      res = res.replace(/"/gim, '&quot;')

      for (const rule of rules) {
        res = res.replace(rule[0], rule[1])
      }

      if (isOriginalUnderscoredBoldDisabledByNonDefaultPoetryBoldOption) {
        // then we should totally disable original __ and **
        // in md processing (both by us and marked.js)
        // by encoding it ...
        res = res.replace(/(_)_(?!\1)(.*?)__(?!\1)/gim, '‡‡‡$2‡‡‡') // to encode original __
        if (poetryBoldStart !== '\\*\\*') {
          res = res.replace(/(\*)\*(?!\1)(.*?)\*\*(?!\1)/gim, '•••$2•••') // to encode original __
        }
        // then decode it later once md is processed and we get html...
      }

      const boldRules = [
        poetryBoldOptionRule, //bold1
        [/(\*)\*(?!\1)(.*?)\*\*(?!\1)/gim, '<b>$2</b>'], //bold2
      ]

      for (const rule of boldRules) {
        res = res.replace(rule[0], rule[1])
      }

      const wrapped = maybeCodeOrCustomNameOrBothPairs.length
        ? maybeCodeOrCustomNameOrBothPairs
            .map(({ maybeCode, maybeCustomName }) =>
              htmlTemplate.codeBlock({
                code: maybeCode,
                content: res,
                customName: maybeCustomName,
                isPoetry: true,
              }),
            )
            // if somebody passed more than one pair in info,
            // then we clone content into same amount of poetries
            .join('\n')
        : htmlTemplate.codeBlock({ code: 'text', content: res, isPoetry: true })

      return wrapped
    }

    md = md.replace(poetries, processPoetry(poetryRulesExceptBold))
    md = md.replace(backTickPoetries, processPoetry(poetryRulesExceptBold))

    const multiCodeBlocks = /```((?:[a-z]+)(?: [a-z]+)+)\n([\s\S]*?)\n```/gim
    md = md.replace(multiCodeBlocks, (match, codes, content) => {
      return codes
        .split(/\s+/)
        .map(code => `\`\`\`${code}\n${content}\n\`\`\``)
        .join('\n')
    })

    // this part is actually have not business value
    // but was implemented here just for knowledge sharing purposes
    // probably we gonna remove it one day...
    const multiTabsWithCustomNamesCodeBlocks =
      /```\b(?!poetry\b)([a-z]+)(?:: (.+))\n([\s\S]*?)\n```/gim
    md = md.replace(multiTabsWithCustomNamesCodeBlocks, (match, code, info, content) => {
      const customNames = [
        ...info.matchAll(new RegExp(tabNameStart + '(.+?)' + tabNameEnd, 'gim')),
      ].map(matched => matched[1])
      return customNames
        .map(customName => htmlTemplate.codeBlock({ content, customName, code }))
        .join('\n')
    })

    /* GET HTML */

    this.debug && console.log('===md before final processing via marked.js\n' + md)

    let html = window.marked(md, {
      baseUrl: this.getBaseUrl(window.location.href),
      renderer,
      ...opts,
    })

    /* PROCESS HTML */

    this.debug && console.log('===html before processing\n' + html)

    // decode previously decoded
    if (isOriginalUnderscoredBoldDisabledByNonDefaultPoetryBoldOption) {
      html = html.replace(/‡‡‡/gim, '__')
      html = html.replace(/•••/gim, '**')
    }

    const tocMarker = /\[toc\]/i
    const toc = `<div class="toc">${tocLinks.join('')}</div>`
    html = html.replace(tocMarker, toc)

    const codeGroups = /<p>(:::+)(manual)?<\/p>([\s\S]*?)<p>\1<\/p>/gim
    const processCodeGroup = (match, _, manual, items) => {
      const itemMarker =
        /<pre><code( poetry)?(?: class="(?:language|code)-(\w+)")?( data-customName="(.+)")?.*?>([\s\S]*?)<\/code><\/pre>/gim

      // const contentAndMaybeCodeOrCustomNameOrAll = [...items.matchAll(itemMarker)].map(
      //   (matched) => ({
      //     maybeCode: matched[2],
      //     maybeCustomName: matched[4],
      //     content: matched[0],
      //   }),
      // )

      let [itemsContent, itemsTitles] = [...items.matchAll(itemMarker)].reduce(
        ([content, titles], [match, _, code, ___, customName, _____]) => {
          const title = customName ? [code, customName] : [code]

          return [
            [...content, match],
            [...titles, title],
          ]
        },
        [[], []],
      )

      let processedCodes = []
      return `
          <div class="codeGroup">
            <div class="buttonWrapper">
              ${itemsTitles
                .map((title, index) => {
                  // TODO: name it and find good proper name

                  const code = title[0]
                  const customName = title[1]

                  const html = `<button class="tab-button${
                    manual
                      ? index === 0
                        ? ' active'
                        : ''
                      : (
                          this.code
                            ? this.code === code && !processedCodes.includes(code)
                            : index === 0
                        )
                      ? ' active'
                      : ''
                  }"${
                    code || customName
                      ? ' data-id="' + IDfy(customName ? code + '_' + customName : code) + '"'
                      : ''
                  }">${customName ?? code ?? '__'}</button>`

                  processedCodes.push(code)

                  return html
                })
                .join('\n')}
            </div>
            <div class="contentWrapper">
              ${itemsContent
                .map((item, index) => {
                  const title = itemsTitles[index]
                  const code = title[0]
                  const customName = title[1]
                  if (index === 0) {
                    processedCodes = [] // TODO: remove this mutation from lambda for map (such lambda should be pure, i.e. not mutating anything from outer scope)
                  }

                  const html = `<div class="tab-content${
                    manual
                      ? index === 0
                        ? ' active'
                        : ''
                      : (
                          this.code
                            ? this.code === code && !processedCodes.includes(code)
                            : index === 0
                        )
                      ? ' active'
                      : ''
                  }"${
                    code || customName
                      ? ' id="' + IDfy(customName ? code + '_' + customName : code) + '"'
                      : ''
                  }>${item}</div>`

                  processedCodes.push(code)

                  return html
                })
                .join('\n')}
            </div>
          </div>
          `.trim()
    }

    html = html.replace(codeGroups, processCodeGroup)

    const languageJsMarker = /<pre><code class="language-(js|javascript)"/gim
    html = html.replace(languageJsMarker, '<pre><code class="language-typescript"')

    this.debug && console.log('===html after processing\n' + html)

    return `<div class="markdown-body${
      opts.classes ? this.arrify(opts.classes).reduce((a, c) => `${a} ${c}`, ' ') : ''
    }">${html}</div>`
  }

  // Insert or replace HTML styles string into DOM and wait for links to load
  async stampStyles(html) {
    const node = this.makeNode(html)
    const links = [...node.querySelectorAll('link[rel="stylesheet"]')]
    const target = [...this.root.children].find(n => n.classList.contains('markdown-styles'))
    if (target) {
      target.replaceWith(node)
    } else {
      this.root.prepend(node)
    }
    await Promise.all(links.map(l => this.onload(l))).catch(err => {
      this.fire('zero-md-error', {
        msg: '[zero-md] An external stylesheet failed to load',
        status: undefined,
        src: err.href,
      })
    })
  }

  // Insert or replace HTML body string into DOM and returns the node
  stampBody(html) {
    const node = this.makeNode(html)
    const target = [...this.root.children].find(n => n.classList.contains('markdown-body'))
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
    this.querySelectorAll('template,script[type="text/markdown"]').forEach(n => {
      this.observer.observe(n.content || n, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
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
    this.debug && console.log('\n===built md:\n' + md)
    if (md !== this.cache.body) {
      this.cache.body = md
      const node = this.stampBody(md)

      /* PROCESS CODE GROUP - START */
      const tabsWrappers = node.querySelectorAll('.codeGroup')
      tabsWrappers.forEach(tabsWrapper => {
        if (tabsWrapper.querySelectorAll('.tab-content.active').length === 0) {
          // hide everything if no active content found
          tabsWrapper.style.display = 'none'
        }
        tabsWrapper.onclick = e => {
          const element = e.target
          const newActiveContentId = element.dataset.id
          const isElementANonActiveTabButton =
            !!newActiveContentId && !element.classList.contains('active')

          if (isElementANonActiveTabButton) {
            if (this.config.groupCodeGroups) {
              node.querySelectorAll('.codeGroup .tab-button').forEach(tabButton => {
                if (tabButton.dataset.id === newActiveContentId) {
                  tabButton.classList.add('active')
                } else {
                  tabButton.classList.remove('active')
                }
              })

              node.querySelectorAll(`.tab-content,.inline-content`).forEach(content => {
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
              const contents = wrapper.querySelectorAll('.tab-content')
              contents.forEach(content => {
                content.classList.remove('active')
              })
              wrapper.querySelector(`#${newActiveContentId}`).classList.add('active')
            }
          }
        }
      })
      /* PROCESS CODE GROUP - END */

      stamped.body = true
      await this.highlight(node)
    }

    this.fire('zero-md-rendered', { stamped })
  }
}
customElements.define('zero-md', ZeroMd)
