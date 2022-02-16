![GitHub package.json version](https://img.shields.io/github/package-json/v/zerodevx/zero-md)
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/zerodevx/zero-md)

# &lt;zero-md&gt;

> Ridiculously simple zero-config markdown displayer

A native markdown-to-html web component based on
[Custom Elements V1 specs](https://www.w3.org/TR/custom-elements/) to load and display an external
MD file. Under the hood, it uses [Marked](https://github.com/markedjs/marked) for super-fast
markdown transformation, and [Prism](https://github.com/PrismJS/prism) for feature-packed syntax
highlighting - automagically rendering into its own self-contained shadow DOM container, while
encapsulating implementation details into one embarassingly easy-to-use package.

**NOTE: This is the V2 branch. If you're looking for the older version, see the
[V1 branch](https://github.com/zerodevx/zero-md/tree/v1).**

Featuring:

- [x] Automated hash-link scrolls
- [x] Built-in FOUC prevention
- [x] Automatically rewrite URLs relative to `src`
- [x] Automatically re-render when `src` changes
- [x] Automatically re-render when inline markdown or style template changes
- [x] Support for >200 code languages with detection for unhinted code blocks
- [x] Easy styling mechanism
- [x] Highly extensible

Documentation: https://zerodevx.github.io/zero-md/

**NOTE: Your markdown file(s) needs to be hosted! Browsers don't generally allow javascript to
access files on the local hard drive because of security concerns. Standard
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rules apply.**

## Installation

### Load via CDN (recommended)

`zero-md` is designed to be zero-config with good defaults. For most use-cases, just importing the
script from CDN and consuming the component directly should suffice.

```html
<head>
  ...
  <!-- Import element definition -->
  <script
    type="module"
    src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"
  ></script>
  ...
</head>
<body>
  ...
  <!-- Profit! -->
  <zero-md src="/example.md"></zero-md>
  ...
</body>
```

Latest stable: `https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js`

Latest beta: `https://cdn.jsdelivr.net/npm/zero-md@next/dist/zero-md.min.js`

### Install in web projects

Install package with `npm` or `yarn`. Note that you'll need [Node.js](https://nodejs.org/)
installed.

```
$ npm install --save zero-md
```

Import the class, register the element, and use anywhere.

```js
// Import the element definition
import ZeroMd from 'zero-md'

// Register the custom element
customElements.define('zero-md', ZeroMd)

// Render anywhere
app.render(`<zero-md src=${src}></zero-md>`, target)
```

Or load the distribution directly in HTML.

```html
<script type="module" src="/node_modules/zero-md/dist/zero-md.min.js"></script>
...
<zero-md src="example.md"></zero-md>
```

## Basic Usage

### Display an external markdown file

```html
<!-- Simply set the `src` attribute and win -->
<zero-md src="https://example.com/markdown.md"></zero-md>
```

At its most basic, `<zero-md>` loads and displays an external MD file with **default stylesheets** -
a Github-themed stylesheet paired with a light-themed one for code blocks, just like what you see in
these docs. So internally, the above code block is semantically equivalent to the one below:

```html
<zero-md src="https://example.com/markdown.md">
  <!-- By default, this style template gets loaded -->
  <template>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css"
    />
  </template>
</zero-md>
```

### Using your own styles

To override the default theme, supply your own style template.

```html
<zero-md src="https://example.com/markdown.md">
  <!-- Wrap with a <template> tag -->
  <template>
    <!-- Define your own styles inside a `<style>` tag -->
    <style>
      h1 {
        color: red;
      }
      ...;
    </style>
  </template>
</zero-md>
```

### Or your own stylesheets

```html
<zero-md src="https://example.com/markdown.md">
  <!-- Wrap with a <template> tag -->
  <template>
    <!-- Load external stylesheets with a `<link rel="stylesheet">` tag -->
    <link rel="stylesheet" href="markdown-styles.css" />
    <link rel="stylesheet" href="highlight-styles.css" />
  </template>
</zero-md>
```

### Or both

```html
<zero-md src="https://example.com/markdown.md">
  <template>
    <!-- The CSS load order is respected -->
    <link rel="stylesheet" href="markdown-styles.css" />
    <style>
      h1 {
        color: red;
      }
    </style>
    <link rel="stylesheet" href="highlight-styles.css" />
    <style>
      code {
        background: yellow;
      }
    </style>
  </template>
</zero-md>
```

### Write markdown inline

You can pass in your markdown inline too.

```html
<!-- Do not set the `src` attribute -->
<zero-md>
  <!-- Write your markdown inside a `<script type="text/markdown">` tag -->
  <script type="text/markdown">
    # **This** is my [markdown](https://example.com)
  </script>
</zero-md>
```

By default, `<zero-md>` first tries to render `src`. If `src` is falsy (undefined, file not found,
empty file etc), it **falls-back** to the contents inside the `<script type="text/markdown">` tag.

### Put it all together

```html
<zero-md src="https://example.com/markdown.md">
  <template>
    <link rel="stylesheet" href="markdown-styles.css" />
    <style>
      h1 {
        color: red;
      }
    </style>
    <link rel="stylesheet" href="highlight-styles.css" />
    <style>
      code {
        background: yellow;
      }
    </style>
  </template>
  <script type="text/markdown">
    This is the fall-back markdown that will **only show** when `src` is falsy.
  </script>
</zero-md>
```

## API

Advanced usage: https://zerodevx.github.io/zero-md/advanced-usage/

Attributes and helpers: https://zerodevx.github.io/zero-md/attributes-and-helpers/

Configuration: https://zerodevx.github.io/zero-md/configuration/

## Migrating from V1 to V2

1. Support for `<xmp>` tag is removed; use `<script type="text/markdown">` instead.

```html
<!-- Previous -->
<zero-md>
  <template>
    <xmp
>
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
    <xmp
>
# This has first priority and will be rendered instead of `will-not-render.md`
    </xmp>
  </template>
  <zero-md>
    <!-- Now -->
    <zero-md src="will-render-unless-falsy.md">
      <script type="text/markdown">
        # This will NOT be rendered _unless_ `src` resolves to falsy
      </script>
      <zero-md></zero-md></zero-md></zero-md
></zero-md>
```

3. The `css-urls` attribute is deprecated. Use `<link rel="stylesheet">` instead.

```html
<!-- Previous -->
<zero-md src="example.md" css-urls='["/style1.css", "/style2.css"]'
  ><zero-md>
    <!-- Now, this... -->
    <zero-md src="example.md"></zero-md>

    <!-- ...is actually equivalent to this -->
    <zero-md src="example.md">
      <template>
        <!-- These are the default stylesheets -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css"
        />
      </template>
    </zero-md>

    <!-- So, to apply your own external stylesheets... -->
    <zero-md src="example.md">
      <!-- ...you overwrite the default template -->
      <template>
        <!-- Use <link> tags to reference your own stylesheets -->
        <link rel="stylesheet" href="/style1.css" />
        <link rel="stylesheet" href="/style2.css" />
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
    </zero-md></zero-md
  ></zero-md
>
```

4. The attributes `marked-url` and `prism-url` are deprecated. To load `marked` or `prism` from
   another location, simply load their scripts _before_ importing `zero-md`.

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
      cssUrls: ['/styles/my-markdown-theme.css', '/styles/my-highlight-theme.css']
    }
  }
</script>
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/src/zero-md.min.js"
></script>

<!-- Now -->
<script>
  window.ZeroMdConfig = {
    cssUrls: ['/styles/my-markdown-theme.css', '/styles/my-highlight-theme.css']
  }
</script>
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"
></script>
```

6. The convenience events `zero-md-marked-ready` and `zero-md-prism-ready` are removed and **will no
   longer fire**. Instead, the `zero-md-ready` event guarantees that everything is ready, and that
   render can begin.

## Contributing

### Noticed a bug? Have a feature request?

Open a new [issue](https://github.com/zerodevx/zero-md/issues) in the Github repo, or raise a
[PR](https://github.com/zerodevx/zero-md/pulls)! I'd be stoked to accept any contributions!

### Development

Standard Github [contribution workflow](https://github.com/firstcontributions/first-contributions)
applies.

#### Run the dev server

```
$ npm run dev
```

Point your browser to `http://localhost:8000` and you should see the test suite running.

#### Testing

Tests are browser-based and run on [Mocha](https://mochajs.org/) with
[Chai](https://www.chaijs.com/) asserts. If you're adding a new feature or bugfixing, please add the
corresponding regression test into `test/index.spec.js` accordingly.

#### Format and lint

```
$ npm run format
$ npm run lint
```

Formatting and linting by [prettier](https://github.com/prettier/prettier) and
[eslint](https://github.com/eslint/eslint) respectively.

#### Making changes to docs

Documentation is in the `/docs` folder in the form of `readme.md` files, and published on
[Github Pages](https://pages.github.com/). This setup is based on
[`zero-md-docs`](https://github.com/zerodevx/zero-md-docs).

To make changes to docs, simply raise a PR on any `readme.md` files should suffice.

## License

ISC

## Acknowledgements

Big thank you to contributors [@EmilePerron](https://github.com/EmilePerron),
[@bennypowers](https://github.com/bennypowers), [@TheUnlocked](https://github.com/TheUnlocked),
[@ernsheong](https://github.com/ernsheong) for your code commits. :thumbsup:

## Version History

Check out the [releases](https://github.com/zerodevx/zero-md/releases) page.
