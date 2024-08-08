import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ControlPanel } from "@components";
import { removeProjectAsync } from "@actions";
import { useServerRequest } from "@hooks";
import styled from "styled-components";

const ProjectCardContainer = ({
	className,
	id,
	title,
	description,
	createdAt,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onProjectRemove = (id) => {
		dispatch(removeProjectAsync(requestServer, id));
	};

	const onProjectEdit = (id) => {
		navigate(`/project/${id}`);
	};

	return (
		<div className={className}>
			<div className="header-project">
				<h3 className="title-project">{title}</h3>
				<ControlPanel
					onRemove={() => onProjectRemove(id)}
					onEdit={() => onProjectEdit(id)}
				/>
			</div>
			<div className="project-description">{description}</div>
			<div className="created-ad">от: {createdAt}</div>
		</div>
	);
};

export const ProjectCard = styled(ProjectCardContainer)`
	flex: 1 1 calc(33% - 20px);
	max-width: 710px;
	height: 230px;
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	border-radius: 8px;
	padding: 15px 15px;
	transition: transform 0.3s;

	& .header-project {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	& .title-project {
		max-width: 270px;

		margin: 0 5px 0 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 22px;
	}

	& .project-description {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		font-size: 1.2em;
		overflow: hidden;
		text-overflow: ellipsis;
		height: calc(1.4em * 4);
	}

	& .created-ad {
		margin-top: 10px;
		text-align: right;
	}
`;
