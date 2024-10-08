import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeTaskAsync } from '@actions';
import { ControlPanel } from '@components';
import { TaskForm } from '../../../task-form/task-form';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const TaskContainer = ({ task, className }) => {
	const { id, taskText } = task;
	const dispatch = useDispatch();
	const params = useParams();
	const [isEditing, setIsEditing] = useState(false);

	const onTaskRemove = (id) => {
		dispatch(removeTaskAsync({ projectId: params.id, taskId: id }));
	};

	const onTaskEdit = () => {
		setIsEditing(true);
	};

	const onSaveComplete = () => {
		setIsEditing(false);
	};

	return isEditing ? (
		<TaskForm task={task} onSaveComplete={onSaveComplete} />
	) : (
		<div className={className}>
			<div className="task">{taskText}</div>
			<ControlPanel onRemove={() => onTaskRemove(id)} onEdit={onTaskEdit} />
		</div>
	);
};

export const Task = styled(TaskContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-top: 10px;
	padding: 15px;
	background-color: ${(props) => props.theme.colors.taskBackground};
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	border-radius: 7px;

	& .task {
		margin-right: 10px;
	}
`;

TaskContainer.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.string.isRequired,
		taskText: PropTypes.string.isRequired,
	}).isRequired,
	className: PropTypes.string,
};
