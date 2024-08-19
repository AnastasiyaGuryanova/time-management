import styled from 'styled-components';

const IconContainer = ({ className, id, color, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	margin: ${({ margin = '0' }) => margin};
	font-size: ${({ size = '30px' }) => size};
	color: ${({ color, theme }) => color || theme.colors.iconColor};
	cursor: pointer;
	transition: color 0.3s ease;

	:hover {
		color: ${({ theme }) => theme.colors.mainHover};
	}
`;
