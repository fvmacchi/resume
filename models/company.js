"use strict";

module.exports = function(sequelize, DataTypes) {
	var Company = sequelize.define("Company", {
		id: {
			primaryKey: true,
			type: DataTypes.STRING
		},
		name: DataTypes.STRING
	});

	return Company;
};