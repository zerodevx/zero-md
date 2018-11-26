v1.2.0

# `<zero-md>`

Ridiculously simple markdown displayer - a native web component based on [Custom Elements v1 specs](https://www.w3.org/TR/custom-elements/) to load and display an external MD file.

Instantly create beautiful HTML pages from Markdown. Like it isn't easy enough.

While it's already remarkably trivial to render markdown into HTML ([Marked](https://github.com/markedjs/marked)) and syntax-highlight ([Prism](https://github.com/PrismLibrary/Prism)), `<zero-md>` does this better, automagically rendering into its own self-contained Shadow DOM container, while encapsulating implementation details into one embarassingly easy-to-use package.

Because web components. All in ~100 lines of code.

**Update** - 2018-11-26 - The community-agreed standard pattern of importing webcomponents is now via [ES Modules](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/import). Consequently, `HTMLImports` will soon be [deprecated](https://www.polymer-project.org/blog/2017-10-18-upcoming-changes) from Chrome. Don't worry though, your old code will still work since `HTMLImports` will fall-back to polyfill. For best performance however, do update your existing code to use ES Modules way.


## Let's get this money

### Basic usage (recommended)

1. Import [webcomponents-loader.js](https://github.com/webcomponents/webcomponentsjs).

```html
<!-- Lightweight client-side loader that feature-detects and load polyfills only when necessary -->
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
```

2. Import `<zero-md>` web component.

```html
<!-- Load element definition via ES Modules -->
<script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/build/zero-md.min.js"></script>
```

3. Profit!

```html
<!-- Simply set the `src` attribute to your MD file and win -->
<zero-md src="https://www.example.com/my-markdown.md"></zero-md>
```


### Async usage

```html
<head>
  ...
  <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.js" defer></script>
  <script type="module">
    WebComponents.waitFor(() => {
      let el = document.createElement('script');
      el.src = 'https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/build/zero-md.min.js';
      document.head.appendChild(el);
    });
  </script>
  ...
</head>
```


### Advanced usage

1. Use your own markdown and highlight stylesheets instead.

  ```html
  <!-- Pass in an array of CSS URLs via the `css-urls` attribute in valid JSON format -->
  <zero-md css-urls='["https://example.com/styles/custom-markdown.css", "https://example.com/styles/custom-highlight.css"]'
           src="https://example.com/my-markdown.md">
  </zero-md>
  ```

2. Or pass markdown strings directly into the element.

  ```html
  <zero-md>
    <!-- Declare `<template>` element as a child of `<zero-md>` -->
    <template>
      <!-- Wrap your markdown string inside an `<xmp>` tag -->
      <xmp>
# `This` is my [markdown](https://example.com)
H~~ell~~o *W*o**r**l***d***!
      </xmp>
    </template>
  </zero-md>
  ```

3. Or pass your own CSS definitions directly into the element.

  ```html
  <zero-md src="https://example.com/my-markdown.md">
    <!-- Declare `<template>` element as a child of `<zero-md>` -->
    <template>
      <!-- Wrap your own CSS styles inside a `<style>` tag -->
      <style>
        /* My own markdown styles */
        h1 { font-size: 24px; }
        p { color: red; }
        ...
        /* My own highlight styles */
        code p { color: blue; }
        ...
      </style>
    </template>
  </zero-md>
  ```

4. Or put it all together.

```html
<zero-md>
  <!-- Declare `<template>` element as a child of `<zero-md>` -->
  <template>

    <!-- Wrap your CSS styles inside a `<style>` tag -->
    <style>
      /* My own markdown styles */
      h1 { font-size: 24px; }
      p { color: red; }
      ...
      /* My own highlight styles */
      code p { color: blue; }
      ...
    </style>

    <!-- Wrap your markdown string inside an `<xmp>` tag -->
    <xmp>
# `This` is my [markdown](https://example.com)
H~~ell~~o *W*o**r**l***d***!
    </xmp>

  </template>
</zero-md>
```


## Instantly publish HTML from Markdown

Create a beautiful HTML web page from Markdown in literally 1 minute. Copy and paste the below boilerplate code into an empty `index.html` file, edit, and it's ready to be served from any static host.

**index.html** ([download](https://raw.githubusercontent.com/zerodevx/zero-md/master/boilerplate/index.html))

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

    <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/build/zero-md.min.js"></script>

    <style>
      /* Edit your header styles here */
      header { font-family: sans-serif; font-size: 20px; text-align: center; position: fixed; width: 100%; line-height: 42px; top: 0; left: 0; background-color: #424242; color: white; }
      body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 56px auto 0 auto; padding: 45px; }
      @media (max-width: 767px) {
        header { font-size: 15px; }
        body { padding: 15px; }
      }
    </style>
  </head>
  <body>

    <!-- Edit your Markdown URL file location here -->
    <zero-md src="https://example.com/EXAMPLE.md"></zero-md>

    <!-- Edit your header title here -->
    <header class="header">EXAMPLE HEADER TITLE</header>

    <!-- Edit your Github ribbon here (https://github.com/blog/273-github-ribbons) -->
    <a href="https://example.com"><img style="position: fixed; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>

  </body>
</html>
```

`<zero-md>` works fantastically well for publishing quick project pages, info, news, homepages etc. It doesn't get easier than this.


## Installation

### CDN

The easiest way to use `<zero-md>` is to load from CDNs. Place into document `<head>`:

1. webcomponents-loader.js

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
  ```

2. zero-md.html

  ```html
  <script type="module" src="https://cdn.jsdelivr.net/gh/zerodevx/zero-md@1/build/zero-md.min.js"></script>
  ```

`<zero-md>` can then be used anywhere in your document `<body>`.

### Install Locally

1. Clone the repo.

  ```
  git clone https://github.com/zerodevx/zero-md.git && cd zero-md
  ```

2. Install dependencies.

  ```
  npm install && bower install
  ```

3. Use locally.

  ```html
  <head>
    <script src="./bower_components/webcomponentsjs/webcomponents-loader.js"></script>
    <script type="module" src="./build/zero-md.html"></script>
  </head>
  <body>
    <zero-md marked-url="./bower_components/marked/marked.min.js"
             prism-url="./bower_components/prism/prism.js">
    </zero-md>
  </body>
  ```

### Development

1. Start your favourite web server.

  ```
  cd zero-md && python -m SimpleHTTPServer 8000
  ```

2. Run tests from your browser.

  ```
  http://localhost:8000/test/zero-md_test.html
  ```

3. Lint your code.

  ```
  npm run lint
  ```

4. Build.

  ```
  npm run build
  ```


## Demo

[This page](https://raw.githubusercontent.com/zerodevx/zero-md/master/index.html), actually. Or for a more comprehensive example demonstrating the various features, [try this](https://zerodevx.github.io/zero-md/demo).


## API

### Behavior

In order of priority, `<zero-md>` first tries to retrieve the markdown string from its `<template><xmp>...</xmp></template>` child; if none is defined, `<zero-md>` next attempts to retrieve from the URL defined in the `src` attribute via ajax.

Likewise, for CSS styles, `<zero-md>` first tries to retrieve the styles defined in `<template><style>...</style></template>`; if none, `<zero-md>` next attempts to retrieve *all* the external stylesheets defined in the `css-urls` attribute array.

By default, `<zero-md>` loads the ([Marked](https://github.com/markedjs/marked)) JS library from CDN [here](https://cdn.jsdelivr.net/npm/marked@0/marked.min.js); and the ([Prism](https://github.com/PrismLibrary/Prism)) JS library from [here](https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js). These URL locations can be overridden by setting the `marked-url` and `prism-url` attributes respectively.

For styles, by default the `css-urls` list contains a Github markdown stylesheet from [here](https://cdn.jsdelivr.net/npm/github-markdown-css@2/github-markdown.min.css), and a light-themed highlight stylesheet from [here](https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism.min.css). The defaults can be overridding that attribute with an array of URLs in valid JSON format.

### Published Attributes

| Attribute         | Type       | Description |
|-------------------|------------|-------------|
| src               | String     | URL location to `GET` the markdown text file via ajax. |
| manual-render     | Boolean    | If set, disables auto-rendering of this instance. Call the `render()` function to start manually. |
| marked-url        | String     | Defaults to `https://cdn.jsdelivr.net/npm/marked@0/marked.min.js`. URL of the Marked JS library. |
| prism-url         | String     | Defaults to `https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js`. URL of the Prism JS library. |
| css-urls          | String     | Defaults to `["https://cdn.jsdelivr.net/npm/github-markdown-css@2/github-markdown.min.css", "https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism.min.css"]`. An array of stylesheet URLs to apply to this instance. |
| no-shadow         | Boolean    | If set, renders and stamps this instance into **Light DOM** instead. Please know what you're doing. |

For `css-urls`, please ensure that the value is an **Array** in **valid JSON** format. For example:

```html
<!-- Note the double-quotes ""! -->
<zero-md css-urls='["./styles/markdown-stylesheet.css", "./styles/highlight-stylesheet.css"]'></zero-md>
```

### Public Methods

| Method   | Parameters  | Description |
|----------|-------------|-------------|
| render() | *none*      | Starts the markdown conversion and stamps into DOM. |

By default, each instance will automatically call the `render()` method on start-up. To prevent this behavior, add the attribute `manual-render` to your `<zero-md>` element, and manually call this method to begin rendering.

Note that if changes are made to `<zero-md>` attributes or `<template>` children dynamically, call the `render()` method on that instance to force a re-render.


### Convenience Events

| Event Name            | Description |
|-----------------------|-------------|
| zero-md-ready         | Fired after `<zero-md>` is connected. |
| zero-md-marked-ready  | Fired after the Marked JS library is loaded. |
| zero-md-prism-ready   | Fired after the Prism JS library is loaded. |
| zero-md-rendered      | Fired after markdown is converted, syntax is highlighted, and contents stamped to DOM. |


## Themes

[Google](https://www.google.com.sg/search?q=markdown+css+themes) [it!](https://www.google.com.sg/search?q=syntax+highlight+css+themes) Or try [here](https://github.com/jasonm23/markdown-css-themes), [here](https://github.com/ebidel/markdown-css-themes) or [here](https://github.com/PrismJS/prism-themes).

Load your theme stylesheets by setting the `css-urls` attribute. Check out the [published attributes](#published-attributes) API.


## Implementation Notes

**The `<xmp>` tag is deprecated!**

In short, don't worry about it. Though the tag has been deprecated for 20 years, browser vendors (generally) try their hardest not to break the web. It is still implemented in modern browsers today. It's the only tag that suits such purpose, by allowing true *pre-formatted* content to be written as-is within the confines of the HTML document without endless escaping. Use it.

**v1.x is completely different!**

Yes it is. v1.x is **absolutely breaking** and **not** compatible with previous versions. Code is entirely re-written based on the new [Custom Elements v1 specs](https://www.w3.org/TR/custom-elements/) with lots of ES6 goodness. It runs natively in modern browsers and is incredibly light and performant. This serves as a great showcase for how far we've come with Custom Elements, Web Components, its ideas, usage and patterns.

**Anchor links support added!**

Referencing [this Github issue](https://github.com/zerodevx/zero-md/issues/4), a shout-out to @alexroseb for raising this. So the native browser handler for an `<a>` link that points to an element `id` doesn't pierce through shadow DOM - and I missed it. It's a feature, not a bug. Really!


## License

MIT


## Version history

**v1.2.0** - 2018-11-26
* Since `HTMLImports` will soon be [deprecated](https://www.polymer-project.org/blog/2017-10-18-upcoming-changes), migrating webcomponent import pattern to ES Modules.
* Update all CDN links to [jsDelivr](https://jsdelivr.com) and pin with semver.
* Per [#6](https://github.com/zerodevx/zero-md/issues/6), use `getElementById` instead to prevent DOM exception error messages.

**v1.1.0** - 2018-05-17
* Add anchor links feature.
* Update boilerplate to correct layout in Firefox.
* Update CDN links for `markedjs` to v0.3.19 and `prismjs` to v1.14.0.

**v1.0.0** - 2018-04-06
* **Breaking changes**, major release and incompatible with earlier v0.x versions.
* **Completely re-written**, updated to 2018 patterns, removes the need for [Polymer](https://polymer-project.org) and runs natively for a no-sugar, low-fat diet. Please read the docs and upgrade accordingly.

**v0.2.0** - 2015-10-23
* Breaking changes and is incompatible with earlier versions.
* Remove `style-module` usage - instead mandate a child container element
  with `class="md-html"` for simpler styling.
* Remove `<iron-ajax>` dependency.
* Remove `zero-md-file-loaded` convenience event.
* Add `reload()` method to dynamically reload content inside `<xmp>` tags.
* Completely rewrite rendering algorithm. Smaller, lighter and faster!

**v0.1.1** - 2015-09-04
* Minor patches to default markdown theme.

**v0.1.0** - 2015-09-01
* Initial commit.

