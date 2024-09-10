import { removeTaskSuccess } from "./remove-task-success.js";

export const removeTaskAsync = (requestServer, id) => (dispatch) =>
	requestServer("removeTask", id).then((taskData) => {
		if (taskData.res) {
			dispatch(removeTaskSuccess(id));
		}
		return taskData;
	});
