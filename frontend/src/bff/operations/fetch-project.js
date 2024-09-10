import { getProject } from "../api";

export const fetchProject = async (projectId) => {
	let project;
	let error;

	try {
		project = await getProject(projectId);
	} catch (projectError) {
		error = projectError.message;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	return {
		error: null,
		res: project,
	};
};
