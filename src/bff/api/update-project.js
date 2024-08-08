export const updateProject = ({ id, title, description }) =>
	fetch(`http://localhost:3008/projects/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			title,
			description,
		}),
	}).then((loadedProject) => loadedProject.json());
