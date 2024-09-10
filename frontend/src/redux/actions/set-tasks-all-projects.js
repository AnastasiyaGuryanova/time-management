import { ACTION_TYPE } from "./action-type";

export const setTasksAllProjects = (tasks) => ({
	type: ACTION_TYPE.SET_TASKS_ALL_PROJECTS,
	payload: tasks,
});
