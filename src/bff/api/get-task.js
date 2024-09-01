import { transformTask } from '../transformers';
import { BASE_URL } from '../constants';

export const getTask = (id) =>
	fetch(`${BASE_URL}/tasks/${id}`)
		.then((loadedTask) => loadedTask.json())
		.then((loadedTask) => loadedTask && transformTask(loadedTask));
