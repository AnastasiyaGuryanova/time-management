import { BASE_URL } from '../constants';

export const deleteProject = (projectId) =>
	fetch(`${BASE_URL}/projects/${projectId}`, {
		method: 'DELETE',
	});
