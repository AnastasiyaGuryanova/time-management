import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = "100%" }) => width};
	height: 44px;
	margin: 0 0 10px 0;
	padding: 10px 15px;
	font-size: 18px;
	color: ${(props) => props.theme.colors.inputColorText};
	border: 1px solid ${(props) => props.theme.colors.inputBorderColor};
	border-radius: 7px;
	transition: background-color 0.3s ease;

	&:focus {
		background-color: ${(props) =>
			props.theme.colors.inputBackgroundActive};
	}
`;
