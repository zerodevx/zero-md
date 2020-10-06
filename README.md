# web-component-starter

An opinionated starter template to quickly scaffold shareable native web-components.

Comes with:

- [x] Rollup build
- [x] Dev server with live-reload
- [x] Mocha/Chai for browser-run testing
- [x] Standardjs for linting

The beauty of this template is in its simplicity - it's a bare-bones setup that requires only a few dependencies,
with a well-tested tooling pipeline that's not overly complicated, and easily extensible.

## Install

Clone this project with `degit` and install dependencies.

```bash
$ npx degit zerodevx/web-component-starter my-element
$ cd my-element
$ npm i
```

## Usage

### Develop

Run the dev server.

```bash
$ npm run dev
```

This serves the `test/` directory at `http://localhost:5000` with file-watching and live-reload capabilities.

Develop the web-component at `src/index.js` - the example component template showcases some common
[Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements) coding patterns.
Bare modules import can be used.

### Test

Tests are integrated and run inside your browser during development. Write tests using Mocha BDD with Chai asserts
at `test/index.spec.js`. A convenience `add()` function is included - it creates the test fixture, appends it into
DOM, and returns the node.

```js
...
it('creates showdowRoot', () => {
  const fixture = add(`<my-element name="test"></my-element>`)
  assert.exists(fixture.shadowRoot)
  fixture.remove()
})
```

### Lint

Lint your code with `Standardjs` rules.

```bash
$ npm run lint
```

And fix warnings automatically.

```bash
$ npx standard --fix
```

### Build

Build your component.

```bash
$ npm run build
```

This creates the Rollup minified bundle into `dist/index.min.js` that is useful for consumption via CDN.
