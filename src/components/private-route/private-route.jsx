import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectUserRole } from '@selectors';
import { ROLE } from '@constants';

export const PrivateRoute = ({ children }) => {
	const roleId = useSelector(selectUserRole);

	return roleId !== ROLE.GUEST ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
