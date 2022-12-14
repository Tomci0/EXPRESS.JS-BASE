var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { readdirSync, readdir } = require('file-system');
var noBots = require('express-nobots');
var session = require('express-session');
var csrfProtection = csrf({ cookie: true })
require('dotenv').config();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'tutaj tez zmien',
  name: 'zmiento'
}))

debug = (process.env.VERSION === 'STAGE') ? function() {} : console.log;

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(noBots({block:true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

console.log('\n')

readdirSync('./routes').forEach(function(file, index, array) {
  if (file.split('.')[1] === 'js' ) {
    let siteFile = require('./routes/' + file.split('.')[0]);

    if (file.split('.')[0] === 'index') {
      app.use('/', siteFile);
      debug('Loading site: / from file: ' + file);
    } else {
      app.use('/' + file.split('.')[0], siteFile);
      debug('Loading site: /' + file.split('.')[0] + ' from file: ' + file);
    }
  } else if (!file.split('.')[1]) {
    let files = readdirSync('./routes/' + file);
    if (files.find(r => r === 'data.js')) {
      let dataFile = require('./routes/' + file.split('.')[0] + '/data');
      if (dataFile.url) {
        if (dataFile.mainFile) {
          let mainFile = require('./routes/' + file.split('.')[0] + '/' + dataFile.mainFile.split('.')[0]);
          if (mainFile.length > 0) {
            app.use(dataFile.url, mainFile);
            dataFile.loadOtherFiles(mainFile);
            debug('Loading site: ' + dataFile.url + ' from file: /routes/' + file.split('.')[0] + '/' + dataFile.mainFile);
          } else {
            debug('Error loading mainFile from /routes/' + file.split('.')[0] + '/' + dataFile.mainFile);
          }
        } else {
          debug('Error loading mainFile from /routes/' + file.split('.')[0] + '/data.js');
        }
      } else {
        debug('Error loading url from /routes/' + file.split('.')[0] + '/data.js');
      }
    } else {
      debug('Error loading file: /routes/' + file + '/data.js - no data.js file found');
    }
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.VERSION === 'PROD' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// var debug = require('debug')('ejs:server');
var http = require('http');
const {readFile} = require("fs");

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('\nListening on ' + bind + '\nhttp://localhost:' + port + "\nVERSION: " + process.env.VERSION + '\n');
}
