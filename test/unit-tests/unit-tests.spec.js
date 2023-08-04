/* eslint-env mocha */
/* global chai */

export default function() {
  mocha.setup({
    ui: 'bdd'
  })

  chai.config.truncateThreshold = 0
  const assert = chai.assert
  const expect = chai.expect

  const add = (html) => {
    const template = document.createElement('template')
    template.innerHTML = html
    return document.body.appendChild(template.content.firstElementChild)
  }

  const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t))

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

      expect(zeroBody$('h1').innerText).to.equal('First level header')
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
          '\n'
      )

      await zero.render()
      await sleep(200) // freaking ugly but blame prism

      const el = zeroBody$('pre>code.language-java :first-child')
      assert(el.classList.contains('token'))
    })

    it('language-detects unhinted code blocks as NOTHING o_O', async () => {
      zeroAppendScriptMD(
        '\n' +
          '\n```' +
          '\npublic class HelloWorld {' +
          '\n  public static void main(String[] args) {' +
          '\n    System.out.println("Hello, World!");' +
          '\n  }' +
          '\n}' +
          '\n```' +
          '\n'
      )

      await zero.render()

      // TODO: uncomment when prismajs is fixed and unhinted code is again marked as language-text
      //       (as part of https://kanbanflow.com/t/S7V4boFD)
      // expect([...zeroBody$('pre>code').classList]).to.contain('language-text')
      expect([...zeroBody$('pre>code').classList]).to.be.empty
    })

    it('dedents when script data-dedent set', async () => {
      const script = document.createElement('script')
      script.setAttribute('type', 'text/markdown')
      script.setAttribute('data-dedent', '')
      script.text = `
        # fallback`
      zero.appendChild(script)

      await zero.render()

      expect(zero.shadowRoot.querySelector('.markdown-body>h1').innerText).to.equal('fallback')
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
        shouldBe: 'Hello in selected language – «Привіт».'
      },
      'inline codalization': {
        given: 'Test Runner – <js>jest</js><py>pytest</py>.',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest'
      },
      'inline codalization with "python" tag': {
        given: 'Test Runner – <js>jest</js><python>pytest</python>.',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest'
      },
      'inline codalization inverted via not- (js from <js>...<not-js>...)': {
        given: 'Test Runner – <js>jest</js><not-js>pytest</not-js>',
        whenCode: 'js',
        selector: 'p span.active',
        shouldBe: 'jest'
      },
      'inline codalization inverted via not- (ts from <js-ts>...<not-js>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><not-js>pytest</not-js>',
        whenCode: 'ts',
        selector: 'p',
        shouldBe:
          'Test Runner – ' +
          '<span class="inline-content active" id="js-ts">jest</span>' +
          '<span class="inline-content active" id="not-js">pytest</span>'
      }, // TODO: is such behaviour correct?
      'inline codalization inverted via not- (py from <js-ts>...<not-js-ts>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><not-js-ts>pytest</not-js-ts>',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest'
      },
      'inline codalization inverted via not- (py from <js>...<not-js>...)': {
        given: 'Test Runner – <js>jest</js><not-js>pytest</not-js>',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest'
      },
      'inline codalization inverted via not- (java from <js>...<not-js>...)': {
        given: 'Test Runner – <js>jest</js><not-js>pytest</not-js>',
        whenCode: 'java',
        selector: 'p span.active',
        shouldBe: 'pytest'
      },
      'inline multi-codalization (ts from <js-ts>...<py>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><py>pytest</py>.',
        whenCode: 'ts',
        selector: 'p span.active',
        shouldBe: 'jest'
      },
      'inline multi-codalization (js from <js-ts>...<py>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><py>pytest</py>.',
        whenCode: 'js',
        selector: 'p span.active',
        shouldBe: 'jest'
      },
      'inline multi-codalization (py from <js-ts>...<py>...)': {
        given: 'Test Runner – <js-ts>jest</js-ts><py>pytest</py>.',
        whenCode: 'py',
        selector: 'p span.active',
        shouldBe: 'pytest'
      },
      'inline multi-localization (ru from <ru-uk>...<en>...)': {
        given: 'Hello in selected language – «<ru-uk>Здоров</ru-uk><en>Hello</en>».',
        whenLang: 'ru',
        selector: 'p',
        shouldBe: 'Hello in selected language – «Здоров».'
      },
      'inline multi-localization (uk from <ru-uk>...<en>...)': {
        given: 'Hello in selected language – «<ru-uk>Здоров</ru-uk><en>Hello</en>».',
        whenLang: 'uk',
        selector: 'p',
        shouldBe: 'Hello in selected language – «Здоров».'
      },
      'inline multi-localization (en from <ru-uk>...<en>...)': {
        given: 'Hello in selected language – «<ru-uk>Здоров</ru-uk><en>Hello</en>».',
        whenLang: 'en',
        selector: 'p',
        shouldBe: 'Hello in selected language – «Hello».'
      },
      'of multiline localizations with tags on same line': {
        given: `
<ru>Привет</ru>
<uk>Привіт</uk>
<en>Hello</en>`,
        whenLang: 'uk',
        selector: 'p',
        shouldBe: 'Привіт'
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
        shouldBe: 'Привіт'
      },
      'of multiline codalizations with nested localizations (tags on different lines), changed "py" tag to "python" tag': {
        given: `
<js-ts>
<ru-uk>
Тест ранер Jest
</ru-uk>
<en>
Test Runner Jest
</en>
</js-ts>
<python>
<ru-uk>
Тест ранер Pytest
</ru-uk>
<en>
Test Runner Pytest
</en>
</python>`,
        whenLang: 'uk',
        whenCode: 'py',
        selector: '.active p',
        shouldBe: 'Тест ранер Pytest'
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
          shouldBe: 'Тест ранер Pytest'
        },
      'of multiline codalizations with nested localizations with LANG-translations (tags on different lines), changed "py" tag to "python" tag':
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
<python>
<ru-uk>
{{Test}} ранер Pytest
</ru-uk>
<en>
{{Test}} Runner Pytest
</en>
</python>`,
          whenLang: 'uk',
          whenCode: 'py',
          selector: '.active p',
          shouldBe: 'Тест ранер Pytest'
        }
    }
    Object.entries(scenarios).forEach((args) => {
      const [
        scenario,
        { only, given, whenLang: lang, whenCode: code, selector, shouldBe: localized }
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

      it(`refactored localized/codalized tag, render: ${scenario}`, async () => {
        zeroAppendScriptMD('<!--localized(main="en")-->\n' + '<!--codalized(main="py")-->\n\n' + given)
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
}
