/* eslint-env mocha */
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

  const sleep = t => new Promise(resolve => setTimeout(resolve, t))

  const tick = () => new Promise(resolve => requestAnimationFrame(resolve))

  describe('constructor()', () => {
    it('should not load marked if marked already loaded', async () => {
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
    before(() => { f = add(`<zero-md src="dummy.md" manual-render></zero-md>`) })
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
      f = add(`<zero-md manual-render><template><link rel="stylesheet" href="example.css"></template></zero-md>`)
      const s = f.makeNode(f.buildStyles()).outerHTML
      assert(!s.includes('/github-markdown.min.css'))
      assert(s.includes('example.css'))
    })

    it('prepends correctly', () => {
      f = add(`<zero-md manual-render><template data-merge="prepend"><style>p{color:red;}</style></template></zero-md>`)
      const s = f.makeNode(f.buildStyles()).outerHTML
      assert(s.indexOf('p{color:red;}') < s.indexOf('markdown.min'))
    })

    it('appends correctly', () => {
      f = add(`<zero-md manual-render><template data-merge="append"><style>p{color:red;}</style></template></zero-md>`)
      const s = f.makeNode(f.buildStyles()).outerHTML
      assert(s.indexOf('p{color:red;}') > s.indexOf('markdown.min'))
    })

    it('allows passing an empty template to override default template', () => {
      f = add(`<zero-md manual-render><template></template></zero-md>`)
      const s = f.makeNode(f.buildStyles())
      assert(s.querySelectorAll('link').length === 0)
    })
  })

  describe('buildMd()', () => {
    let f
    beforeEach(() => { f = add(`<zero-md manual-render></zero-md>`) })
    afterEach(() => f.remove())

    it('converts src to md', async () => {
      f.src = 'fixture.md'
      await f.render()
      assert(f.shadowRoot.querySelector('.markdown-body>h1').innerHTML === 'markdown-fixture')
    })

    it('falls back to script when src is falsy', async () => {
      const el = document.createElement('script')
      el.setAttribute('type', 'text/markdown')
      el.text = `# fallback`
      f.appendChild(el)
      await f.render()
      assert(f.shadowRoot.querySelector('.markdown-body>h1').innerHTML === 'fallback')
    })

    it('highlights java code too', async () => {
      f.src = 'fixture.md'
      await f.render()
      await sleep(200) // freaking ugly but blame prism
      const el = f.shadowRoot.querySelector('.markdown-body pre>code.language-java :first-child')
      assert(el.classList.contains('token'))
    })

    it('language-detects unhinted code blocks', async () => {
      f.src = 'fixture.md'
      await f.render()
      const nodes = [...f.shadowRoot.querySelectorAll('p')].filter(i => i.textContent === 'Unhinted:')
      assert(nodes[0].nextElementSibling.className.includes('language-'))
    })

    it('dedents when script data-dedent set', async () => {
      const el = document.createElement('script')
      el.setAttribute('type', 'text/markdown')
      el.setAttribute('data-dedent', '')
      el.text = `
        # fallback`
      f.appendChild(el)
      await f.render()
      assert(f.shadowRoot.querySelector('.markdown-body>h1').innerHTML === 'fallback')
    })

    it('resolves md base urls relative to src', async () => {
      f.src = 'test1/fixture.md'
      await f.render()
      const a = document.createElement('a')
      a.href = f.shadowRoot.querySelector('img').src
      assert(a.pathname === '/test1/cat.jpg')
    })
  })

  describe('stampBody()', () => {
    let f
    beforeEach(() => { f = add(`<zero-md manual-render></zero-md>`) })
    afterEach(() => f.remove())

    it('stamps html body into shadow dom', () => {
      f.stampBody('<div class="test">hello</div>')
      assert(f.shadowRoot.querySelector('.test').innerHTML === 'hello')
    })

    it('stamps html body into light dom if no-shadow set', () => {
      f.remove()
      f = add(`<zero-md manual-render no-shadow></zero-md>`)
      f.stampBody('<div class="test">hello</div>')
      assert(f.querySelector('.test').innerHTML === 'hello')
    })
  })

  describe('stampStyles()', () => {
    let f
    beforeEach(() => { f = add(`<zero-md manual-render></zero-md>`) })
    afterEach(() => f.remove())

    it('stamps html styles and wait for stylesheet links to resolve', async () => {
      const html = '<div><link rel="stylesheet" href="fixture.css"></div>'
      let loaded = false
      f.shadowRoot.addEventListener('load', () => {
        loaded = true
      }, {
        once: true,
        capture: true
      })
      await f.stampStyles(html)
      assert(loaded)
    })

    it('still stamps html styles if a link errors', async () => {
      const html = '<div><link rel="stylesheet" href="error.css"><link rel="stylesheet" href="fixture.css"></div>'
      await f.stampStyles(html)
      assert(f.shadowRoot.querySelector('link[href="fixture.css"]'))
    })
  })

  describe('render()', () => {
    let f
    afterEach(() => f.remove())

    it('auto re-renders when src change', done => {
      f = add(`<zero-md src="fixture.md"></zero-md>`)
      f.addEventListener('zero-md-rendered', () => {
        if (f.src === 'fixture.md') {
          assert(f.shadowRoot.querySelector('h1').innerHTML === 'markdown-fixture')
          f.src = 'test1/fixture.md'
        } else if (f.src === 'test1/fixture.md') {
          assert(f.shadowRoot.querySelector('h1').innerHTML === 'relative-link-test')
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
      f = add(`<zero-md manual-render><template><style>h1{color:red;}</style></template><script type="text/markdown"># test</script></zero-md>`)
      await f.render()
      let detail = {}
      f.addEventListener('zero-md-rendered', e => {
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
      f = add(`<zero-md manual-render><template><style>h1{color:red;}</style></template><script type="text/markdown"># test</script></zero-md>`)
      await f.render()
      let detail = {}
      f.addEventListener('zero-md-rendered', e => {
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

    it('scrolls to element if location.hash set on first render', async () => {
      location.hash = 'tamen-et-veri'
      f = add(`<div style="height:200px;overflow:hidden;"><zero-md src="fixture.md"></zero-md></div>`)
      await sleep(500)
      assert(f.scrollTop > 0)
    })

    it('hijacks same-doc hash links and scrolls id into view', async () => {
      f = add(`<div style="height:200px;overflow:hidden;"><zero-md src="fixture.md" manual-render></zero-md></div>`)
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

    it('auto re-renders content when inline markdown script changes', done => {
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

    it('auto re-renders styles when styles template changes', done => {
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
          f.querySelector('template').content.firstElementChild.innerHTML = 'h1 { color: rgb(0, 255, 0); }'
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

  describe('other cool features', () => {

  })
})

mocha.run()
