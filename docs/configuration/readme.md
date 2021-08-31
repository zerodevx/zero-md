## Configuration

### Default configs

Internally, `<zero-md>` uses the following defaults in its constructor:

```js
{
  // URLs of Marked and Prism libraries
  markedUrl: 'https://cdn.jsdelivr.net/gh/markedjs/marked@3/marked.min.js',
  // URLs in an array are loaded in the prescribed order
  prismUrl: [
    // Add `data-manual` attribute to its `<script>` tag
    ['https://cdn.jsdelivr.net/gh/PrismJS/prism@1/prism.min.js', 'data-manual'],
    'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js'
  ],
  // External stylesheets are loaded in the prescribed order
  cssUrls: [
    'https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css',
    'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css'
  ],
  // Host styles that apply to each instance
  hostCss: ':host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}'
}
```

`markedUrl` and `prismUrl` can either be a string, or an array of strings, and are automatically
loaded into the document via `<script>` tags upon element initialisation. If defined as an array,
the scripts are guaranteed to load **sequentially**.

#### Host styles

By default, each instance of `<zero-md>` has the following host styles applied onto itself:

```css
:host {
  display: block;
  position: relative;
  contain: content;
}
:host([hidden]) {
  display: none;
}
```

These are *sensible defaults* that help normalise behaviour across browsers and should be apt for most use-cases.
If need be, you can easily override these styles from outside the element.

```html
<style>
  #foo {
    display: inline-block;
    contain: none;
  }
</style>
...
<zero-md id="foo" src="example.md"></zero-md>
```

#### Marked and Prism libraries

Upon initialisation, `<zero-md>` first checks if the Marked and Prism libraries are already loaded.
If not, `<zero-md>` then load the libraries from their respective CDN locations specified
in `markedUrl` and `prismUrl`. This only happens *once*; multiple instances of `<zero-md>` that are
declared in the same document should not cause "double-loading".

The recommended way to override the default CDN locations is to load the libraries yourself *before*
loading `<zero-md>`. For example:

```html
<head>
  <!-- Load Marked and Prism yourself -->
  <script defer src="/lib/marked.js"></script>
  <script defer src="/lib/prism.js"></script>
  <!-- Then load `<zero-md>` -->
  <script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"></script>
</head>
```

#### Default style template

By default, each instance of `<zero-md>` applies the external stylesheets defined in `cssUrls`. Internally,

```html
<zero-md src="example.md"></zero-md>
```

is semantically equivalent to this:

```html
<zero-md src="example.md">
  <template>
    <style>
      :host {
        display: block;
        position: relative;
        contain: content;
      }
      :host([hidden]) {
        display: none;
      }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css">
  </template>
</zero-md>
```

You can override the default style template by passing in a new one.

```html
<zero-md src="example.md">
  <!-- This overrides the default template -->
  <template>
    <link rel="stylesheet" href="/custom-styles.css">
  </template>
</zero-md>
```

### Global config object

To override the default configs **globally** to **all** instances of `<zero-md>`, a `ZeroMdConfig` object
hoisted to the global `window` scope can be defined. For example:

```html
<head>
  <!-- Define globals first -->
  <script>
    window.ZeroMdConfig = {
      markedUrl: '/lib/marked.js',
      prismUrl: '/lib/prism.js',
      cssUrls: [
        '/styles/markdown.css',
        '/styles/highlight.css'
      ],
      hostCss: ':host{display:inline-block;}'
    }
  </script>
  <!-- Then load `<zero-md>` -->
  <script type="module" src="/lib/zero-md.min.js"></script>
</head>
<body>
  ...
  <!-- New configs apply to all instances of `<zero-md>` -->
  <zero-md src="example.md"></zero-md>
</body>
```

#### Change default style template globally

By default, `<zero-md>` uses a Github-themed stylesheet paired with a light-themed one for code blocks.
To update the default external stylesheets globally, define a global config object.

```html
<head>
  <script>
    window.ZeroMdConfig = {
      // Use these stylesheets in default template
      cssUrls: [
        '/styles/markdown.css',
        '/styles/highlight.css'
      ]
    }
  </script>
  <script type="module" src="/lib/zero-md.min.js"></script>
</head>
<body>
  ...
  <!-- Now, every instance of `<zero-md>` -->
  <zero-md src="example.md"></zero-md>
  ...
  <!-- Is semantically equivalent to this -->
  <zero-md src="example.md">
    <template>
      <link rel="stylesheet" href="/styles/markdown.css">
      <link rel="stylesheet" href="/styles/highlight.css">
    </template>
  </zero-md>
</body>
```

#### Change globals in web project

If you're using `<zero-md>` in a web project with a bundler, something like this should work:

```js
import ZeroMd from 'zero-md'

// Define a new custom class
class ZeroMdCustom extends ZeroMd {
  constructor () {
    // Call `super()` with new configs
    super({
      markedUrl: '/lib/marked.js',
      prismUrl: '/lib/prism.js',
      cssUrls: [
        '/styles/markdown.css',
        '/styles/highlight.css'
      ],
      hostCss: ':host{display:inline-block;}'
    })
  }
}

// Register the element with custom class
customElements.define('zero-md', ZeroMdCustom)
```

