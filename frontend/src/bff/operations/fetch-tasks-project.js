import { getTasksProject } from "../api";

export const fetchTasksProject = async (projectId) => {
	const tasks = await getTasksProject(projectId);

	return {
		error: null,
		res: tasks,
	};
};
