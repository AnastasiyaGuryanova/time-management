import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@actions';
import { selectTheme } from '@selectors';
import { byВefaultTheme, darkTheme } from '@themes';

export const useThemeSwitcher = () => {
	const dispatch = useDispatch();
	const currentTheme = useSelector(selectTheme);

	const toggleTheme = () => {
		const newTheme =
			currentTheme.colors.id === 'default' ? darkTheme : byВefaultTheme;

		dispatch(setTheme(newTheme));

		localStorage.setItem('appTheme', JSON.stringify(newTheme));
	};

	return {
		currentTheme,
		toggleTheme,
	};
};
