import { setTaskData } from "./set-task-data";

export const saveTaskAsync = (requestServer, newTaskData) => (dispatch) =>
	requestServer("saveTask", newTaskData).then((updatedTask) => {
		dispatch(setTaskData(updatedTask.res));
		return updatedTask.res;
	});
