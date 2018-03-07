jest.mock('commander');
jest.mock('..//builder', () => jest.fn(() => Promise.resolve()));

const builder = require('../builder');
const commander = require('commander');
const pkg = require('../../package.json');

commander.version = jest.fn().mockReturnValue(commander);
commander.option = jest.fn().mockReturnValue(commander);
commander.parse = jest.fn().mockReturnValue(commander);

require('../program');

describe('Builder › generateThemeFile.js', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('sets the program version, attributes, parses the process.argv and calls the builder', () => {
    expect(commander.version).toHaveBeenCalledWith(pkg.version);

    expect(commander.option).toHaveBeenCalledTimes(5);
    expect(commander.option).toHaveBeenCalledWith(
      '-c, --css-dir <directory>',
      'Destination directory of the ui-kit.css'
    );
    expect(commander.option).toHaveBeenCalledWith(
      '-e, --environment <environment>',
      'Environment in which to run the build',
      process.env.NODE_ENV
    );
    expect(commander.option).toHaveBeenCalledWith(
      '-j, --js-dir <directory>',
      'Destination directory of the ui-kit.js'
    );
    expect(commander.option).toHaveBeenCalledWith(
      '-t, --theme-file <path>',
      'Path to a theme file to override default UI Kit styles'
    );
    expect(commander.option).toHaveBeenCalledWith(
      '-w, --watch',
      'Enables file-watcher functionality',
      false
    );

    expect(commander.parse).toHaveBeenCalledWith(process.argv);

    expect(builder).toHaveBeenCalledWith(commander);
  });
});
