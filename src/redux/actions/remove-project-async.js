export const removeProjectAsync = (requestServer, id) => () =>
	requestServer("removeProject", id);
