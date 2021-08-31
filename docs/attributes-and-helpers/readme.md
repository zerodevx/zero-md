## Attributes And Helpers

### Element attributes

These are the published attributes that can be set on any instance of `<zero-md>`:

| Attribute         | Type       | Description |
|-------------------|------------|-------------|
| src               | String     | URL location to `GET` the markdown text file. If unset, reads markdown from inline `<script type="text/markdown">` instead. |
| manual-render     | Boolean    | If set, disables auto-rendering of this instance. Call the `render()` function on that instance manually to begin. |
| no-shadow         | Boolean    | If set, renders and stamps this instance into **light dom** instead. Please know what you are doing. |

Notes:

1. Standard [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rules apply; the `src` file -
if fetched from another origin - should be served with the corresponding `Access-Control-Allow-Origin` headers.

2. `no-shadow` is immutable; it must be declared on element creation time and should not be dynamically changed.

### Style template attributes

Style templates are `<template>` tags containing **styles** that are direct children of the its `<zero-md>` element,
and apply only to that parent instance.

The following attributes may be declared on a style template:

| Attribute         | Type       | Description |
|-------------------|------------|-------------|
| data-merge        | String     | Accepts either `append` or `prepend` and works as its name suggests. If unset, the style template **overrides** the default template. |

Style templates accept `<link rel="stylesheet">` and `<style>` tags as their direct children. For example:

```html
<zero-md>
  <!-- Styles declared within will be appended AFTER the default template -->
  <template data-merge="append">
    <!-- Use `link` tags to load external stylesheets -->
    <link rel="stylesheet" href="custom.css">
    <!-- Use `style` tags to write CSS directly -->
    <style>
      h1 {
        color: red;
      }
    </style>
  </template>
</zero-md>
```

### Inline markdown attributes

To write markdown inline, wrap your markdown with a `<script type="text/markdown">` tag and place it as a direct
child of `<zero-md>`. Note that inline markdown works like a **fall-back**; so the element `src` should **not**
be set, or should resolve to be falsy.

The following attributes may be declared on the `<script>` tag:

| Attribute         | Type       | Description |
|-------------------|------------|-------------|
| data-dedent       | Boolean    | If set, applies a `dedent` function onto the text content that *tries* to remove leading whitespace (indentation) that will otherwise be incorrectly interpreted as code blocks. |

For example:

```html
<zero-md>
  <!-- Set `data-dedent` to remove indentation -->
  <script type="text/markdown" data-dedent>
    # Opt in to apply dedent function
    If **indentation** is important to you.
  </script>
</zero-md>
```

### render([options])

The `render()` function renders the HTML, stamps it into DOM and returns a `Promise` that resolves when done.
It accepts an optional *options* `object` which may contain the following:

| Property          | Type       | Description |
|-------------------|------------|-------------|
| classes           | Array      | A class name string or array of class names to apply onto the rendered markdown container node. Useful for activating some Prism plugins. |
| ...markedOpts     | ...Object  | Any of these [Marked options](https://marked.js.org/using_advanced#options) can be passed in and will apply during markdown transformation. |

For example:

```js
const app = document.querySelector('zero-md')
const run = async () => {
  app.src = 'dynamic.md'
  await app.render({
    // The class `line-numbers` will be added to the markdown-body container
    classes: 'line-numbers',
    // These are Marked options
    gfm: false,
    mangle: false
  })
  alert('Render complete!')
}
run()
```

### Helpers

Internally, the `render()` function may look something like this:

```js
async function render (opts = {}) {
  // Ensure everything is initialised
  await this.waitForReady()
  const stamped = {}
  // Start generating the CSS and Markdown HTML strings
  const pending = this.buildMd(opts)
  const css = this.buildStyles()
  // Stamp styles if none exists; replace if there're changes
  if (css !== this.cache.styles) {
    this.cache.styles = css
    // Ensure that external stylesheets are loaded, then queue next repaint to prevent FOUC
    await this.stampStyles(css)
    stamped.styles = true
    await this.tick()
  }
  // Then stamp body if none exists; replace if there're changes
  const md = await pending
  if (md !== this.cache.body) {
    this.cache.body = md
    const node = this.stampBody(md)
    stamped.body = true
    // Begin asynchronous Prism highlight
    await this.highlight(node)
  }
  // Finally, fire the rendered event
  this.fire('zero-md-rendered', { stamped })
}
```

The helper functions shown above are public; you can re-create your own `render()` function using a mix
of these helpers to fit your specific use-case. Some helpers include:

| Method               | Description              |
|----------------------|--------------------------|
| waitForReady()       | Returns a `Promise` that resolves when element is connected, and both Marked and Prism are loaded. |
| makeNode(html)       | Converts a HTML string into a DOM node and returns it. |
| buildStyles()        | Constructs the style HTML string and returns it. |
| buildMd({opts})      | Download the `src` file, if specified, transforms the markdown (with optional opts), and returns a `Promise` that resolves into a HTML string. |
| stampStyles(html)    | Insert or replace a styles HTML string into DOM and returns a `Promise` that resolves eagerly when all `<link>` stylesheets are downloaded. |
| stampBody(html)      | Insert or replace a markdown HTML string into DOM and returns the new node. |
| highlight(container) | Runs `Prism` highlight on a container node asynchronously (using Web Workers, or falls back to synchronous if it throws) and returns a `Promise` when done. |
| tick()               | Wait for next repaint. |
| fire(name, {opts})   | Dispatches a new custom event. |

### Events

The following convenience events are dispatched:

| Event Name         | Description              |
|--------------------|--------------------------|
| zero-md-ready      | Fires after element is connected, and both Marked and Prism are loaded. |
| zero-md-rendered   | Fires after markdown is transformed, syntax highlighted, and contents stamped to DOM. |
| zero-md-error      | Fires when a download error is encountered in `src` or any `<link rel="stylesheet">` tags. |

#### Rendered event

The `zero-md-rendered` event fires with the following details:

| Detail             | Description              |
|--------------------|--------------------------|
| node               | The `zero-md` element that dispatched the event. |
| stamped.styles     | `true` when styles are stamped into DOM. |
| stamped.body       | `true` when markdown body is stamped into DOM. |

#### Error-handling

To catch `src` errors:

```html
<zero-md id="app" src="not-found.md"></zero-md>
<script>
  app.addEventListener('zero-md-error', ev => {
    // `src` download errors will return a response code
    if (ev.detail.status) {
      console.log('Error encountered while loading src', ev.detail.status)
    }
  })
</script>
```

To catch `<link rel="stylesheet">` errors:

```html
<zero-md id="app" src="foo.md">
  <template>
    <link rel="stylesheet" href="not-found.css">
  </template>
</zero-md>
<script>
  app.addEventListener('zero-md-error', ev => {
    // External stylesheet download errors will NOT return status
    if (!ev.detail.status) {
      console.log('Error encountered while loading an external stylesheet')
    }
  })
</script>
```
