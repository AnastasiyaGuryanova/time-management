const Task = require('../models/Task');
const Project = require('../models/Project');
const { getProjects } = require('./project');

// add
async function addTask(task) {
	const newTask = await Task.create(task);

	return newTask;
}

// edit
async function editTask(taskId, taskData) {
	const task = await getTask(taskId);

	if (taskData.taskText !== undefined) {
		task.taskText = taskData.taskText;
	}

	if (taskData.startTime !== undefined && task.startTime === null) {
		task.startTime = taskData.startTime;
	}

	if (taskData.endTime !== undefined) {
		task.endTime = taskData.endTime;
	}

	if (taskData.duration !== undefined) {
		task.duration += taskData.duration;
	}

	await task.save();
	return task;
}

// delete
function deleteTask(id) {
	return Task.deleteOne({ _id: id });
}

// get all
async function getAllTasksForUser(userId) {
	return await getTasks(userId);
}

// get list for project
async function getTasks(userId, projectId = null) {
	const query = {};

	if (projectId) {
		query.projectId = projectId;
	} else {
		const projects = await getProjects(userId);

		query.projectId = { $in: projects.map((project) => project._id) };
	}

	return await Task.find(query);
}

// get item
function getTask(id) {
	return Task.findById(id);
}

module.exports = { addTask, deleteTask, getTask, editTask, getAllTasksForUser, getTasks };
