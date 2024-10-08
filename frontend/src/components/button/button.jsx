import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = forwardRef(({ className, children, disabled, ...props }, ref) => (
	<button className={className} ref={ref} disabled={disabled} {...props}>
		{children}
	</button>
));

export const Button = styled(ButtonContainer)`
	margin: ${({ margin = '0' }) => margin};
	padding: 16px 24px;
	font-size: 18px;
	font-weight: 600;
	color: ${(props) => props.theme.colors.mainButtonText};
	background-color: ${(props) => props.theme.colors.mainButtonBackground};
	cursor: pointer;
	border: none;
	border-radius: 7px;
	letter-spacing: 1px;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${(props) => !props.disabled && props.theme.colors.mainHover};
	}

	${({ disabled, theme }) =>
		disabled &&
		`
		background-color: ${theme.colors.disabledBackground};
		cursor: default;
	`}
`;

ButtonContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	disabled: PropTypes.bool,
};
