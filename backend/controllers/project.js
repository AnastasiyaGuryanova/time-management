const Project = require('../models/Project');

// add
async function addProject(project) {
	const newProject = await Project.create(project);

	return newProject;
}

// edit
async function editProject(id, project) {
	const newProject = await Project.findByIdAndUpdate(id, project, {
		returnDocument: 'after',
	});

	return newProject;
}

// delete
function deleteProject(id) {
	return Project.deleteOne({ _id: id });
}

//get all
async function getProjects(userId) {
	const projects = await Project.find({ userId }).sort({ createdAt: -1 });

	return projects;
}

// get item
function getProject(id) {
	return Project.findById(id);
}

module.exports = { addProject, editProject, deleteProject, getProjects, getProject };
