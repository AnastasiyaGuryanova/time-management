import { ACTION_TYPE } from "./action-type";

export const setProjectData = (postData) => ({
	type: ACTION_TYPE.SET_PROJECT_DATA,
	payload: postData,
});
