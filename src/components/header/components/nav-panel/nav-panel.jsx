import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@components";
import { selectUserSession } from "@selectors";
import { logout } from "@actions";
import styled from "styled-components";

const NavPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem("userData");
		window.location.reload();
	};

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

			<Link to="/settings">
				<Button>Настройки</Button>
			</Link>

			<Button onClick={onLogout}>Выход</Button>
		</div>
	);
};

export const NavPanel = styled(NavPanelContainer)`
	display: flex;
	align-items: center;

	& :hover {
		cursor: pointer;
	}

	& button {
		color: ${(props) => props.theme.colors.headerButtonText};
		background-color: ${(props) =>
			props.theme.colors.headerButtonBackground};
	}

	& button:hover {
		background-color: ${(props) => props.theme.colors.headerHoverColor};
	}

	& button:active {
		background-color: ${(props) => props.theme.colors.headerActiveColor};
	}
`;
