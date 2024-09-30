import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTimer } from '@hooks';
import { getCurrentDateTime } from '@helpers';
import { saveTaskAsync } from '@actions';
import { Tooltip, Icon, H2, PageComponent } from '@components';
import { TimerCard, TimerDisplay, ButtonContainer } from './components';
import styled from 'styled-components';

const TimerContainer = ({ className, taskId, projectId, taskName }) => {
	const { isRunning, start, stop, reset, duration, startTime } = useTimer();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		if (duration > 0) {
			dispatch(
				saveTaskAsync(projectId, taskId, {
					startTime,
					endTime: getCurrentDateTime(),
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
	projectId: PropTypes.string.isRequired,
	taskName: PropTypes.string.isRequired,
};
