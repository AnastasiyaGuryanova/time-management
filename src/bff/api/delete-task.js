export const deleteTask = (id) =>
	fetch(`http://localhost:3008/tasks/${id}`, {
		method: "DELETE",
	});
