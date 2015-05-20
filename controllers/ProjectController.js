var m,
	c,
	async = require('async');

module.exports = function(models, controllers) {
	m = models;
	c = controllers;

	return exports;
}

exports.createProjects = function(projects, callback) {
	
	async.each(projects, function(project, callback) {
		m.Project.findOrCreate({where: project}).then(function() {
			callback();
		});
	}, 
	function() {
		callback && callback();
	})

};

exports.createProject = function(project, callback) {
	exports.createProjects([project], callback);
}
