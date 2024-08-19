import { setTheme, saveThemeToLocalStorage } from '@actions';
import { byВefaultTheme, darkTheme } from '@themes';

export const updateTheme = (currentTheme) => (dispatch) => {
	const newTheme = currentTheme === byВefaultTheme ? darkTheme : byВefaultTheme;

	dispatch(setTheme(newTheme));
	dispatch(saveThemeToLocalStorage(newTheme));
};
