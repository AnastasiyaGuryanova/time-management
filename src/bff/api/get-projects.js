import { transformProject } from '../transformers';
import { BASE_URL } from '../constants';

export const getProjects = (userId) =>
	fetch(`${BASE_URL}/projects?user_id=${userId}`)
		.then((loadedProjects) => loadedProjects.json())
		.then((loadedProjects) => loadedProjects && loadedProjects.map(transformProject));
