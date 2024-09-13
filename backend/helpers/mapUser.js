module.exports = function (user) {
	return {
		id: user._id,
		name: user.name,
		email: user.email,
		roleId: user.role,
		createdAt: user.createdAt.toISOString().split('T')[0],
	};
};
