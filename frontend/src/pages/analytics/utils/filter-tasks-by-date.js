export const filterTasksByDate = (tasks, dateFrom, dateTo) => {
	const normalizeDate = (date) => {
		const normalized = new Date(date);
		normalized.setHours(0, 0, 0, 0);
		return normalized;
	};

	if (dateFrom) {
		const from = normalizeDate(dateFrom);
		tasks = tasks.filter((task) => normalizeDate(task.startTime) >= from);
	}
	if (dateTo) {
		const to = normalizeDate(dateTo);
		tasks = tasks.filter((task) => normalizeDate(task.endTime) <= to);
	}

	return tasks;
};
