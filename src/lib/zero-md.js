import ZeroMdBase from './zero-md-base.js'

const MARKED_URLS = [
  'https://cdn.jsdelivr.net/npm/marked@12/lib/marked.esm.js',
  'https://cdn.jsdelivr.net/npm/marked-gfm-heading-id@3/+esm',
  'https://cdn.jsdelivr.net/npm/marked-highlight@2/+esm',
  'https://cdn.jsdelivr.net/npm/marked-base-url@1/+esm'
]
const HLJS_URL = 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/es/highlight.min.js'
const KATEX_URL = 'https://cdn.jsdelivr.net/npm/katex@0/dist/katex.mjs'
const MERMAID_URL = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs'

let uid = 0

/**
 * Extends ZeroMdBase with marked.js, syntax highlighting, math and mermaid features
 */
class ZeroMd extends ZeroMdBase {
  async load() {
    this.template +=
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/styles/github.min.css"><link rel="stylesheet" media="(prefers-color-scheme: dark)" href="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/styles/github-dark.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0/dist/katex.min.css">'
    if (!this.marked) {
      const mods = await Promise.all(MARKED_URLS.map((url) => import(/* @vite-ignore */ url)))
      this.marked = new mods[0].Marked(mods[1].gfmHeadingId(), { async: true })
      this.markedHighlight = mods[2].markedHighlight
      this.setBaseUrl = mods[3].baseUrl
    }
    const loadKatex = async () => {
      this.katex = (await import(/* @vite-ignore */ KATEX_URL)).default
    }
    /* eslint-disable */
    const inlineRule =
      /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/
    const blockRule = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/
    /* eslint-enable */
    this.marked.use(
      {
        ...this.markedHighlight({
          async: true,
          highlight: async (code = '', lang = '') => {
            if (lang === 'mermaid') {
              if (!this.mermaid) {
                this.mermaid = (await import(/* @vite-ignore */ MERMAID_URL)).default
                this.mermaid.initialize({ startOnLoad: false })
              }
              const { svg } = await this.mermaid.render(`mermaid-svg-${uid++}`, code)
              return svg
            }
            if (lang === 'math') {
              if (!this.katex) await loadKatex()
              return this.parseKatex(code, { displayMode: true })
            }
            if (!this.hljs) {
              this.hljs = (await import(/* @vite-ignore */ HLJS_URL)).default
            }
            return this.hljs.getLanguage(lang)
              ? this.hljs.highlight(code, { language: lang }).value
              : this.hljs.highlightAuto(code).value
          }
        }),
        renderer: {
          code: (code = '', lang = '') => {
            if (lang === 'mermaid') return `<pre class="mermaid">${code}</pre>`
            if (lang === 'math') return code
            return `<pre><code class="hljs${lang ? ` language-${lang}` : ''}">${code}\n</code></pre>`
          }
        }
      },
      {
        extensions: [
          {
            name: 'inlineKatex',
            level: 'inline',
            start(/** @type {*} */ src) {
              let index
              let indexSrc = src
              while (indexSrc) {
                index = indexSrc.indexOf('$')
                if (index === -1) return
                if (index === 0 || indexSrc.charAt(index - 1) === ' ') {
                  const possibleKatex = indexSrc.substring(index)
                  if (possibleKatex.match(inlineRule)) {
                    return index
                  }
                }
                indexSrc = indexSrc.substring(index + 1).replace(/^\$+/, '')
              }
            },
            tokenizer(/** @type {*} */ src) {
              const match = src.match(inlineRule)
              if (match) {
                return {
                  type: 'inlineKatex',
                  raw: match[0],
                  text: match[2].trim(),
                  displayMode: match[1].length === 2
                }
              }
            },
            renderer(/** @type {*} */ token) {
              return token.text
            }
          },
          {
            name: 'blockKatex',
            level: 'block',
            tokenizer(/** @type {*} */ src) {
              const match = src.match(blockRule)
              if (match) {
                return {
                  type: 'blockKatex',
                  raw: match[0],
                  text: match[2].trim(),
                  displayMode: match[1].length === 2
                }
              }
            },
            renderer(/** @type {*} */ token) {
              return token.text
            }
          }
        ],
        walkTokens: async (/** @type {*} */ token) => {
          if (['inlineKatex', 'blockKatex'].includes(token.type)) {
            if (!this.katex) await loadKatex()
            token.text = this.parseKatex(token.text, { displayMode: token.type === 'blockKatex' })
          }
        }
      }
    )
  }

  parseKatex(text = '', opts = {}) {
    return this.katex.renderToString(text, { ...opts, throwOnError: false })
  }

  /**
   * @param {import('./zero-md-base.js').ZeroMdRenderObject} obj
   * @returns
   */
  async parse({ text, baseUrl }) {
    this.marked.use(this.setBaseUrl(baseUrl || ''))
    return this.marked.parse(text)
  }
}

export default ZeroMd
