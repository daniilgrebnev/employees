const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const Employee = sequelize.define(
	'Employee',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		middleName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		birthDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		department: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		post: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		salary: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		photo: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = Employee
