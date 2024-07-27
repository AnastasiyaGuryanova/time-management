import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinkContainer = ({ className, children, ...props }) => (
	<Link className={className} {...props}>
		{children}
	</Link>
);

export const StyledLink = styled(StyledLinkContainer)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0 10px;
	font-size: 18px;
`;
