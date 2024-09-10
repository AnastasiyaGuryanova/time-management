import { getProjects } from '../api';
import { sessions } from '../sessions';

export const fetchProjects = async (hash) => {
	const { user } = await sessions.access(hash);

	const projects = await getProjects(user.id);

	return {
		error: null,
		res: projects,
	};
};
