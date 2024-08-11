import { getCurrentDateTime } from "../utils";

export const updateTask = ({ id, taskText }) =>
	fetch(`http://localhost:3008/tasks/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			task_text: taskText,
			updated_at: getCurrentDateTime(),
		}),
	}).then((loadedTask) => loadedTask.json());
