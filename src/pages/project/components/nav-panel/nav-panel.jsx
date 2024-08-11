import { useNavigate, useLocation } from "react-router-dom";
import { H2 } from "@components";
import styled from "styled-components";

const NavPanelContainer = ({ projectId, className }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const isProjectPage = location.pathname === `/project/${projectId}`;
	const isTasksPage = location.pathname === `/project/${projectId}/tasks`;

	return (
		<div className={className}>
			<H2
				className={isProjectPage ? "active" : ""}
				onClick={() => navigate(`/project/${projectId}`)}
			>
				Проект
			</H2>

			<H2
				className={isTasksPage ? "active" : ""}
				onClick={() => navigate(`/project/${projectId}/tasks`)}
			>
				Задачи
			</H2>
		</div>
	);
};

export const NavPanel = styled(NavPanelContainer)`
	display: flex;
	align-items: center;
	margin: 0 auto auto;

	h2 {
		cursor: pointer;
		margin-right: 20px;
	}

	h2.active {
		color: ${(props) => props.theme.colors.pageActiveColor};
		text-decoration: underline;
	}
`;
