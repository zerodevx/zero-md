
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
const notAUnicodeWord =
  /[^_0-9a-zA-Z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+/g;
 
function IDfy(
  name,
  options = { lowerCase: true, replace: { its: notAUnicodeWord, with: '-' } }
) {
  return options.lowerCase
    ? name.toLowerCase().replace(options.replace.its, options.replace.with)
    : name.replace(options.replace.its, options.replace.with)
}

class ZeroMd extends HTMLElement {
  get src() {
    return this.getAttribute('src')
  }

  get path() {
    return this.getAttribute('path')
  }

  get lang() {
    return (
      new URLSearchParams(window.location.search).get('lang') ||
      this.getAttribute('lang') ||
      this.config.lang
    )
  }

  get code() {
    return (
      new URLSearchParams(window.location.search).get('code') ||
      this.getAttribute('code') ||
      this.config.code
    )
  }

  set src(val) {
    this.reflect('src', val);
  }

  set path(val) {
    this.reflect('path', val);
  }

  set lang(val) {
    this.reflect('lang', val);
  }

  set code(val) {
    this.reflect('code', val);
  }

  get manualRender() {
    return this.hasAttribute('manual-render')
  }

  set manualRender(val) {
    this.reflect('manual-render', val);
  }

  reflect(name, val) {
    if (val === false) {
      this.removeAttribute(name);
    } else {
      this.setAttribute(name, val === true ? '' : val);
    }
  }

  static get observedAttributes() {
    return ['src', 'path', 'lang', 'code']
  }

  attributeChangedCallback(name, old, val) {
    if (
      (name === 'src' || name === 'path' || name === 'lang' || name === 'code') &&
      this.connected &&
      !this.manualRender &&
      val !== old
    ) {
      this.render();
    }
  }

  constructor(defaults) {
    super();
    this.version = '$VERSION';
    this.config = {
      markedUrl: 'https://cdn.jsdelivr.net/gh/markedjs/marked@2/marked.min.js',
      prismUrl: [
        ['https://cdn.jsdelivr.net/gh/PrismJS/prism@1/prism.min.js', 'data-manual'],
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/plugins/autoloader/prism-autoloader.min.js'
      ],
      cssUrls: [
        'https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@4/github-markdown.min.css',
        'https://cdn.jsdelivr.net/gh/PrismJS/prism@1/themes/prism.min.css',
        'https://cdn.jsdelivr.net/gh/automician/buttons-menu-custom-element@98902f0ad3f21fa6a2f3e0d1aa75b6f478557936/build/static/css/main.e5d0f3d9.css'
      ],
      hostCss:
        ':host{display:block;position:relative;contain:content;}:host([hidden]){display:none;}' +
        `
        .wrapper {
          width: auto;
          margin: auto;
          background-color: rgba(27,31,35,.05);
          border-radius: 10px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, .1);
        }
        
        button {
          letter-spacing: 0.75px;
          border: none;
          padding: 10px;
          # background-color: #bccbe9;
          background-color: rgba(27,31,35,.05);
          # color: #8e9ead;
          color: #778796;
          font-size: 12px;
          font-weight: 200;
          cursor: pointer;
          transition: 0.5s;
        }
        
        button:hover {
          #background-color: #d5e3ff;
          background-color: rgba(0,183,206,0.1);
        }
        
        button.active {
          background-color: rgba(27,31,35,.05);
          border-bottom: rgb(0,183,206) 1px solid;
        }
        
        .active {
          background-color: white;
        }
        
        .content,.inline-content {
          display: none;
        }
        
        .content.active {
          display: block;
        }
        
        .inline-content.active {
          display: inline;
        }
        `,
      baseUrl: '',
      gitlab: {
        token: null,
        projectId: null,
        path: null,
        branch: 'master',
        ...window.ZeroMdConfig.gitlab
      },
      disableCodeHighlightingFor: [],
      shortBreaksNumber: 2,
      longBreaksNumber: 20,
      anchorIdsToLowerCase: true,
      indentInsideTocByPixels: 40,
      imgBaseOld: './resources',
      imgBaseNew: 'https://github.com/yashaka/taotaspy-resources/raw/master',
      lang: null,
      code: null,
      groupCodeGroups: true,
      pTagLang: undefined, // expect string with something like "en-us", "ru", etc...
      ...defaults,
      ...window.ZeroMdConfig
    };
    this.cache = {};
    this.root = this.hasAttribute('no-shadow') ? this : this.attachShadow({ mode: 'open' });
    if (!this.constructor.ready) {
      this.constructor.ready = Promise.all([
        !!window.marked || this.loadScript(this.config.markedUrl),
        !!window.Prism || this.loadScript(this.config.prismUrl)
      ]);
    }
    this.clicked = this.clicked.bind(this);
    if (!this.manualRender) {
      // Scroll to hash id after first render. However, `history.scrollRestoration` inteferes with this
      // on refresh. It's much better to use a `setTimeout` rather than to alter the browser's behaviour.
      this.render().then(() => setTimeout(() => this.goto(location.hash), 250));
    }
    this.observer = new MutationObserver(async () => {
      this.observeChanges();
      if (!this.manualRender) {
        await this.render();
      }
    });
    this.observeChanges();
  }

  connectedCallback() {
    this.connected = true;
    this.fire('zero-md-connected', {}, { bubbles: false, composed: false });
    this.waitForReady().then(() => {
      this.fire('zero-md-ready');
    });
    if (this.shadowRoot) {
      this.shadowRoot.addEventListener('click', this.clicked);
    }
  }

  disconnectedCallback() {
    this.connected = false;
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this.clicked);
    }
  }

  waitForReady() {
    const ready =
      this.connected ||
      new Promise((resolve) => {
        this.addEventListener('zero-md-connected', function handler() {
          this.removeEventListener('zero-md-connected', handler);
          resolve();
        });
      });
    return Promise.all([this.constructor.ready, ready])
  }

  fire(name, detail = {}, opts = { bubbles: true, composed: true }) {
    if (detail.msg) {
      console.warn(detail.msg);
    }
    this.dispatchEvent(
      new CustomEvent(name, {
        detail: { node: this, ...detail },
        ...opts
      })
    );
  }

  tick() {
    return new Promise((resolve) => requestAnimationFrame(resolve))
  }

  // Coerce anything into an array
  arrify(any) {
    return any ? (Array.isArray(any) ? any : [any]) : []
  }

  // Promisify an element's onload callback
  onload(node) {
    return new Promise((resolve, reject) => {
      node.onload = resolve;
      node.onerror = (err) => reject(err.path ? err.path[0] : err.composedPath()[0]);
    })
  }

  // Load a url or load (in order) an array of urls via <script> tags
  loadScript(urls) {
    return Promise.all(
      this.arrify(urls).map((item) => {
        const [url, ...attrs] = this.arrify(item);
        const el = document.createElement('script');
        el.src = url;
        el.async = false;
        attrs.forEach((attr) => el.setAttribute(attr, ''));
        return this.onload(document.head.appendChild(el))
      })
    )
  }

  // Scroll to selected element
  goto(id) {
    if (id) {
      const el = this.root.getElementById(id.substring(1));
      if (el) {
        el.scrollIntoView();
      }
    }
  }

  // Hijack same-doc anchor hash links
  clicked(ev) {
    if (ev.metaKey || ev.ctrlKey || ev.altKey || ev.shiftKey || ev.defaultPrevented) {
      return
    }
    const a = ev.target.closest('a');
    if (a && a.hash && a.host === location.host && a.pathname === location.pathname) {
      this.goto(a.hash);
    }
  }

  dedent(str) {
    str = str.replace(/^\n/, '');
    const match = str.match(/^\s+/);
    return match ? str.replace(new RegExp(`^${match[0]}`, 'gm'), '') : str
  }

  getBaseUrl(src) {
    const a = document.createElement('a');
    a.href = src;
    return a.href.substring(0, a.href.lastIndexOf('/') + 1)
  }

  // Runs Prism highlight async; falls back to sync if Web Workers throw
  highlight(container) {
    return new Promise((resolve) => {
      const unhinted = container.querySelectorAll('pre>code:not([class*="language-"])');
      unhinted.forEach((n) => {
        // Dead simple language detection :)
        const lang = n.innerText.match(/^\s*</)
          ? 'markup'
          : n.innerText.match(/^\s*(\$|#)/)
          ? 'bash'
          : 'js';
        n.classList.add(`language-${lang}`);
      });
      try {
        window.Prism.highlightAllUnder(container, true, resolve());
      } catch {
        window.Prism.highlightAllUnder(container);
        resolve();
      }
    })
  }

  // Converts HTML string into node
  makeNode(html) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    return tpl.content.firstElementChild
  }

  // Construct styles dom and return HTML string
  buildStyles() {
    const get = (query) => {
      const node = this.querySelector(query);
      return node ? node.innerHTML || ' ' : ''
    };
    const urls = this.arrify(this.config.cssUrls);
    const html = `<div class="markdown-styles"><style>${this.config.hostCss}</style>${get(
      'template[data-merge="prepend"]'
    )}${
      get('template:not([data-merge])') ||
      urls.reduce((a, c) => `${a}<link rel="stylesheet" href="${c}">`, '')
    }${get('template[data-merge="append"]')}</div>`;
    return html
  }

  // Construct md nodes and return HTML string
  async buildMd(opts = {}) {
    const src = async () => {
      if (!this.src && !this.path) {
        return ''
      }

      let absoluteUrl = '';
      let isReadingFromGitlabConfigured = this.config.gitlab !== {};
      const resp =
        isReadingFromGitlabConfigured && this.path
          ? await (async () => {
              const id = this.config.gitlab.projectId;
              const branch = this.config.gitlab.branch;
              const absolutePath = encodeURIComponent(this.path.trim());
              absoluteUrl = `https://gitlab.com/api/v4/projects/${id}/repository/files/${absolutePath}/raw?ref=${branch}`;

              return fetch(absoluteUrl, {
                headers: {
                  'PRIVATE-TOKEN': this.config.gitlab.token
                }
              })
            })()
          : await (async () => {
              const url = this.src.trim();
              absoluteUrl = url.startsWith('http') ? url : this.config.baseUrl + url;

              return fetch(absoluteUrl)
            })();

      if (resp.ok) {
        let md = await resp.text();

        /* IMPORT SETTINGS FROM OUTER FILE */
        const importsMatch = [...md.matchAll(/<!--import\(([\s\S]*?)\)-->/gim)];
        if (importsMatch.length) {
          await Promise.all(importsMatch.map( async ([match, importURL]) => {
            const response = await fetch(importURL);
            const importedContent = await response.text();
            md = md.replace(match, importedContent);
          }))
        }

        /* PROCESS MD */
        const renderer = new window.marked.Renderer();

        const codalizedMatch = [...md.matchAll(/<codalized( main="(js|ts|py|java|cs)")?\/>/gim)];
        const [[shouldBeCodalized, __, defaultCodeFromMd]] = codalizedMatch.length
          ? codalizedMatch
          : [[]];

        const localizedMatch = [...md.matchAll(/<localized( main="(uk|ru|en)")?\/>/gim)];
        const [[shouldBeLocalized, _, defaultLangFromMd]] = localizedMatch.length
          ? localizedMatch
          : [[]];

        // const translationPerCodeOption = /<!--(js|ts|py|java|cs)(\W)(.*?)\2(.*?)\2-->/gim
        const translationPerCodeOption = /<!--(\w+(-\w+)?)(\W)(.*?)\2(.*?)\2-->/gim
        ;[...md.matchAll(translationPerCodeOption)].forEach(([match, perCode, __, from, to]) => {
          
          if ((this.code || defaultCodeFromMd) === perCode) {
            md = md.replace(new RegExp(from, 'gmi'), to);
          }
        });

        const translationPerLangOption = /<!--(ru|uk|en)(\W)(.*?)\2(.*?)\2-->/gim
        ;[...md.matchAll(translationPerLangOption)].forEach(([match, perLang, __, from, to]) => {
          if ((this.lang || defaultLangFromMd) === perLang) {
            md = md.replace(new RegExp(from, 'gmi'), to);
          }
        });

        if (shouldBeCodalized) {
          const codalized = /<((js|ts|py|java|cs)(-js|-ts|-py|-java|-cs)*)>([\s\S]*?)<\/\1>/gim;
          md = md.replace(codalized, (match, $1, __, ___, $4) => {
            const candidates = $1.split('-');
            return `<span class="inline-content${
              candidates.includes(this.code || defaultCodeFromMd) ? ' active' : ''
            }" id="${$1}">${$4}</span>`
          });
        }

        if (shouldBeLocalized) {
          const localized = /<(uk|ru|en)>([\s\S]*?)<\/\1>/gim;
          md = md.replace(localized, (match, $1, $2) => {
            return $1 === (this.lang || defaultLangFromMd) ? $2 : ''
          });
        }

        let tocLinks = [];
        const tocStartLevelOption = /<!--TOC>(\d)-->/i;
        const [, tocStartLevel] = md.match(tocStartLevelOption) || [null, 0];
        renderer.heading = (text, level) => {
          const [, pure, userId] = text.match(/^(.*)?\s*{#(.*)}$/im) || [null, text];
          const pureWithoutTags = pure.replace(/<\/?\w+>/g, '');
          const anchorIdsToLowerCase = this.config.anchorIdsToLowerCase;
          const id =
            userId ||
            (anchorIdsToLowerCase
              ? IDfy(pureWithoutTags)
              : IDfy(pureWithoutTags, { lowerCase: false }));
          const pixelsNumber = this.config.indentInsideTocByPixels;

          if (level > tocStartLevel) {
            const indentInsideToc = `style="margin-left: ${
              pixelsNumber * (level - 1 - tocStartLevel)
            }px"`;
            tocLinks.push(`<div ${indentInsideToc}><a href="#${id}">${pureWithoutTags}</a></div>`);
          }

          return `<h${level}>${encodeURI(id) === id ? '' : `<span id="${encodeURI(id)}"></span>`}
          <a id="${id}" class="anchor" aria-hidden="true" href="#${id}"></a>${pure}</h${level}>`
        };

        const imgBase = /]\(\.\.?\/resources/gim; // todo: move ../resources to config
        md = md.replace(imgBase, '](' + this.config.imgBaseNew);

        const shortBreaks = /^,,,,+/gim;
        md = md.replace(shortBreaks, '<br/>'.repeat(this.config.shortBreaksNumber));

        const longBreaks = /^====+/gim;
        md = md.replace(longBreaks, '<br/>'.repeat(this.config.longBreaksNumber));

        const pageBreaks = /^===/gim;
        md = md.replace(pageBreaks, '<div style="page-break-after: always;"></div>');

        this.config.disableCodeHighlightingFor.forEach((lang) => {
          md = md.replace(new RegExp(`\`\`\`${lang}`, 'gim'), '```');
        });

        const articleTypeExtension = /\.(\w+)\.md(\)|#)/gim;
        md = md.replace(articleTypeExtension, `-$1.md$2`);

        // todo: fix to skip links that start with http
        const mdExtensions = /\.md\)/gim;
        md = md.replace(mdExtensions, `-md${window.location.search})`);

        const mdExtensionsWithId = /\.md#/gim;
        md = md.replace(mdExtensionsWithId, `-md${window.location.search}#`);

        const poetryBoldOption = /<!--(.+)poetryBold(.+)-->/i;
        const [, poetryBoldStart, poetryBoldEnd] = md.match(poetryBoldOption) || [null, '__', '__'];
      
        const tabNameOption = /<!--(.+)tabNameBrackets(.+)-->/i;
        const [, tabNameStart, tabNameEnd] = md.match(tabNameOption) || [null, '"', '"'];

        const boldRegExpRule = [
          new RegExp(`${poetryBoldStart}(.*?)${poetryBoldEnd}`, 'gmi'),
          '<b>$1</b>'
        ];
        // todo: change to ```poetry ... ``` style
        const poetries = /---[a-z]*\n([\s\S]*?)\n---/gim;
        // const backTickPoetries = /```poetry[a-z]*\n([\s\S]*?)\n```/gim
        // const backTickPoetries = /```poetry(:?( [a-z]+)+)?\n([\s\S]*?)\n```/gim;
        const backTickPoetries = /```poetry: (.+)\n([\s\S]*?)\n```/gim;
        const poetryRules = [
          [/(___)(.*?)\1/gim, '<em>$2</em>'], //emphasis

          boldRegExpRule, //bold1
          [/(\*\*)(.*?)\1/gim, '<b>$2</b>'], //bold2

          // [/^(?!.*\/\*.*$).*(\*)(.*?)\1/gmi,      '<em>$2</em>'], //emphasis
          // TODO: fix: does not work for lines: ... * ... * ... /* ... */ ...
          // read for more info:
          //    https://stackoverflow.com/questions/7376238/javascript-regex-look-behind-alternative

          [/(____)(.*?)\1/gim, '<span style="text-decoration:underline">$2</span>'] //underlined
        ];
        const isOriginalUnderscoredBoldDisabled = poetryBoldStart !== '__';
        const processPoetry = (rules) => (match, $1, code) => {
          const [...tabNamesArray] = 
            $1.matchAll(new RegExp('\\w+' + tabNameStart + '[\\w\\d\\s\\S]*?' + tabNameEnd + '|(\\S+)', 'gim'))
          const [langs, customNames] = tabNamesArray.reduce(([langs, customNames], [lang]) => {

            let customName = null

            if (lang.includes(tabNameStart)) {
              customName = (() => {
                const [[__, customName]] = 
                  lang.matchAll(new RegExp(tabNameStart +'([\\w\\d\\s\\S]*?)' + tabNameEnd, 'gim'))

                return customName
              })()

              lang = lang.split(tabNameStart)[0]
            }

            return[[...langs, lang], [...customNames, customName]]
          }, [[], []])

          let res = code;

          for (const rule of rules) {
            res = res.replace(rule[0], rule[1]);
          }

          if (isOriginalUnderscoredBoldDisabled) {
            res.replace(/(__)(.*?)\1/gim, '‡‡‡$2‡‡‡'); // to encode original __
          }
          
          // return `<pre><code>${res}</code></pre>`;
          return langs
            ? langs
                .map((lang, index) => `<pre><code class="language-${lang}" poetry ${customNames[index] ? `data-customname="${customNames[index]}"` : ''}>${res}</code></pre>`)
                .join('\n')
            : `<pre>${res}</pre>`
        };

        md = md.replace(poetries, processPoetry(poetryRules));
        md = md.replace(backTickPoetries, processPoetry(poetryRules));

        const multiCodeBlocks = /```(([a-z]+)( [a-z]+)+)\n([\s\S]*?)\n```/gim;
        md = md.replace(multiCodeBlocks, (match, $1, __, ___, $4) => {
          const langs = $1.split(' ');
          const code = $4;
          return langs.map((lang) => `\`\`\`${lang}\n${code}\n\`\`\``).join('\n')
        });


        // Custom tabnames
        const  customNameTabBlocks = 
          new RegExp('```(\\w+): ' + tabNameStart + '([\\s\\S]+?)' + tabNameEnd + '\n([\\s\\S]*?)```', "gim");
        const [...customNameTabs] = [...md.matchAll(customNameTabBlocks)]

        customNameTabs.forEach(([match, lang, customName, code]) => {

          md = md.replace(match, `<pre><code class="language-${lang}" data-customname="${customName}">${code}</code></pre>`)
        })
 
 
        /* GET HTML */

        let html = window.marked(md, {
          baseUrl: this.getBaseUrl(window.location.href),
          renderer,
          ...opts
        });

        /* PROCESS HTML */

        if (isOriginalUnderscoredBoldDisabled) {
          html = html.replace(/‡‡‡/gim, '__');
        }

        const tocMarker = /\[toc\]/i;
        const toc = `<div class="toc">${tocLinks.join('')}</div>`;
        html = html.replace(tocMarker, toc);

        const codeGroups = /<p>(:::+)(manual)?<\/p>([\s\S]*?)<p>\1<\/p>/gim;
        const processCodeGroup = (match, $1, manual, $3) => {
          const items = $3;
           
          const itemMarker =
            /<pre><code class="language-(\w+)"( poetry)?( data-customname=.(.+).)?.*?>([\s\S]*?)<\/code><\/pre>/gim;
        
          let [itemsContent, itemsTitles] = [...items.matchAll(itemMarker)].reduce(
            ([content, titles], [match, title, poetry, __, customName, inner]) => {
       
            customName ? title = [title, customName] : title = [title]

            return [
                [...content, poetry ? `<pre>${inner}</pre>` : match],
                [...titles, title]
              ]},
            [[], []]
          );
        
          const code = this.code;
          let uniqueTitlesArray = [] 
          return `
          <div class="wrapper">
            <div class="buttonWrapper">
              ${itemsTitles
                .map(
                  (title, index) => {
                    let duplicatedTitle = false
                    uniqueTitlesArray.includes(title[0]) ? duplicatedTitle = true : uniqueTitlesArray.push(title[0])

                    return `<button class="tab-button${
                      (manual 
                        ? (index === 0) ? ' active' : '' 
                        : (code ? code === IDfy(title[0]) && !duplicatedTitle : index === 0) ? ' active' : ''
                      )
                    }" data-id="${IDfy(title[0])}">${title.length > 1 ? title[1] : title[0]}</button>`
                  })
                .join('\n')}
            </div>
            <div class="contentWrapper">
              ${itemsContent
                .map(
                  (item, index) =>  {
                    let duplicatedTitle = false
                    index === 0 ? uniqueTitlesArray = [] : null
                    uniqueTitlesArray.includes(itemsTitles[index][0]) ? duplicatedTitle = true : uniqueTitlesArray.push(itemsTitles[index][0])
                    
                    return `<div class="content${
                      (manual 
                        ? (index === 0) ? ' active' : '' 
                        // : (code ? code === IDfy((itemsTitles[index] instanceof Array) ? itemsTitles[index][0] : itemsTitles[index]) : index === 0) ? ' active' : ''
                        : (code ? code === IDfy(itemsTitles[index][0]) && !duplicatedTitle : index === 0) ? ' active' : ''
                      )
                    }" id="${IDfy(itemsTitles[index][0])}">${item}</div>`
                  })
                .join('\n')}
            </div>
          </div>
          `.trim()
        };

        html = html.replace(codeGroups, processCodeGroup);

        const languageJsMarker = /<pre><code class="language-(js|javascript)"/gim;
        html = html.replace(languageJsMarker, '<pre><code class="language-typescript"');

        return html
      } else {
        this.fire('zero-md-error', {
          msg: `[zero-md] HTTP error ${resp.status} while fetching src`,
          status: resp.status,
          src: this.src,
          path: this.path,
          lang: this.lang,
          code: this.code
        });
        return ''
      }
    };
    const script = () => {
      const el = this.querySelector('script[type="text/markdown"]');
      if (!el) {
        return ''
      }
      const md = el.hasAttribute('data-dedent') ? this.dedent(el.text) : el.text;
      return window.marked(md, opts)
    };
    const html = `<div class="markdown-body${
      opts.classes ? this.arrify(opts.classes).reduce((a, c) => `${a} ${c}`, ' ') : ''
    }">${(await src()) || script()}</div>`;
    return html
  }

  // Insert or replace HTML styles string into DOM and wait for links to load
  async stampStyles(html) {
    const node = this.makeNode(html);
    const links = [...node.querySelectorAll('link[rel="stylesheet"]')];
    const target = [...this.root.children].find((n) => n.classList.contains('markdown-styles'));
    if (target) {
      target.replaceWith(node);
    } else {
      this.root.prepend(node);
    }
    await Promise.all(links.map((l) => this.onload(l))).catch((err) => {
      this.fire('zero-md-error', {
        msg: '[zero-md] An external stylesheet failed to load',
        status: undefined,
        src: err.href
      });
    });
  }

  // Insert or replace HTML body string into DOM and returns the node
  stampBody(html) {
    const node = this.makeNode(html);
    const target = [...this.root.children].find((n) => n.classList.contains('markdown-body'));
    if (target) {
      target.replaceWith(node);
    } else {
      this.root.append(node);
    }
    return node
  }

  // Start observing for changes in root, templates and scripts
  observeChanges() {
    this.observer.observe(this, { childList: true });
    this.querySelectorAll('template,script[type="text/markdown"]').forEach((n) => {
      this.observer.observe(n.content || n, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    });
  }

  async render(opts = {}) {
    await this.waitForReady();
    const stamped = {};
    const pending = this.buildMd(opts);
    const css = this.buildStyles();
    if (css !== this.cache.styles) {
      this.cache.styles = css;
      await this.stampStyles(css);
      stamped.styles = true;
      await this.tick();
    }
    const md = await pending;
    if (md !== this.cache.body) {
      this.cache.body = md;
      const node = this.stampBody(md);

      /* PROCESS CODE GROUP - START */
      const tabsWrappers = node.querySelectorAll('.wrapper');
      tabsWrappers.forEach(
        (tabsWrapper) =>
          (tabsWrapper.onclick = (e) => {
            const element = e.target;
            const newActiveContentId = element.dataset.id;
            const isElementANonActiveTabButton =
              !!newActiveContentId && !element.classList.contains('active');

              if (isElementANonActiveTabButton) {
              if (this.config.groupCodeGroups) {
                node.querySelectorAll('.wrapper .tab-button').forEach((tabButton) => {
                  if (tabButton.dataset.id === newActiveContentId) {
                    tabButton.classList.add('active');
                  } else {
                    tabButton.classList.remove('active');
                  }
                });

                node.querySelectorAll(`.content,.inline-content`).forEach((content) => {
                  if (content.id.split('-').includes(newActiveContentId)) {
                    content.classList.add('active');
                  } else {
                    content.classList.remove('active');
                  }
                });
              } else {
                const buttonsWrapper = element.parentElement;
                buttonsWrapper.querySelector('.tab-button.active').classList.remove('active');
                element.classList.add('active');

                const wrapper = buttonsWrapper.parentElement;
                const contents = wrapper.querySelectorAll('.content');
                contents.forEach((content) => {
                  content.classList.remove('active');
                });
               
                wrapper.querySelector(`#${newActiveContentId}`).classList.add('active');
              }
            }
          })
      );
      /* PROCESS CODE GROUP - END */

      stamped.body = true;
      await this.highlight(node);
    }

    this.fire('zero-md-rendered', { stamped });
  }
}
customElements.define('zero-md', ZeroMd);

export { ZeroMd };
//# sourceMappingURL=bundle.js.map
