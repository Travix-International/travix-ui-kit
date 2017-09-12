# Travix UI-kit

[![npm](https://img.shields.io/npm/v/travix-ui-kit.svg)](https://www.npmjs.com/package/travix-ui-kit)
[![Build Status](https://img.shields.io/travis/Travix-International/travix-ui-kit/master.svg)](http://travis-ci.org/Travix-International/travix-ui-kit)
[![coverage](https://codecov.io/gh/Travix-International/travix-ui-kit/branch/master/graph/badge.svg)](https://codecov.io/gh/Travix-International/travix-ui-kit)
[![Greenkeeper badge](https://badges.greenkeeper.io/Travix-International/travix-ui-kit.svg)](https://greenkeeper.io/)
[![NSP Status](https://nodesecurity.io/orgs/travix-international-bv/projects/4757808e-0ffc-47dd-9c82-c48e782631dd/badge)](https://nodesecurity.io/orgs/travix-international-bv/projects/4757808e-0ffc-47dd-9c82-c48e782631dd)

Travix UI Components' repository.

## UI-Kit
Take a look at: https://travix-international.github.io/travix-ui-kit/

### How to install and setup
- `npm i react travix-ui-kit -S` install as a dependency

### Usage

#### CLI

The UI Kit comes with a CLI tool to help you build your UI bundles (JS and CSS).

To see the options available:

```bash
$ node_modules/.bin/travix-ui-kit -h

  Usage: travix-ui-kit [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -c, --css-dir <directory>        Destination directory of the ui-kit.css
    -e, --environment <environment>  Environment in which to run the build
    -j, --js-dir <directory>         Destination directory of the ui-kit.js
    -t, --theme-file <path>          Path to a theme file to override default UI Kit styles
    -w, --watch                      Enables file-watcher functionality
```

For example, if we want to generate our UI Bundles, with the default styling, on `./js/` and `./css/` folders,
we do:

```bash
$ node_modules/.bin/travix-ui-kit -j ./js/ -c ./css/
```

If we want to pass our own YAML file for styling, we also can do it:

```bash
$ node_modules/.bin/travix-ui-kit -j ./js/ -c ./css/ -t ./myDefaultStyle.yml
```

And for development purposes, we tend to want to watch for changes on the files.
That's possible too:

```bash
$ node_modules/.bin/travix-ui-kit -j ./js/ -c ./css/ -t ./myDefaultStyle.yml -w
```


For simplicity purposes we suggest to add a task/script to your `package.json`,
which simplifies the usage of the CLI. E.g.:

```js
{
  "scripts": {
    "build:ui": "travix-ui-kit -j ./js/ -c ./css/ -t ./myDefaultStyle.yml",
    "build:ui-watch": "travix-ui-kit -j ./js/ -c ./css/ -t ./myDefaultStyle.yml -w",
  }
}
```

#### The components

##### JS
 ```javascript
 const Button = require('travix-ui-kit').Button;
 // or
 import { Button } from 'travix-ui-kit';

 function renderSomething({onAdd}) {
   return (
     <Button size="s" onClick={onAdd}>Add value</Button>
   );
 }
 ```
##### CSS
use file `node_modules/travix-ui-kit/dist/ui-bundle.css`
- you can create an alias in your webpack plugin
- or inject it in your page current styles bundle
- or copy to public folder and add as separate style file with `<link>`

**Warning**: Directly using file `components/index.scss` not recommended. We're not promising that we will use SCSS in future or will keep file's structure

---

## Living style guide

### Before installation
- Soon we will add a public web service. For now you need to *install* it on your *local machine*
- We are using *default styling theme*. If you need to adjust it, you can do it by passing proper theme YAML file as env var:
  `THEME_PATH=/some/path/to/theme.yaml npm run build`

### How install

#### Prereqs
- [nodejs](https://nodejs.org/en/) v4 or higher

#### Installing
- `git clone` this repo
- `npm i` to install dependencies
- `npm run build` to build theme, styles and javascript

### How to run living style guide
- `npm run styleguide-build` to build web service with living style guide
- `npm run styleguide-server` to run web service with living style guide
- open [localhost:6060](http://localhost:6060/)

### Development

#### Start developing

- `npm run build:watch` to build the themes, styles and javascript on each file change
- `npm run build:watch -- -t "./path/to/my/theme.yml"` to build using a custom theme (also can use the other options as well).
- `npm run styleguide-server` to run web service with livingstyle guide and review changes

#### Testing

- `npm run test` to run unit test
- `npm run cov` to run unit test with coverage report
- `npm run update-snapshots` to update current unit test snapshots
- `npm run lint` to check ES-lint errors

#### Requirements


- Developer must follow the sturcture of the project
  - every component must contain own directory with its own `.js`, `.scss` and `.md` files
- 100% unit test coverage of components and helpers
- 0 ES lint errors
