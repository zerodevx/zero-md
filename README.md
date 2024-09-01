![version](https://img.shields.io/npm/v/zero-md) ![license](https://img.shields.io/npm/l/zero-md)
![stars](https://img.shields.io/github/stars/zerodevx/zero-md?style=flat&color=yellow)
![downloads](https://img.shields.io/jsdelivr/npm/hm/zero-md)
![old](<https://img.shields.io/jsdelivr/gh/hm/zerodevx/zero-md?label=jsdelivr(old)&color=lightgray>)

# &lt;zero-md&gt;

> Ridiculously simple zero-config markdown displayer

A vanilla markdown-to-html web component based on
[Custom Elements V1 specs](https://www.w3.org/TR/custom-elements/) to load and display an external
MD file. Under the hood, it uses [`marked`](https://github.com/markedjs/marked) for super-fast
markdown transformation, and [`highlight.js`](https://github.com/highlightjs/highlight.js) for
lightning-quick syntax highlighting - automagically rendering into its own self-contained shadow DOM
container, while encapsulating implementation details into one embarrassingly easy-to-use package.

Featuring:

- [x] Math rendering via [`KaTeX`](https://github.com/KaTeX/KaTeX)
- [x] [`Mermaid`](https://github.com/mermaid-js/mermaid) diagrams
- [x] Syntax highlighting via [`highlight.js`](https://github.com/highlightjs/highlight.js)
- [x] Language detection for un-hinted code blocks
- [x] Hash-link scroll handling
- [x] FOUC prevention
- [x] Auto re-render on input changes
- [x] Light and dark themes
- [x] Spec-compliant extensibility

> [!IMPORTANT]  
> Your markdown file(s) must be hosted! Browsers restrict local file access in javascript because
> _security_. Standard [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rules apply.

Read the docs: https://zerodevx.github.io/zero-md/

> [!NOTE]  
> This is the V3 branch. If you're looking for the older version, see the
> [V2 branch](https://github.com/zerodevx/zero-md/tree/v2). If you are upgrading from V2, read the
> [migration guide](docs/migration.md).

## Installation

### Load via CDN (recommended)

`zero-md` is designed to be zero-config with good defaults. For most use-cases, just importing the
script from CDN and consuming the component directly should suffice.

```html
<head>
  ...
  <!-- Import element definition and auto-register -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/zero-md@3?register"></script>
</head>
<body>
  ...
  <!-- Profit! -->
  <zero-md src="example.md"></zero-md>
</body>
```

### Use in web projects

Install the package.

```
$ npm i zero-md
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

## Basic usage

<!-- prettier-ignore -->
```html
<!-- Simply set the `src` attribute and win -->
<zero-md src="https://example.com/markdown.md"></zero-md>

<!-- Or write markdown inline -->
<zero-md>
  <!-- Write your markdown inside a `<script type="text/markdown">` tag -->
  <script type="text/markdown">
# **This** is my [markdown](https://example.com)
  </script>
</zero-md>

<!-- Or update the style -->
<zero-md src="https://example.com/markdown.md">
  <!-- Wrap `style` tags inside `template` -->
  <template data-append>
    <style>
      p { color: red; }
    </style>
  </template>
</zero-md>
```

Read the docs: https://zerodevx.github.io/zero-md/

## Contributing

### Noticed a bug? Have a feature request?

Open a new [issue](https://github.com/zerodevx/zero-md/issues) in the Github repo, or raise a
[PR](https://github.com/zerodevx/zero-md/pulls) - I'd be stoked to hear from you!

### Development

Standard Github
[contribution workflow](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)
applies.

#### Run the dev server

```
$ npm run dev
```

We use [`Vite`](https://github.com/vitejs/vite) for tooling. Point your browser to
`http://localhost:5173` and you should see the test page. Library code in `src/lib/`.

#### Testing

```
$ npm test
```

Tests via [Playwright](https://github.com/microsoft/playwright). Test specs in `src/index.spec.js`.
Be sure tests pass in your PR.

### Updating docs

Documentation is in the `docs/` folder. Submit PRs onto the `.md` files directly and changes will be
automatically published upon merge. Documentation website uses
[`zero-md-docs`](https://github.com/zerodevx/zero-md-docs) to instantly publish markdown from the
Github `docs/` folder.

## Changelog

Check out the [releases](https://github.com/zerodevx/zero-md/releases) page.

## License

ISC

## Acknowledgement

A big thank you to the following contributors and sponsors! :pray:

### Contributors

<!-- prettier-ignore -->
<kbd>[<img src="https://github.com/alifeee.png" width="60px;"/>](https://github.com/alifeee)</kbd> <kbd>[<img src="https://github.com/EmilePerron.png" width="60px;"/>](https://github.com/EmilePerron)</kbd> <kbd>[<img src="https://github.com/bennypowers.png" width="60px;"/>](https://github.com/bennypowers)</kbd> <kbd>[<img src="https://github.com/TheUnlocked.png" width="60px;"/>](https://github.com/TheUnlocked)</kbd> <kbd>[<img src="https://github.com/ernsheong.png" width="60px;"/>](https://github.com/ernsheong)</kbd>

### Sponsors

<!-- prettier-ignore -->
<kbd>[<img src="https://github.com/RootofalleviI.png" width="60px;"/>](https://github.com/RootofalleviI)</kbd><kbd>[<img src="https://github.com/alifeee.png" width="60px;"/>](https://github.com/alifeee)</kbd>
