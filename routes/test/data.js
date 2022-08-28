debug = (process.env.VERSION === 'STAGE') ? function() {} : console.log;

module.exports = {
    "url": '/dev',
    "mainFile": 'main.js',
    "loadOtherFiles": function (router) {
        require('./example/test')(router);
        debug('Loaded additional sites for /dev');
    }
}