import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { H2, Select, Button, Loader } from '@components';
import { selectTasksAllProjects } from '@selectors';
import { loadTasksAllProjectsAsync } from '@actions';
import { useServerRequest } from '@hooks';
import { durationToHoursAndMinutes } from '@helpers';
import styled from 'styled-components';

const SelectionContainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const tasks = useSelector(selectTasksAllProjects);

	const navigate = useNavigate();

	const [selectedTaskId, setSelectedTaskId] = useState('');
	const [selectedTaskName, setSelectedTaskName] = useState('');

	useEffect(() => {
		dispatch(loadTasksAllProjectsAsync(requestServer));
	}, [dispatch, requestServer]);

	const handleTaskChange = (event) => {
		const selectedTask = tasks.find((task) => task.id === event.target.value);

		setSelectedTaskId(selectedTask.id);
		setSelectedTaskName(selectedTask.taskText);
	};

	if (tasks === null) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<H2>Выбрать задачу для работы</H2>

			<Select value={selectedTaskId} onChange={handleTaskChange}>
				<option value="all">Выбрать задачу</option>

				{tasks.map((task) => (
					<option key={task.id} value={task.id}>
						{task.taskText}, затрачено времени:{' '}
						{durationToHoursAndMinutes(task.duration)}
					</option>
				))}
			</Select>

			<Button
				disabled={!selectedTaskId}
				margin="30px 0 0 0"
				onClick={() =>
					navigate(`/start/task/${selectedTaskId}`, {
						state: {
							taskName: selectedTaskName,
						},
					})
				}
			>
				Перейти к выполнению
			</Button>
		</div>
	);
};

export const Selection = styled(SelectionContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 700px;
`;
