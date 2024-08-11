import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "@hooks";
import { loadTasksAsync } from "@actions";
import { selectTasks } from "@selectors";
import { Task } from "./components";
import styled from "styled-components";

const TasksContainer = ({ className, projectId }) => {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(loadTasksAsync(requestServer, projectId));
	}, [dispatch, requestServer, tasks, projectId]);

	return (
		<div className={className}>
			{tasks.length > 0 ? (
				tasks.map((task) => <Task key={task.id} task={task} />)
			) : (
				<div className="no-active-tasks">
					Нет активных задач в проекте
				</div>
			)}
		</div>
	);
};

export const Tasks = styled(TasksContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1000px;
	width: 100%;
	font-size: 18px;
	color: ${(props) => props.theme.colors.pageText};

	& .no-active-tasks {
		margin-top: 20px;
		font-size: 20px;
		font-weight: 500;
	}
`;
