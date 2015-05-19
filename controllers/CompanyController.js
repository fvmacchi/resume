var m,
	c,
	async = require('async'),
	crypto = require('crypto'),
	config = require('config');

module.exports = function(models, controllers) {
	m = models;
	c = controllers;

	return exports;
};

exports.createCompanies = function(companyNames, callback) {
	var secret = config.company_hash_secret || '';
	async.each(companyNames, function(companyName, callback) {
		var hash = crypto.createHash('sha1');
		hash.update(secret + companyName);
		m.Company.findOrCreate({where: {
			name: companyName,
			id: hash.digest('hex')
		}}).then(function() {
			callback();
		});
	}, function() {
		callback && callback();
	});
};

exports.createCompany = function(companyName, callback) {
	return exports.createCompanies([companyName], callback);
};

exports.getCompany = function(id, callback) {
	m.Company.find({where: {id: id}}).then(callback);
};
