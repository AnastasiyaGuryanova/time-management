import { transformTask } from "../transformers";
import { BASE_URL } from "../constants";

export const getTasks = (projectId) =>
	fetch(`${BASE_URL}/tasks?project_id=${projectId}`)
		.then((loadedTasks) => loadedTasks.json())
		.then((loadedTasks) => loadedTasks && loadedTasks.map(transformTask));
