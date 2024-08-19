import { BASE_URL } from '../constants';

export const updateSession = (id, updatedUserData) =>
	fetch(`${BASE_URL}/sessions/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user: updatedUserData,
		}),
	}).then((loadedSession) => loadedSession.json());
