"use strict";

module.exports = function(sequelize, DataTypes) {
	var ResumeSkill = sequelize.define("ResumeSkill", {
		id: {
			primaryKey: true,
			type: DataTypes.STRING
		},
		title: DataTypes.STRING,
		description: DataTypes.TEXT
	});

	return ResumeSkill;
};