import { ACTION_TYPE } from "./action-type";

export const removeTaskSuccess = (id) => ({
	type: ACTION_TYPE.REMOVE_TASK_SUCCESS,
	payload: { id },
});
