import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialDuration = 0) => {
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(null);
	const [duration, setDuration] = useState(initialDuration);
	const [intervalId, setIntervalId] = useState(null);

	const start = useCallback(() => {
		if (!isRunning) {
			setIsRunning(true);

			const date = new Date();
			setStartTime(date);
			setIntervalId(
				setInterval(() => {
					setDuration((prevDuration) => prevDuration + 1);
				}, 1000),
			);
		}
	}, [isRunning]);

	const stop = useCallback(() => {
		if (isRunning) {
			clearInterval(intervalId);
			setIsRunning(false);
			setIntervalId(null);
		}
	}, [isRunning, intervalId]);

	const reset = useCallback(() => {
		stop();
		setStartTime(null);
		setDuration(0);
	}, [stop]);

	useEffect(() => {
		return () => clearInterval(intervalId);
	}, [intervalId]);

	return {
		isRunning,
		start,
		stop,
		reset,
		duration,
		startTime,
	};
};
