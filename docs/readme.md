## &lt;zero-md&gt;

> Ridiculously simple zero-config markdown displayer

A native markdown-to-html web component based on [Custom Elements V1 specs](https://www.w3.org/TR/custom-elements/)
to load and display an external MD file. Under the hood, it uses [Marked](https://github.com/markedjs/marked) for
super-fast markdown transformation, and [Prism](https://github.com/PrismJS/prism) for feature-packed syntax
highlighting - automagically rendering into its own self-contained shadow DOM container, while encapsulating
implementation details into one embarassingly easy-to-use package.

**NOTE: This is documentation for V2. If you're looking for the older version, see the [V1 docs](https://zerodevx.github.io/zero-md/v1/).**

Featuring:

- [x] Same-doc hash link scrolls inside shadow container
- [x] Automatic code highlighting for >200 languages
- [x] Code language detection for unhinted code blocks
- [x] Supports relative URLs in markdown files
- [x] Allows custom styles to be merged with default styles
- [x] Automatic re-render when `src` changes
