export const durationToHoursAndMinutes = (duration = 0) => {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	return `${hours} ч ${minutes} мин`;
};
