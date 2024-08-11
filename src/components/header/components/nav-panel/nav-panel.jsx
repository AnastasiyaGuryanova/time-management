import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Tooltip } from "@components";
import { selectUserSession } from "@selectors";
import { logout } from "@actions";
import styled from "styled-components";

const NavPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem("userData");
	};

	return (
		<div className={className}>
			<Tooltip text="Назад">
				<Icon
					id="fa-chevron-left"
					onClick={() => navigate(-1)}
					color={(props) => props.theme.colors.iconColorHeader}
				/>
			</Tooltip>

			<Link to="/">
				<Button margin="0 0 0 20px">Главная</Button>
			</Link>

			<Link to="/projects">
				<Button margin="0 0 0 20px">Проекты</Button>
			</Link>

			<Link to="/analytics">
				<Button margin="0 0 0 20px">Аналитика</Button>
			</Link>

			<Link to="/settings">
				<Button margin="0 0 0 20px">Настройки</Button>
			</Link>

			<Button margin="0 0 0 20px" onClick={onLogout}>
				Выход
			</Button>
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
		background-color: ${(props) => props.theme.colors.headerHover};
	}

	& button:active {
		background-color: ${(props) => props.theme.colors.headerActive};
	}
`;
