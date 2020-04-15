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
        let req = new XMLHttpRequest();
        let handler = err => {
          console.warn('[zero-md] Error getting file', url);
          reject(err);
        };
        req.open('GET', url, true);
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
            resolve('<div class="markdown-body">' + window.marked(data[0], { highlight: this._prismHighlight.bind(this) }) + '</div>');
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
