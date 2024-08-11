import { Icon, Tooltip } from "@components";
import styled from "styled-components";

const ControlPanelContainer = ({ className, onRemove, onEdit }) => {
	return (
		<div className={className}>
			<Tooltip text="Удалить">
				<Icon id="fa-trash" margin="0 15px 0 0" onClick={onRemove} />
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
