import styled from 'styled-components';

export const TimerCard = styled.div`
	width: 50px;
	height: 70px;
	background-color: ${(props) => props.theme.colors.timerCardBackground};
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2em;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	margin: 0 5px;
	transition: transform 0.5s;

	&:hover {
		transform: scale(1.1);
	}
`;
