// @ts-nocheck
/* eslint-disable */

// Code from https://github.com/UziTech/marked-katex-extension

export default function extensions() {
  const inlineRule =
    /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/
  const blockRule = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/
  return [
    {
      name: 'inlineKatex',
      level: 'inline',
      start(src) {
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
      tokenizer(src, tokens) {
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
      renderer(token) {
        return token.text
      }
    },
    {
      name: 'blockKatex',
      level: 'block',
      tokenizer(src, tokens) {
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
      renderer(token) {
        return token.text
      }
    }
  ]
}
