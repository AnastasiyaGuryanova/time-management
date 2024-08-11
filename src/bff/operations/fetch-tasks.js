import { getTasks } from "../api";

export const fetchTasks = async (projectId) => {
	const tasks = await getTasks(projectId);

	return {
		error: null,
		res: tasks,
	};
};
