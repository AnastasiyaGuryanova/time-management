import { updateProject, addProject } from "../api";
import { sessions } from "../sessions";

export const saveProject = async (hash, newProjectData) => {
	const { user } = await sessions.access(hash);

	const savedProject =
		newProjectData.id === ""
			? await addProject(user.id, newProjectData)
			: await updateProject(newProjectData);

	return {
		error: null,
		res: savedProject,
	};
};
