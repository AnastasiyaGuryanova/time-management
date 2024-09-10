import { ACTION_TYPE } from "./action-type";

export const setTasksProject = (tasks) => ({
	type: ACTION_TYPE.SET_TASKS_PROJECT,
	payload: tasks,
});
