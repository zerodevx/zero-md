(function() {
  window.customElements.define('zero-md', class extends HTMLElement {

    get version() { return 'v1.3.3'; }
    get src() { return this.getAttribute('src'); }
    get manualRender() { return this.hasAttribute('manual-render'); }
    get noShadow() { return this.hasAttribute('no-shadow'); }
    get markedUrl() { return this.getAttribute('marked-url') || window.ZeroMd.config.markedUrl; }
    get prismUrl() { return this.getAttribute('prism-url') || window.ZeroMd.config.prismUrl; }
    get cssUrls() {
      let attr = this.getAttribute('css-urls');
      return attr ? JSON.parse(attr) : window.ZeroMd.config.cssUrls;
    }

    constructor() {
      super();
      window.ZeroMd = window.ZeroMd || {};
      window.ZeroMd.config = window.ZeroMd.config || {};
      window.ZeroMd.config.baseUrl = window.ZeroMd.config.baseUrl || '';
      window.ZeroMd.config.markedUrl = window.ZeroMd.config.markedUrl || 'https://cdn.jsdelivr.net/npm/marked@0/marked.min.js';
      window.ZeroMd.config.prismUrl = window.ZeroMd.config.prismUrl || 'https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js';
      window.ZeroMd.config.cssUrls = window.ZeroMd.config.cssUrls || ['https://cdn.jsdelivr.net/npm/github-markdown-css@2/github-markdown.min.css', 'https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism.min.css'];
      window.ZeroMd.cache = window.ZeroMd.cache || {};
    }

    connectedCallback() {
      this.addEventListener('click', this._hijackLinks.bind(this));
      this.addEventListener('zero-md-rendered', function handler() {
        this.removeEventListener('zero-md-rendered', handler);
        window.setTimeout(() => { this._scrollTo(window.location.hash); });
      }.bind(this));
      if (!this.manualRender) { this.render(); }
      this._fire('zero-md-ready');
    }

    _fire(eventName) {
      this.dispatchEvent(new CustomEvent(eventName, {bubbles: true, composed: true}));
    }

    _ajaxGet(url) {
      return new Promise((resolve, reject) => {
        if (!url) { reject(url); return; }
        const absoluteUrl = url.trim().startsWith('http') ? url : window.ZeroMd.config.baseUrl + url;
        let req = new XMLHttpRequest();
        let handler = err => {
          console.warn('[zero-md] Error getting file', absoluteUrl);
          reject(err);
        };
        req.open('GET', absoluteUrl, true);
        req.onload = () => {
          if (req.status >= 200 && req.status < 400) { resolve(req.responseText); }
          else { handler(req); }
        };
        req.onerror = err => handler(err);
        req.send();
      });
    }

    _loadScript(url, check, evt, ...attrs) {
      return new Promise((resolve, reject) => {
        if (check !== 'undefined') { resolve(); return; }
        // Handle race condition when multiple instances loaded at runtime
        if (window.ZeroMd.cache.hasOwnProperty(evt)) {
          window.addEventListener(evt, function handler() {
            window.removeEventListener(evt, handler);
            resolve();
          });
        } else {
          window.ZeroMd.cache[evt] = true;
          let el = document.createElement('script');
          for (let attr of attrs) el.setAttribute(attr, '');
          el.onload = () => { this._fire(evt); resolve(); };
          el.onerror = err => { console.warn('[zero-md] Error loading script', url); reject(err); };
          el.src = url;
          document.head.appendChild(el);
        }
      });
    }

    _getStylesheet(url) {
      return new Promise((resolve, reject) => {
        // Check cache if stylesheet already downloaded
        if (window.ZeroMd.cache[url]) {
          if (window.ZeroMd.cache[url].loaded) {
            resolve(window.ZeroMd.cache[url].data);
          } else {
            window.addEventListener(url, function handler() {
              window.removeEventListener(url, handler);
              resolve(window.ZeroMd.cache[url].data);
            });
          }
        } else {
          window.ZeroMd.cache[url] = { loaded: false, data: '' };
          this._ajaxGet(url).then(data => {
            window.ZeroMd.cache[url].data = data;
            window.ZeroMd.cache[url].loaded = true;
            this._fire(url);
            resolve(data);
          }, err => reject(err));
        }
      });
    }

    _getInputs() {
      return new Promise((resolve, reject) => {
        // First try reading from light DOM template
        let tpl = this.querySelector('template') && this.querySelector('template').content.querySelector('xmp') || false;
        if (tpl) { resolve(tpl.textContent); return; }
        // Next try reading from `src` attribute
        this._ajaxGet(this.src)
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    }

    _prismHighlight(code, lang) {
      return window.Prism.highlight(code, this._detectLang(code, lang));
    }

    _detectLang(code, lang) {
      // Dead simple language detection
      if (!lang) { return code.match(/^\s*</) ? window.Prism.languages.markup : window.Prism.languages.javascript; }
      if (window.Prism.languages.hasOwnProperty(lang)) { return window.Prism.languages[lang]; }
      if (lang.substr(0, 2) === 'es') { return window.Prism.languages.javascript; }
      if (lang === 'c') { return window.Prism.languages.clike; }
      return window.Prism.languages.markup;
    }

    _stampDom(data) {
      let nodes = this.querySelectorAll('[class^=markdown]');
      if (nodes) { nodes.forEach(node => this.removeChild(node)); }
      if (this.shadowRoot) { this.shadowRoot.innerHTML = ''; }
      if (this.noShadow) {
        this.insertAdjacentHTML('afterbegin', data);
      } else {
        let root = this.shadowRoot || this.attachShadow({mode: 'open'});
        root.innerHTML = data;
      }
    }

    _buildMd() {
      return new Promise((resolve, reject) => {
        Promise.all([this._getInputs(),
                     this._loadScript(this.markedUrl, typeof window.marked, 'zero-md-marked-ready', 'async'),
                     this._loadScript(this.prismUrl, typeof window.Prism, 'zero-md-prism-ready', 'async', 'data-manual')])
          .then(data => {

            const renderer = new window.marked.Renderer();
            let tableOfContents = '';
            
            renderer.heading = (text, level) => {
              const notAUnicodeWord = /[^_0-9a-zA-Z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+/g;
              const [, pure, userId] = text.match(/^(.*)?\s*{#(.*)}$/mi) || [null, text,];
              const pureWithoutTags = pure.replace(/<\/?\w+>/g, '');
              const id = userId || pureWithoutTags.replace(notAUnicodeWord, '-');
              const space = '&ensp;';
              tableOfContents += `${space.repeat(4 * (level - 1))}<a href="#${id}">${pureWithoutTags}</a><br>`;
              
              return`<h${level}>${(encodeURI(id) === id) ? '' : `<span id="${encodeURI(id)}"></span>`}
              <a id="${id}" class="anchor" aria-hidden="true" href="#${id}"></a>${pure}</h${level}>`;
            };

            let md = data[0];

            const options = {
              renderer: renderer,
              highlight: this._prismHighlight.bind(this)
            };
            let html = window.marked(md, options);

            const toc = /\[toc\]/i;
            html = html.replace(toc, tableOfContents);

            resolve('<div class="markdown-body">' + window.marked(html, { highlight: this._prismHighlight.bind(this) }) + '</div>');
          }, err => { reject(err); });
      });
    }

    _buildStyles() {
      return new Promise(resolve => {
        let start = '<style class="markdown-style">:host{display:block;position:relative;contain:content;}';
        let end = '</style>';
        // First try reading from light DOM template
        let tpl = this.querySelector('template') && this.querySelector('template').content.querySelector('style') || false;
        if (tpl) { resolve(start + tpl.textContent + end); return; }
        // Next try reading from css-urls
        if (Array.isArray(this.cssUrls) && this.cssUrls.length) {
          Promise.all(this.cssUrls.map(url => this._getStylesheet(url)))
            .then(data => resolve(start + data.join('') + end))
            .catch(() => resolve(start + end));
        } else {
          console.warn('[zero-md] No styles are defined');
          resolve(start + end);
        }
      });
    }

    _scrollTo(selector) {
      if (!selector || !this.shadowRoot) { return; }
      let el = this.shadowRoot.getElementById(selector.substr(1));
      if (el) { el.scrollIntoView(); }
    }

    _hijackLinks(ev) {
      let path = ev.path || ev.composedPath();
      if (path[0].tagName !== 'A') { return; }

      // check that it's a hash-link case
      const link = path[0];
      if (link.hash && (link.origin + link.pathname) === (window.location.origin + window.location.pathname)) {
        if (ev.metaKey) {
          window.open(link.href, '_blank');
        } else {
          this._scrollTo(link.hash);
          window.location = link.href;
        }
        ev.preventDefault();
      }
    }

    render() {
      Promise.all([this._buildStyles(), this._buildMd()])
        .then(data => {
          this._stampDom(data[0] + data[1]);
          this._fire('zero-md-rendered');
        });
    }
  });
}(window, document));
