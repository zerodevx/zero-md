# zero-md

![version](https://img.shields.io/npm/v/zero-md) ![license](https://img.shields.io/npm/l/zero-md)
![stars](https://img.shields.io/github/stars/zerodevx/zero-md?style=flat&color=yellow)
![jsdelivr](https://data.jsdelivr.com/v1/package/npm/zero-md/badge)
![old](https://img.shields.io/jsdelivr/gh/hm/zerodevx/zero-md?label=jsDelivr%28old%29&color=lightgray)

## Advanced Usage

> [!WARNING]
>
> By default, `<zero-md>` **does not sanitize** the output HTML. If you render markdown from
> untrusted sources, you must use an HTML sanitization library. See
> [Sanitize HTML Output](#sanitize-html-output) for an example.

- [API](#api)
- [Extensibility](#extensibility)

## API

### Element Attributes

The following attributes are supported on the `<zero-md>` element:

| Attribute    | Type    | Description                                                                           |
| ------------ | ------- | ------------------------------------------------------------------------------------- |
| `src`        | String  | The URL of the external markdown file to load.                                        |
| `no-auto`    | Boolean | Disables automatic rendering. When set, you must call the `render()` method manually. |
| `no-shadow`  | Boolean | Renders the HTML directly into the Light DOM instead of the Shadow DOM.               |
| `body-class` | String  | CSS class names to apply to the `.markdown-body` container.                           |

#### Notes

1. **CORS Policies**: Standard CORS rules apply. Files fetched from another origin must be served
   with appropriate `Access-Control-Allow-Origin` headers.
2. **Shadow DOM**: The `no-shadow` attribute is immutable. It must be declared when the element is
   created and cannot be changed dynamically.

### Style Template Attributes

The following attributes are supported on child `<template>` tags:

| Attribute      | Type    | Description                                                |
| -------------- | ------- | ---------------------------------------------------------- |
| `data-append`  | Boolean | Applies the template styles **after** the default styles.  |
| `data-prepend` | Boolean | Applies the template styles **before** the default styles. |

If neither attribute is set, the `<template>` overrides the default styles completely.

### Events

The element dispatches the following custom events:

| Event Name         | Detail                             | Description                                                                         |
| ------------------ | ---------------------------------- | ----------------------------------------------------------------------------------- |
| `zero-md-ready`    | `undefined`                        | Dispatched when the instance setup is complete and ready to render.                 |
| `zero-md-rendered` | `{styles: boolean, body: boolean}` | Dispatched when a render completes. Details which blocks were stamped into the DOM. |

### The `render()` Function

By default, `<zero-md>` automatically renders when the component is ready and whenever markdown
content or attributes change. To control rendering manually, add the `no-auto` attribute:

```html
<zero-md src="example.md" no-auto></zero-md>
<script>
  // Render manually once when the component is ready
  addEventListener('zero-md-ready', (e) => e.target.render())
</script>
```

The `render()` function returns a `Promise` that resolves to `{ styles: boolean, body: boolean }`.

## Extensibility

Extend the component's functionality by creating a subclass of `ZeroMd`. This aligns with the
standard Custom Elements V1 specification.

### The `load()` Function

The `load()` function runs once when the element is created. It is the best place to configure
defaults.

#### Global Config

Override the default style template globally:

<!-- prettier-ignore -->
```html
<script type="module">
  import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'

  customElements.define('zero-md', class extends ZeroMd {
    async load() {
      await super.load()
      this.template = `
<style>:host { display: block; }</style>
<link rel="stylesheet" href="path/to/markdown-styles.css" />
<link rel="stylesheet" href="path/to/highlight-styles.css" />`
    }
  })
</script>
```

#### Set Themes Globally

Force a light or dark theme preset globally:

<!-- prettier-ignore -->
```html
<script type="module">
  import ZeroMd, { STYLES } from 'https://cdn.jsdelivr.net/npm/zero-md@3'

  customElements.define('zero-md', class extends ZeroMd {
    async load() {
      await super.load()
      this.template = STYLES.preset('light') // or STYLES.preset('dark')
    }
  })
</script>
```

#### Set Default Attributes

Apply default attributes to all instances:

<!-- prettier-ignore -->
```html
<script type="module">
  import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'

  customElements.define('zero-md', class extends ZeroMd {
    async load() {
      await super.load()
      this.setAttribute('no-auto', '')   // disable auto-render for all instances
      this.setAttribute('no-shadow', '') // render in Light DOM by default
    }
  })
</script>
```

#### Add `marked` Extensions

Register additional markdown features using `marked` extensions:

<!-- prettier-ignore -->
```html
<script type="module">
  // Example: Add GitHub-style footnote support
  import markedFootnote from 'https://cdn.jsdelivr.net/npm/marked-footnote@1/+esm'
  import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'

  customElements.define('zero-md', class extends ZeroMd {
    async load() {
      await super.load()
      this.marked.use(markedFootnote())
    }
  })
</script>
```

You can also load extensions that require API calls (like custom emojis):

<!-- prettier-ignore -->
```js
import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'
import { markedEmoji } from 'https://cdn.jsdelivr.net/npm/marked-emoji@1/src/index.js'
import { Octokit } from 'https://esm.sh/@octokit/rest'

const octokit = new Octokit()
const res = await octokit.rest.emojis.get()
const emojis = res.data

customElements.define('zero-md', class extends ZeroMd {
  async load() {
    await super.load()
    this.marked.use(markedEmoji({ emojis, unicode: false }))
  }
})
```

#### Custom Async Loaders

You can customize how libraries are loaded. This is useful if you want to change CDN hosts, load
libraries locally, or bundle them:

```js
import ZeroMd from 'zero-md'
import { Marked } from 'marked'

customElements.define(
  'zero-md',
  class extends ZeroMd {
    async load() {
      await super.load({
        marked: () => new Marked(), // load self-hosted Marked library
        hljs: () => import('path/to/lib') // change highlight.js load source
      })
    }
  }
)
```

You can also use an async loader stub to disable syntax highlighting entirely:

<!-- prettier-ignore -->
```js
import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'

function stub() {
  return {
    getLanguage() {},
    highlightAuto(code) {
      return { value: code }
    }
  }
}

customElements.define('zero-md', class extends ZeroMd {
  async load() {
    await super.load({ hljs: stub })
  }
})
```

#### KaTeX Options

Pass custom options to the mathematical equations renderer (see
[KaTeX options](https://katex.org/docs/options.html)):

<!-- prettier-ignore -->
```html
<script type="module">
  import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'

  customElements.define('zero-md', class extends ZeroMd {
    async load() {
      await super.load({
        katexOptions: {
          macros: {
            N: '{\\mathbb{N}}',
            Z: '\\mathbb{Z}',
            Q: '\\mathbb{Q}',
            R: '\\mathbb{R}'
          }
        }
      })
    }
  })
</script>
```

### The `parse()` Function

The `parse()` function runs during every render to convert the markdown string into HTML. You can
override it to perform pre- or post-processing.

#### Sanitize HTML Output

To sanitize HTML output using a client-side library like DOMPurify:

<!-- prettier-ignore -->
```html
<head>
  <script defer src="https://cdn.jsdelivr.net/npm/dompurify@3/dist/purify.min.js"></script>
  <script type="module">
    import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'

    customElements.define('zero-md', class extends ZeroMd {
      async parse(obj) {
        const parsed = await super.parse(obj)
        return window.DOMPurify.sanitize(parsed)
      }
    })
  </script>
</head>
<body>
  <zero-md src="https://danger.com/unsafe.md"></zero-md>
</body>
```
