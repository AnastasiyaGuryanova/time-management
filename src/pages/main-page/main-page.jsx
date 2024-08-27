import { useMatch } from 'react-router-dom';
import { PageComponent } from '@components';
import { StartButton, Selection, StartTask } from './components';
import styled from 'styled-components';

const MainPageContainer = ({ className }) => {
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

export const MainPage = styled(MainPageContainer)``;
