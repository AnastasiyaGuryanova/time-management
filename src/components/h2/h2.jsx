import styled from 'styled-components';

const H2Container = ({ children, className, color, ...props }) => (
	<h2 className={className} {...props}>
		{children}
	</h2>
);

export const H2 = styled(H2Container)`
	margin: 0 0 40px 0;
	font-size: 34px;
	color: ${({ color, theme }) => color || theme.colors.colorTitle};
`;
