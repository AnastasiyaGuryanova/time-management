import { useNavigate } from 'react-router-dom';
import { Icon } from '@components';
import styled from 'styled-components';

const CardCreateContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className} onClick={() => navigate('/project/new')}>
			<Icon id="fa-plus-square-o" margin="0 10px 0 0" size="50px" />
			<h3 className="title-new-project">Создать новый проект</h3>
		</div>
	);
};

export const CardCreate = styled(CardCreateContainer)`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	margin-bottom: 20px;
	padding: 20px 60px;
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	border-radius: 60px;
	cursor: pointer;
	background-color: ${(props) => props.theme.colors.cardCreateBackground};
	transition: background-color 0.3s ease;
	transition: color 0.3s ease;

	i {
		transition: color 0.3s ease;
	}

	& .title-new-project {
		text-align: center;
		margin: 0;
		font-size: 22px;
	}

	&:hover {
		background-color: ${(props) => props.theme.colors.cardCreateBackgroundHover};
		color: ${(props) => props.theme.colors.cardCreateColorHover};
		i {
			color: ${(props) => props.theme.colors.cardCreateColorHover};
		}
	}
`;
