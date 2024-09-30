import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveTaskAsync } from '@actions';
import { Input, Icon, Tooltip } from '@components';
import styled from 'styled-components';

const TaskFormContainer = ({ task = {}, onSaveComplete, className }) => {
	const { id = null, taskText = '' } = task;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const [taskValue, setTaskValue] = useState(taskText);

	const onTaskChange = ({ target }) => {
		setTaskValue(target.value);
	};

	const onRemove = () => {
		setTaskValue(taskText);
		onSaveComplete && onSaveComplete();
	};

	const onSaveTask = () => {
		const projectId = params.id;

		if (taskValue) {
			dispatch(
				saveTaskAsync(projectId, id, {
					taskText: taskValue,
				}),
			).then(({ projectId }) => {
				onSaveComplete && onSaveComplete();
				navigate(`/project/${projectId}/tasks`);
			});
		} else {
			alert('Введите текст задачи');
		}
	};

	return (
		<div className={className}>
			<Input
				value={taskValue}
				placeholder="Новая задача..."
				onChange={onTaskChange}
			/>
			<Tooltip text="Сохранить">
				<Icon id="fa-check" margin="0 0 0 10px" onClick={onSaveTask} />
			</Tooltip>
			<Tooltip text="Отмена">
				<Icon id="fa-times" margin="0 5px 0 10px" onClick={onRemove} />
			</Tooltip>
		</div>
	);
};

export const TaskForm = styled(TaskFormContainer)`
	display: flex;
	max-width: 1000px;
	width: 100%;
	margin-top: 10px;
	padding: 10px;
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	border-radius: 7px;

	& input {
		border: none;
	}
`;

TaskFormContainer.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.string,
		taskText: PropTypes.string,
	}),
	onSaveComplete: PropTypes.func,
	className: PropTypes.string,
};
