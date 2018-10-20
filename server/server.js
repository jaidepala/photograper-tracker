'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

app.start = function() {
    // start the web server
    // Reference:
    // https://stackoverflow.com/questions/33354267/port-timeout-deploying-loopback-app-to-heroku
    var port = process.env.PORT || 3000;

    app.set('port', port);
    
    // start the web server
    return app.listen(function() {
        app.emit('started');

        // app.use(loopback.static(path.resolve(__dirname, '../client')));
        app.use(loopback.static(path.resolve(__dirname, 'client/dist')));

        // Instruct the app
        // to use the forceSSL
        // middleware
        // app.use(forceSSL());

        // Catch all other routes and return the index file
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client/dist/index.html'));
        });

        // app.get('/', function(req, res) {
        //     res.sendFile(path.join(__dirname, 'src', 'index.html'));
        // });

        var baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});
