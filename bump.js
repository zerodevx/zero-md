const exec = require('child_process').execSync;

//args[0] is the old version, args[1] is the new one.
const args = process.argv.slice(2);

let oldVersion = '"version": "' + args[0] + '"';
let newVersion = '"version": "' + args[1] + '"';
let rrCommand = "npx rr '" + oldVersion + "' '" + newVersion + "' './{bower,bower-locker.bower,package,package-lock}.json'";
exec(rrCommand);

exec('npx rr "v' + args[0] + '" "v' + args[1] + '" "./src/zero-md.js"');
exec('node build');
