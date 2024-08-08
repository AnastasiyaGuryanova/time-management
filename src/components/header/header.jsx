import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavPanel } from "./components";
import { selectUserRole } from "@selectors";
import { ROLE } from "@constants";
import styled from "styled-components";

const HeaderContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);

	return (
		<header className={className}>
			<Link to="/">
				<h1 className="title">.TimeMaster</h1>
			</Link>
			{roleId !== ROLE.GUEST && <NavPanel />}
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100px;
	padding: 0 50px;
	box-shadow: 0 -2px 15px ${(props) => props.theme.colors.headerFooterShadow};
	background-color: ${(props) => props.theme.colors.headerFooterBackground};
	color: ${(props) => props.theme.colors.headerFooterText};
	overflow: hidden;

	& .title {
		margin: 0;
		font-size: 40px;
	}
`;
