## Migration Guide

### Migrating from V1 to V2

1. Support for `<xmp>` tag is removed; use `<script type="text/markdown">` instead.

```html
<!-- Previous -->
<zero-md>
  <template>
    <xmp>
# `This` is my [markdown](example.md)
    </xmp>
  </template>
</zero-md>

<!-- Now -->
<zero-md>
  <!-- No need to wrap with <template> tag -->
  <script type="text/markdown">
# `This` is my [markdown](example.md)
  </script>
</zero-md>

<!-- If you need your code to be pretty, -->
<zero-md>
  <!-- Set `data-dedent` to opt-in to dedent the text during render -->
  <script type="text/markdown" data-dedent>
    # It is important to be pretty
    So having spacing makes me happy.
  </script>
</zero-md>
```

2. Markdown source behaviour has changed. Think of `<script type="text/markdown">` as a "fallback".

```html
<!-- Previous -->
<zero-md src="will-not-render.md">
  <template>
    <xmp>
# This has first priority and will be rendered instead of `will-not-render.md`
    </xmp>
  </template>
<zero-md>

<!-- Now -->
<zero-md src="will-render-unless-falsy.md">
  <script type="text/markdown">
# This will NOT be rendered *unless* `src` resolves to falsy
  </script>
<zero-md>
```

3. The `css-urls` attribute is deprecated. Use `<link rel="stylesheet">` instead.

```html
<!-- Previous -->
<zero-md src="example.md" css-urls='["/style1.css", "/style2.css"]'><zero-md>

<!-- Now, this... -->
<zero-md src="example.md"></zero-md>

<!-- ...is actually equivalent to this -->
<zero-md src="example.md">
  <template>
    <!-- These are the default stylesheets -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css">
  </template>
</zero-md>

<!-- So, to apply your own external stylesheets... -->
<zero-md src="example.md">
  <!-- ...you overwrite the default template -->
  <template>
    <!-- Use <link> tags to reference your own stylesheets -->
    <link rel="stylesheet" href="/style1.css">
    <link rel="stylesheet" href="/style2.css">
    <!-- You can even apply additional styles -->
    <style>
      p {
        color: red;
      }
    </style>
  </template>
</zero-md>

<!-- If you like the default stylesheets but wish to apply some overrides -->
<zero-md src="example.md">
  <!-- Set `data-merge` to "append" to apply this template AFTER the default template -->
  <!-- Or "prepend" to apply this template BEFORE -->
  <template data-merge="append">
    <style>
      p {
        color: red;
      }
    </style>
  </template>
</zero-md>
```

4. The attributes `marked-url` and `prism-url` are deprecated. To load `marked` or `prism` from another
location, simply load their scripts *before* importing `zero-md`.

```html
<head>
  ...
  <script defer src="/lib/marked.js"></script>
  <script defer src="/lib/prism.js"></script>
  <script type="module" src="/lib/zero-md.min.js"></script>
</head>

```

5. The global config object has been renamed from `ZeroMd.config` to `ZeroMdConfig`.

```html
<!-- Previous -->
<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
<script>
  window.ZeroMd = {
    config: {
      cssUrls: [
        '/styles/my-markdown-theme.css',
        '/styles/my-highlight-theme.css'
      ]
    }
  };
</script>
<script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js"></script>

<!-- Now -->
<script>
  window.ZeroMdConfig = {
    cssUrls: [
      '/styles/my-markdown-theme.css',
      '/styles/my-highlight-theme.css'
    ]
  }
</script>
<script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"></script>
```

6. The convenience events `zero-md-marked-ready` and `zero-md-prism-ready` are removed and **will no longer fire**.
Instead, the `zero-md-ready` event guarantees that everything is ready, and that render can begin.
