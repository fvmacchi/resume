
/**
 * Module dependencies.
 */

var express = require('express');
var ejs = require('ejs');
var tools = require('tools');

var app = module.exports = express.createServer();

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

app.get("/", function(req, res) {
  var visitor = req.query.visitor;
  var company = {};
  var servePage = function() {
    res.render("index.ejs", {
      company: company
    });
  }
  if(visitor) {
    return tools.getCompany(visitor, function(c) {
      company = c;
      servePage();
    });
  }
  servePage();
});

app.get("/resume", function(req, res) {
  var type = req.query.version;
  if(!(type == "software" || type == "electrical" || type == "embedded")) {
    type = "all"
  }
  tools.getResume(type, function(resume) {
    res.render("resume.ejs", {resume: resume});
  });
});

app.listen(80, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});