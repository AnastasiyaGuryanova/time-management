const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');

async function getCurrentUser(userId) {
	return User.findById(userId);
}

// register
async function register(name, email, password) {
	if (!password) {
		throw new Error('Password is empty');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ name, email, password: passwordHash });

	const token = generate({ id: user.id });

	return { token, user };
}

// login
async function login(email, password) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('User not found');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Wrong password');
	}

	const token = generate({ id: user.id });

	return {
		token,
		user,
	};
}

// edit
async function updateUser(id, userData) {
	if (userData.password) {
		userData.password = await bcrypt.hash(userData.password, 10);
	}

	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
}

module.exports = { register, login, getCurrentUser, updateUser };
