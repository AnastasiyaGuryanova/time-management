import { deleteTask } from "../api";

export const removeTask = async (id) => {
	await deleteTask(id);

	return {
		error: null,
		res: true,
	};
};
