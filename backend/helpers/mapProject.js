const mongoose = require('mongoose');
const mapTask = require('./mapTask');

module.exports = function (project) {
	return {
		id: project._id,
		userId: project.userId,
		title: project.title,
		description: project.description,
		tasks:
			project.tasks &&
			project.tasks.map((task) =>
				mongoose.isObjectIdOrHexString(task) ? task : mapTask(task)
			),
		createdAt: project.createdAt && project.createdAt.toISOString().split('T')[0],
	};
};
