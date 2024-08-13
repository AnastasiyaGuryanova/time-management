import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadProjectsAsync } from "@actions";
import { selectProjects } from "@selectors";
import { useServerRequest } from "@hooks";
import { CardCreate, H2 } from "@components";
import { ProjectCard } from "./components";
import styled from "styled-components";

const AllProjectsPageContainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const projects = useSelector(selectProjects);

	useEffect(() => {
		dispatch(loadProjectsAsync(requestServer));
	}, [dispatch, requestServer]);

	return (
		<div className={className}>
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
		</div>
	);
};

export const AllProjectsPage = styled(AllProjectsPageContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto auto;
	padding: 50px 0;

	color: ${(props) => props.theme.colors.pageText};

	& .container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: space-between;
	}
`;
