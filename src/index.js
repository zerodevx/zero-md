export class MyElement extends HTMLElement {
  get version () { return '$VERSION' }
  get name () { return this.getAttribute('name') }
  set name (val) { this.setAttribute('name', val) }

  static get observedAttributes () {
    return ['name']
  }

  attributeChangedCallback (name, old, val) {
    if (old !== val) {
      this[name] = val
      this.render()
    }
  }

  constructor () {
    super()
    this.root = this.attachShadow({ mode: 'open' })
  }

  async render () {
    this.root.innerHTML = `<p>My name is ${this.name}!</p>`
  }
}

customElements.define('my-element', MyElement)
