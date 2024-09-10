import { useMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PageComponent } from '@components';
import { StartButton, Selection, StartTask } from './components';

export const MainPage = ({ className }) => {
	const isSelect = useMatch('/selection');
	const isStartTask = useMatch('/start/task/:id');

	if (isSelect) {
		return (
			<PageComponent className={className}>
				<Selection />
			</PageComponent>
		);
	}

	return (
		<PageComponent className={className}>
			{isStartTask ? <StartTask /> : <StartButton />}
		</PageComponent>
	);
};

MainPage.propTypes = {
	className: PropTypes.string,
};
