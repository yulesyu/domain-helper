# domain-helper

domain-helper is a express middleware for handling uncaughtException.

## Installation

```sh
$ npm install --save domain-helper
```

## Usage


Basic usage example:

```javascript
var express = require('express');
var domainHelper  = require('domain-helper');

var app = express();
app.use(domainHelper.middleware({
    maxTimes: 3,
    errorHandler: function(err){
        console.log('=== errorHandler ===', err.stack);
    }
}));
```

## API

### `middleware(opts)`

The following are the options that can be passed to middleware.

Key | Description
--- | ---
errorHandler | What to do when exception occurs.
maxTimes | The max times which exception occurs and it will exec process.exit(1).


## License

[MIT](LICENSE)
