import { ACTION_TYPE } from './action-type';

export const setTheme = (newTheme) => ({
	type: ACTION_TYPE.SET_THEME,
	payload: newTheme,
});
