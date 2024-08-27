import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useMatch } from 'react-router-dom';
import { selectProject } from '@selectors';
import { loadProjectAsync } from '@actions';
import { useServerRequest } from '@hooks';
import { ProjectForm } from '@components';
import { Tasks, NavPanel, TaskForm } from './components';
import styled from 'styled-components';

const ProjectContainer = ({ className }) => {
	const params = useParams();
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const project = useSelector(selectProject);
	const isTasks = useMatch('/project/:id/tasks');

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

					<h3 className="title-new-task">Добавить задачи в проект</h3>
					<TaskForm />
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
	color: ${(props) => props.theme.colors.mainText};

	& .title-new-task {
		margin: 50px 0 15px 0;
		font-size: 22px;
	}
`;
