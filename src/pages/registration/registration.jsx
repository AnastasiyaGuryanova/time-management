import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { UserForm, H2, PageComponent } from '@components';
import { selectUserRole } from '@selectors';
import { ROLE } from '@constants';
import styled from 'styled-components';

const RegistrationContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<PageComponent className={className}>
			<div className="container">
				<H2>Регистрация</H2>

				<UserForm
					defaultValues={{
						name: '',
						email: '',
						password: '',
						confirmPassword: '',
					}}
					submitButtonText="Зарегистрироваться"
				/>
			</div>
		</PageComponent>
	);
};

export const Registration = styled(RegistrationContainer)`
	& .container {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 650px;
		height: 650px;
		padding: 40px;
		border-radius: 7px;
		border: 1px solid ${(props) => props.theme.colors.borderColor};
	}
`;

RegistrationContainer.propTypes = {
	className: PropTypes.string,
};
