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
