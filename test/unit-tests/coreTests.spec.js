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

  const tick = () => new Promise((resolve) => requestAnimationFrame(resolve))

  describe('constructor()', () => {
    //TODO: this test passed if run only this describe.
    //Also if this test is skipped, next test fails: "should not load prism if prism already loaded"
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
      const zero = add(`<zero-md manual-render></zero-md>`)
      await zero.loadScript(zero.config.markedUrl)
      await zero.waitForReady()
      nodes = document.head.querySelectorAll('script')
      for (let a = 0; a < nodes.length; a++) {
        assert(!nodes[a].src.includes('prism'))
      }
      zero.remove()
    })

    it('should merge ZeroMdConfig opts into config', async () => {
      const zero = add(`<zero-md manual-render></zero-md>`)
      await zero.waitForReady()
      expect(zero.config.foo).to.equal('bar')
      zero.remove()
    })
  })

  describe('getters and setters', () => {
    let zero
    before(() => {
      zero = add(`<zero-md src="dummy.md" manual-render></zero-md>`)
    })
    after(() => zero.remove())

    it('src reflects', () => {
      expect(zero.src).to.equal('dummy.md')
      zero.src = 'dummy2.md'
      expect(zero.getAttribute('src')).to.equal('dummy2.md')
    })

    it('boolean equates to true in class prop', () => {
      assert(zero.manualRender === true)
    })

    it('boolean reflects', () => {
      zero.manualRender = false
      assert(!zero.hasAttribute('manual-render'))
    })
  })

  describe('buildStyles()', () => {
    let zero
    afterEach(() => zero.remove())

    it('uses default styles if no template declared', () => {
      zero = add(`<zero-md manual-render></zero-md>`)
      const s = zero.makeNode(zero.buildStyles()).outerHTML
      assert(s.includes('/github-markdown.min.css'))
    })

    it('uses template styles', () => {
      zero = add(
        `<zero-md manual-render><template><link rel="stylesheet" href="example.css"></template></zero-md>`
      )
      const s = zero.makeNode(zero.buildStyles()).outerHTML
      assert(!s.includes('/github-markdown.min.css'))
      assert(s.includes('example.css'))
    })

    it('prepends correctly', () => {
      zero = add(
        `<zero-md manual-render><template data-merge="prepend"><style>p{color:red;}</style></template></zero-md>`
      )
      const s = zero.makeNode(zero.buildStyles()).outerHTML
      assert(s.indexOf('p{color:red;}') < s.indexOf('markdown.min'))
    })

    it('appends correctly', () => {
      zero = add(
        `<zero-md manual-render><template data-merge="append"><style>p{color:red;}</style></template></zero-md>`
      )
      const s = zero.makeNode(zero.buildStyles()).outerHTML
      assert(s.indexOf('p{color:red;}') > s.indexOf('markdown.min'))
    })

    it('allows passing an empty template to override default template', () => {
      zero = add(`<zero-md manual-render><template></template></zero-md>`)
      const s = zero.makeNode(zero.buildStyles())
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
      expect(zero.shadowRoot.querySelector('.test').innerHTML).to.equal('hello')
    })

    it('stamps html body into light dom if no-shadow set', () => {
      zero.remove()
      zero = add(`<zero-md manual-render no-shadow></zero-md>`)
      zero.stampBody('<div class="test">hello</div>')
      expect(zero.querySelector('.test').innerHTML).to.equal('hello')
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
          capture: true
        }
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
    let zero
    afterEach(() => zero.remove())

    it('auto re-renders when src change', (done) => {
      zero = add(`<zero-md src="fixture.md"></zero-md>`)
      zero.addEventListener('zero-md-rendered', () => {
        if (zero.src === 'fixture.md') {
          expect(zero.shadowRoot.querySelector('h1').innerText).to.equal('markdown-fixture')
          zero.src = 'fixtures/with-relative-img-link.md'
        } else if (zero.src === 'fixtures/with-relative-img-link.md') {
          expect(zero.shadowRoot.querySelector('h1').innerText).to.equal('relative-link-test')
          done()
        }
      })
    })

    it('prevents FOUC by ensuring styles are stamped and resolved first, before stamping md', async () => {
      zero = add(`<zero-md manual-render>
        <template>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.css">
        </template>
        <script type="text/markdown"># fixture</script></zero-md>`)
      const job = zero.render()
      await tick()
      assert(zero.shadowRoot.querySelector('link'))
      assert(!zero.shadowRoot.querySelector('h1'))
      await job
      assert(zero.shadowRoot.querySelector('h1'))
    })

    it('renders markdown-body with optional classes', async () => {
      zero = add(`<zero-md manual-render><script type="text/markdown"># test</script></zero-md>`)
      await zero.render({ classes: 'test-class' })
      assert(zero.shadowRoot.querySelector('.markdown-body').classList.contains('test-class'))
      await zero.render({ classes: ['test2', 'test3'] })
      assert(zero.shadowRoot.querySelector('.markdown-body').classList.contains('test3'))
    })

    it('renders partially if body changes but styles do not', async () => {
      zero = add(
        `<zero-md manual-render><template><style>h1{color:red;}</style></template><script type="text/markdown"># test</script></zero-md>`
      )
      await zero.render()
      let detail = {}
      zero.addEventListener('zero-md-rendered', (e) => {
        detail = e.detail
      })
      zero.querySelector('script').innerText = '# test2'
      await zero.render()
      await tick()
      assert(detail.stamped && detail.stamped.body === true)
      assert(detail.stamped && !detail.stamped.styles)
      const h1 = zero.shadowRoot.querySelector('h1')
      expect(window.getComputedStyle(h1).getPropertyValue('color')).to.equal('rgb(255, 0, 0)')
    })

    it('renders partially if styles change but body does not', async () => {
      zero = add(
        `<zero-md manual-render><template><style>h1{color:red;}</style></template><script type="text/markdown"># test</script></zero-md>`
      )
      await zero.render()
      let detail = {}
      zero.addEventListener('zero-md-rendered', (e) => {
        detail = e.detail
      })
      const tpl = zero.querySelector('template')
      tpl.content.firstElementChild.innerText = 'h1{color:blue}'
      await zero.render()
      await tick()
      assert(detail.stamped && detail.stamped.styles === true)
      assert(detail.stamped && !detail.stamped.body)
      const h1 = zero.shadowRoot.querySelector('h1')
      expect(window.getComputedStyle(h1).getPropertyValue('color')).to.equal('rgb(0, 0, 255)')
    })
  })

  describe('hash-link scrolls', () => {
    let zero
    afterEach(() => {
      location.hash = ''
      zero.remove()
    })

    // TODO: make it pass
    it.skip('scrolls to element if location.hash set on first render', async () => {
      location.hash = 'tamen-et-veri'
      zero = add(
        `<div style="height:200px;overflow:hidden;"><zero-md src="fixture.md"></zero-md></div>`
      )

      await sleep(500)

      assert(zero.scrollTop > 0)
    })

    // TODO: make it pass
    it.skip('hijacks same-doc hash links and scrolls id into view', async () => {
      zero = add(
        `<div style="height:200px;overflow:hidden;"><zero-md src="fixture.md" manual-render></zero-md></div>`
      )
      const el = zero.querySelector('zero-md')
      await el.render()
      const a = el.shadowRoot.querySelector('a[href="#tamen-et-veri"]')
      a.click()
      await sleep(50)
      assert(zero.scrollTop > 0)
      expect(location.hash).to.equal('#tamen-et-veri')
    })
  })

  describe('Mutation Observer tests', () => {
    let zero
    afterEach(() => zero.remove())

    // TODO: make it pass
    it.skip('auto re-renders content when inline markdown script changes', (done) => {
      let isInitialRender = true
      zero = add(`<zero-md><script type="text/markdown"># markdown-fixture</script></zero-md>`)
      zero.addEventListener('zero-md-rendered', () => {
        if (isInitialRender) {
          expect(zero.shadowRoot.querySelector('h1').innerHTML).to.equal('markdown-fixture')
          isInitialRender = false
          zero.querySelector('script').innerHTML = '# updated markdown-fixture'
        } else {
          expect(zero.shadowRoot.querySelector('h1').innerHTML).to.equal('updated markdown-fixture')
          done()
        }
      })
    })

    it('auto re-renders styles when styles template changes', (done) => {
      let isInitialRender = true
      zero = add(`<zero-md>
        <template>
          <style>h1 { color: rgb(255, 0, 0); }</style>
        </template>
        <script type="text/markdown"># fixture</script></zero-md>`)
      zero.addEventListener('zero-md-rendered', () => {
        const h1 = zero.shadowRoot.querySelector('h1')
        const computedStyle = window.getComputedStyle(h1)
        if (isInitialRender) {
          expect(computedStyle.color).to.equal('rgb(255, 0, 0)')
          isInitialRender = false
          zero.querySelector('template').content.firstElementChild.innerHTML =
            'h1 { color: rgb(0, 255, 0); }'
        } else { 
          expect(computedStyle.color).to.equal('rgb(0, 255, 0)')
          done()
        }
      })
    })
  })

  describe('running console tests - please ensure no error messages generated in console', () => {
    //TODO: test fails when to switch all test-modules for running
    it.skip('element should reconnect properly', async () => {
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
      expect(count).to.equal(2)
      console.log('Complete')
    })
  })

  describe('other cool features', () => {})
}