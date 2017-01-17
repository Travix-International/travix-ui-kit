# Travix UI-kit

[![npm](https://img.shields.io/npm/v/travix-ui-kit.svg)](https://www.npmjs.com/package/travix-ui-kit) [![Build Status](https://img.shields.io/travis/Travix-International/travix-ui-kit/master.svg)](http://travis-ci.org/Travix-International/travix-ui-kit) [![Coverage](https://img.shields.io/coveralls/Travix-International/travix-ui-kit.svg)](https://coveralls.io/github/Travix-International/travix-ui-kit) [![NSP Status](https://nodesecurity.io/orgs/travix-international-bv/projects/4757808e-0ffc-47dd-9c82-c48e782631dd/badge)](https://nodesecurity.io/orgs/travix-international-bv/projects/4757808e-0ffc-47dd-9c82-c48e782631dd)

Travix UI Components' repository.

## UI-Kit
### How to install and setup
- `npm i travix-ui-kit -S` install as a dependency
- add npm script `build` with value `cd node_modules/travix-ui-kit/ && npm run build && cd ../..` to your `package.json`

### How to use
#### JS
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
#### CSS
use file `node_modules/travix-ui-kit/dist/bundle.css`
- you can create an alias in your webpack plugin
- or inject it in your page current styles bundle
- or copy to public folder and add as separate style file with `<link>`

**Warning**: Directly using file `components/index.scss` not recommended. We're not promising that we will use SCSS in future or will keep file's structure

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
- open [localhost:3000](http://localhost:3000/)

### Development

#### Start developing

- `npm run build:watch` to build the themes, styles and javascript on each file change
- `npm run build-theme:watch` to build the themes on each theme change
- `THEME_PATH=/some/path/to/theme.yaml npm run build` to pass other than default theme. Theme must be a valid yaml file
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
