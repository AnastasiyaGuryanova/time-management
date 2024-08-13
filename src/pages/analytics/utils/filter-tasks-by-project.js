export const filterTasksByProject = (tasks, selectedProject) => {
	if (selectedProject && selectedProject !== "all") {
		return tasks.filter((task) => task.projectId === selectedProject);
	}
	return tasks;
};
