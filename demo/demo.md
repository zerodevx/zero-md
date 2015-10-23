# `<zero-md>`

### Markdown loaded from external file "demo.md"

When changes to the `file` attribute are detected, the new file will be loaded
via AJAX, and its contents re-rendered into the `.md-html` child container
element.

The *quick* brown **fox** jumps ***over*** the ~~lazy~~ dog.

```html
<html>
<head>
  <script src="../../webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="../zero-md.html">
  <link rel="stylesheet" href="../../prism/themes/prism.css">
  <link rel="stylesheet" href="../markdown-themes/default.css">
</head>
<body>
  <zero-md file="demo.md">
    <div class="md-html"></div>
  </zero-md>
</body>
</html>
```
