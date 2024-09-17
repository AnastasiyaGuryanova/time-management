const express = require('express');
const { getAllTasksForUser } = require('../controllers/task');
const mapTask = require('../helpers/mapTask');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
	try {
		const tasks = await getAllTasksForUser(req.user._id);
		res.send({ data: tasks.map(mapTask) });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;
