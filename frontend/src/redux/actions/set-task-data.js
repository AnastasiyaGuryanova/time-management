import { ACTION_TYPE } from "./action-type";

export const setTaskData = (taskData) => ({
	type: ACTION_TYPE.SET_TASK_DATA,
	payload: taskData,
});
