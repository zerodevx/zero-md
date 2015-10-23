v0.2.0

# `<zero-md>`

Ridiculously simple markdown displayer - a Polymer 1.1+ web component to load
and display an external MD file.

Instantly create beautiful HTML pages from Markdown. Like it isn't easy enough.

So, Google has `<marked-element>` and `<prism-element>` under their
`PolymerElements™` suite. Which already makes it remarkably trivial to render
markdown into HTML.

`<zero-md>` does this better, while also allowing you to load and display, via
ajax, an external markdown text file - encapsulating implementation details
into one embarassingly easy-to-use package.

Because web components. All in ~50 lines of code.


### Let's get this money

**Basic usage**

1. Import `webcomponents-lite` polyfill.
  ```html
  <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
  ```

2. Import `<zero-md>` web component.
  ```html
  <link rel="import" href="bower_components/zero-md/zero-md.html">
  ```

3. Optionally import themes.
  ```html
  <link rel="stylesheet" href="bower_components/zero-md/highlight-themes/default.css">
  <link rel="stylesheet" href="bower_components/zero-md/markdown-themes/default.css">
  ```

4. Profit!
  ```html
  <zero-md file="https://raw.githubusercontent.com/zerodevx/zero-md/master/README.md">
    <!-- Remember to pass in empty container of class="md-html". -->
    <div class="md-html"></div>
  </zero-md>
  ```

**Advanced usage**

There are three ways to pass Markdown into `<zero-md>`:

1. Load an external markdown file through AJAX using the `file` attribute.

  ```html
  <zero-md file="README.md">
    <div class="md-html"></div>
  </zero-md>
  ```

2. Simply input the markdown string using the `text` attribute.

  ```html
  <zero-md text="H~~ell~~o *W*o**r**l***d***!">
    <div class="md-html"></div>
  </zero-md>
  ```

3. Place your markdown inside a `<xmp></xmp>` tag as a child element.

  ```html
  <zero-md>
    <div class="md-html"></div>
    <xmp>
  # This is my markdown

  H~~ell~~o *W*o**r**l***d***!
    </xmp>
  </zero-md>
  ```

  Note that `<xmp>` tag usage is **static** - dynamic changes to contents
  wrapped inside the `<xmp>` tag will **not** trigger a refresh of the rendered
  HTML. You may manually trigger a reload by calling the `reload()` method.

  This also means that your markdown **cannot** contain the string "`</xmp>`".

In order of priority, `<zero-md>` will first try to retrieve the URL location
that's passed into the `file` attribute. If an error occurs, or `file` is
empty, `<zero-md>` will then attempt to parse the string that's passed into the
`text` attribute. If that's empty as well, `<zero-md>` will finally look for
the `<xmp></xmp>` tag that encapsulates your markdown.


### Instantly publish HTML from Markdown

Create a beautiful HTML web page from Markdown in literally 1 minute. Copy and
paste the below boilerplate code into an empty `index.html` file, edit, and
it's ready to be served from any static host.

