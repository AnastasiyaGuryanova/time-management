import { setProjectData } from './set-project-data';
import { request } from '@helpers';

export const loadProjectAsync = (projectId) => (dispatch) =>
	request(`/projects/${projectId}`, 'GET').then((projectData) => {
		if (projectData.data) {
			dispatch(setProjectData(projectData.data));
		}
		return projectData;
	});
