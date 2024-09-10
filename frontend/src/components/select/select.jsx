import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectContainer = ({ className, children, width, margin, ...props }) => {
	return (
		<select className={className} {...props}>
			{children}
		</select>
	);
};

export const Select = styled(SelectContainer)`
	width: ${({ width = '100%' }) => width};
	height: 44px;
	margin: ${({ margin = '0' }) => margin};
	padding: 10px 15px;
	font-size: 18px;
	color: ${(props) => props.theme.colors.mainText};
	background-color: ${(props) => props.theme.colors.textInputFieldBackground};
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	border-radius: 7px;
	transition: background-color 0.3s ease;
`;

SelectContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
	margin: PropTypes.string,
};
