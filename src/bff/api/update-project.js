import { getCurrentDateTime } from '../utils';
import { BASE_URL } from '../constants';

export const updateProject = ({ id, title, description }) =>
	fetch(`${BASE_URL}/projects/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			description,
			updated_at: getCurrentDateTime(),
		}),
	}).then((loadedProject) => loadedProject.json());
