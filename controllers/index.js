'use strict';

var fs          = require('fs');
var path        = require('path');
var basename    = path.basename(module.filename);
var env         = process.env.NODE_ENV || 'development';
var controllers = {};

module.exports = function(models) {
	fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== basename);
	})
	.forEach(function(file) {
		var controller = require(path.join(__dirname, file))(models, controllers);
		controllers[file.toString().split('.')[0]] = controller;
	});

	return controllers;
}
