import { ACTION_TYPE } from "./action-type";

export const removeProjectSuccess = (id) => ({
	type: ACTION_TYPE.REMOVE_PROJECT_SUCCESS,
	payload: { id },
});
