import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '@hooks';
import { removeTaskAsync } from '@actions';
import { ControlPanel } from '@components';
import { TaskForm } from '../../../task-form/task-form';
import styled from 'styled-components';

const TaskContainer = ({ task, className }) => {
	const { id, taskText } = task;
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const [isEditing, setIsEditing] = useState(false);

	const onTaskRemove = (id) => {
		dispatch(removeTaskAsync(requestServer, id));
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
