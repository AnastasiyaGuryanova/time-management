export const removeTaskAsync = (requestServer, id) => () =>
	requestServer("removeTask", id);
