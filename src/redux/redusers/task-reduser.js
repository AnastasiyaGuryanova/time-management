import { ACTION_TYPE } from '@actions';

const initialTaskState = {
	tasks: null,
	tasksAllProjects: null,
	currentTask: {
		id: '',
		projectId: '',
		taskText: null,
		startTime: null,
		endTime: null,
		duration: 0,
		createdAt: null,
		updatedAt: null,
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
		case ACTION_TYPE.SET_TASKS_PROJECT:
			return {
				...state,
				tasks: action.payload,
			};
		case ACTION_TYPE.SET_TASKS_ALL_PROJECTS:
			return {
				...state,
				tasksAllProjects: action.payload,
			};
		case ACTION_TYPE.RESET_TASK_DATA:
			return {
				...state,
				currentTask: initialTaskState.currentTask,
			};
		case ACTION_TYPE.REMOVE_TASK_SUCCESS:
			return {
				...state,
				tasks: state.tasks
					? state.tasks.filter((task) => task.id !== action.payload.id)
					: null,
				tasksAllProjects: state.tasksAllProjects
					? state.tasksAllProjects.filter(
							(task) => task.id !== action.payload.id,
						)
					: null,
			};
		default:
			return state;
	}
};
