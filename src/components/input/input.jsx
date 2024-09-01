import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, margin, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 44px;
	margin: ${({ margin = '0' }) => margin};
	padding: 10px 15px;
	font-size: 18px;
	background-color: ${(props) => props.theme.colors.textInputFieldBackground};
	color: ${(props) => props.theme.colors.mainText};
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	border-radius: 7px;
	transition: background-color 0.3s ease;

	&:focus {
		background-color: ${(props) => props.theme.colors.textInputFieldBackgroundActive};
	}
`;

InputContainer.propTypes = {
	className: PropTypes.string,
	width: PropTypes.string,
	margin: PropTypes.string,
};
