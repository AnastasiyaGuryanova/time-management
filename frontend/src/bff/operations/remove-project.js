import { deleteProject, getTasksProject, deleteTask } from '../api';

export const removeProject = async (id) => {
	await deleteProject(id);

	const tasks = await getTasksProject(id);

	await Promise.all(tasks.map(({ id: taskId }) => deleteTask(taskId)));

	return {
		error: null,
		res: true,
	};
};
