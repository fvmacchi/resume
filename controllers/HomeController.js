var m,
	c,
	async = require('async');

module.exports = function(models, controllers) {
	m = models;
	c = controllers;

	return exports;
};

exports.index = function(req, res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		visitor = req.query.visitor,
		company;

	async.series([
		function(callback) {
			if(!visitor) {
				return callback();
			}
			c.CompanyController.getCompany(visitor, function(result) {
				company = result;
				return callback();
			});
		},
		function(callback) {
			res.render('index.ejs', {
				company: company
			});
			return callback();
		}
		], function() {
			var visit = {
				ip: ip
			}
			if(company && company.name) {
				visit.company = company.name;
				visit.companyId = company.id;
			}
			else {
				visit.company = "none";
				visit.companyId = "none";
			}
			c.tools.addVisit(visit, function(){});
		});
};

exports.getResume = function(req, res) {
	var type = req.query.version;
	if(!(type == "software" || type == "electrical" || type == "embedded")) {
		type = "all"
	}
	c.tools.getResume(type, function(resume) {
		res.render("resume.ejs", {resume: resume});
	});
};
