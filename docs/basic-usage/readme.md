## Basic Usage

### Display an external markdown file

```html
<!-- Simply set the `src` attribute and win -->
<zero-md src="https://example.com/markdown.md"></zero-md>
```

At its most basic, `<zero-md>` loads and displays an external MD file with **default stylesheets** - a Github-themed
stylesheet paired with a light-themed one for code blocks, just like what you see in these docs. So internally,
the above code block is semantically equivalent to the one below:

```html
<zero-md src="https://example.com/markdown.md">
  <!-- By default, this style template gets loaded -->
  <template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css">
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
      ...
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
    <link rel="stylesheet" href="markdown-styles.css">
    <link rel="stylesheet" href="highlight-styles.css">
  </template>
</zero-md>
```

### Or both

```html
<zero-md src="https://example.com/markdown.md">
  <template>
    <!-- The CSS load order is respected -->
    <link rel="stylesheet" href="markdown-styles.css">
    <style>
      h1 {
        color: red;
      }
    </style>
    <link rel="stylesheet" href="highlight-styles.css">
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
By default, `<zero-md>` first tries to render `src`. If `src` is falsy (undefined, file not found, empty file etc),
it **falls-back** to the contents inside the `<script type="text/markdown">` tag.

### Put it all together

```html
<zero-md src="https://example.com/markdown.md">
  <template>
    <link rel="stylesheet" href="markdown-styles.css">
    <style>
      h1 {
        color: red;
      }
    </style>
    <link rel="stylesheet" href="highlight-styles.css">
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
