import { removeTaskSuccess } from './remove-task-success.js';
import { request } from '@helpers';

export const removeTaskAsync =
	({ projectId, taskId }) =>
	(dispatch) =>
		request(`/projects/${projectId}/task/${taskId}`, 'DELETE').then(() => {
			dispatch(removeTaskSuccess(taskId));
		});
