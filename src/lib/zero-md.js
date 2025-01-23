// @ts-nocheck
import ZeroMdBase from './zero-md-base.js'
import katexExtension from './katex-extension.js'
import { STYLES, LOADERS } from './presets.js'

let hljsHoisted
let mermaidHoisted
let katexHoisted
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
      katexOptions = { nonStandard: true, throwOnError: false }
    } = { ...LOADERS, ...loaders }
    this.template = STYLES.preset()
    const modules = await Promise.all([
      marked(),
      markedBaseUrl(),
      markedGfmHeadingId(),
      markedAlert(),
      markedHighlight()
    ])
    this.marked = modules[0]
    this.setBaseUrl = modules[1]
    const parseKatex = async (text, displayMode) => {
      if (!katexHoisted) katexHoisted = await katex()
      return katexHoisted.renderToString(text, { displayMode, ...katexOptions })
    }
    this.marked.use(
      modules[2](),
      modules[3](),
      {
        ...modules[4]({
          async: true,
          highlight: async (code, lang) => {
            if (lang === 'mermaid') {
              if (!mermaidHoisted) {
                mermaidHoisted = await mermaid()
                mermaidHoisted.initialize({ startOnLoad: false })
              }
              const { svg } = await mermaidHoisted.render(`mermaid-svg-${uid++}`, code)
              return svg
            }
            if (lang === 'math') return `<pre class="math">${await parseKatex(code, true)}</pre>`
            if (!hljsHoisted) hljsHoisted = await hljs()
            return hljsHoisted.getLanguage(lang)
              ? hljsHoisted.highlight(code, { language: lang }).value
              : hljsHoisted.highlightAuto(code).value
          }
        }),
        renderer: {
          code: ({ text, lang }) => {
            if (lang === 'mermaid') return `<div class="mermaid">${text}</div>`
            if (lang === 'math') return text
            return `<pre><code class="hljs${lang ? ` language-${lang}` : ''}">${text}\n</code></pre>`
          }
        }
      },
      {
        ...katexExtension(katexOptions),
        walkTokens: async (token) => {
          const types = ['inlineKatex', 'blockKatex']
          if (types.includes(token.type)) {
            token.text =
              (await parseKatex(token.text, token.displayMode)) +
              (token.type === types[1] ? '\n' : '')
          }
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
