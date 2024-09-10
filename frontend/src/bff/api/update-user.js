import { getCurrentDateTime } from '../utils';
import { BASE_URL } from '../constants';

export const updateUser = ({ id, name, email, password }) =>
	fetch(`${BASE_URL}/users/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name,
			email,
			password,
			updated_at: getCurrentDateTime(),
		}),
	}).then((updatedUser) => updatedUser.json());
