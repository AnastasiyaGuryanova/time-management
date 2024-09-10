import { transformProject } from "../transformers";
import { BASE_URL } from "../constants";

export const getProject = (projectId) =>
	fetch(`${BASE_URL}/projects/${projectId}`)
		.then((loadedProject) => loadedProject.json())
		.then(
			(loadedProject) => loadedProject && transformProject(loadedProject),
		);
