import { setTasksProject } from './set-tasks-project';
import { request } from '@helpers';

export const loadTasksProjectAsync = (projectId) => (dispatch) =>
	request(`/projects/${projectId}/task`, 'GET').then((response) => {
		if (response.data) {
			dispatch(setTasksProject(response.data));
		}

		return response;
	});
