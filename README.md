# markdown-it-sup

[![Build Status](https://img.shields.io/travis/GerHobbelt/markdown-it-sup/master.svg?style=flat)](https://travis-ci.org/GerHobbelt/markdown-it-sup)
[![NPM version](https://img.shields.io/npm/v/markdown-it-sup.svg?style=flat)](https://www.npmjs.org/package/@gerhobbelt/markdown-it-sup)
[![Coverage Status](https://img.shields.io/coveralls/GerHobbelt/markdown-it-sup/master.svg?style=flat)](https://coveralls.io/r/GerHobbelt/markdown-it-sup?branch=master)

> Superscript (`<sup>`) tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v1.+ requires `markdown-it` v4.+, see changelog.__

`29^th^` => `29<sup>th</sup>`

Markup is based on [pandoc](http://johnmacfarlane.net/pandoc/README.html#superscripts-and-subscripts) definition. But nested markup is currently not supported.


## Install

node.js, browser:

```bash
npm install @gerhobbelt/markdown-it-sup --save
bower install @gerhobbelt/markdown-it-sup --save
```

## Use

```js
var md = require('@gerhobbelt/markdown-it')()
            .use(require('@gerhobbelt/markdown-it-sup'));

md.render('29^th^') // => '<p>29<sup>th</sup></p>'
```

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitSup`.


## License

[MIT](https://github.com/GerHobbelt/markdown-it-sup/blob/master/LICENSE)
