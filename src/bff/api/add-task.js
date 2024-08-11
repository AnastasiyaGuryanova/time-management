import { getCurrentDateTime } from "../utils";

export const addTask = ({ projectId, taskText }) =>
	fetch("http://localhost:3008/tasks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			project_id: projectId,
			task_text: taskText,
			created_at: getCurrentDateTime(),
		}),
	}).then((createdTask) => createdTask.json());
