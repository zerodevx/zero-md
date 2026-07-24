![version](https://img.shields.io/npm/v/zero-md) ![license](https://img.shields.io/npm/l/zero-md)
![stars](https://img.shields.io/github/stars/zerodevx/zero-md?style=flat&color=yellow)
![jsdelivr](https://data.jsdelivr.com/v1/package/npm/zero-md/badge)
![old](https://img.shields.io/jsdelivr/gh/hm/zerodevx/zero-md?label=jsDelivr%28old%29&color=lightgray)

# zero-md

> Ridiculously simple zero-config markdown displayer

A zero-config web component that converts markdown to HTML. Built on the
[Custom Elements V1 specification](https://www.w3.org/TR/custom-elements/), it renders markdown
inside a self-contained Shadow DOM container. Under the hood, it uses
[`marked`](https://github.com/markedjs/marked) for parsing and
[`highlight.js`](https://github.com/highlightjs/highlight.js) for syntax highlighting.

### Key Features

- **Math rendering** via [`KaTeX`](https://github.com/KaTeX/KaTeX)
- **Diagrams** via [`Mermaid`](https://github.com/mermaid-js/mermaid)
- **Syntax highlighting** with auto-language detection
- **Hash-link scroll handling** for anchor navigation
- **FOUC prevention** (Flash of Unstyled Content)
- **Auto re-render** when inputs or attributes change
- **Light and dark themes** out of the box
- **Spec-compliant extensibility**

> [!IMPORTANT]
>
> Markdown files must be served over HTTP/HTTPS. Browsers restrict local file access (via the
> `file://` protocol) due to security policies, and standard
> [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rules apply.

Read the documentation: https://zerodevx.github.io/zero-md/

> [!NOTE]
>
> This is the `v3` branch. If you are looking for the older version, see the
> [v2 branch](https://github.com/zerodevx/zero-md/tree/v2). If you are upgrading from `v2`, read the
> [migration guide](docs/migration.md).

## Installation

### Load via CDN (Recommended)

`zero-md` is designed to be zero-config with good defaults. For most use-cases, simply import the
script directly from CDN:

```html
<head>
  <!-- Import element definition and auto-register -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/zero-md@3?register"></script>
</head>
<body>
  <!-- Profit! -->
  <zero-md src="example.md"></zero-md>
</body>
```

> [!TIP]
>
> To auto-register the custom element, import with the `?register` query param.

The above is semantically equivalent to the below loading pattern:

```html
<head>
  <script type="module">
    // Import element definition
    import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'
    // Register
    customElements.define('zero-md', ZeroMd)
  </script>
</head>
```

### Use in Web Projects

Install the package via npm:

```txt
npm i zero-md
```

Import and register the element in your JavaScript application:

```js
// Import the element definition
import ZeroMd from 'zero-md'

// Register the custom element
customElements.define('zero-md', ZeroMd)

// Render anywhere
app.render(`<zero-md src=${src}></zero-md>`, target)
```

For a self-contained, pre-bundled package, check out
[`zero-md-bundled`](https://github.com/zerodevx/zero-md-bundled).

## Basic Usage

<!-- prettier-ignore -->
```html
<!-- Display an external markdown file -->
<zero-md src="https://example.com/markdown.md"></zero-md>

<!-- Write markdown inline -->
<zero-md>
  <script type="text/markdown">
# This is my [markdown](https://example.com)
  </script>
</zero-md>

<!-- Add custom styles while keeping defaults -->
<zero-md src="https://example.com/markdown.md">
  <template data-append>
    <style>
      p { color: red; }
    </style>
  </template>
</zero-md>
```

Read the documentation: https://zerodevx.github.io/zero-md/

> [!NOTE]
>
> Requires a modern evergreen browser (Shadow DOM + Custom Elements v1 support). No IE11 support.

## Development

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/zerodevx/zero-md.git
cd zero-md
npm i
```

### Run the Dev Server

Start the development server (powered by [Vite](https://github.com/vitejs/vite)):

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to view the test page. The library source files are
located in `src/lib/`.

### Run Tests

Run the test suite using [Playwright](https://github.com/microsoft/playwright):

```bash
npm test
```

Test specifications are located in `src/index.spec.js`. Please ensure all tests pass before
submitting a pull request.

## Contributing

### Bugs and Feature Requests

Please open a new issue or discussion on GitHub to request features or report bugs.

### Pull Requests

We follow the standard
[GitHub contribution workflow](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).

### Updating Documentation

Documentation source files are located in the `docs/` folder. Submit pull requests to the `.md`
files directly. The documentation website uses
[`zero-md-docs`](https://github.com/zerodevx/zero-md-docs) to automatically publish changes from the
`docs/` folder upon merge.

## License

ISC
