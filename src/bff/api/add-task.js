import { getCurrentDateTime } from "../utils";

export const addTask = (userId, { projectId, taskText }) =>
	fetch("http://localhost:3008/tasks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			project_id: projectId,
			user_id: userId,
			task_text: taskText,
			created_at: getCurrentDateTime(),
		}),
	}).then((createdTask) => createdTask.json());
