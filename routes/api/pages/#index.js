var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    res.json({
        "info": "API for Xeon Client by Tomci0",
        "copyright": "Copyright Tomci0 © 2022",
        "version": process.env.VERSION
    });
});

module.exports = router;