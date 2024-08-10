import ZeroMdBase from './zero-md-base.js'
import katexExtension from './katex-extension.js'
import { STYLES, LOADERS } from './presets.js'

let uid = 0

/**
 * Extends ZeroMdBase with marked.js, syntax highlighting, math and mermaid features
 */
export default class ZeroMd extends ZeroMdBase {
  async load({
    marked = LOADERS.marked,
    markedBaseUrl = LOADERS.markedBaseUrl,
    markedHighlight = LOADERS.markedHighlight,
    markedGfmHeadingId = LOADERS.markedGfmHeadingId,
    markedAlert = LOADERS.markedAlert,
    hljs = LOADERS.hljs,
    mermaid = LOADERS.mermaid,
    katex = LOADERS.katex,
    katexOptions = { nonStandard: true, throwOnError: false }
  } = {}) {
    this.template = STYLES.preset()
    this.marked = await marked()
    this.setBaseUrl = await markedBaseUrl()
    const parseKatex = async (text = '', opts = {}) => {
      if (!this.katex) this.katex = await katex()
      return this.katex.renderToString(text, { ...katexOptions, ...opts })
    }
    this.marked.use(
      (await markedGfmHeadingId())(),
      (await markedAlert())(),
      {
        ...(await markedHighlight())({
          async: true,
          highlight: async (code = '', lang = '') => {
            if (lang === 'mermaid') {
              if (!this.mermaid) {
                this.mermaid = await mermaid()
                this.mermaid.initialize({ startOnLoad: false })
              }
              const { svg } = await this.mermaid.render(`mermaid-svg-${uid++}`, code)
              return svg
            }
            if (lang === 'math') return await parseKatex(code, { displayMode: true })
            if (!this.hljs) this.hljs = await hljs()
            return this.hljs.getLanguage(lang)
              ? this.hljs.highlight(code, { language: lang }).value
              : this.hljs.highlightAuto(code).value
          }
        }),
        renderer: {
          code: ({ text = '', lang = '' }) => {
            if (lang === 'mermaid') return `<div class="mermaid">${text}</div>`
            if (lang === 'math') return text
            return `<pre><code class="hljs${lang ? ` language-${lang}` : ''}">${text}\n</code></pre>`
          }
        }
      },
      {
        ...katexExtension(katexOptions),
        walkTokens: async (/** @type {*} */ token) => {
          if (['inlineKatex', 'blockKatex'].includes(token.type)) {
            token.text = await parseKatex(token.text, { displayMode: token.type === 'blockKatex' })
          }
        }
      }
    )
  }

  async parse({ text = '', baseUrl = '' }) {
    this.marked.use(this.setBaseUrl(baseUrl || ''))
    return this.marked.parse(text)
  }
}
