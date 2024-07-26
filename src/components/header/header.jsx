import { Link } from "react-router-dom";
import { NavPanel } from "./components";
import styled from "styled-components";

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<div className="container">
				<Link to="/">
					<h1 className="title">.TimeMaster</h1>
				</Link>
				<NavPanel />
			</div>
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	width: 100%;
	height: 100px;
	box-shadow: 0 -2px 15px ${(props) => props.theme.colors.headerFootersHadow};
	background-color: ${(props) => props.theme.colors.headerFooterBackground};
	color: ${(props) => props.theme.colors.headerFooterText};

	& .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 1440px;
		margin: 0 auto;
		padding: 0 50px;
	}

	& .title {
		font-size: 40px;
		font-whight: 100;
	}
`;
