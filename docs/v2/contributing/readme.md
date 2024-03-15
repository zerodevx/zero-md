## Contributing

### Noticed a bug? Have a feature request?

Open a new [issue](https://github.com/zerodevx/zero-md/issues) in the Github repo, or raise a
[PR](https://github.com/zerodevx/zero-md/pulls)! I'd be stoked to accept any contributions!

### Development

Standard Github [contribution workflow](https://github.com/firstcontributions/first-contributions)
applies.

#### Run the dev server

```
$ npm run dev
```

Point your browser to `http://localhost:8000` and you should see the test suite running.

#### Testing

Tests are browser-based and run on [Mocha](https://mochajs.org/) with
[Chai](https://www.chaijs.com/) asserts. If you're adding a new feature or bugfixing, please add the
corresponding regression test into `test/index.spec.js` accordingly.

#### Format and lint

```
$ npm run format
$ npm run lint
```

Formatting and linting by [prettier](https://github.com/prettier/prettier) and
[eslint](https://github.com/eslint/eslint) respectively.

#### Making changes to docs

Documentation is in the `/docs` folder in the form of `readme.md` files, and published on
[Github Pages](https://pages.github.com/). This setup is based on
[`zero-md-docs`](https://github.com/zerodevx/zero-md-docs).

To make changes to docs, simply raise a PR on any `readme.md` files should suffice.

### Version history

Check out the [releases](https://github.com/zerodevx/zero-md/releases) page.

### License

```none
ISC License

Copyright (c) 2022, Jason Lee <jason@zerodevx.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```
