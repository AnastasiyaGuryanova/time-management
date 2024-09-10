import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTimer, useServerRequest } from '@hooks';
import { saveTaskAsync } from '@actions';
import { Tooltip, Icon, H2, PageComponent } from '@components';
import styled from 'styled-components';

const TimerCard = styled.div`
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

const TimerDisplay = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 20px;
`;

const TimerContainer = ({ className, taskId, taskName }) => {
	const { isRunning, start, stop, reset, duration, startTime } = useTimer();
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		if (duration > 0) {
			dispatch(
				saveTaskAsync(requestServer, {
					id: taskId,
					startTime,
					duration: Number(duration),
				}),
			).then(() => navigate(`/`));
		} else {
			alert('Запустите таймер, что бы приступить к выполнению');
		}
	};

	const hours = Math.floor(duration / 3600)
		.toString()
		.padStart(2, '0');
	const minutes = Math.floor((duration % 3600) / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (duration % 60).toString().padStart(2, '0');

	return (
		<PageComponent className={className}>
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
						<Icon id="fa-stop-circle-o" size="50px" onClick={() => stop()} />
					</Tooltip>
				)}
				<Tooltip text="Сохранить">
					<Icon
						id="fa-check"
						size="50px"
						margin="0 40px"
						disabled={isRunning}
						onClick={onSave}
					/>
				</Tooltip>

				<Tooltip text="Сброс">
					<Icon id="fa-repeat" size="50px" onClick={reset} />
				</Tooltip>
			</ButtonContainer>
		</PageComponent>
	);
};

export const Timer = styled(TimerContainer)`
	background-color: ${(props) => props.theme.colors.timerBackground};
	border-radius: 12px;
	padding: 20px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	& h2 {
		color: ${(props) => props.theme.colors.timerTextColor};
	}
`;

TimerContainer.propTypes = {
	className: PropTypes.string,
	taskId: PropTypes.string.isRequired,
	taskName: PropTypes.string.isRequired,
};
