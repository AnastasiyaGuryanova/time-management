import { Link } from "react-router-dom";
import { Button, Icon } from "./components";
import styled from "styled-components";

const NavPanelContainer = ({ className }) => {
	return (
		<div className={className}>
			<Link to="/">
				<Button>Главная</Button>
			</Link>

			<Link to="/projects">
				<Button>Проекты</Button>
			</Link>

			<Link to="/analytics">
				<Button>Аналитика</Button>
			</Link>

			<Icon id="fa-cog" onClick={() => {}} />

			<Icon id="fa-sign-out" onClick={() => {}} />
		</div>
	);
};

export const NavPanel = styled(NavPanelContainer)`
	display: flex;
	align-items: center;

	& :hover {
		cursor: pointer;
	}

	& button:hover {
		background-color: ${(props) => props.theme.colors.headerHoverColor};
	}

	& button:active {
		background-color: ${(props) => props.theme.colors.headerActiveColor};
	}
`;
