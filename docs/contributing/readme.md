## Contributing

### Noticed a bug? Have a feature request?

Open a new [issue](https://github.com/zerodevx/zero-md/issues) in the Github repo, or raise a
[PR](https://github.com/zerodevx/zero-md/pulls)! I'd be stoked to accept any contributions!

### Develop locally

#### Install

Fork and clone the project, then install dependencies.

```bash
$ cd zero-md
$ npm install
```

#### Run the dev server

```bash
$ npm run dev
```

Open your browser to `http://localhost:5000`. You should see the test suite running.

#### Testing

Tests are browser-based and run on [Mocha](https://mochajs.org/) with [Chai](https://www.chaijs.com/)
asserts. If you're adding a new feature or bugfixing, please add the corresponding regression test
into `test/index.spec.js` accordingly.

Tests can be run by pointing your browser to `http://localhost:5000`.

#### Linting

Code should be in [Standardjs](https://standardjs.com/) format. Run the linter with:

```bash
$ npm run lint
```

#### Making changes to source

If you're adding a new feature or bugfixing, please commit your changes into a new branch and raise
a pull-request into the `main` branch upstream, and reference the related issues.

#### Running the docs

The docs (as seen in `https://zerodevx.github.io/zero-md/`) can be accessed by pointing your browser
to `http://localhost:5000/docs/` (note the trailing slash).

#### Making changes to docs

Documentation is stored in the `/docs` folder, published with [Github Pages](https://pages.github.com/)
and based on [`zero-md-docs`](https://github.com/zerodevx/zero-md-docs). The markdown for each
section is located in `readme.md` in its corresponding pretty URL.

In general, just raising a PR on `readme.md` files should suffice.

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
