import { useDispatch } from 'react-redux';
import { OPEN_MODAL, CLOSE_MODAL } from '@actions';
import { Icon, Tooltip } from '@components';
import styled from 'styled-components';

const ControlPanelContainer = ({ className, onRemove, onEdit }) => {
	const dispatch = useDispatch();

	const handleRemoveClick = () => {
		dispatch(
			OPEN_MODAL({
				children: 'Вы уверены, что хотите удалить этот элемент?',
				onConfirm: () => {
					onRemove();
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<Tooltip text="Удалить">
				<Icon id="fa-trash" margin="0 15px 0 0" onClick={handleRemoveClick} />
			</Tooltip>
			<Tooltip text="Изменить">
				<Icon id="fa-pencil" onClick={onEdit} />
			</Tooltip>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
`;
