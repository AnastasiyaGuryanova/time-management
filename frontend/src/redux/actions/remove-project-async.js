import { removeProjectSuccess } from "./remove-project-success";

export const removeProjectAsync = (requestServer, id) => (dispatch) =>
	requestServer("removeProject", id).then((projectData) => {
		if (projectData.res) {
			dispatch(removeProjectSuccess(id));
		}
		return projectData;
	});
