import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Timer } from '../timer/timer';

export const StartTask = ({ className }) => {
	const { id } = useParams();
	const location = useLocation();
	const taskName = location.state?.taskName || 'Задача';
	const projectId = location.state?.projectId;

	return (
		<div className={className}>
			<Timer taskId={id} projectId={projectId} taskName={taskName} />
		</div>
	);
};

StartTask.propTypes = {
	className: PropTypes.string,
};
