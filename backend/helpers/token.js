const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants/jwtSecret');

module.exports = {
	generate(data) {
		return jwt.sign(data, JWT_SECRET, { expiresIn: '30d' });
	},

	verify(token) {
		return jwt.verify(token, JWT_SECRET);
	},
};
