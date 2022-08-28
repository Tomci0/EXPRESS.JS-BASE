# EXPRESS.JS BASE

This is base for express.js made by me <3

rename example.env to .env and change options according to your preferences.

## CREATE NEW SITES

if you want to create new site, create new file or folder.

in file you must paste this code

```
var express = require('express');
var router = express.Router();

module.exports = router;
```

in folder you must place two files.

data.js (this file must exist)

```
debug = (process.env.VERSION === 'STAGE') ? function() {} : console.log;

module.exports = {
    "url": '/dev',
    "mainFile": 'main.js',
    "loadOtherFiles": function (router) {
        require('./example/test')(router);
        debug('Loaded additional sites for /dev');
    }
}
```

file name from data.js mainFile (with .js on the end)

```
var express = require('express');
var router = express.Router();

module.exports = router;
```

### you can find an example in the test folder.
