"use strict";

module.exports = function(sequelize, DataTypes) {
	var Resume = sequelize.define("Resume", {
		id: {
			primaryKey: true,
			type: DataTypes.STRING
		},
		title: DataTypes.STRING,
		skills: DataTypes.TEXT
	});

	return Resume;
};