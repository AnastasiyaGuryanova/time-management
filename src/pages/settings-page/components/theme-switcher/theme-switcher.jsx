import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@components';
import { updateTheme } from '@actions';
import { selectTheme } from '@selectors';
import { byВefaultTheme } from '@themes';
import styled from 'styled-components';

const ThemeSwitcherContainer = ({ className }) => {
	const dispatch = useDispatch();
	const currentTheme = useSelector(selectTheme);

	const handleToggleTheme = () => {
		dispatch(updateTheme(currentTheme));
	};

	return (
		<div className={className}>
			<h3>
				Сменить тему профиля на{' '}
				{currentTheme === byВefaultTheme ? 'тёмную' : 'светлую'}
			</h3>
			<div className="container" onClick={handleToggleTheme}>
				<div className="switch">
					{currentTheme === byВefaultTheme ? (
						<Icon id="fa-sun-o" size="32px" margin="1px 0 3px 0" />
					) : (
						<Icon id="fa-moon-o" size="32px" margin="1px 0 3px 0" />
					)}
				</div>
			</div>
		</div>
	);
};

export const ThemeSwitcher = styled(ThemeSwitcherContainer)`
	display: flex;
	align-items: center;
	margin-top: 30px;
	padding: 20px 30px;
	border-radius: 7px;
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	background-color: ${(props) => props.theme.colors.projectCardBackground};
	font-size: 20px;

	& h3 {
		margin: 0 20px 0 0;
	}

	& .container {
		display: flex;
		align-items: center;
		width: 80px;
		height: 40px;
		padding: 0 5px;
		cursor: pointer;
		border-radius: 20px;
		border: 1px solid ${(props) => props.theme.colors.borderColor};
		background-color: ${(props) => props.theme.colors.switchBackground};

		transition: background-color 0.3s ease;
	}
	.switch {
		width: 100%;
		display: flex;
		align-items: center;

		transition: justify-content 0.3s ease;
		justify-content: ${({ theme }) =>
			theme === byВefaultTheme ? 'flex-start' : 'flex-end'};
	}
`;
