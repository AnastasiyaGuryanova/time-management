import { getCurrentDateTime } from '../utils';
import { BASE_URL } from '../constants';

export const updateTask = ({ id, taskText }) =>
	fetch(`${BASE_URL}/tasks/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			task_text: taskText,
			updated_at: getCurrentDateTime(),
		}),
	}).then((loadedTask) => loadedTask.json());
