import { ACTION_TYPE } from "./action-type";

export const setProjectsData = (projects) => ({
	type: ACTION_TYPE.SET_PROJECTS_DATA,
	payload: projects,
});
