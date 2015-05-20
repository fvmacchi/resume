var m,
	c,
	async = require('async');

module.exports = function(models, controllers) {
	m = models;
	c = controllers;

	return exports;
};

exports.getResume = function(req, res) {
	var type = req.param('version'),
		print = req.param('print') === 'true',
		company = req.param('company'),
		resume;

	if(!(type == "software" || type == "electrical" || type == "embedded")) {
		type = "all"
	}
	async.series([
		function(callback) {

			c.CompanyController.getCompany(company, function(result) {
				company = result;
				callback();
			});

		},
		function(callback) {

			c.tools.getResume(type, function(result) {
				resume = result;
				callback();
			});

		}], function() {
		res.render("resume.ejs", {
			resume: resume,
			print: print,
			company: company
		});
	});
};
