
/**
 * Module dependencies.
 */

var config = require('config');
var express = require('express');
var ejs = require('ejs');

var app = module.exports = express.createServer();

var models = require('./models');

var controllers = require('./controllers')(models);

// Configuration


app.configure(function(){
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

require('./routes')(app, models, controllers);

// Handle 404
app.use(function(req, res) {
  res.send('404: Page not Found\nIf you received a link in my resume, please click the link instead. It contains a validation code underneath the hyperlink so that one company cannot pose as another. Thank you.', 404);
});

app.listen(8000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
