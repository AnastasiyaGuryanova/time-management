export const groupTasksByProject = (tasks, projects) => {
	return projects
		.map((project) => {
			const tasksForProject = tasks.filter(
				(task) => task.projectId === project.id,
			);
			const totalDuration = tasksForProject.reduce(
				(sum, task) => sum + task.duration,
				0,
			);

			return {
				projectTitle: project.title,
				duration: totalDuration,
			};
		})
		.filter((item) => item.duration > 0);
};
