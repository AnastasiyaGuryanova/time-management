import { ACTION_TYPE } from "@actions";

const initialProjectState = {
	id: "",
	userId: "",
	title: "",
	description: "",
	createdAt: "",
	updatedAt: "",
};

export const projectReduser = (state = initialProjectState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECT_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_PROJECT_DATA:
			return initialProjectState;

		default:
			return state;
	}
};
