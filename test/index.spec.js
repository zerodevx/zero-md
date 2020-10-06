/* eslint-disable quotes */

mocha.setup({
  ui: 'bdd'
})

describe('unit tests', () => {
  const assert = chai.assert

  const add = html => {
    const tpl = document.createElement('template')
    tpl.innerHTML = html
    return document.body.appendChild(tpl.content.firstElementChild)
  }

  it('should display name', () => {
    const fixture = add(`<my-element name="John"></my-element>`)
    assert(fixture.shadowRoot.querySelector('p').innerText, 'My name is John!')
    fixture.remove()
  })
})

mocha.run()
