import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, color, disabled, ...props }) => (
	<div className={className} disabled={disabled} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	margin: ${({ margin = '0' }) => margin};
	font-size: ${({ size = '30px' }) => size};
	color: ${({ color, theme }) => color || theme.colors.iconColor};
	cursor: pointer;
	transition: color 0.3s ease;

	&:hover {
		color: ${(props) => !props.disabled && props.theme.colors.mainHover};
	}

	${({ disabled, theme }) =>
		disabled &&
		`
		color: ${theme.colors.disabledColor};
		cursor: default;
	`}
`;

IconContainer.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	disabled: PropTypes.bool,
};
