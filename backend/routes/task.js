const express = require('express');
const {
	addTask,
	deleteTask,
	getTask,
	editTask,
	getAllTasksForUser,
	getTasks,
} = require('../controllers/task');
const mapTask = require('../helpers/mapTask');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
	const tasks = await getTasks(req.user._id, req.params.projectId);

	res.send({ data: tasks.map(mapTask) });
});

router.get('/:id', authenticated, async (req, res) => {
	const task = await getTask(req.params.id);

	res.send({ data: mapTask(task) });
});

router.post('/', authenticated, async (req, res) => {
	const newTask = await addTask({
		taskText: req.body.taskText,
		projectId: req.params.projectId,
	});

	res.send({ data: mapTask(newTask) });
});

router.patch('/:id', authenticated, async (req, res) => {
	const taskData = {
		taskText: req.body.taskText,
		startTime: req.body.startTime,
		endTime: req.body.endTime,
		duration: req.body.duration,
	};

	const updatedTask = await editTask(req.params.id, taskData);

	res.send({ data: mapTask(updatedTask) });
});

router.delete('/:id', authenticated, async (req, res) => {
	await deleteTask(req.params.id);

	res.send({ error: null });
});

module.exports = router;
