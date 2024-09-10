import { getTasksAllProjects } from "../api";
import { sessions } from "../sessions";

export const fetchTasksAllProjects = async (hash) => {
	const { user } = await sessions.access(hash);

	const tasks = await getTasksAllProjects(user.id);

	return {
		error: null,
		res: tasks,
	};
};
