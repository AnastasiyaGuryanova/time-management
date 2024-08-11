import { ACTION_TYPE } from "@actions";

const initialTaskState = {
	tasks: [],
	currentTask: {
		id: "",
		projectId: "",
		taskText: "",
		startTime: "",
		endTime: "",
		duration: "",
		createdAt: "",
		updatedAt: "",
	},
};

export const taskReduser = (state = initialTaskState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_TASK_DATA:
			return {
				...state,
				currentTask: {
					...state.currentTask,
					...action.payload,
				},
			};
		case ACTION_TYPE.SET_TASKS:
			return {
				...state,
				tasks: action.payload,
			};
		case ACTION_TYPE.RESET_TASK_DATA:
			return initialTaskState;

		default:
			return state;
	}
};
