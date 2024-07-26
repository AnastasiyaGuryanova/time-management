import styled from "styled-components";

const ButtonContainer = ({ className, children, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);

export const Button = styled(ButtonContainer)`
	margin-left: 20px;
	padding: 16px 24px;
	font-size: 16px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.buttonHeaderText};
	background-color: ${(props) => props.theme.colors.buttonHeaderBackground};
	border: none;
	border-radius: 7px;
	letter-spacing: 1px;
	transition: background-color 0.3s ease;
`;
