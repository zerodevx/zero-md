const fs = require('fs');
const minify = require('babel-minify');

const src = fs.readFileSync('./src/zero-md.js', 'utf8');
const {code, map} = minify(src);

fs.writeFileSync('./build/zero-md.min.js', code);
fs.writeFileSync('./build/zero-md.html', `<script>${code}</script>`);
