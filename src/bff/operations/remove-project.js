import { deleteProject } from "../api";

export const removeProject = async (id) => {
	await deleteProject(id);

	return {
		error: null,
		res: true,
	};
};
