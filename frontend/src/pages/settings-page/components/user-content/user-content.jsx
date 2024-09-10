import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip, Icon } from '@components';
import styled from 'styled-components';

const UserContentContainer = ({ className, user: { name, email } }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<Tooltip text="Изменить" className="icon-edit">
				<Icon id="fa-pencil" onClick={() => navigate('/settings/user-edit')} />
			</Tooltip>

			<div>
				<p>
					<strong>Имя: </strong>
					{name}
				</p>
				<p>
					<strong>Email: </strong>
					{email}
				</p>
				<p>
					<strong>Пароль: </strong>********
				</p>
			</div>
		</div>
	);
};

export const UserContent = styled(UserContentContainer)`
	position: relative;
	width: 100%;
	padding: 30px 40px;
	border-radius: 7px;
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	background-color: ${(props) => props.theme.colors.projectCardBackground};
	font-size: 26px;

	& .icon-edit {
		position: absolute;
		top: 10px;
		right: 20px;
	}
`;

UserContentContainer.propTypes = {
	className: PropTypes.string,
	user: PropTypes.shape({
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
	}).isRequired,
};
