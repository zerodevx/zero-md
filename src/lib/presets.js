const jsdelivr = (/** @type {string} */ repo) => `https://cdn.jsdelivr.net/npm/${repo}`
const link = (/** @type {string} */ href, /** @type {string|undefined} */ attrs) =>
  `<link rel="stylesheet" href="${href}"${attrs ? ` ${attrs}` : ''}>`
const load = async (/** @type {string} */ url, name = 'default') => (await import(url))[name]

export const STYLES = {
  HOST: '<style>:host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}.markdown-alert{padding:0.25rem 0 0 1rem!important;}</style>',
  MARKDOWN: link(jsdelivr('github-markdown-css@5/github-markdown.min.css')),
  MARKDOWN_LIGHT: link(jsdelivr('github-markdown-css@5/github-markdown-light.min.css')),
  MARKDOWN_DARK: link(jsdelivr('github-markdown-css@5/github-markdown-dark.min.css')),
  HIGHLIGHT_LIGHT: link(jsdelivr('@highlightjs/cdn-assets@11/styles/github.min.css')),
  HIGHLIGHT_DARK: link(jsdelivr('@highlightjs/cdn-assets@11/styles/github-dark.min.css')),
  HIGHLIGHT_PREFERS_DARK: link(
    jsdelivr('@highlightjs/cdn-assets@11/styles/github-dark.min.css'),
    `media="(prefers-color-scheme:dark)"`
  ),
  KATEX: link(jsdelivr('katex@0/dist/katex.min.css'))
}

export const LOADERS = {
  marked: async () => {
    const Marked = await load(jsdelivr('marked@12/lib/marked.esm.js'), 'Marked')
    return new Marked({ async: true })
  },
  markedBaseUrl: () => load(jsdelivr('marked-base-url@1/+esm'), 'baseUrl'),
  markedHighlight: () => load(jsdelivr('marked-highlight@2/+esm'), 'markedHighlight'),
  markedGfmHeadingId: () => load(jsdelivr('marked-gfm-heading-id@3/+esm'), 'gfmHeadingId'),
  markedAlert: () => load(jsdelivr('marked-alert@2/+esm')),
  hljs: () => load(jsdelivr('@highlightjs/cdn-assets@11/es/highlight.min.js')),
  katex: () => load(jsdelivr('katex@0/dist/katex.mjs')),
  mermaid: () => load(jsdelivr('mermaid@10/dist/mermaid.esm.min.mjs'))
}
