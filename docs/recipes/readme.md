## Recipes

### Use Prism `line-numbers` plugin

You can use Prism's wonderful suite of [plugins](https://prismjs.com/index.html#plugins) to extend
code block features. Here is a gist that implements the `line-numbers` plugin.

```html
<head>
  <!-- Load Prism core and language autoloader -->
  <script defer data-manual src="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/components/prism-core.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js"></script>
  <!-- Load `line-numbers` plugin -->
  <script defer src="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/line-numbers/prism-line-numbers.min.js"></script>
  <!-- Finally, load `<zero-md>` -->
  <script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"></script>
</head>
<body>
  <zero-md id="app" src="example.md" manual-render>
    <!-- Append CSS required for line-numbers -->
    <template data-merge="append">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/line-numbers/prism-line-numbers.css">
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

Repro: https://plnkr.co/edit/Rxvp5ShGacyTAIh5

### Add Copy-to-Clipboard button

In this recipe, a `Copy` button can be automatically added to all code blocks (like how it is in these docs)
using Prism's [`toolbar`](https://prismjs.com/plugins/toolbar/) and
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
  <script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"></script>
</head>
<body>
  <zero-md src="fixture.md"></zero-md>
</body>
```

Repro: https://plnkr.co/edit/quiZ7THsQRypBcKL
