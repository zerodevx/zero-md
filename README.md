v0.1.0

# `<zero-md>`

Ridiculously simple markdown displayer - a Polymer 1.1+ component to load and
display an external MD file. Like it isn't easy enough.

So, Google has `<marked-element>` and `<prism-element>` under their
`PolymerElements™` suite. Which already makes it remarkably trivial to render
markdown into HTML.

`<zero-md>` replaces those and adds in `<iron-ajax>`, allowing you to load and
display an external markdown text file - encapsulating implementation details
into one embarassingly easy-to-use package. Because web components. All in ~50
lines of code.


### Let's get this money

Basic usage:

1. Import `web-components-lite` polyfill.
  ```html
  <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
  ```

2. Import themes.
  ```html
  <link rel="import" href="bower_components/zero-md/highlight-themes/default.html">
  <link rel="import" href="bower_components/zero-md/markdown-themes/default.html">
  ```

3. Import `zero-md` component.
  ```html
  <link rel="import" href="bower_components/zero-md/zero-md.html">
  ```

4. Profit!
  ```html
  <zero-md file="https://raw.githubusercontent.com/zerodevx/zero-md/master/README.md"></zero-md>
  ```


### The problem with Google's component

Styling for PolymerElements' original
[`<marked-element>`](https://github.com/PolymerElements/marked-element)
and [`<prism-element>`](https://github.com/PolymerElements/prism-element)
breaks under native **shadow** DOM behaviour. The irony is not lost on me.

`<zero-md>` implements proper Polymer styling patterns (which works under both
**shady** and **shadow** DOM) using [*style modules*](https://www.polymer-project.org/1.0/docs/devguide/styling.html#style-modules)
according to [Google's latest recommendations.](https://blog.polymer-project.org/announcements/2015/08/13/1.1-release/)


### Themes

`<zero-md>` comes shipped with themes!

Markdown themes are located in the `./markdown-themes` directory. Only one theme
is included - a Github-flavoured theme by [sindresorhus](https://github.com/sindresorhus/github-markdown-css).

| Theme   | Description       | Location                       |
|---------|-------------------|--------------------------------|
| default | Github-flavoured. | ./markdown-themes/default.html |

Syntax highlight themes are located in the `./highlight-themes` directory and
it contains the suite of [default Prism themes](https://github.com/PrismJS/prism/tree/gh-pages/themes).

| Theme    | Description            | Location                         |
|----------|------------------------|----------------------------------|
| default  | Prism's default theme. | ./highlight-themes/default.html  |
| coy      | A warmer look.         | ./highlight-themes/coy.html      |
| dark     | So depressing.         | ./highlight-themes/dark.html     |
| funky    | Are you feeling loco?  | ./highlight-themes/funky.html    |
| okaidia  | A little bland.        | ./highlight-themes/okaidia.html  |
| tomorrow | Calmness personified.  | ./highlight-themes/tomorrow.html |
| twilight | I'm sleepy already.    | ./highlight-themes/twilight.html |

Import the corresponding **markdown** and **highlight** style modules
***before*** importing `<zero-md>` via the usual `<link rel="import" href="...">`
syntax. For example,

```html
<!-- Load both markdown and highlight themes first -->
<link rel="import" href="bower_components/zero-md/markdown-theme/default.html">
<link rel="import" href="bower_components/zero-md/highlight-theme/default.html">
<!-- Then load <zero-md> component -->
<link rel="import" href="bower_components/zero-md/zero-md.html">
```

Building your own theme? `<zero-md>` loads styles at element creation time
using the new **style module** syntax:

```html
<style include="zero-md-markdown-theme"></style>
<style include="zero-md-highlight-theme"></style>
```

This allows external styling of properly-encapsulated web components that will
work under both shady and shadow DOM environments. For example, to create a set
of CSS markdown styling rules *that apply only to the `<zero-md>` component*,
create a new `<dom-module>` with an ID of `zero-md-markdown-theme`.

`my-custom-markdown-theme.html`:
```html
<dom-module id="zero-md-markdown-theme">
  <template>
    <style>
      /* Your own CSS rules here */
      h1 { ... }
      h2 { ... }
      p { ... }
    </style>
  </template>
</dom-module>
```

And finally import it:
```html
<link rel="import" href="my-custom-markdown-theme.html">
<link rel="import" href="bower_components/zero-md/zero-md.html">

<body>
  ...
  <zero-md file="my-file.md"></zero-md>
</body>
```

Similarly, for **syntax highlighting** styling rules, create a `<dom-module>`
with an ID of `zero-md-highlight-theme`.


### Demo

[This page](https://zerodevx.github.io/zero-md), actually.


### Published properties

| Property  | Type    | Description |
|-----------|---------|-------------|
| file      | String  | URL to get the markdown text file from via *AJAX*. |
| text      | String  | If `file` is empty, `text` will be parsed instead and the HTML dynamically rendered. |


### Events

| Event               | Detail  | Description |
|---------------------|---------|-------------|
| zero-md-file-loaded | *none*  | Convenience event that's fired whenever a markdown `file` has been successfully downloaded via *AJAX*. |


### Installation

Install through bower.

    bower install --save zerodevx/zero-md#^0.1.0

Alternatively, download the project as a ZIP file and unpack into your
components directory. Note that `<zero-md>` depends on
[`Polymer`](https://github.com/Polymer/polymer), PolymerElements'
[`<iron-ajax>`](https://github.com/PolymerElements/iron-ajax), the
[`marked`](https://github.com/chjj/marked) JS library for markdown parsing,
[`PrismJS`](https://github.com/PrismJS/prism) for syntax highlighting, and
their related dependencies.

Source provided as-is - no assumptions are made on your production build
workflow.


### Credits

1. Implementation details (heavily) borrowed from PolymerElements'
[`<marked-element>`](https://github.com/PolymerElements/marked-element) and
[`<prism-element>`](https://github.com/PolymerElements/prism-element).

2. Markdown parsing by [`marked`](https://github.com/chjj/marked) JS library.

3. Default markdown theme by [sindresorhus](https://github.com/sindresorhus/github-markdown-css).

4. Syntax highlighting by [`PrismJS`](http://prismjs.com/) library.

5. Code highlight themes from Prism's shipped [themes](https://github.com/PrismJS/prism/tree/gh-pages/themes).


### Version history

1. 2015-09-01: v0.1.0 - initial commit.
