import { getCurrentDateTime } from '../utils';
import { BASE_URL } from '../constants';

export const addTask = (userId, { projectId, taskText }) =>
	fetch(`${BASE_URL}/tasks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			project_id: projectId,
			user_id: userId,
			task_text: taskText,
			created_at: getCurrentDateTime(),
		}),
	}).then((createdTask) => createdTask.json());
