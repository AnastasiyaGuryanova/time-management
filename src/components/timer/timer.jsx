import { useDispatch } from 'react-redux';
import { useTimer } from '@hooks';
import { Tooltip, Icon, H2 } from '@components';
import styled from 'styled-components';

const TimerCard = styled.div`
	width: 50px;
	height: 70px;
	background-color: #f0f0f0;
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

const TimerDisplay = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
`;

const TimerContainer = ({ className, taskId, taskName }) => {
	const { isRunning, start, stop, reset, duration, startTime } = useTimer();
	const dispatch = useDispatch();

	console.log(taskId);

	const handleStop = () => {
		stop();

		console.log('startTime:', startTime);
	};

	const hours = Math.floor(duration / 3600)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((duration % 3600) / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (duration % 60).toString().padStart(2, '0');

	return (
		<div className={className}>
			<H2>Задача: {taskName}</H2>

			<TimerDisplay>
				{duration >= 3600 && (
					<>
						<TimerCard>{hours[0]}</TimerCard>
						<TimerCard>{hours[1]}</TimerCard>
						<TimerCard>:</TimerCard>
					</>
				)}
				<TimerCard>{minutes[0]}</TimerCard>
				<TimerCard>{minutes[1]}</TimerCard>
				<TimerCard>:</TimerCard>
				<TimerCard>{seconds[0]}</TimerCard>
				<TimerCard>{seconds[1]}</TimerCard>
			</TimerDisplay>

			<ButtonContainer>
				{!isRunning ? (
					<Tooltip text="Старт">
						<Icon id="fa-play-circle" size="50px" onClick={start} />
					</Tooltip>
				) : (
					<Tooltip text="Стоп">
						<Icon id="fa-stop-circle-o" size="50px" onClick={handleStop} />
					</Tooltip>
				)}
				<Tooltip text="Сброс">
					<Icon id="fa-repeat" size="50px" onClick={reset} />
				</Tooltip>
			</ButtonContainer>
		</div>
	);
};

export const Timer = styled(TimerContainer)`
	background-color: #ffffff;
	border-radius: 12px;
	padding: 20px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
