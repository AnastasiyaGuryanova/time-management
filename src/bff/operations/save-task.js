import { addTask, updateTask } from "../api";

export const saveTask = async (newTaskData) => {
	const savedTask =
		newTaskData.id === ""
			? await addTask(newTaskData)
			: await updateTask(newTaskData);

	return {
		error: null,
		res: savedTask,
	};
};
