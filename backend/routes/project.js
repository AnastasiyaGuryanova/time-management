const express = require('express');
const {
	addProject,
	editProject,
	deleteProject,
	getProjects,
	getProject,
} = require('../controllers/project');
const authenticated = require('../middlewares/authenticated');
const mapProject = require('../helpers/mapProject');
const taskRouter = require('./task');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
	const projects = await getProjects(req.user._id);

	res.send({ data: projects.map(mapProject) });
});

router.get('/:id', authenticated, async (req, res) => {
	const project = await getProject(req.params.id);

	res.send({ data: mapProject(project) });
});

router.post('/', authenticated, async (req, res) => {
	const projectData = {
		userId: req.user._id,
		title: req.body.title,
		description: req.body.description,
	};
	const newProject = await addProject(projectData);

	res.send({ data: mapProject(newProject) });
});

router.delete('/:id', authenticated, async (req, res) => {
	await deleteProject(req.params.id);

	res.send({ error: null });
});

router.patch('/:id', authenticated, async (req, res) => {
	const updatedProject = await editProject(req.params.id, {
		title: req.body.title,
		description: req.body.description,
	});

	res.send({ data: mapProject(updatedProject) });
});

router.use('/:projectId/task', taskRouter);

module.exports = router;
