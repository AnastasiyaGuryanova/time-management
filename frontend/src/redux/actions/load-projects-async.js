import { setProjectsData } from './set-projects-data';
import { request } from '@helpers';

export const loadProjectsAsync = () => (dispatch) =>
	request('/projects', 'GET').then((projectsData) => {
		if (projectsData.data) {
			dispatch(setProjectsData(projectsData.data));
		}
		return projectsData;
	});
