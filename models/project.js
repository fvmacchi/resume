"use strict";

module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define("Project", {
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		image: DataTypes.STRING,
		description: DataTypes.TEXT
	});

	return Project;
};