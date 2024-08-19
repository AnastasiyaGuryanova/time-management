import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProjectsAsync } from '@actions';
import { selectProjects } from '@selectors';
import { useServerRequest } from '@hooks';
import { CardCreate, H2, PageComponent } from '@components';
import { ProjectCard } from './components';
import styled from 'styled-components';

const AllProjectsPageContainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const projects = useSelector(selectProjects);

	useEffect(() => {
		dispatch(loadProjectsAsync(requestServer));
	}, [dispatch, requestServer]);

	return (
		<PageComponent className={className}>
			<H2>Мои проекты</H2>
			<div className="container">
				<Link to="/project/new" className="project-link">
					<CardCreate>Создать новый проект</CardCreate>
				</Link>

				{projects.map(({ id, title, description, createdAt }) => (
					<ProjectCard
						key={id}
						id={id}
						title={title}
						description={description}
						createdAt={createdAt}
					/>
				))}
			</div>
		</PageComponent>
	);
};

export const AllProjectsPage = styled(AllProjectsPageContainer)`
	& .container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: space-between;
	}
`;
