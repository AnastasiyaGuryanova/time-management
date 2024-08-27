import { useSelector } from 'react-redux';
import { Button } from '@components';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalChildren,
} from '@selectors';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const children = useSelector(selectModalChildren);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				{children}

				<div className="buttons">
					<Button margin="0 10px 0" onClick={onConfirm}>
						Да
					</Button>
					<Button margin="0 10px 0" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	color: ${(props) => props.theme.colors.mainText};

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	& .box {
		position: relative;
		text-align: center;
		width: fit-content;
		max-width: 90%;
		margin: 0 auto;
		padding: 40px;
		top: 50%;
		font-size: 28px;
		background-color: ${(props) => props.theme.colors.pageBackground};
		border: 1px solid ${(props) => props.theme.colors.borderColor};
		border-radius: 7px;
		transform: translate(0, -50%);
		transition: background-color 0.3s ease;
		z-index: 30;
	}

	& .buttons {
		display: flex;
		justify-content: center;
		margin-top: 25px;
	}
`;
