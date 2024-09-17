const mongoose = require('mongoose');
const validator = require('validator');
const ROLES = require('../constants/roles');

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: validator.isEmail,
				message: 'Invalid email',
			},
		},
		password: {
			type: String,
			require: true,
		},
		role: {
			type: Number,
			default: ROLES.USER,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
