export const saveThemeToLocalStorage = (newTheme) => {
	return () => {
		localStorage.setItem('appTheme', JSON.stringify(newTheme));
	};
};
