import { ACTION_TYPE } from '@actions';
import { ROLE } from '@constants';

const initialState = {
	id: null,
	name: null,
	email: null,
	roleId: ROLE.GUEST,
	createdAt: null,
	updatedAt: null,
	session: null,
};

export const userReduser = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}

		case ACTION_TYPE.LOGOUT: {
			return initialState;
		}

		default:
			return state;
	}
};
