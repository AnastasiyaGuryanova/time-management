import { transformTask } from "../transformers";
import { BASE_URL } from "../constants";

export const getTasksAllProjects = (userId) =>
	fetch(`${BASE_URL}/tasks?user_id=${userId}`)
		.then((loadedTasks) => loadedTasks.json())
		.then((loadedTasks) => loadedTasks && loadedTasks.map(transformTask));
