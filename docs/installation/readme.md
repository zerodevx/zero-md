## Installation

### Load via CDN (recommended)

`zero-md` is designed to be zero-config with good defaults. For most use-cases, just importing the script from CDN
and consuming the component directly should suffice.

```html
<head>
  ...
  <!-- Import element definition -->
  <script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js"></script>
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

Install package with `npm` or `yarn`. Note that you'll need [Node.js](https://nodejs.org/) installed.

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
