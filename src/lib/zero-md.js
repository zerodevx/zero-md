import ZeroMdBase from './zero-md-base.js'
import katexExtension from './katex-extension.js'
import { STYLES, LOADERS } from './presets.js'

let uid = 0

/**
 * Extends ZeroMdBase with marked.js, syntax highlighting, math and mermaid features
 */
export default class ZeroMd extends ZeroMdBase {
  async load(loaders = {}) {
    const {
      marked,
      markedBaseUrl,
      markedHighlight,
      markedGfmHeadingId,
      markedAlert,
      hljs,
      mermaid,
      katex,
      katexOptions
    } = { katexOptions: { nonStandard: true, throwOnError: false }, ...LOADERS, ...loaders }
    this.template = STYLES.preset()
    this.marked = await marked()
    this.setBaseUrl = await markedBaseUrl()
    const parseKatex = async (
      /** @type {string} */ text,
      /** @type {boolean|undefined} */ displayMode
    ) => {
      if (!this.katex) this.katex = await katex()
      return `${this.katex.renderToString(text, { ...katexOptions, displayMode })}${displayMode ? '' : '\n'}`
    }
    this.marked.use(
      (await markedGfmHeadingId())(),
      (await markedAlert())(),
      {
        ...(await markedHighlight())({
          async: true,
          highlight: async (/** @type {string} */ code, /** @type {string} */ lang) => {
            if (lang === 'mermaid') {
              if (!this.mermaid) {
                this.mermaid = await mermaid()
                this.mermaid.initialize({ startOnLoad: false })
              }
              const { svg } = await this.mermaid.render(`mermaid-svg-${uid++}`, code)
              return svg
            }
            if (lang === 'math') return await parseKatex(code, true)
            if (!this.hljs) this.hljs = await hljs()
            return this.hljs.getLanguage(lang)
              ? this.hljs.highlight(code, { language: lang }).value
              : this.hljs.highlightAuto(code).value
          }
        }),
        renderer: {
          code: (/** @type {*} */ { text, lang }) => {
            if (lang === 'mermaid') return `<div class="mermaid">${text}</div>`
            if (lang === 'math') return text
            return `<pre><code class="hljs${lang ? ` language-${lang}` : ''}">${text}\n</code></pre>`
          }
        }
      },
      {
        ...katexExtension(katexOptions),
        walkTokens: async (/** @type {*} */ token) => {
          if (['inlineKatex', 'blockKatex'].includes(token.type))
            token.text = await parseKatex(token.text, token.type === 'blockKatex')
        }
      }
    )
  }

  /** @param {import('./zero-md-base.js').ZeroMdRenderObject} _obj */
  async parse({ text, baseUrl }) {
    this.marked.use(this.setBaseUrl(baseUrl || ''))
    return this.marked.parse(text)
  }
}
