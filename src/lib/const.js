const DEFAULT_HOST_CSS =
  '<style>:host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}</style>'

const jsdelivr = (url = '') => `https://cdn.jsdelivr.net/npm/${url}`

/**
 * @type {string[][]} First element is href, subsequent elements if any are attributes
 */
const DEFAULT_STYLESHEETS = [
  [jsdelivr('github-markdown-css@5/github-markdown.min.css')],
  [jsdelivr('@highlightjs/cdn-assets@11/styles/github.min.css')],
  [
    jsdelivr('@highlightjs/cdn-assets@11/styles/github-dark.min.css'),
    'media="(prefers-color-scheme:dark)"'
  ],
  [jsdelivr('katex@0/dist/katex.min.css')]
]

const DEFAULT_LIBRARIES = {
  marked: jsdelivr('marked@12/lib/marked.esm.js'),
  markedBaseUrl: jsdelivr('marked-base-url@1/+esm'),
  markedHighlight: jsdelivr('marked-highlight@2/+esm'),
  markedExtensions: [
    [jsdelivr('marked-gfm-heading-id@3/+esm'), 'gfmHeadingId'],
    [jsdelivr('marked-alert@2/+esm')]
  ],
  hljs: jsdelivr('@highlightjs/cdn-assets@11/es/highlight.min.js'),
  katex: jsdelivr('katex@0/dist/katex.mjs'),
  mermaid: jsdelivr('mermaid@10/dist/mermaid.esm.min.mjs')
}

export { DEFAULT_HOST_CSS, DEFAULT_STYLESHEETS, DEFAULT_LIBRARIES }
