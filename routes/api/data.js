debug = (process.env.VERSION === 'STAGE') ? function() {} : console.log;
const fs = require('file-system');
const path = require('path');

module.exports = {
    "mainFile": '/pages/#index.js',
    "loadOtherFiles": function (router) {
        fs.readdir(path.join(__dirname, 'pages'), (err, files) => {
            debug('\n=================================================');
            debug(`Starting to load additional sites for /api [${files.length}] ...`)
            let loadedFiles = 0;
            files.forEach(file => {
                if (!file.startsWith('#')) {
                    loadedFiles++
                    const fileData = require(path.join(__dirname, 'pages', file))
                    if (fileData.url) {
                        if (fileData.post) {
                            router.post(fileData.url, fileData.post);
                        }
                        if (fileData.get) {
                            router.get(fileData.url, fileData.get);
                        }

                        debug(`Loaded additional site: /api/${file.split('.')[0]}`);
                    } else {
                        debug(`Loading additional site: /api/${file.split('.')[0]}\nERROR: Could not find URL`);
                    }
                    
                } else {
                    debug(`Skipped additional site: /api/${file.split('.')[0]}`);
                }
            });
            debug('Loaded [' + loadedFiles + '] additional sites for /api');
            debug('=================================================\n');
        });
    }
}