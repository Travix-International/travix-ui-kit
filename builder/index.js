#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const builder = require('./builder');

program
  .version(pkg.version)
  .option('-c, --css-dir <directory>', 'Destination directory of the ui-kit.css')
  .option('-j, --js-dir <directory>', 'Destination directory of the ui-kit.js')
  .option('-t, --theme-file <path>', 'Path to a theme file to override default UI Kit styles')
  .option('-w, --watch', 'Enables file-watcher functionality', false);

program.parse(process.argv);

builder(program)
  .then(() => console.log('Done!'))
  .catch(console.error);
