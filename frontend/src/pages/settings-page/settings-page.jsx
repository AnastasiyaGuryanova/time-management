import { useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { H2, UserForm, PageComponent } from '@components';
import { selectUser } from '@selectors';
import { ThemeSwitcher, UserContent } from './components';
import styled from 'styled-components';

const SettingsPageContainer = ({ className }) => {
	const user = useSelector(selectUser);
	const isEdit = useMatch('/settings/user-edit');
	const navigate = useNavigate();

	const handleSuccess = () => navigate('/settings');

	return (
		<PageComponent className={className}>
			{isEdit ? (
				<>
					<H2>Изменить данные пользователя</H2>
					<UserForm
						defaultValues={user}
						submitButtonText="Сохранить"
						onSuccess={handleSuccess}
						isEdit={isEdit}
					/>
				</>
			) : (
				<div className="content-settings">
					<H2>Настройки аккаунта</H2>
					<UserContent user={user} />
					<ThemeSwitcher />
				</div>
			)}
		</PageComponent>
	);
};

export const SettingsPage = styled(SettingsPageContainer)`
	& .content-settings {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
`;

SettingsPageContainer.propTypes = {
	className: PropTypes.string,
};
