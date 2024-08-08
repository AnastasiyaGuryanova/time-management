import { getCurrentDateTime } from "../utils";

export const addProject = (userId, { title, description }) =>
	fetch("http://localhost:3008/projects", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			user_id: userId,
			title,
			description,
			created_at: getCurrentDateTime(),
		}),
	}).then((createdProject) => createdProject.json());
