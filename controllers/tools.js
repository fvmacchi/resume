var Sequelize = require('sequelize');
var crypto = require('crypto');
var fs = require('fs');

var m,
	c;

var sequelize = new Sequelize('resume', 'root', '');

module.exports = function(models, controllers) {
	m = models;
	c = controllers;
	
	return exports;
}


exports.getResume = function(type, callback) {
	console.log("TYPE: " + type);
	m.Resume.find({where: {id:type}}).then(function(resume) {
		var fetchedSkills = function() {
			callback(resume);
		};
		var skills = JSON.parse(resume.skills);
		if(skills.length == 0) {
			resume.skills = [];
			fetchedSkills();
		}
		else {
			var query = "SELECT * FROM resumeSkills where";
			for(var i = 0; i < skills.length; i++) {
				query += " id='" + skills[i] + "'"
				if(i != skills.length - 1) {
					query += " OR ";
				}
			}
			m.ResumeSkill.findAll({where: {id: {in: skills}}}).then(function(skillRows) {
				console.log(JSON.stringify(skillRows, null, 4))
				var orderedSkills = [];
				for(var i = 0; i < skills.length; i++) {
					for(var k = 0; k < skillRows.length; k++) {
						if(skillRows[k].id == skills[i]) {
							orderedSkills.push(skillRows[k]);
							break;
						}
					}
				}
				resume.skills = orderedSkills;
				console.log(JSON.stringify(orderedSkills, null, 4))
				fetchedSkills();
			});
		}
	});
};

exports.getCompany = function(id, callback) {
	m.Company.find({where: {id: id}}).then(callback);
};

exports.addVisit = function(visit, callback) {
	visit.time = (new Date()).toString();
	m.Visit.create(visit).then(callback);
}