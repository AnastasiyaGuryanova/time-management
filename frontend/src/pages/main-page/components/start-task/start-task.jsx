import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Timer } from '@components';

export const StartTask = ({ className }) => {
	const { id } = useParams();
	const location = useLocation();
	const taskName = location.state?.taskName || 'Задача';

	return (
		<div className={className}>
			<Timer taskId={id} taskName={taskName} />
		</div>
	);
};

StartTask.propTypes = {
	className: PropTypes.string,
};
