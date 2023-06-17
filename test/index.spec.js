/* eslint-env mocha */
/* global chai */

mocha.setup({
  ui: 'bdd',
})

chai.config.truncateThreshold = 0

describe('unit tests', () => {
  const assert = chai.assert
  const expect = chai.expect

  const add = (html) => {
    const template = document.createElement('template')
    template.innerHTML = html
    return document.body.appendChild(template.content.firstElementChild)
  }

  const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t))

  const tick = () => new Promise((resolve) => requestAnimationFrame(resolve))

  describe('buildMd()', () => {
    let zero
    beforeEach(() => {
      zero = add(`<zero-md manual-render></zero-md>`)
    })
    afterEach(() => {
      zero.remove()
    })
    const zero$ = (selector) => zero.shadowRoot.querySelector(selector)
    const zeroBody = () => zero$('.markdown-body')
    const zeroBody$ = (selector) => zeroBody().querySelector(selector)
    const zeroBody$$ = (selector) => zeroBody().querySelectorAll(selector)

    const zeroAppendScriptMD = (text) => {
      const script = document.createElement('script')
      script.setAttribute('type', 'text/markdown')
      script.text = text
      zero.appendChild(script)
    }

    it('converts md from src to html', async () => {
      zero.src = './fixtures/h1.md'

      await zero.render()

      assert(zeroBody$('h1').innerText === 'First level header')
    })

    it('falls back to script when src is falsy', async () => {
      const script = document.createElement('script')
      script.setAttribute('type', 'text/markdown')
      script.text = `# fallback`
      zero.appendChild(script)

      await zero.render()

      expect(zeroBody$('h1').innerText).to.equal('fallback')
    })

    it('highlights java code too', async () => {
      zero.src = 'fixture.md'
      zeroAppendScriptMD(
        '\n' +
          '\n```java' +
          '\npublic class HelloWorld {' +
          '\n  public static void main(String[] args) {' +
          '\n    System.out.println("Hello, World!");' +
          '\n  }' +
          '\n}' +
          '\n```' +
          '\n',
      )

      await zero.render()
      await sleep(200) // freaking ugly but blame prism

      const el = zeroBody$('pre>code.language-java :first-child')
      assert(el.classList.contains('token'))
    })

    it('language-detects unhinted code blocks as text o_O', async () => {
      zeroAppendScriptMD(
        '\n' +
          '\n```' +
          '\npublic class HelloWorld {' +
          '\n  public static void main(String[] args) {' +
          '\n    System.out.println("Hello, World!");' +
          '\n  }' +
          '\n}' +
          '\n```' +
          '\n',
      )

      await zero.render()

      assert(zeroBody$('pre>code').classList.contains('language-text'))
    })

    it('dedents when script data-dedent set', async () => {
      const script = document.createElement('script')
      script.setAttribute('type', 'text/markdown')
      script.setAttribute('data-dedent', '')
      script.text = `
        # fallback`
      zero.appendChild(script)

      await zero.render()

      assert(zero.shadowRoot.querySelector('.markdown-body>h1').innerText === 'fallback')
    })

    // TODO: make it pass
    it.skip('resolves md links base urls relative to src', async () => {
      zero.src = 'fixtures/with-relative-img-link.md'

      await zero.render()

      const [_, relative] = /https?:\/\/[^/]+(.*)/.exec(zeroBody$('img').src)
      expect(relative).to.equal('/test1/cat.jpg')
    })

    // TODO: improve coverage

    it('does not render lang without localized option', async () => {
      zeroAppendScriptMD(`

<ru>Привет</ru><uk>Привіт</uk><en>Hello</en>`)

      await zero.render()

      expect(zeroBody$('p').innerHTML).to.equal('<ru>Привет</ru><uk>Привіт</uk><en>Hello</en>')
    })

    it('renders lang by main attribute in localized option', async () => {
      zeroAppendScriptMD(`
<localized main="en"/>

<ru>Привет</ru><uk>Привіт</uk><en>Hello</en>`)

      await zero.render()

      expect(zeroBody$('p').innerHTML).to.equal('Hello')
    })

    it('renders lang by lang option of zero-md config', async () => {
      zeroAppendScriptMD(`
<localized main="en"/>

<ru>Привет</ru><uk>Привіт</uk><en>Hello</en>`)

      zero.config = { ...zero.config, lang: 'uk' }
      await zero.render()

      expect(zeroBody$('p').innerHTML).to.equal('Привіт')
    })

    it('renders lang by lang attribute of zero-md', async () => {
      zeroAppendScriptMD(`
<localized main="en"/>

<ru>Привет</ru><uk>Привіт</uk><en>Hello</en>`)
      zero.config = { ...zero.config, lang: 'ru' }

      zero.lang = 'uk'
      await zero.render()

      expect(zeroBody$('p').innerHTML).to.equal('Привіт')
    })

    it('auto re-renders on change of lang attribute of zero-md', async () => {
      zero.remove()
      zero = add('<zero-md lang="en"></zero-md>')
      zeroAppendScriptMD(`
<localized main="en"/>

<ru>Привет</ru><uk>Привіт</uk><en>Hello</en>`)

      zero.lang = 'uk'
      // await zero.waitForReady()
      await zero.waitForRendered()

      expect(zeroBody$('p').innerHTML).to.equal('Привіт')
    })

    // TODO: unfortunately we can't test search params in this test suite,
    //       because after each hook will reload the whole html page reseting test execution
    //     describe('with reset search params after test', () => {
    //       afterEach(() => {
    //         window.location.search = ''
    //       })

    //       it('renders lang by lang param of search params', async () => {
    //         zeroAppendScriptMD(`
    // <localized main="en"/>

    // <ru>Привет</ru><uk>Привіт</uk><en>Hello</en>`)
    //         zero.config = { ...zero.config, lang: 'ru' }
    //         zero.lang = 'en'

    //         window.location.search = '?lang=uk'
    //         await zero.render()

    //         expect(zeroBody$('p').innerHTML).to.equal('Привіт')
    //       })
    //     })

    let scenarios = {
      'inline localization': {
        given: 'Hello in selected language – «<ru>Привет</ru><uk>Привіт</uk><en>Hello</en>».',
        whenLang: 'uk',
        selector: 'p',
        shouldBe: 'Hello in selected language – «Привіт».',
      },
      'inline codalization': {
        given: 'Test Runner – <js>jest</js><py>pytest</py>.',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest',
      },
      'inline codalization inverted via not- (js from <js>...<not-js>...)': {
        given: 'Test Runner – <js>jest</js><not-js>pytest</not-js>',
        whenCode: 'js',
        selector: 'p span.active',
        shouldBe: 'jest',
      },
      'inline codalization inverted via not- (ts from <js-ts>...<not-js>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><not-js>pytest</not-js>',
        whenCode: 'ts',
        selector: 'p',
        shouldBe:
          'Test Runner – ' +
          '<span class="inline-content active" id="js-ts">jest</span>' +
          '<span class="inline-content active" id="not-js">pytest</span>',
      }, // TODO: is such behaviour correct?
      'inline codalization inverted via not- (py from <js-ts>...<not-js-ts>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><not-js-ts>pytest</not-js-ts>',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest',
      },
      'inline codalization inverted via not- (py from <js>...<not-js>...)': {
        given: 'Test Runner – <js>jest</js><not-js>pytest</not-js>',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest',
      },
      'inline codalization inverted via not- (java from <js>...<not-js>...)': {
        given: 'Test Runner – <js>jest</js><not-js>pytest</not-js>',
        whenCode: 'java',
        selector: 'p span.active',
        shouldBe: 'pytest',
      },
      'inline multi-codalization (ts from <js-ts>...<py>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><py>pytest</py>.',
        whenCode: 'ts',
        selector: 'p span.active',
        shouldBe: 'jest',
      },
      'inline multi-codalization (js from <js-ts>...<py>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><py>pytest</py>.',
        whenCode: 'js',
        selector: 'p span.active',
        shouldBe: 'jest',
      },
      'inline multi-codalization (py from <js-ts>...<py>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><py>pytest</py>.',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest',
      },
      'inline multi-localization (ru from <ru-uk>...<en>...)': {
        given: 'Hello in selected language – «<ru-uk>Здоров</ru-uk><en>Hello</en>».',
        whenLang: 'ru',
        selector: 'p',
        shouldBe: 'Hello in selected language – «Здоров».',
      },
      'inline multi-localization (uk from <ru-uk>...<en>...)': {
        given: 'Hello in selected language – «<ru-uk>Здоров</ru-uk><en>Hello</en>».',
        whenLang: 'uk',
        selector: 'p',
        shouldBe: 'Hello in selected language – «Здоров».',
      },
      'inline multi-localization (en from <ru-uk>...<en>...)': {
        given: 'Hello in selected language – «<ru-uk>Здоров</ru-uk><en>Hello</en>».',
        whenLang: 'en',
        selector: 'p',
        shouldBe: 'Hello in selected language – «Hello».',
      },
      'of multiline localizations with tags on same line': {
        given: `
<ru>Привет</ru>
<uk>Привіт</uk>
<en>Hello</en>`,
        whenLang: 'uk',
        selector: 'p',
        shouldBe: 'Привіт',
      },
      'of multiline localizations (tags on different lines)': {
        given: `
<ru>
Привет
</ru>
<uk>
Привіт
</uk>
<en>
Hello
</en>`,
        whenLang: 'uk',
        selector: 'p',
        shouldBe: 'Привіт',
      },
      'of multiline codalizations with nested localizations (tags on different lines)': {
        given: `
<js-ts>
<ru-uk>
Тест ранер Jest
</ru-uk>
<en>
Test Runner Jest
</en>
</js-ts>
<py>
<ru-uk>
Тест ранер Pytest
</ru-uk>
<en>
Test Runner Pytest
</en>
</py>`,
        whenLang: 'uk',
        whenCode: 'py',
        selector: '.active p',
        shouldBe: 'Тест ранер Pytest',
      },
      'of multiline codalizations with nested localizations with CODE-translations (tags on different lines)':
        {
          given: `
<!--js~{{TR}}~Jest~-->
<!--ts~{{TR}}~Jest~-->
<!--py~{{TR}}~Pytest~-->

<js-ts>
<ru-uk>
Тест ранер {{TR}}
</ru-uk>
<en>
Test Runner {{TR}}
</en>
</js-ts>
<py>
<ru-uk>
Тест ранер {{TR}}
</ru-uk>
<en>
Test Runner {{TR}}
</en>
</py>`,
          whenLang: 'uk',
          whenCode: 'py',
          selector: '.active p',
          shouldBe: 'Тест ранер Pytest',
        },
      'of multiline codalizations with nested localizations with LANG-translations (tags on different lines)':
        {
          given: `
<!--ru~{{Test}}~Тест~-->
<!--uk~{{Test}}~Тест~-->
<!--en~{{Test}}~Test~-->

<js-ts>
<ru-uk>
{{Test}} ранер Jest
</ru-uk>
<en>
{{Test}} Runner Jest
</en>
</js-ts>
<py>
<ru-uk>
{{Test}} ранер Pytest
</ru-uk>
<en>
{{Test}} Runner Pytest
</en>
</py>`,
          whenLang: 'uk',
          whenCode: 'py',
          selector: '.active p',
          shouldBe: 'Тест ранер Pytest',
        },
    }
    Object.entries(scenarios).forEach((args) => {
      const [
        scenario,
        { only, given, whenLang: lang, whenCode: code, selector, shouldBe: localized },
      ] = args
      if (only !== undefined && !only) {
        return
      }

      it(`render: ${scenario}`, async () => {
        zeroAppendScriptMD('<localized main="en"/>\n' + '<codalized main="ts"/>\n\n' + given)
        if (lang) {
          zero.lang = lang
        }
        if (code) {
          zero.code = code
        }

        await zero.render()

        // console.log(`=========\n${scenario}\n\nfrom\n---------\n`, given)
        // console.log('---------\nto:\n---------\n', zeroBody$(selector).innerHTML)
        expect(zeroBody$(selector).innerHTML).to.equal(localized)
        expect(zeroBody$$(selector).length).to.equal(1)
      })
    })
  })

  describe('constructor()', () => {
    // TODO: make it pass
    it.skip('should not load marked if marked already loaded', async () => {
      window.marked = true
      const fixture = add(`<zero-md manual-render></zero-md>`)
      await fixture.waitForReady()
      const nodes = document.head.querySelectorAll('script')
      for (let a = 0; a < nodes.length; a++) {
        assert(!nodes[a].src.endsWith('marked.min.js'))
      }
      fixture.remove()
    })

    it('should not load prism if prism already loaded', async () => {
      window.marked = false
      let nodes = document.head.querySelectorAll('script')
      for (let a = 0; a < nodes.length; a++) {
        if (nodes[a].src.includes('prism')) {
          nodes[a].remove()
        }
      }
      const f = add(`<zero-md manual-render></zero-md>`)
      await f.loadScript(f.config.markedUrl)
      await f.waitForReady()
      nodes = document.head.querySelectorAll('script')
      for (let a = 0; a < nodes.length; a++) {
        assert(!nodes[a].src.includes('prism'))
      }
      f.remove()
    })

    it('should merge ZeroMdConfig opts into config', async () => {
      const f = add(`<zero-md manual-render></zero-md>`)
      await f.waitForReady()
      assert(f.config.foo === 'bar')
      f.remove()
    })
  })

  describe('getters and setters', () => {
    let f
    before(() => {
      f = add(`<zero-md src="dummy.md" manual-render></zero-md>`)
    })
    after(() => f.remove())

    it('src reflects', () => {
      assert(f.src === 'dummy.md')
      f.src = 'dummy2.md'
      assert(f.getAttribute('src') === 'dummy2.md')
    })

    it('boolean equates to true in class prop', () => {
      assert(f.manualRender === true)
    })

    it('boolean reflects', () => {
      f.manualRender = false
      assert(!f.hasAttribute('manual-render'))
    })
  })

  describe('buildStyles()', () => {
    let f
    afterEach(() => f.remove())

    it('uses default styles if no template declared', () => {
      f = add(`<zero-md manual-render></zero-md>`)
      const s = f.makeNode(f.buildStyles()).outerHTML
      assert(s.includes('/github-markdown.min.css'))
    })

    it('uses template styles', () => {
      f = add(
        `<zero-md manual-render><template><link rel="stylesheet" href="example.css"></template></zero-md>`,
      )
      const s = f.makeNode(f.buildStyles()).outerHTML
      assert(!s.includes('/github-markdown.min.css'))
      assert(s.includes('example.css'))
    })

    it('prepends correctly', () => {
      f = add(
        `<zero-md manual-render><template data-merge="prepend"><style>p{color:red;}</style></template></zero-md>`,
      )
      const s = f.makeNode(f.buildStyles()).outerHTML
      assert(s.indexOf('p{color:red;}') < s.indexOf('markdown.min'))
    })

    it('appends correctly', () => {
      f = add(
        `<zero-md manual-render><template data-merge="append"><style>p{color:red;}</style></template></zero-md>`,
      )
      const s = f.makeNode(f.buildStyles()).outerHTML
      assert(s.indexOf('p{color:red;}') > s.indexOf('markdown.min'))
    })

    it('allows passing an empty template to override default template', () => {
      f = add(`<zero-md manual-render><template></template></zero-md>`)
      const s = f.makeNode(f.buildStyles())
      assert(s.querySelectorAll('link').length === 0)
    })
  })

  describe('stampBody()', () => {
    let zero
    beforeEach(() => {
      zero = add(`<zero-md manual-render></zero-md>`)
    })
    afterEach(() => zero.remove())

    it('stamps html body into shadow dom', () => {
      zero.stampBody('<div class="test">hello</div>')
      assert(zero.shadowRoot.querySelector('.test').innerHTML === 'hello')
    })

    it('stamps html body into light dom if no-shadow set', () => {
      zero.remove()
      zero = add(`<zero-md manual-render no-shadow></zero-md>`)
      zero.stampBody('<div class="test">hello</div>')
      assert(zero.querySelector('.test').innerHTML === 'hello')
    })
  })

  describe('stampStyles()', () => {
    let zero
    beforeEach(() => {
      zero = add(`<zero-md manual-render></zero-md>`)
    })
    afterEach(() => zero.remove())

    it('stamps html styles and wait for stylesheet links to resolve', async () => {
      const html = '<div><link rel="stylesheet" href="fixture.css"></div>'
      let loaded = false
      zero.shadowRoot.addEventListener(
        'load',
        () => {
          loaded = true
        },
        {
          once: true,
          capture: true,
        },
      )
      await zero.stampStyles(html)
      assert(loaded)
    })

    it('still stamps html styles if a link errors', async () => {
      const html =
        '<div><link rel="stylesheet" href="error.css"><link rel="stylesheet" href="fixture.css"></div>'
      await zero.stampStyles(html)
      assert(zero.shadowRoot.querySelector('link[href="fixture.css"]'))
    })
  })

  describe('render()', () => {
    let f
    afterEach(() => f.remove())

    it('auto re-renders when src change', (done) => {
      f = add(`<zero-md src="fixture.md"></zero-md>`)
      f.addEventListener('zero-md-rendered', () => {
        if (f.src === 'fixture.md') {
          expect(f.shadowRoot.querySelector('h1').innerText).to.equal('markdown-fixture')
          f.src = 'fixtures/with-relative-img-link.md'
        } else if (f.src === 'fixtures/with-relative-img-link.md') {
          expect(f.shadowRoot.querySelector('h1').innerText).to.equal('relative-link-test')
          done()
        }
      })
    })

    it('prevents FOUC by ensuring styles are stamped and resolved first, before stamping md', async () => {
      f = add(`<zero-md manual-render>
        <template>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.css">
        </template>
        <script type="text/markdown"># fixture</script></zero-md>`)
      const job = f.render()
      await tick()
      assert(f.shadowRoot.querySelector('link'))
      assert(!f.shadowRoot.querySelector('h1'))
      await job
      assert(f.shadowRoot.querySelector('h1'))
    })

    it('renders markdown-body with optional classes', async () => {
      f = add(`<zero-md manual-render><script type="text/markdown"># test</script></zero-md>`)
      await f.render({ classes: 'test-class' })
      assert(f.shadowRoot.querySelector('.markdown-body').classList.contains('test-class'))
      await f.render({ classes: ['test2', 'test3'] })
      assert(f.shadowRoot.querySelector('.markdown-body').classList.contains('test3'))
    })

    it('renders partially if body changes but styles do not', async () => {
      f = add(
        `<zero-md manual-render><template><style>h1{color:red;}</style></template><script type="text/markdown"># test</script></zero-md>`,
      )
      await f.render()
      let detail = {}
      f.addEventListener('zero-md-rendered', (e) => {
        detail = e.detail
      })
      f.querySelector('script').innerText = '# test2'
      await f.render()
      await tick()
      assert(detail.stamped && detail.stamped.body === true)
      assert(detail.stamped && !detail.stamped.styles)
      const h1 = f.shadowRoot.querySelector('h1')
      assert(window.getComputedStyle(h1).getPropertyValue('color') === 'rgb(255, 0, 0)')
    })

    it('renders partially if styles change but body does not', async () => {
      f = add(
        `<zero-md manual-render><template><style>h1{color:red;}</style></template><script type="text/markdown"># test</script></zero-md>`,
      )
      await f.render()
      let detail = {}
      f.addEventListener('zero-md-rendered', (e) => {
        detail = e.detail
      })
      const tpl = f.querySelector('template')
      tpl.content.firstElementChild.innerText = 'h1{color:blue}'
      await f.render()
      await tick()
      assert(detail.stamped && detail.stamped.styles === true)
      assert(detail.stamped && !detail.stamped.body)
      const h1 = f.shadowRoot.querySelector('h1')
      assert(window.getComputedStyle(h1).getPropertyValue('color') === 'rgb(0, 0, 255)')
    })
  })

  describe('hash-link scrolls', () => {
    let f
    afterEach(() => {
      location.hash = ''
      f.remove()
    })

    // TODO: make it pass
    it.skip('scrolls to element if location.hash set on first render', async () => {
      location.hash = 'tamen-et-veri'
      f = add(
        `<div style="height:200px;overflow:hidden;"><zero-md src="fixture.md"></zero-md></div>`,
      )

      await sleep(500)

      assert(f.scrollTop > 0)
    })

    // TODO: make it pass
    it.skip('hijacks same-doc hash links and scrolls id into view', async () => {
      f = add(
        `<div style="height:200px;overflow:hidden;"><zero-md src="fixture.md" manual-render></zero-md></div>`,
      )
      const el = f.querySelector('zero-md')
      await el.render()
      const a = el.shadowRoot.querySelector('a[href="#tamen-et-veri"]')
      a.click()
      await sleep(50)
      assert(f.scrollTop > 0)
      assert(location.hash === '#tamen-et-veri')
    })
  })

  describe('Mutation Observer tests', () => {
    let f
    afterEach(() => f.remove())

    // TODO: make it pass
    it.skip('auto re-renders content when inline markdown script changes', (done) => {
      let isInitialRender = true
      f = add(`<zero-md><script type="text/markdown"># markdown-fixture</script></zero-md>`)
      f.addEventListener('zero-md-rendered', () => {
        if (isInitialRender) {
          assert(f.shadowRoot.querySelector('h1').innerHTML === 'markdown-fixture')
          isInitialRender = false
          f.querySelector('script').innerHTML = '# updated markdown-fixture'
        } else {
          assert(f.shadowRoot.querySelector('h1').innerHTML === 'updated markdown-fixture')
          done()
        }
      })
    })

    it('auto re-renders styles when styles template changes', (done) => {
      let isInitialRender = true
      f = add(`<zero-md>
        <template>
          <style>h1 { color: rgb(255, 0, 0); }</style>
        </template>
        <script type="text/markdown"># fixture</script></zero-md>`)
      f.addEventListener('zero-md-rendered', () => {
        const h1 = f.shadowRoot.querySelector('h1')
        const computedStyle = window.getComputedStyle(h1)
        if (isInitialRender) {
          assert(computedStyle.color === 'rgb(255, 0, 0)')
          isInitialRender = false
          f.querySelector('template').content.firstElementChild.innerHTML =
            'h1 { color: rgb(0, 255, 0); }'
        } else {
          assert(computedStyle.color === 'rgb(0, 255, 0)')
          done()
        }
      })
    })
  })

  describe('running console tests - please ensure no error messages generated in console', () => {
    it('element should reconnect properly', async () => {
      console.log('Running element reconnection test... (this should not generate any errors)')
      let count = 0
      const handler = () => count++
      window.addEventListener('zero-md-ready', handler)
      const el = document.createElement('zero-md')
      el.setAttribute('manual-render', '')
      let node = document.body.appendChild(el)
      await tick()
      node.remove()
      await tick()
      node = document.body.appendChild(el)
      await tick()
      node.remove()
      window.removeEventListener('zero-md-ready', handler)
      assert(count === 2)
      console.log('Complete')
    })
  })

  describe('other cool features', () => {})
})

mocha.run()
