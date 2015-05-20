"use strict";

module.exports = function(sequelize, DataTypes) {
	var ResumeProject = sequelize.define("ResumeProject", {
	}, {
		classMethods: {
			associate: function(m) {
				console.log('TESTING')
				m.Resume.belongsToMany(m.Project, {through: m.ResumeProject});
				m.Project.belongsToMany(m.Resume, {through: m.ResumeProject});
			}
		}
	});

	return ResumeProject;
};