const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const bcrypt = require('bcryptjs')

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING(36), // UUID v4 всегда имеет длину 36 символов
			unique: true,
			allowNull: true,
		},
	},
	{
		timestamps: true,
		hooks: {
			beforeCreate: async user => {
				const salt = await bcrypt.genSalt(10)
				user.password = await bcrypt.hash(user.password, salt)
			},
		},
	}
)

module.exports = User
