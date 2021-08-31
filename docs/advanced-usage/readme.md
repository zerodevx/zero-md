## Advanced Usage

### Supporting legacy browsers (or IE11)

`<zero-md>` is based on [Custom Elements V1 specs](https://www.w3.org/TR/custom-elements/) which
is [natively](https://caniuse.com/custom-elementsv1) [supported](https://caniuse.com/shadowdomv1)
in all modern browsers - since at least **three** major versions ago across all vendors. Correspondingly,
there is therefore less need for [web component polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs).
However, while *not* recommended, if there is a strong case to support legacy browsers, you can
do so like this:

```html
<head>
  <!-- Lightweight client-side loader that feature-detects and load polyfills only when necessary -->
  <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.min.js"></script>
  <!-- Load the legacy (transpiled) build of <zero-md> -->
  <script defer src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.legacy.min.js"></script>
</head>
```

### Specify your own URLs for Marked or Prism

By default, `<zero-md>` automatically loads the [Markedjs](https://cdn.jsdelivr.net/gh/markedjs/marked@1/marked.min.js)
and [Prismjs](https://cdn.jsdelivr.net/gh/PrismJS/prism@1/prism.min.js) libraries from CDN. To use your own
URLs, do so like this:

```html
<head>
  <!-- Optionally load marked from your own URL first -->
  <script defer src="/node_modules/marked/marked.min.js"></script>
  <!-- Or prismjs from your own URL -->
  <script defer src="/node_modules/prismjs/prism.js"></script>
  <!-- Then load <zero-md> -->
  <script type="module" src="/node_modules/zero-md/dist/zero-md.min.js"></script>
</head>
```

### Append (or prepend) additional styles

You can *merge* any additional style templates into an instance of `<zero-md>` like this:

```html
<zero-md src="example.md">
  <!-- Style template prepended before default styles -->
  <template data-merge="prepend">
    <link rel="stylesheet" href="/normalize.css">
  </template>
  <!-- Style template appended after default styles -->
  <template data-merge="append">
    <style>
      h1 {
        color: red;
      }
    </style>
  </template>
</zero-md>
```

### Dedent inline markdown

You can *opt-in* to apply a dedent function onto the inline markdown. The function *tries* to remove the
leading whitespace that would otherwise be incorrectly interpreted as a code block by the markdown
parser.

```html
<zero-md>
  <!-- Set `data-dedent` to remove indentation -->
  <script type="text/markdown" data-dedent>
    # Opt in to apply dedent function
    If **indentation** is important to you.
  </script>
</zero-md>
```

### Apply marked options during render

```html
<!-- Set manual-render to disable auto render -->
<zero-md id="app" src="example.md" manual-render></zero-md>
<script>
  // Pass marked opts into render() function
  app.render({
    gfm: false,
    ...
  })
</script>
```


