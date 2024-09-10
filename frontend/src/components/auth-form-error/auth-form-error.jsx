import PropTypes from 'prop-types';
import styled from 'styled-components';

const AuthFormErrorContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};
export const AuthFormError = styled(AuthFormErrorContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	font-weight: 500;
	letter-spacing: 1px;
	color: ${(props) => props.theme.colors.errorFormColorText};
`;

AuthFormErrorContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};
