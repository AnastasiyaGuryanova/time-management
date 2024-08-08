import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useServerRequest } from "@hooks";
import { CardCreate, H2 } from "@components";
import { ProjectCard } from "./components";
import styled from "styled-components";

const AllProjectsPageContainer = ({ className }) => {
	const [projects, setProjects] = useState([]);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer("fetchProjects").then(({ res }) => {
			setProjects(res);
		});
	}, [requestServer, projects]);

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
