import { Icon } from "../icon/icon";
import styled from "styled-components";

const ControlPanelContainer = ({ className, onRemove, onEdit }) => {
	return (
		<div className={className}>
			<Icon id="fa-trash" margin="0 15px 0 0" onClick={onRemove} />
			<Icon id="fa-pencil" onClick={onEdit} />
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
`;
