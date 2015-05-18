"use strict";

module.exports = function(sequelize, DataTypes) {
	var Visit = sequelize.define("Visit", {
		id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
		companyId: DataTypes.STRING,
		company: DataTypes.STRING,
		time: DataTypes.STRING,
		ip: DataTypes.STRING
	});

	return Visit;
};