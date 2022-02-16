module.exports = {
  head: `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LJS2EY950X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-LJS2EY950X');
</script>
<link rel="icon" type="image/x-icon" href="/zero-md/favicon.ico">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Seaweed+Script&text=<zero-md>&display=swap">`,
  header: `<header style="display:flex;flex-direction:column;align-items:center;font-size:3.75rem;margin-top:0.75rem;">
  <h1 style="font-family:'Seaweed Script',sans-serif">&lt;zero-md&gt;</h1>
  <div style="margin-top:0.75rem;margin-bottom:1.5rem;">
    <a href="https://github.com/zerodevx/zero-md" title="Fork me on Github">
      <img src="https://img.shields.io/github/package-json/v/zerodevx/zero-md?style=for-the-badge&logo=github&label=fork+me+on+github" alt="version">
    </a>
  </div>
</header>`,
  footer: `<footer style="text-align:center;font-size:0.875rem;margin-top:4rem;margin-bottom:0.75rem">
  <p>ISC LICENSE</p>
  <p style="font-size:0.75rem;color:#6b7280;">SITE GENERATED WITH <a href="https://github.com/zerodevx/zero-md-docs">ZERO-MD-DOCS</a></p>
</footer>`,
  links: [
    { title: 'Overview', href: '/zero-md/', dir: 'docs' },
    {
      title: 'Installation',
      href: '/zero-md/installation/',
      dir: 'docs/installation'
    },
    {
      title: 'Basic Usage',
      href: '/zero-md/basic-usage/',
      dir: 'docs/basic-usage'
    },
    {
      title: 'Advanced Usage',
      href: '/zero-md/advanced-usage/',
      dir: 'docs/advanced-usage'
    },
    {
      title: 'Attributes & Helpers',
      href: '/zero-md/attributes-and-helpers/',
      dir: 'docs/attributes-and-helpers'
    },
    {
      title: 'Configuration',
      href: '/zero-md/configuration/',
      dir: 'docs/configuration'
    },
    {
      title: 'Migration Guide',
      href: '/zero-md/migration-guide/',
      dir: 'docs/migration-guide'
    },
    { title: 'Recipes', href: '/zero-md/recipes/', dir: 'docs/recipes' },
    {
      title: 'Contributing',
      href: '/zero-md/contributing/',
      dir: 'docs/contributing'
    }
  ],
  _template: 'default',
  _title: ''
}
