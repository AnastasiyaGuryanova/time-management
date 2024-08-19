import { getCurrentDateTime } from '../utils';
import { BASE_URL } from '../constants';

export const addProject = (userId, { title, description }) =>
	fetch(`${BASE_URL}/projects`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			user_id: userId,
			title,
			description,
			created_at: getCurrentDateTime(),
		}),
	}).then((createdProject) => createdProject.json());
