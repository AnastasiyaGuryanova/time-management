export const filterTasksByDate = (tasks, dateFrom, dateTo) => {
	if (dateFrom) {
		const from = new Date(dateFrom);
		tasks = tasks.filter((task) => new Date(task.startTime) >= from);
	}
	if (dateTo) {
		const to = new Date(dateTo);
		tasks = tasks.filter((task) => new Date(task.endTime) <= to);
	}
	return tasks;
};
