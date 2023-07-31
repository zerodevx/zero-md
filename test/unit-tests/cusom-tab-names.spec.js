/* eslint-env mocha */
/* global chai */

export default function () {
  mocha.setup({
    ui: 'bdd'
  })

  describe('Custom tab name testing', () => {
    const assert = chai.assert
    const expect = chai.expect

    const add = (html) => {
      const template = document.createElement('template')
      template.innerHTML = html
      return document.body.appendChild(template.content.firstElementChild)
    }

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

    it('should render correct number of tabs BUTTONS', async () => {
      zero.src = './unit-tests/tabs-template.md'

      await zero.render()

      expect(zeroBody$('.buttonWrapper').children.length).to.equal(5)
    })

    it('should render correct number of tabs CONTENT', async () => {
      zero.src = './unit-tests/tabs-template.md'

      await zero.render()

      expect(zeroBody$('.contentWrapper').children.length).to.equal(5)
    })

    it.skip('renders ACTIVE tab by main attribute in codalized option', async () => {
      zero.src = './unit-tests/tabs-template.md'

      await zero.render()

      assert.equal(zeroBody$('.tab-button.active').getAttribute('data-id'), zeroBody$('codalized').getAttribute('main'))
    })

    it('renders ACTIVE tab by CODE', async () => {
      zero.src = './unit-tests/tabs-template.md'
      zero.code = 'ts'

      await zero.render()

      expect(zeroBody$('.tab-button.active').getAttribute('data-id')).to.equal(zero.code)
    })

    it('', async () => {
      zero.src = './unit-tests/tabs-template.md'
      zero.code = 'ts'
      
      await zero.render()

      expect(zeroBody$('.tab-button.active').getAttribute('data-id')).to.equal(zero.code)
    })
  })
}