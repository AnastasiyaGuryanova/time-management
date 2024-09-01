import { addTask, updateTask, getTask } from '../api';
import { sessions } from '../sessions';

export const saveTask = async (hash, newTaskData) => {
	const { user } = await sessions.access(hash);

	let savedTask;

	if (newTaskData.id === '') {
		savedTask = await addTask(user.id, newTaskData);
	} else {
		const currentTask = await getTask(newTaskData.id);
		savedTask = await updateTask(newTaskData, currentTask);
	}

	return {
		error: null,
		res: savedTask,
	};
};
