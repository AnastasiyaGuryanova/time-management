import { setProjectData } from "./set-project-data";

export const saveProjectAsync = (requestServer, newProjectData) => (dispatch) =>
	requestServer("saveProject", newProjectData).then((updatedProject) => {
		dispatch(setProjectData(updatedProject.res));
		return updatedProject.res;
	});
