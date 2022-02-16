## Recipes

### Support Mermaid diagrams

Until [first-class support](https://github.com/zerodevx/zero-md/issues/65) for
[mermaid](https://github.com/mermaid-js/mermaid) is added into `<zero-md>`, the below technique can
be used in the meantime.

```html
<head>
  ...
  <!-- Load mermaid -->
  <script defer src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <script
    type="module"
    src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"
  ></script>
</head>

<body>
  <!-- Render zero-md in light dom -->
  <zero-md id="app" src="mermaid.md" no-shadow manual-render></zero-md>
  <script>
    app.addEventListener('zero-md-ready', async () => {
      // Create custom marked renderer
      const renderer = new marked.Renderer()
      renderer.code = function (code, lang) {
        return lang === 'mermaid'
          ? `<div class="mermaid">${code}</div>`
          : `<pre><code>${code}</code></pre>`
      }
      await app.render({ renderer })
      mermaid.init()
    })
  </script>
</body>
```

Demo: https://plnkr.co/edit/Q64k8e498RfGDdlC

### Use Prism `line-numbers` plugin

You can use Prism's wonderful suite of [plugins](https://prismjs.com/index.html#plugins) to extend
code block features. Here is a gist that implements the `line-numbers` plugin.

```html
<head>
  <!-- Load Prism core and language autoloader -->
  <script
    defer
    data-manual
    src="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/components/prism-core.min.js"
  ></script>
  <script
    defer
    src="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js"
  ></script>
  <!-- Load `line-numbers` plugin -->
  <script
    defer
    src="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/line-numbers/prism-line-numbers.min.js"
  ></script>
  <!-- Finally, load `<zero-md>` -->
  <script
    type="module"
    src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"
  ></script>
</head>
<body>
  <zero-md id="app" src="example.md" manual-render>
    <!-- Append CSS required for line-numbers -->
    <template data-merge="append">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/line-numbers/prism-line-numbers.css"
      />
    </template>
  </zero-md>
  <script>
    const app = document.querySelector('#app')
    // Listen to the ready event
    app.addEventListener('zero-md-ready', () => {
      // Then add the `line-numbers` class onto markdown body
      app.render({ classes: 'line-numbers' })
    })
  </script>
</body>
```

Demo: https://plnkr.co/edit/Rxvp5ShGacyTAIh5

### Add Copy-to-Clipboard button

In this recipe, a `Copy` button is automatically added to all code blocks using Prism's
[`toolbar`](https://prismjs.com/plugins/toolbar/) and
[`copy-to-clipboard`](https://prismjs.com/plugins/copy-to-clipboard/) plugins.

```html
<head>
  <script>
    // Make use of global config object to change default options
    window.ZeroMdConfig = {
      prismUrl: [
        // Default Prism URLs
        ['https://cdn.jsdelivr.net/gh/PrismJS/prism@1/prism.min.js', 'data-manual'],
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js',
        // Also load Prism's `toolbar` and `copy-to-clipboard` plugins
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/toolbar/prism-toolbar.min.js',
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js'
      ],
      cssUrls: [
        // Default stylesheets
        'https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css',
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css',
        // Include CSS for `toolbar` plugin
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/toolbar/prism-toolbar.min.css'
      ]
    }
  </script>
  <script
    type="module"
    src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"
  ></script>
</head>
<body>
  <zero-md src="fixture.md"></zero-md>
</body>
```

Demo: https://plnkr.co/edit/quiZ7THsQRypBcKL

### Support MathJax

[MathJax](https://github.com/mathjax/MathJax) can be supported using the below method:

`math.md`

```
## Hello World

$a_2 + b^2 = d^e $
```

`index.html`

```html
<head>
  <!-- Configure your MathJax settings -->
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)']
        ]
      }
    }
  </script>
  <script async src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js"></script>
</head>
<body>
  <!-- Render zero-md into light dom -->
  <zero-md id="app" src="my-markdown.md" no-shadow></zero-md>

  <!-- Load the MathJax library AFTER markdown is rendered -->
  <script>
    app.addEventListener('zero-md-rendered', () => {
      let el = document.createElement('script')
      el.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js'
      document.head.appendChild(el)
    })
  </script>
</body>
```

Demo: https://plnkr.co/edit/SdzWj39SOVpntGTn
