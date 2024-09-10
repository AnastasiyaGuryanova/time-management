import { ACTION_TYPE } from '@actions';

const initialProjectState = {
	projects: null,
	currentProject: {
		id: '',
		userId: '',
		title: '',
		description: '',
		createdAt: '',
		updatedAt: '',
	},
};

export const projectReduser = (state = initialProjectState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECT_DATA:
			return {
				...state,
				currentProject: {
					...state.currentProject,
					...action.payload,
				},
			};
		case ACTION_TYPE.SET_PROJECTS_DATA:
			return {
				...state,
				projects: action.payload,
			};
		case ACTION_TYPE.RESET_PROJECT_DATA:
			return {
				...state,
				currentProject: initialProjectState.currentProject,
			};

		case ACTION_TYPE.REMOVE_PROJECT_SUCCESS:
			return {
				...state,
				projects: state.projects
					? state.projects.filter((project) => project.id !== action.payload.id)
					: null,
			};

		default:
			return state;
	}
};
