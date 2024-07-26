import styled from "styled-components";

const IconContainer = ({ className, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	margin-left: 20px;
	font-size: 36px;
	color: ${(props) => props.theme.colors.buttonHeaderBackground};
	transition: color 0.3s ease;

	& i {
		transition: color 0.3s ease;
	}

	& :hover {
		color: ${(props) => props.theme.colors.headerHoverColor};
	}

	& :active {
		color: ${(props) => props.theme.colors.headerActiveColor};
	}
`;
