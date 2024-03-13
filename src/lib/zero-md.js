import ZeroMdBase from './zero-md-base.js'
import { markedHighlight } from 'marked-highlight'
import extensions from './katex.js'

let uid = 0

/**
 * Extends ZeroMdBase with syntax highlighting, math and mermaid features
 */
class ZeroMd extends ZeroMdBase {
  constructor() {
    super()
    this.template +=
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/styles/github.min.css"><link rel="stylesheet" media="(prefers-color-scheme: dark)" href="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/styles/github-dark.min.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0/dist/katex.min.css">'
    this.marked.use(
      {
        ...markedHighlight({
          async: true,
          highlight: async (code, lang) => {
            if (lang === 'mermaid') {
              if (!this.mermaid) await this.loadMermaid()
              const { svg } = await this.mermaid.render(`mermaid-svg-${uid++}`, code)
              return svg
            }
            if (lang === 'math') {
              if (!this.katex) await this.loadKatex()
              return this.runKatex(code, { displayMode: true })
            }
            if (!this.hljs) await this.loadHljs()
            if (this.hljs.getLanguage(lang)) {
              return this.hljs.highlight(code, { language: lang }).value
            } else {
              return this.hljs.highlightAuto(code).value
            }
          }
        }),
        renderer: {
          code: (code, lang) => {
            if (lang === 'mermaid') return `<pre class="mermaid">${code}</pre>`
            if (lang === 'math') return code
            return `<pre><code class="hljs${lang ? ` language-${lang}` : ''}">${code}\n</code></pre>`
          }
        }
      },
      {
        extensions: extensions(),
        walkTokens: async (token) => {
          if (['inlineKatex', 'blockKatex'].includes(token.type)) {
            if (!this.katex) await this.loadKatex()
            // @ts-ignore
            token.text = this.runKatex(token.text, { displayMode: token.type === 'blockKatex' })
          }
        }
      }
    )
  }
  async loadHljs() {
    const module = await import(
      'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11/es/highlight.min.js'
    )
    this.hljs = module.default
  }
  async loadMermaid() {
    const module = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs')
    this.mermaid = module.default
    this.mermaid.initialize({ startOnLoad: false })
  }
  async loadKatex() {
    const module = await import('https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.mjs')
    this.katex = module.default
  }
  runKatex(text = '', opts = {}) {
    return this.katex.renderToString(text, { ...opts, throwOnError: false })
  }
}

export default ZeroMd
