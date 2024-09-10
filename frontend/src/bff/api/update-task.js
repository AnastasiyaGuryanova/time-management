import { getCurrentDateTime } from '../utils';
import { BASE_URL } from '../constants';

export const updateTask = ({ id, taskText, duration, startTime }, currentTask) => {
	const updateData = {};

	if (taskText !== undefined) {
		updateData.task_text = taskText;
		updateData.updated_at = getCurrentDateTime();
	}

	if (duration !== undefined) {
		updateData.duration = duration + currentTask.duration;
		updateData.end_time = getCurrentDateTime();
	}

	if (startTime !== undefined && !currentTask.startTime) {
		console.log('startTime', startTime);
		updateData.start_time = startTime;
	}

	return fetch(`${BASE_URL}/tasks/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(updateData),
	}).then((loadedTask) => loadedTask.json());
};
