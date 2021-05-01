/* global matchMedia, navaid, gtag */

const dev = location.protocol === 'http:'
const urls = ['https://zerodevx.github.io/zero-md/', 'http://127.0.0.1:5000/docs/']
const base = dev ? urls[1] : urls[0]
const app = document.querySelector('.app')
const nav = document.querySelector('.nav')
const offset = document.querySelector('.offset')
let links
let height
let router
let firstRun = true

const tick = () => new Promise(resolve => requestAnimationFrame(resolve))
const getTail = path => path.split('/').filter(i => i).pop()
const getTitle = name => name.split('-').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(' ')
const setTitle = title => { document.head.querySelector('title').innerText = title }

const createMenu = async () => {
  const makeLinks = links => `<ul>${links.reduce((a, c) => `${a}<li><a href="${c[1]}">${c[0]}</a></li>`, '')}</ul>`
  const resp = await fetch(`${base}sitemap.txt`)
  const text = await resp.text()
  links = text.split('\n').filter(i => i && !i.endsWith('/v1/')).map(i => [getTitle(getTail(i)), dev ? i.replace(urls[0], urls[1]) : i])
  links[0][0] = 'Overview'
  nav.insertAdjacentHTML('afterbegin', makeLinks(links))
  await tick()
  height = nav.offsetHeight
}

const listenMedia = () => {
  const mql = matchMedia('(min-width: 768px)')
  const resize = ev => { offset.style.marginTop = ev.matches ? `-${height}px` : '' }
  resize({ matches: mql.matches })
  mql.addEventListener('change', resize)
}

const setActive = () => {
  const nodes = nav.querySelectorAll('a')
  nodes.forEach(a => {
    const isActive = a.pathname === location.pathname
    a.classList.toggle('active', isActive)
    if (isActive && !firstRun) {
      setTitle(a.innerText)
    }
  })
}

const setRoutes = () => {
  const run = url => {
    app.src = url ? `${url}readme.md` : ''
    if (firstRun) {
      app.render().then(() => setTimeout(() => app.goto(location.hash), 250))
    } else {
      app.render()
    }
    setActive()
    firstRun = false
    gtag('event', 'page_view', {
      page_location: location.pathname
    })
  }
  router = navaid(`${getTail(base)}`)
  router.on('/', () => run(base))
  for (let a = 1; a < links.length; a++) {
    const tail = getTail(links[a][1])
    router.on(`${tail}/`, () => run(`${base}${tail}/`))
  }
  router.on('*', () => run())
  router.listen()
}

const init = async () => {
  await createMenu()
  listenMedia()
  setRoutes()
}

init()