**index.html** ([download](https://raw.githubusercontent.com/zerodevx/zero-md/v0.2.0/demo/boilerplate.html))

```html
<!doctype html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Edit your site info here -->
    <meta name="description" content="EXAMPLE SITE DESCRIPTION">
    <title>EXAMPLE SITE TITLE</title>

    <script src="https://cdn.rawgit.com/webcomponents/webcomponentsjs/v0.7.15/webcomponents-lite.min.js"></script>
    <link rel="import" href="https://cdn.rawgit.com/zerodevx/zero-md/v0.2.0/build/zero-md.html">
    <link rel="stylesheet" href="https://cdn.rawgit.com/zerodevx/zero-md/v0.2.0/markdown-themes/default.css">
    <link rel="stylesheet" href="https://cdn.rawgit.com/zerodevx/zero-md/v0.2.0/highlight-themes/default.css">
  </head>
  <body unresolved>
    <style>
      /* Edit your header styles here */
      .header { font-family: sans-serif; font-size: 20px; text-align: center; position: fixed; width: 100%; line-height: 42px; top: 0; left: 0; }
      .md-html { min-width: 200px; max-width: 790px; margin: 56px auto 0 auto; padding: 20px; }
    </style>

    <!-- Edit your header title here -->
    <div class="header">EXAMPLE HEADER TITLE</div>

    <!-- Edit your Github ribbon here (https://github.com/blog/273-github-ribbons) -->
    <a href="https://example.com"><img style="position: fixed; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>

    <!-- Edit your Markdown URL file location here -->
    <zero-md file="https://example.com/EXAMPLE.md"><div class="md-html"></div></zero-md>
  </body>
</html>
```

`<zero-md>` works fantastically well for publishing quick project pages, info,
news, homepages etc. It doesn't get easier than this.


### Implementation notes

**BREAKING CHANGE**

v0.2.0 contains **breaking changes** and is **not** compatible with previous
versions. Code is almost entirely rewritten, `style-module` usage has now been
**discontinued** and reliance on `<iron-ajax>` has been removed completely,
thereby reducing lots of unnecessary code. `<zero-md>` is now smaller, lighter
and faster than ever.

**MANDATORY CHILD CONTAINER MUST BE INCLUDED**

Because of the somewhat moving goal posts of shadow DOM implementation by our
browser vendors, Polymer styling patterns seems to be in constant flux.

`<zero-md>` mandates that **an empty container with class `md-html`** be passed
in as a child element. This allows `<zero-md>` to render the formatted HTML
into the parent document's *light DOM*, thereby allowing the user to use CSS
styles normally.

This removes the need for *Polymer style modules* completely, and will work
under both **shady** and native **shadow** DOM behaviour.

**BUT BUT `<xmp>` TAG HAS BEEN DEPRECATED~!!11!@~1ROAR!!!**

The `<xmp>` tag has been deprecated for 20 years, and it is still implemented
in modern browsers today. The decision was made behind closed doors and one can
only guess the reasons - perhaps because it allows malformed markup? Methinks
it's making a comeback. :)

It's the only tag that allows true *pre-formatted* content to be written as it
is within the confines of the HTML document without endless escaping. So for
me, the pros outweigh the cons. Right?


**~~THE PROBLEM WITH GOOGLE'S COMPONENTS~~**

Styling for PolymerElements' original
[`<marked-element>`](https://github.com/PolymerElements/marked-element)
and [`<prism-element>`](https://github.com/PolymerElements/prism-element)
breaks under native **shadow** DOM behaviour. The irony is not lost on me.

`<zero-md>` implements proper Polymer styling patterns (which works under both
**shady** and **shadow** DOM) using [*style modules*](https://www.polymer-project.org/1.0/docs/devguide/styling.html#style-modules)
according to [Google's latest recommendations.](https://blog.polymer-project.org/announcements/2015/08/13/1.1-release/)

**UPDATE 2015-10-23:** So it seems that Google has [fixed](https://github.com/PolymerElements/marked-element/commit/ef6c97fa3d9bf308870d04f1ff3b20c2134f084b)
the above-mentioned styling issues, which I have left included for posterity.
Well done, you. Also, I've discontinued the use of *Polymer style modules* in
preference of a (much clearer) *light DOM styling pattern*.


### Styling

Define your own styles onto the `.md-html` class as you would normally.

For example,

```html
<html>
<head>
  ...
  <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="bower_components/zero-md/zero-md.html">
</head>
<body>
  <style>
    /* Your own CSS rules here */
    .md-html h1 { ... }
    .md-html h2 { ... }
    .md-html p { ... }
  </style>
  ...
  <zero-md file="README.md">
    <div class="md-html"></div>
  </zero-md>
</body>
</html>
```


### Themes

`<zero-md>` comes shipped with themes!

Markdown themes are located in the `./markdown-themes` directory. Only one theme
is included - a Github-flavoured theme by [sindresorhus](https://github.com/sindresorhus/github-markdown-css).

| Filename                      | Description       |
|-------------------------------|-------------------|
| ./markdown-themes/default.css | Github-flavoured theme by @sindresorhus v2.1.0 |

Syntax highlight themes are located in the `./highlight-themes` directory and
contains the suite of [default Prism themes](https://github.com/PrismJS/prism/tree/gh-pages/themes).

| Filename                        | Description                     |
|---------------------------------|---------------------------------|
| ./highlight-themes/default.css  | Default theme (PrismJS v1.0.1 ) |
| ./highlight-themes/coy.css      | Coy theme (PrismJS v1.0.1)      |
| ./highlight-themes/dark.css     | Dark theme (PrismJS v1.0.1)     |
| ./highlight-themes/funky.css    | Funky theme (PrismJS v1.0.1)    |
| ./highlight-themes/okaidia.css  | Okaidia theme (PrismJS v1.0.1)  |
| ./highlight-themes/tomorrow.css | Tomorrow theme (PrismJS v1.0.1) |
| ./highlight-themes/twilight.css | Twilight theme (PrismJS v1.0.1) |

Import the corresponding **markdown** and **highlight** CSS stylesheets like
you would normally.

```html
<head>
  ...
  <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="bower_components/zero-md/zero-md.html">
  <!-- Import theme stylesheets -->
  <link rel="stylesheet" href="bower_components/zero-md/markdown-themes/default.css">
  <link rel="stylesheet" href="bower_components/zero-md/highlight-themes/default.css">
</head>
<body>
  ...
  <zero-md file="README.md">
    <div class="md-html"></div>
  </zero-md>
</body>
```


### Demo

[This page](https://zerodevx.github.io/zero-md), actually. Or for a more
comprehensive example demonstrating the various markdown input methods,
[try this](https://zerodevx.github.io/zero-md/demo.html).


### Published properties

| Property  | Type    | Description |
|-----------|---------|-------------|
| file      | String  | URL location to `AJAX GET` the markdown text file. |
| text      | String  | If `file` is empty, `text` will be parsed instead and the HTML dynamically rendered. |


### Public methods

| Method   | Parameters  | Description |
|----------|-------------|-------------|
| reload() | *none*      | Re-renders the HTML into `.md-html` child container element from the `<xmp>` child tag. |


### Installation

**Load from [Rawgit CDN](https://rawgit.com)**

```html
<script src="https://cdn.rawgit.com/webcomponents/webcomponentsjs/v0.7.15/webcomponents-lite.min.js"></script>`
<link rel="import" href="https://cdn.rawgit.com/zerodevx/zero-md/v0.2.0/build/zero-md.html">

<!-- Themes -->
<link rel="stylesheet" href="https://cdn.rawgit.com/zerodevx/zero-md/v0.2.0/markdown-themes/default.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/zerodevx/zero-md/v0.2.0/highlight-themes/default.css">
```

**Install through Bower**

    bower install --save zerodevx/zero-md#^0.2.0

Alternatively, download the project as a ZIP file and unpack into your
components directory. Note that `<zero-md>` depends on:
1. `Polymer`: https://github.com/Polymer/polymer;
2. `marked`: https://github.com/chjj/marked JS library for markdown parsing;
3. and `PrismJS`: https://github.com/PrismJS/prism for syntax highlighting.

Source provided as-is - no assumptions are made on your production build
workflow.


### Credits

1. Implementation details referenced (heavily) from PolymerElements'
[`<marked-element>`](https://github.com/PolymerElements/marked-element) and
[`<prism-element>`](https://github.com/PolymerElements/prism-element).

2. Markdown parsing by [`marked`](https://github.com/chjj/marked) JS library.

3. Syntax highlighting by [`PrismJS`](http://prismjs.com/) library.

4. Default markdown theme by [sindresorhus](https://github.com/sindresorhus/github-markdown-css).

5. Code highlight themes from Prism's shipped [themes](https://github.com/PrismJS/prism/tree/gh-pages/themes).


### License

MIT, though I'll greatly appreciate a note if you find this useful.


### Version history

1. 2015-09-01: v0.1.0
  * Initial commit.
2. 2015-09-04: v0.1.1
  * Minor patches to default markdown theme.
3. 2015-10-23: v0.2.0
  * **Breaking changes** and is incompatible with earlier versions.
  * Remove `style-module` usage - instead mandate a child container element
    with `class="md-html"` for simpler styling.
  * Remove `<iron-ajax>` dependency.
  * Remove `zero-md-file-loaded` convenience event.
  * Add `reload()` method to dynamically reload content inside `<xmp>` tags.
  * Completely rewrite rendering algorithm. Smaller, lighter and faster!

