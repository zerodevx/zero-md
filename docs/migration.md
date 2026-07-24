# zero-md

![version](https://img.shields.io/npm/v/zero-md) ![license](https://img.shields.io/npm/l/zero-md)
![stars](https://img.shields.io/github/stars/zerodevx/zero-md?style=flat&color=yellow)
![jsdelivr](https://data.jsdelivr.com/v1/package/npm/zero-md/badge)
![old](https://img.shields.io/jsdelivr/gh/hm/zerodevx/zero-md?label=jsDelivr%28old%29&color=lightgray)

## Migration Guide

This guide helps you upgrade from `v2` to `v3`. The new version focuses on browser specification
compliance, built-in support for math and diagrams, and modern ES modules.

> [!WARNING]
>
> This guide contains breaking changes. Please review them carefully before upgrading.

#### 1. New CDN URL

```text
https://cdn.jsdelivr.net/npm/zero-md@3?register
```

By default, the component is not automatically registered. Add the `?register` query parameter to
the script URL to register the custom element automatically.

#### 2. Syntax Highlighting

`Prism.js` is no longer maintained and has been replaced by `highlight.js`.

#### 3. Merging Style Templates

The template attributes `data-merge="append"` and `data-merge="prepend"` have been renamed to
`data-append` and `data-prepend`.

#### 4. Indentation Normalization

The `data-dedent` attribute on script tags is deprecated. Write standard, spec-compliant indentation
in your markdown.

#### 5. Manual Render Attribute

The `manual-render` attribute on the element has been renamed to `no-auto`.

#### 6. Global Configuration

The global `ZeroMdConfig` object is deprecated. Configure globally by
[extending the class](./advanced-usage.md#global-config) instead.

#### 7. Events

The `zero-md-error` event is deprecated. Use the new standard [events](./advanced-usage.md#events)
instead.

#### 8. Legacy Builds

Transpiled legacy builds are discontinued since modern browsers natively support Web Components.
