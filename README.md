sails-google-discovery-doc
==========================

[![Build Status](https://travis-ci.org/tjwebb/sails-google-discovery-doc.svg)](https://travis-ci.org/tjwebb/sails-google-discovery-doc)

Generate a Google API Discovery Document for a Sails.js Application

## Install
```sh
$ npm install sails-google-discovery-doc --save
```

```js
var SailsDiscovery = require('sails-google-discovery-doc');
```

## Usage

Start your app per usual:
```sh
$ sails lift
```

Then, in some controller or service somewhere:

```js

var doc = SailsDiscovery.createRestDescription(sails);
```

That's it!

## Reference
- npm: https://www.npmjs.org/package/sails-google-discovery-doc
- github: https://github.com/tjwebb/sails-google-discovery-doc
- License: MIT
