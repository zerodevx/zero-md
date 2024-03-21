## &lt;zero-md&gt;

> Ridiculously simple zero-config markdown displayer

A native markdown-to-html web component based on
[Custom Elements V1 specs](https://www.w3.org/TR/custom-elements/) to load and display an external
MD file. Under the hood, it uses [Marked](https://github.com/markedjs/marked) for super-fast
markdown transformation, and [Prism](https://github.com/PrismJS/prism) for feature-packed syntax
highlighting - automagically rendering into its own self-contained shadow DOM container, while
encapsulating implementation details into one embarassingly easy-to-use package.

**NOTE: This is documentation for V2. If you're looking for the older version, see the
[V1 docs](https://zerodevx.github.io/zero-md/v1/).**

Featuring:

- Automated hash-link scrolls
- Built-in FOUC prevention
- Automatically rewrite URLs relative to `src`
- Automatically re-render when `src` changes
- Automatically re-render when inline markdown or style template changes
- Support for >200 code languages with detection for unhinted code blocks
- Easy styling mechanism
- Highly extensible

**NOTE: Your markdown file(s) needs to be hosted! Browsers don't generally allow javascript to
access files on the local hard drive because of security concerns. Standard
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) rules apply.**
