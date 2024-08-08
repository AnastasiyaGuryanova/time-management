import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProject } from "@selectors";
import { loadProjectAsync } from "@actions";
import { useServerRequest } from "@hooks";
import { ProjectForm, H2 } from "@components";
import styled from "styled-components";

const ProjectContainer = ({ className }) => {
	const params = useParams();
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const project = useSelector(selectProject);

	useEffect(() => {
		dispatch(loadProjectAsync(requestServer, params.id));
	}, [dispatch, params.id, requestServer]);

	return (
		<div className={className}>
			<H2>Новый проект</H2>
			<ProjectForm project={project} />
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
	padding-top: 50px;
`;
