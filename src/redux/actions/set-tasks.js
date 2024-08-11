import { ACTION_TYPE } from "./action-type";

export const setTasks = (tasks) => ({
	type: ACTION_TYPE.SET_TASKS,
	payload: tasks,
});
