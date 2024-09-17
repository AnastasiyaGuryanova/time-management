const formatDateTime = require('./formatDateTime');

module.exports = function (task) {
	return {
		id: task._id,
		projectId: task.projectId,
		taskText: task.taskText,
		startTime: formatDateTime(task.startTime),
		endTime: formatDateTime(task.endTime),
		duration: task.duration,
		createdAt: task.createdAt.toISOString().split('T')[0],
	};
};
