# Echofin Node

You can sign up for an Echofin account at https://www.echofin.co

## Requirements

NodeJS 4.0 and later.

## Installation

Download the [latest release](https://github.com/echofin/echofin-node/releases). Then, to use the bindings, include the `./lib/Echofin.js` file and initialize with your API KEY.

```js
var Echofin = require("./lib/Echofin.js")(
  "63eb1087-88a9-4832-b4e7-0565d6d72d0b"
);
```

## Dependencies

The bindings require the following packages in order to work properly:

- [`crypto`]
- [`qs`]
- [`request`]
- [`safe-buffer`]

All dependencies are available in the package.json file


## Documentation

Please see https://www.echofin.co/docs/api/ for up-to-date documentation.