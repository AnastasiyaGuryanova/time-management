import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { saveTaskAsync } from "@actions";
import { useServerRequest } from "@hooks";
import { Input, Icon, Tooltip } from "@components";
import styled from "styled-components";

const TaskFormContainer = ({ task = {}, onSaveComplete, className }) => {
	const { id = "", taskText = "" } = task;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const [taskValue, setTaskValue] = useState(taskText);
	const requestServer = useServerRequest();

	const onTaskChange = ({ target }) => {
		setTaskValue(target.value);
	};

	const onRemove = () => {
		setTaskValue(taskText);
		onSaveComplete && onSaveComplete();
	};

	const onSaveTask = () => {
		if (taskValue) {
			dispatch(
				saveTaskAsync(requestServer, {
					id,
					projectId: params.id,
					taskText: taskValue,
				}),
			).then(({ project_id }) => {
				onSaveComplete && onSaveComplete();
				navigate(`/project/${project_id}/tasks`);
			});
		} else {
			alert("Введите текст задачи");
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
