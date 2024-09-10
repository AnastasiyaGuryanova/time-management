import { ACTION_TYPE } from '@actions';
import { byВefaultTheme } from '@themes';

const initialAppState = {
	currentTheme: localStorage.getItem('appTheme')
		? JSON.parse(localStorage.getItem('appTheme'))
		: byВefaultTheme,
	modal: {
		isOpen: false,
		children: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReduser = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_THEME: {
			return {
				...state,
				currentTheme: action.payload,
			};
		}

		case ACTION_TYPE.OPEN_MODAL: {
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		}

		case ACTION_TYPE.CLOSE_MODAL: {
			return initialAppState;
		}

		default:
			return state;
	}
};
