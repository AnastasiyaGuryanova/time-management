import { addTask, updateTask } from "../api";
import { sessions } from "../sessions";

export const saveTask = async (hash, newTaskData) => {
	const { user } = await sessions.access(hash);

	const savedTask =
		newTaskData.id === ""
			? await addTask(user.id, newTaskData)
			: await updateTask(newTaskData);

	return {
		error: null,
		res: savedTask,
	};
};
