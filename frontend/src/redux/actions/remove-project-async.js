import { removeProjectSuccess } from './remove-project-success';
import { request } from '@helpers';

export const removeProjectAsync = (id) => (dispatch) =>
	request(`/projects/${id}`, 'DELETE').then(() => {
		dispatch(removeProjectSuccess(id));
	});
