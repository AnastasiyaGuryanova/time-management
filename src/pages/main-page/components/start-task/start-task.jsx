import { useLocation, useParams } from 'react-router-dom';
import { Timer } from '@components';
import styled from 'styled-components';

const StartTaskContainer = ({ className }) => {
	const { id } = useParams();
	const location = useLocation();
	const taskName = location.state?.taskName || 'Задача';

	return (
		<div className={className}>
			<Timer taskId={id} taskName={taskName} />
		</div>
	);
};

export const StartTask = styled(StartTaskContainer)``;
