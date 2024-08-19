import { BASE_URL } from '../constants';

export const deleteTask = (id) =>
	fetch(`${BASE_URL}/tasks/${id}`, {
		method: 'DELETE',
	});
