#!/usr/bin/env zx
/* globals $, chalk */

const lines = $.sync`cat src/lib/const.js`.stdout
  .split('\n')
  .filter((i) => i.includes('jsdelivr('))
  .map((i) => i.split(`'`)[1])

for (const line of lines) {
  const p = line.split('@')
  const name = p[0] || '@' + p[1]
  const version = parseInt((p[0] ? p[1] : p[2]).split('/')[0])
  const latest = $.sync`npm view ${name}`.stdout.split('\n').filter((i) => i.includes('latest:'))[0]
  const major = parseInt(latest.split(' ')[1].split('.')[0])
  if (version === major) {
    console.log(chalk.green(line, 'OK'))
  } else {
    console.log(chalk.red(line, latest))
  }
}
