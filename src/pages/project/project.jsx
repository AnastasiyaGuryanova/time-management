import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useMatch } from "react-router-dom";
import { selectProject } from "@selectors";
import { loadProjectAsync } from "@actions";
import { useServerRequest } from "@hooks";
import { ProjectForm } from "@components";
import { Tasks, NavPanel, TaskForm } from "./components";
import styled from "styled-components";

const ProjectContainer = ({ className }) => {
	const params = useParams();
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const project = useSelector(selectProject);
	const isTasks = useMatch("/project/:id/tasks");

	useEffect(() => {
		dispatch(loadProjectAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer]);

	return (
		<div className={className}>
			<NavPanel projectId={params.id} />
			{isTasks ? (
				<Tasks projectId={params.id} />
			) : (
				<>
					<ProjectForm project={project} />
					<TaskForm className="task-form" />
				</>
			)}
		</div>
	);
};

export const Project = styled(ProjectContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto auto;
	padding: 50px;

	& .task-form {
		margin-top: 40px;
	}
`;
