import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '@selectors';
import { Icon, Tooltip } from '@components';
import styled from 'styled-components';

const BackArrowContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);

	return roleId ? (
		<div className={className}>
			<Tooltip text="Назад">
				<Icon
					id="fa-chevron-left"
					size="40px"
					onClick={() => navigate(-1)}
					color={(props) => props.theme.colors.iconColorHeader}
				/>
			</Tooltip>
		</div>
	) : (
		''
	);
};

export const BackArrow = styled(BackArrowContainer)`
	position: absolute;
	top: 140px;
	left: 20%;
	color: ${(props) => props.theme.colors.mainText};
`;
