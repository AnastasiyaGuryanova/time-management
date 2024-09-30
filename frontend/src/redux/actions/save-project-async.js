import { setProjectData } from './set-project-data';
import { request } from '@helpers';

export const saveProjectAsync = (id, newProjectData) => (dispatch) => {
	const saveRequest = id
		? request(`/projects/${id}`, 'PATCH', newProjectData)
		: request('/projects', 'POST', newProjectData);

	return saveRequest.then((updatedProject) => {
		dispatch(setProjectData(updatedProject.data));
		return updatedProject.data;
	});
};
