export const deleteProject = (projectId) =>
	fetch(`http://localhost:3008/projects/${projectId}`, {
		method: "DELETE",
	});
