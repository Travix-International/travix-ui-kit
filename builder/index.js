#!/usr/bin/env node

const builder = require('./builder');
const pkg = require('../package.json');
const program = require('commander');
const util = require('util');

program
  .version(pkg.version)
  .option('-c, --css-dir <directory>', 'Destination directory of the ui-kit.css')
  .option('-e, --environment <environment>', 'Environment in which to run the build', process.env.NODE_ENV)
  .option('-j, --js-dir <directory>', 'Destination directory of the ui-kit.js')
  .option('-t, --theme-file <path>', 'Path to a theme file to override default UI Kit styles')
  .option('-w, --watch', 'Enables file-watcher functionality', false);

program.parse(process.argv);

builder(program)
  .then(() => console.log('Done!'))
  .catch(e => console.error(util.inspect(e, true, undefined, true)));
